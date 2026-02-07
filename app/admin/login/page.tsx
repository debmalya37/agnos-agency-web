"use client";

import { useState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { Loader2, Lock } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");
    
    // Call the server action
    const result = await loginAction(formData);
    
    // If we get here, it means login failed (success redirects automatically)
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 pb-6 text-center border-b border-gray-100">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
            <Lock className="w-6 h-6 text-[#FF6B2C]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
          <p className="text-sm text-gray-500 mt-1">Enter your credentials to continue</p>
        </div>

        <form action={handleSubmit} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username</label>
            <input 
              name="username"
              type="text" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF6B2C] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900 bg-gray-50"
              placeholder="admin"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FF6B2C] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-900 bg-gray-50"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0B1220] hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}