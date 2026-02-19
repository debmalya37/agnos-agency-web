import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideoTestimonial extends Document {
  clientName: string;
  companyName: string;
  shortDescription: string;
  youtubeUrl: string;
  videoId: string; // Extracted automatically to save processing time on the frontend
  status: "draft" | "published";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const VideoTestimonialSchema = new Schema<IVideoTestimonial>(
  {
    clientName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, maxlength: 120 },
    youtubeUrl: { type: String, required: true },
    videoId: { type: String, required: true, index: true }, // Indexed for fast lookups
    status: { type: String, enum: ["draft", "published"], default: "published", index: true },
    order: { type: Number, default: 0, index: true }, // Indexed for sorted fetching
  },
  { timestamps: true }
);

// Compound index for ultra-fast production querying
VideoTestimonialSchema.index({ status: 1, order: 1 });

const VideoTestimonial: Model<IVideoTestimonial> =
  mongoose.models.VideoTestimonial || mongoose.model<IVideoTestimonial>("VideoTestimonial", VideoTestimonialSchema);

export default VideoTestimonial;