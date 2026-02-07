"use client";

import useSWR, { mutate } from "swr";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye, 
  Loader2,
  FileText
} from "lucide-react";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminCaseStudies() {
  const { data, error, isLoading } = useSWR("/api/admin/case-studies", fetcher);
  const [search, setSearch] = useState("");

  const filteredData = data?.filter((cs: any) => 
    cs.title.toLowerCase().includes(search.toLowerCase()) ||
    cs.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    
    await fetch(`/api/admin/case-studies?id=${id}`, { method: "DELETE" });
    mutate("/api/admin/case-studies"); // Refresh list
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Case Studies</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your portfolio and success stories.</p>
          </div>
          <Link 
            href="/admin/case-studies/new" 
            className="flex items-center justify-center gap-2 bg-[#0B1220] hover:bg-black text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-gray-200"
          >
            <Plus size={18} />
            New Case Study
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        
        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              placeholder="Search by title or client..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4 w-20">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData?.map((cs: any) => (
                  <tr key={cs._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative bg-gray-100 border border-gray-200">
                        {cs.coverImage ? (
                          <img src={cs.coverImage} alt={cs.title} className="object-cover w-full h-full" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-300">
                            <FileText size={20} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 line-clamp-1">{cs.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{cs.excerpt}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cs.clientName}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        cs.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {cs.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/case-studies/${cs.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Live"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link 
                          href={`/admin/case-studies/${cs._id}`}
                          className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(cs._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredData?.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No case studies found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}