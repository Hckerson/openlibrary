import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // ✅ Parse the request body

    const response = await axios.post(
      "https://api.openlibrary.app/auth/login",
      body, // ✅ pass body directly
      { withCredentials: true }
    );

    const data = response.data;
    if (data.success) {
      const refreshToken = data.data.refreshToken
      const cookieStore = await cookies()
      cookieStore.set('refreshToken', refreshToken)
      cookieStore.set('accessToken', data.data.accessToken)
      return Response.json(data, { status: 200 });
    }

    // ✅ Always return something if not successful
    return Response.json(data, { status: 400 });

  } catch (error) {
    const axiosError = error as AxiosError;

    switch (axiosError.response?.status) {
      case 400:
        return Response.json(null, { status: 400 });
      case 401:
        return Response.json(null, { status: 401 });
      case 500:
        return Response.json(null, { status: 500 });
      default:
        // ✅ Always handle unexpected errors
        return Response.json(
          { data: null, error: axiosError.message },
          { status: 500 }
        );
    }
  }
}
