import mongoose, { Schema, Document, Model } from "mongoose";

/* ----------------------------------
 * Sub Types
 * ---------------------------------- */

export interface IResultMetric {
  label: string; // e.g. "Traffic Increase"
  value: string; // e.g. "+150%"
}

export interface ITestimonial {
  quote: string;
  authorName: string;
  authorRole?: string;     // CEO, Founder, Marketing Head
  authorCompany?: string; // Client company name
  authorImage?: string;   // Avatar or logo URL
  rating?: number;        // 1–5 stars (optional)
}

/* ----------------------------------
 * Main Interface
 * ---------------------------------- */

export interface ICaseStudy extends Document {
  // Core
  title: string;
  slug: string;
  status: "draft" | "published";
  featured: boolean;

  // Cover & Visuals
  coverImage: string;
  galleryImages: string[];

  // Client & Project Info
  clientName: string;
  industry?: string;
  servicesProvided: string[];
  websiteUrl?: string;

  // Content
  excerpt: string; // Short summary for cards & SEO
  challenge: string;
  solution?: string;
  content: string; // Rich text / MDX / HTML

  // Proof & Trust
  results: IResultMetric[];
  testimonials: ITestimonial[];

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  schemaMarkup?: string;

  // Meta
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/* ----------------------------------
 * Schema
 * ---------------------------------- */

const ResultMetricSchema = new Schema<IResultMetric>(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const TestimonialSchema = new Schema<ITestimonial>(
  {
    quote: { type: String, required: true },
    authorName: { type: String, required: true },
    authorRole: { type: String },
    authorCompany: { type: String },
    authorImage: { type: String },
    rating: { type: Number, min: 1, max: 5 },
  },
  { _id: false }
);

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    /* Core */
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    /* Visuals */
    coverImage: { type: String, required: true },
    galleryImages: { type: [String], default: [] },

    /* Client Info */
    clientName: { type: String, required: true },
    industry: { type: String },
    servicesProvided: { type: [String], default: [] },
    websiteUrl: { type: String },

    /* Content */
    excerpt: { type: String, required: true }, // for cards
    challenge: { type: String, required: true },
    solution: { type: String },
    content: { type: String, required: true },

    /* Proof */
    results: { type: [ResultMetricSchema], default: [] },
    testimonials: { type: [TestimonialSchema], default: [] },

    /* SEO */
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: [String], default: [] },
    schemaMarkup: { type: String },

    /* Meta */
    publishedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

/* ----------------------------------
 * Indexes (Performance)
 * ---------------------------------- */

CaseStudySchema.index({ slug: 1 });
CaseStudySchema.index({ status: 1, featured: 1 });
CaseStudySchema.index({ industry: 1 });
CaseStudySchema.index({ servicesProvided: 1 });

/* ----------------------------------
 * Model Export (Next.js Safe)
 * ---------------------------------- */

const CaseStudy: Model<ICaseStudy> =
  mongoose.models.CaseStudy ||
  mongoose.model<ICaseStudy>("CaseStudy", CaseStudySchema);

export default CaseStudy;
