"use client";

import { useState, useEffect } from "react";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2, Calendar, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"message" | "calendar">("message");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Web Development",
    message: "",
  });

  // --- CAL.COM INITIALIZATION ---
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view",
        theme: "dark" // Force dark theme to match site
      });
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "Web Development", message: "" });
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      alert("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-white font-sans selection:bg-orange-500/30">
      
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">legendary.</span>
          </h1>
          <p className="text-lg text-gray-400">
            Ready to scale? Drop us a line or book a call to discuss your digital transformation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Info Cards */}
          <div className="space-y-8">
            <div className="bg-[#121723]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:border-orange-500/20 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Chat to us</h3>
                  <p className="text-gray-400 text-sm mb-3">Our friendly team is here to help.</p>
                  <a href="mailto:pratik@aitekmedia.net" className="text-white font-medium hover:text-orange-500 transition-colors">pratik@aitekmedia.net</a>
                </div>
              </div>
            </div>

            <div className="bg-[#121723]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:border-orange-500/20 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Visit us</h3>
                  <p className="text-gray-400 text-sm mb-3">Come say hello at our office HQ.</p>
                  <p className="text-white font-medium">Office No 214, Konark Business Centre, Mundhwa, Pune, India</p>
                </div>
              </div>
            </div>

            <div className="bg-[#121723]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:border-orange-500/20 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Call us</h3>
                  <p className="text-gray-400 text-sm mb-3">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+918600541991" className="text-white font-medium hover:text-orange-500 transition-colors">+91 86005 41991</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Area */}
          <div className="flex flex-col gap-6">
            
            {/* Toggle Switch */}
            <div className="bg-[#121723] p-1.5 rounded-xl border border-white/10 flex relative">
              <button 
                onClick={() => setActiveTab("message")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all relative z-10 ${activeTab === 'message' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <MessageSquare size={16} /> Send Message
              </button>
              <button 
                onClick={() => setActiveTab("calendar")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all relative z-10 ${activeTab === 'calendar' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Calendar size={16} /> Book a Call
              </button>
              
              {/* Sliding Background */}
              <motion.div 
                className="absolute top-1.5 bottom-1.5 bg-orange-500 rounded-lg z-0"
                initial={false}
                animate={{
                  left: activeTab === 'message' ? '0.375rem' : '50%',
                  width: 'calc(50% - 0.375rem)',
                  x: activeTab === 'calendar' ? '0.375rem' : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Content Container */}
            <div className="bg-[#121723] border border-white/10 rounded-[2rem] relative overflow-hidden shadow-2xl min-h-[600px]">
              <AnimatePresence mode="wait">
                
                {/* --- TAB 1: FORM --- */}
                {activeTab === "message" && (
                  <motion.div 
                    key="message"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 md:p-10 h-full"
                  >
                    {success ? (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/10">
                          <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                        <p className="text-gray-400 max-w-sm mx-auto mb-8">
                          Thanks for reaching out. We've received your inquiry and will get back to you within 24 hours.
                        </p>
                        <button 
                          onClick={() => setSuccess(false)}
                          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                        >
                          Send another message
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Name</label>
                            <input 
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-700"
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                            <input 
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-700"
                              placeholder="john@company.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                          <div className="relative">
                            <select 
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all appearance-none cursor-pointer"
                            >
                              <option value="Web Development">Web Development</option>
                              <option value="Mobile App">Mobile App</option>
                              <option value="Design System">Design System</option>
                              <option value="SEO & Marketing">SEO & Marketing</option>
                              <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message</label>
                          <textarea 
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-700 resize-none"
                            placeholder="Tell us about your project goals..."
                          />
                        </div>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                          {loading ? "Sending..." : "Send Message"}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}

                {/* --- TAB 2: CALENDAR --- */}
                {activeTab === "calendar" && (
                  <motion.div 
                    key="calendar"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full min-h-[600px] p-2"
                  >
                    <Cal 
                        namespace="30min"
                        calLink="aitek-media/30min"
                        style={{ width: "100%", height: "100%", overflow: "scroll" }}
                        config={{ layout: "month_view", theme: "dark" }}
                    />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}