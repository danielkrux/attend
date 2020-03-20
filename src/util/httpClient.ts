export async function get<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

export async function getAdress(
  latitude: number | undefined,
  longitude: number | undefined
) {
  return await get<any>(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d8eeab056fdf4aa59d4b89cff3485935`
  );
}
