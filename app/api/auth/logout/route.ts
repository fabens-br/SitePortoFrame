import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  response.cookies.delete("porto_frame_admin_token")
  
  return response
}
