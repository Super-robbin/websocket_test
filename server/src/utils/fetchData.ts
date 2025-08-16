export const fetchData = async (region: string) => {
  try {
    const response = await fetch(
      `https://data--${region}.upscope.io/status?stats=1`
    );
    console.log(response)
    if (!response.ok)
      throw new Error(`Failed to fetch ${region}: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
