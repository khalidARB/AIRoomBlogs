'use client';

import { useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing to AiRooms!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Subscription failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="mt-16 p-8 sm:p-10 bg-[#BEF264]/15 dark:bg-[#BEF264]/10 rounded-3xl border border-[#BEF264]/40 dark:border-[#BEF264]/30 shadow-soft">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-md">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white mb-2">
            Enjoyed this publication?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Subscribe to receive strategic articles and tech insights straight to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-auto flex-grow max-w-md">
          <div className="flex items-center bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 focus-within:border-[#111827] dark:focus-within:border-[#BEF264] rounded-full p-1.5 shadow-sm transition-all">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={status === 'loading' || status === 'success'}
              className="bg-transparent text-sm text-[#111827] dark:text-white px-4 py-2 focus:outline-none w-full placeholder-gray-400 dark:placeholder-gray-500 font-medium"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              aria-label="Subscribe to newsletter"
              className="bg-[#BEF264] hover:bg-[#a3e635] text-[#111827] font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === 'success' ? (
                <>
                  <Check className="w-4 h-4 text-green-800" />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {message && (
            <p
              className={`text-xs mt-3 font-semibold px-4 transition-all ${
                status === 'success' ? 'text-green-700' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
