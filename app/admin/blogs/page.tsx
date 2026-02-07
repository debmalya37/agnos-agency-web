'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  Search, 
  MoreVertical,
  Calendar,
  Loader2,
  FileText
} from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  coverImage?: string;
  slug: string;
  metaTitle?: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch blogs on load
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Remove from local state immediately
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } else {
        alert('Failed to delete blog.');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting blog.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter blogs by search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Bar */}
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-xl font-medium text-slate-900">All Blogs</h1>
          <p className="text-sm text-gray-500">Manage your articles and SEO</p>
        </div>
        <Link 
          href="/admin/blogs/new" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm"
        >
          <Plus size={18} />
          <span>Create New</span>
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title or author..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition sm:text-sm shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Loader2 className="animate-spin mb-3 text-blue-600" size={32} />
            <p>Loading your content...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="mx-auto h-12 w-12 text-gray-300 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No blogs found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new article.</p>
            <div className="mt-6">
              <Link href="/admin/blogs/new" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                + Create Blog
              </Link>
            </div>
          </div>
        ) : (
          // Blogs Table
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Article Details
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                      
                      {/* Title & Image Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            {blog.coverImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img className="h-full w-full object-cover" src={blog.coverImage} alt="" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    <FileText size={20} />
                                </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900 max-w-xs truncate" title={blog.title}>
                                {blog.title}
                            </div>
                            <div className="text-xs text-gray-500 max-w-xs truncate">
                                /{blog.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Author Column */}
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {blog.author}
                        </span>
                      </td>

                      {/* Date Column */}
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1.5" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* View (Public) */}
                          <Link 
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            title="View Public Page"
                          >
                            <Eye size={18} />
                          </Link>

                          {/* Edit (Admin) */}
                          {/* Note: You need to create this page later at /admin/blogs/[id]/edit */}
                          <Link 
                            href={`/admin/blogs/${blog._id}/edit`}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(blog._id)}
                            disabled={deletingId === blog._id}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === blog._id ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}