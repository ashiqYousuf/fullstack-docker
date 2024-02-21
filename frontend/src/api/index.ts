export async function ping() {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/ping` || "http://localhost:8000/ping"
    );
    const data = await response.json();
    return data.message;
    //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}
