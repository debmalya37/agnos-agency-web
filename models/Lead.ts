import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, default: "General Inquiry" },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["new", "contacted", "closed"], 
      default: "new",
      index: true 
    },
  },
  { timestamps: true }
);

// Prevent model recompilation error in Next.js hot reloads
const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;