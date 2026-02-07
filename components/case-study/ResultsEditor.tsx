"use client";

import { Plus, Trash2, TrendingUp } from "lucide-react";

// FIX: Default value to [] to prevent "undefined" errors
export function ResultsEditor({ value = [], onChange }: any) {
  
  const addMetric = () => {
    // Ensure we are spreading an array, even if value comes in as null
    const currentList = Array.isArray(value) ? value : [];
    onChange([...currentList, { label: "", value: "" }]);
  };

  const removeMetric = (index: number) => {
    const next = [...value];
    next.splice(index, 1);
    onChange(next);
  };

  const updateMetric = (index: number, field: string, val: string) => {
    const next = [...value];
    next[index][field] = val;
    onChange(next);
  };

  // Safe check for length
  const safeValue = Array.isArray(value) ? value : [];

  return (
    <div className="space-y-4">
      {safeValue.length === 0 && (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          <TrendingUp className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No results added yet</p>
        </div>
      )}
      
      {safeValue.map((r: any, i: number) => (
        <div key={i} className="group relative flex gap-2 items-start bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Value</label>
              <input
                placeholder="e.g. 150%"
                value={r.value}
                onChange={(e) => updateMetric(i, "value", e.target.value)}
                className="w-full px-3 py-1.5 text-sm rounded bg-white border border-gray-200 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Label</label>
              <input
                placeholder="e.g. Increase in Leads"
                value={r.label}
                onChange={(e) => updateMetric(i, "label", e.target.value)}
                className="w-full px-3 py-1.5 text-sm rounded bg-white border border-gray-200 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => removeMetric(i)}
            className="absolute -top-2 -right-2 bg-white text-red-500 p-1 rounded-full shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      
      <button
        onClick={addMetric}
        className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 border border-dashed border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <Plus size={16} /> Add Metric
      </button>
    </div>
  );
}