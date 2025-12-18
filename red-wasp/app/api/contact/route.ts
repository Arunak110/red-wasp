import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Enquiry from "../../../models/Enquiry";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();
    const doc = await Enquiry.create({ name, email, company, message });
    console.log("Saved enquiry:", doc._id);

    await resend.emails.send({
      from: "Red Wasp <onboarding@resend.dev>",
      to: process.env.CONTACT_NOTIFY_TO!,
      subject: "New enquiry from your website",
      html: `
        <h2>New Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company || "-"}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CONTACT_API_POST_ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
