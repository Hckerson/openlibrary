import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const response = await axios.post(
      "https://api.openlibrary.app/auth/verify/request",
      body,
      { withCredentials: true },
    );
    const data = response.data;
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(null, { status: 400 });
  }
}
