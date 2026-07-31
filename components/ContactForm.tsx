'use client';

import { useState, FormEvent } from 'react';
import {
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';

export default function ContactForm() {
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
  );
}
