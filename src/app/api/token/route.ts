import { NextRequest } from "next/server";
import { get } from "@vercel/edge-config";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return new Response("Token is required", { status: 400 });
  }
  const resp = await get(token);
  return new Response(JSON.stringify(resp));
}
