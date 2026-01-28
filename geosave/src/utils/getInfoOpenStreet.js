export async function getOSMData(lat, lng) {
  const radius = 100;

  const query = `[out:json][timeout:5];
  (
    node(around:${radius},${lat},${lng});
    way(around:${radius},${lat},${lng});
  );
  out tags;`;
  const url = `
    https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}
  `;

  const response = await fetch(url);

  const data = await response.json();

  const result = data.elements.map((el) => el.tags).filter(Boolean);

  return result;
}
