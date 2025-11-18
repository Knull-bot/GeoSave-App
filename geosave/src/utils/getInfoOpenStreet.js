export async function getOSMData(lat, lng) {
  const radius = 100;
  const url = `
    https://overpass-api.de/api/interpreter?data=[out:json];
    (
      node(around:${radius},${lat},${lng});
      way(around:${radius},${lat},${lng});
      relation(around:${radius},${lat},${lng});
    );
    out body;
  `;

  const response = await fetch(url);
  console.log(response);
  const data = await response.json();

  const result = data.elements.map((el) => el.tags).filter(Boolean);

  console.log(typeof result);

  return result;
}
