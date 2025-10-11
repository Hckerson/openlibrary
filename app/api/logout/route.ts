import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("refreshToken");
    cookieStore.delete("accessToken");
    return Response.json(null, { status: 200 });
  } catch (error) {
    console.error(`Error logging out: ${error}`);
    return Response.json(null, {status: 400})
  }
}
