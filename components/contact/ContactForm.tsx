'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, XCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type State = 'idle' | 'loading' | 'success' | 'error';

function Toast({ state, onClose }: { state: 'success' | 'error'; onClose: () => void }) {
  const isSuccess = state === 'success';
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 right-6 z-[9999] flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl max-w-sm"
      style={{
        background: isSuccess ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
        border: `1px solid ${isSuccess ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {isSuccess ? (
        <CheckCircle size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: 1 }} />
      ) : (
        <XCircle size={20} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-mono font-semibold text-sm" style={{ color: isSuccess ? '#10b981' : '#ef4444' }}>
          {isSuccess ? 'Message sent!' : 'Something went wrong'}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {isSuccess
            ? "I'll get back to you within 24–48 hours."
            : 'Please try again or email me directly.'}
        </p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-0.5 rounded-full transition-opacity hover:opacity-70"
        style={{ color: 'var(--text-tertiary)' }}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [toast, setToast] = useState<'success' | 'error' | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const showToast = (type: 'success' | 'error') => {
    setToast(type);
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        showToast('success');
      } else {
        setState('error');
        showToast('error');
      }
    } catch {
      setState('error');
      showToast('error');
    }
  };

  const fields = [
    { name: 'name', label: 'Your Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'subject', label: 'Subject', type: 'text', required: true },
  ];

  return (
    <>
      {/* Toast notification */}
      <AnimatePresence>
        {toast && <Toast key={toast} state={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {fields.map((field, i) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative"
          >
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              required={field.required}
              value={form[field.name as keyof typeof form]}
              onChange={handleChange}
              placeholder=" "
              disabled={state === 'loading'}
              className="peer w-full px-4 pt-6 pb-2 rounded-xl text-sm font-medium outline-none transition-all duration-200 disabled:opacity-60"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <label
              htmlFor={field.name}
              className="absolute left-4 top-4 text-xs font-mono transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs"
              style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}
            >
              {field.label}
            </label>
          </motion.div>
        ))}

        {/* Message textarea */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="relative"
        >
          <textarea
            name="message"
            id="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder=" "
            disabled={state === 'loading'}
            className="peer w-full px-4 pt-6 pb-2 rounded-xl text-sm font-medium outline-none transition-all duration-200 resize-none disabled:opacity-60"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
          <label
            htmlFor="message"
            className="absolute left-4 top-3 text-xs font-mono pointer-events-none"
            style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}
          >
            Your Message
          </label>
        </motion.div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={state === 'loading'}
          className="w-full"
        >
          <Send size={16} />
          Send Message
        </Button>
      </motion.form>
    </>
  );
}
