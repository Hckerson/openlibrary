// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const formData = await req.formData();

    // 🔑 Forward formData directly to backend
    const res = await fetch("https://api.openlibrary.app/documents", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
      // do NOT set Content-Type manually — fetch will set it with the right boundary
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
