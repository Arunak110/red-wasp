// models/Enquiry.js
import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Avoid recompiling the model on hot reload
export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);
