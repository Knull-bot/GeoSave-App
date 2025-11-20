import client from "@/lib/db";

import { getOSMData } from "../../../src/utils/getInfoOpenStreet";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  const { latitude, longitude } = await req.json();
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const date = new Date();
  const OSMdata = await getOSMData(latitude, longitude);

  const OSMtext = OSMdata.map((obj: Record<string, unknown>) => {
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  }).join("; ");

  const prompt = `Есть координаты lat=${latitude}, lng=${longitude} и время ${date.toISOString()}. Объекты вокруг: ${
    OSMtext || "нет объектов"
  }. Предположи, что могло произойти в этом месте в это время (тревожный сигнал). Ответ краткий. Сразу скажу что не нужно ссылаться на полученные тобой данные. Твой ответ пойдет прямо на фронтенд, желательно начинай с "предположительно". В числе опасностей отправленных из дома может быть как пожар так и если ночное время суток - домашнее или бытовое насилие.`;

  let message = undefined;
  try {
    const aiRes = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    message = aiRes.text;
  } catch {
    message = "Free Gemini ai model was overloaded.";
  }

  console.log(message);

  const formattedDate = date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const customDate = `${formattedDate} ${formattedTime}`;

  await client.query(
    "INSERT INTO events (latitude, longitude, created_at, message) VALUES($1, $2, $3, $4)",
    [latitude, longitude, customDate, message]
  );
  return new Response(JSON.stringify({ success: true, message: "Succes!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
