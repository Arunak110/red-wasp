import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Enquiry from "../../models/Enquiry";


export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message }: { name: string; email: string; company?: string; message: string } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const doc = await Enquiry.create({ name, email, company, message });
    console.log("✅ Saved enquiry in DB:", doc); // 👈 important log

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    console.error("❌ CONTACT_API_ERROR:", err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
