"use client";

import { MessageSquareQuote, Plus, Trash2, User } from "lucide-react";

// FIX: Default value to [] to prevent crash
export function TestimonialsEditor({ value = [], onChange }: any) {
  
  // Safe accessor to ensure we always have an array
  const safeValue = Array.isArray(value) ? value : [];

  const addTestimonial = () => {
    // Spread safeValue instead of potential undefined 'value'
    onChange([...safeValue, { quote: "", authorName: "", authorRole: "" }]);
  };

  const removeTestimonial = (index: number) => {
    const next = [...safeValue];
    next.splice(index, 1);
    onChange(next);
  };

  const updateTestimonial = (index: number, field: string, val: string) => {
    const next = [...safeValue];
    next[index][field] = val;
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {safeValue.length === 0 && (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          <MessageSquareQuote className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No testimonials yet</p>
        </div>
      )}

      {safeValue.map((t: any, i: number) => (
        <div key={i} className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3 group">
          <div className="flex gap-3">
            <div className="mt-1 text-gray-400"><MessageSquareQuote size={18} /></div>
            <textarea
              rows={3}
              placeholder="The client's quote..."
              value={t.quote}
              onChange={(e) => updateTestimonial(i, "quote", e.target.value)}
              className="w-full text-sm bg-transparent border-none p-0 focus:ring-0 placeholder:text-gray-300 resize-none leading-relaxed text-gray-700"
            />
          </div>
          
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <div className="text-gray-400"><User size={16} /></div>
            <div className="flex-1 grid grid-cols-1 gap-2">
              <input
                placeholder="Author Name"
                value={t.authorName}
                onChange={(e) => updateTestimonial(i, "authorName", e.target.value)}
                className="text-sm font-medium text-gray-900 placeholder:text-gray-300 border-none p-0 focus:ring-0"
              />
              <input
                placeholder="Role / Company"
                value={t.authorRole}
                onChange={(e) => updateTestimonial(i, "authorRole", e.target.value)}
                className="text-xs text-gray-500 placeholder:text-gray-300 border-none p-0 focus:ring-0"
              />
            </div>
          </div>

          <button
            onClick={() => removeTestimonial(i)}
            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button
        onClick={addTestimonial}
        className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
      >
        <Plus size={16} /> Add Testimonial
      </button>
    </div>
  );
}