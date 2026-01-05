export async function getOSMData(lat, lng) {
  const radius = 100;

  const query = `[out:json];
  (
    node(around:${radius},${lat},${lng});
    way(around:${radius},${lat},${lng});
    relation(around:${radius},${lat},${lng});
  );
  out body;`;
  const url = `
    https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}
  `;

  const response = await fetch(url);
  console.log("status:", response.status);
  console.log("ok:", response.ok);
  console.log("content-type:", response.headers.get("content-type"));

  const text = await response.text();
  console.log("RAW RESPONSE:\n", text);

  const data = await response.json();

  const result = data.elements.map((el) => el.tags).filter(Boolean);

  console.log(typeof result);

  return result;
}
