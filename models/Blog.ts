import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  author: string;
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[]; // Array of strings for tags/keywords
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: false },
    author: { type: String, default: 'Thinqit Agency' },
    
    // SEO Fields (Optional but recommended)
    metaTitle: { type: String }, 
    metaDescription: { type: String },
    keywords: { type: [String], default: [] }, // Stores tags as ["react", "nextjs", "seo"]
  },
  { timestamps: true }
);

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;