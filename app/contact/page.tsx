'use client';

import { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Globe,
  ChevronDown,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus('loading');

    // Simulate crisp API submission response
    setTimeout(() => {
      setStatus('success');
      setStatusMessage('Thank you for reaching out! Our team will respond within 24 hours.');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
      {/* Client Header component */}
      <Header navItems={[]} posts={[]} />

      <main className="flex-grow pt-32 pb-24">
        {/* Contact Hero Header */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#BEF264] text-[#111827] text-xs font-extrabold px-4 py-1.5 rounded-full mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GET IN TOUCH</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111827] dark:text-white leading-[1.08] tracking-tight mb-6">
              Let's Connect & Collaborate.
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
              Have questions regarding our technical publications, headless WordPress architecture, or editorial partnerships? Drop us a message below.
            </p>
          </div>
        </section>

        {/* Main 2-Column Contact Grid */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Info Cards & Social Links */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Direct Email Card */}
              <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#BEF264]/20 dark:bg-[#BEF264]/10 text-[#111827] dark:text-[#BEF264] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111827] dark:text-white mb-1">
                    Editorial & Inquiries
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    For press, article pitches, and technical partnerships.
                  </p>
                  <a
                    href="mailto:contact@airooms.io"
                    className="text-sm font-bold text-[#111827] dark:text-[#BEF264] hover:underline"
                  >
                    contact@airooms.io
                  </a>
                </div>
              </div>

              {/* Response SLA Card */}
              <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#BEF264]/20 dark:bg-[#BEF264]/10 text-[#111827] dark:text-[#BEF264] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111827] dark:text-white mb-1">
                    Fast Response Guarantee
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    We review messages daily and aim to reply within 24 business hours.
                  </p>
                  <span className="inline-block bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
                    SLA: &lt; 24 Hours
                  </span>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#BEF264]/20 dark:bg-[#BEF264]/10 text-[#111827] dark:text-[#BEF264] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111827] dark:text-white mb-1">
                    Global Distribution
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Distributed global team. Cloud edge rendering hosted worldwide across Vercel CDNs.
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="bg-[#BEF264]/15 dark:bg-[#BEF264]/10 p-8 rounded-3xl border border-[#BEF264]/40 dark:border-[#BEF264]/30 shadow-soft">
                <h3 className="text-base font-extrabold text-[#111827] dark:text-white mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#111827] dark:text-[#BEF264]" /> Follow AiRooms
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Join our developer network for updates on Next.js, headless architecture, and design systems.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                    className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 hover:bg-[#BEF264] dark:hover:bg-[#BEF264] text-[#111827] dark:text-white dark:hover:text-[#111827] flex items-center justify-center shadow-xs transition-all hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 hover:bg-[#BEF264] dark:hover:bg-[#BEF264] text-[#111827] dark:text-white dark:hover:text-[#111827] flex items-center justify-center shadow-xs transition-all hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 hover:bg-[#BEF264] dark:hover:bg-[#BEF264] text-[#111827] dark:text-white dark:hover:text-[#111827] flex items-center justify-center shadow-xs transition-all hover:scale-105"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-neutral-900 p-8 sm:p-12 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft">
                <div className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-4 h-4 text-[#BEF264]" /> Send a Direct Message
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#111827] dark:text-gray-200 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Rivera"
                        className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 focus:border-[#111827] dark:focus:border-[#BEF264] rounded-2xl px-4 py-3 text-sm text-[#111827] dark:text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#111827] dark:text-gray-200 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 focus:border-[#111827] dark:focus:border-[#BEF264] rounded-2xl px-4 py-3 text-sm text-[#111827] dark:text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject Selection */}
                  <div>
                    <label className="block text-xs font-bold text-[#111827] dark:text-gray-200 uppercase tracking-wider mb-2">
                      Inquiry Subject
                    </label>
                    <div className="relative">
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 focus:border-[#111827] dark:focus:border-[#BEF264] rounded-2xl px-4 pr-10 py-3 text-sm text-[#111827] dark:text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="General Inquiry" className="bg-white dark:bg-neutral-900 text-[#111827] dark:text-white">General Inquiry</option>
                        <option value="Editorial Partnership" className="bg-white dark:bg-neutral-900 text-[#111827] dark:text-white">Editorial Partnership</option>
                        <option value="Press / Media" className="bg-white dark:bg-neutral-900 text-[#111827] dark:text-white">Press / Media</option>
                        <option value="Tech Contribution" className="bg-white dark:bg-neutral-900 text-[#111827] dark:text-white">Technical Contribution</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold text-[#111827] dark:text-gray-200 uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project, idea, or questions..."
                      className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 focus:border-[#111827] dark:focus:border-[#BEF264] rounded-2xl p-4 text-sm text-[#111827] dark:text-white focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#BEF264] hover:bg-[#a3e635] text-[#111827] font-bold text-base py-4 rounded-full transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-900" />
                        <span>Message Sent Successfully</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Notification Status Message */}
                  {statusMessage && (
                    <div
                      className={`p-4 rounded-2xl text-xs font-semibold text-center border ${
                        status === 'success'
                          ? 'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {statusMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer component */}
      <Footer navItems={[]} categories={[]} />
    </div>
  );
}
