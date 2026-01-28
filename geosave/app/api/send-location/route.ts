import { supabaseAdmin } from "@/src/lib/supabaseServer";

import { getOSMData } from "../../../src/utils/getInfoOpenStreet";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  const { latitude, longitude, userId } = await req.json();
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const date = new Date();
  try {
    const OSMdata = await getOSMData(latitude, longitude);

    const OSMtext = OSMdata.map((obj: Record<string, unknown>) => {
      return Object.entries(obj)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    }).join("; ");

    const prompt = `
Es liegen folgende Informationen vor:
- Koordinaten: lat=${latitude}, lng=${longitude}
- Datum und Uhrzeit: ${date.toISOString()}
- Umgebung (Objekte in der Nähe): ${OSMtext || "keine bekannten Objekte"}

Aufgabe:
Gib eine kurze, vorsichtige Einschätzung, welche Art von Situation an diesem Ort zu dieser Zeit vermutlich vorliegen könnte, die einen Hilferuf oder Alarm ausgelöst hat.

Regeln:
- Beginne die Antwort mit „Vermutlich“.
- Antworte ausschließlich auf Deutsch.
- Berücksichtige Umgebung, Tageszeit und Wochentag.
- Beschreibe die Situation allgemein und sachlich, ohne konkrete Schuldzuweisungen oder detaillierte Gewaltbeschreibungen.
- Erwähne keine Datenquellen und keine technischen Details.

Orientierung:
- Wohnumfeld tagsüber: eher technische, medizinische oder haushaltsbezogene Vorfälle.
- Wohnumfeld abends oder nachts: eher private Konfliktsituationen oder ungewöhnliche Ereignisse.
- Nähe zu Freizeit- oder Gastronomiebereichen am Abend/Wochenende: eher soziale Spannungen oder sicherheitsrelevante Zwischenfälle.
- Öffentliche oder verkehrsnahe Orte: mögliche Unfälle oder Störungen.

Die Antwort soll realistisch, zurückhaltend und nicht dramatisierend formuliert sein.
`;

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

    const formattedDate = date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const customDate = `${formattedDate} ${formattedTime}`;

    await supabaseAdmin.from("events").insert([
      {
        latitude,
        longitude,
        created_at: customDate,
        message,
        user_id: userId,
      },
    ]);
    return new Response(JSON.stringify({ success: true, message: "Succes!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    const formattedDate = date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const customDate = `${formattedDate} ${formattedTime}`;

    await supabaseAdmin.from("events").insert([
      {
        latitude,
        longitude,
        created_at: customDate,
        message:
          "Information wurde nicht gesendet, da ein Fehler aufgetreten ist",
        user_id: userId,
      },
    ]);
    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Information wurde nicht gesendet , da ein Fehler aufgetreten ist",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
