export const revalidate = 60;

import Link from 'next/link';
import Image from 'next/image';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

// Fetch data directly in Server Component
async function getBlogs() {
  await connectDB();
  // Using .lean() for better performance as we just need plain JSON objects
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
  
  // Serialize Mongo ID and dates for Next.js to be happy
  return blogs.map((blog) => ({
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  }));
}

export default async function BlogListingPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Latest Insights
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            News, updates, and tech strategies from Thinqit Agency.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link 
              href={`/blogs/${blog.slug}`} 
              key={blog._id} 
              className="group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0 relative h-48 w-full">
                {/* Use Next/Image for optimization, or simple img if external domain not configured */}
                <img
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={blog.coverImage || 'https://via.placeholder.com/400x300'}
                  alt={blog.title}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600">
                    Article
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  {/* Strip HTML tags for preview text */}
                  <p className="mt-3 text-base text-gray-500 line-clamp-3">
                    {blog.content.replace(/<[^>]+>/g, '')}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-900">{blog.author}</span>
                    <span className="mx-1">&middot;</span>
                    <time dateTime={blog.createdAt}>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}