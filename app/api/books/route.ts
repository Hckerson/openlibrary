import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const response = await axios.get("https://api.openlibrary.app/search", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        q: body.searchQuery,
        limit: 5
      },
    });
    const data = response.data;
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(null, { status: 400 });
  }
}
