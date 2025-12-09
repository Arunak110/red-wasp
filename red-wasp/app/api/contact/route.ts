// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Enquiry from "../../../models/Enquiry";

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const doc = await Enquiry.create({ name, email, company, message });
    console.log("Saved enquiry:", doc._id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("CONTACT_API_POST_ERROR:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(enquiries);
  } catch (err: any) {
    console.error("CONTACT_API_GET_ERROR:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

