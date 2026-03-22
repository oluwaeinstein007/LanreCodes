'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setState('success');
  };

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-20 text-center"
      >
        <CheckCircle size={56} className="accent-text" />
        <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Message sent!
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Thanks for reaching out. I'll get back to you within 24–48 hours.
        </p>
        <button
          onClick={() => { setState('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
          className="font-mono text-sm underline"
          style={{ color: 'var(--accent)' }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const fields = [
    { name: 'name', label: 'Your Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'subject', label: 'Subject', type: 'text', required: true },
  ];

  return (
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
            className="peer w-full px-4 pt-6 pb-2 rounded-xl text-sm font-medium outline-none transition-all duration-200"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
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
          className="peer w-full px-4 pt-6 pb-2 rounded-xl text-sm font-medium outline-none transition-all duration-200 resize-none"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
        <label
          htmlFor="message"
          className="absolute left-4 top-3 text-xs font-mono pointer-events-none"
          style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}
        >
          Your Message
        </label>
      </motion.div>

      {state === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <XCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

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
  );
}
