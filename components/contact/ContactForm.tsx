'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, XCircle, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type State = 'idle' | 'loading' | 'success' | 'error';
type FieldErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

function validate(form: typeof EMPTY_FORM): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  else if (form.message.trim().length < 10) errors.message = 'Message is too short (min 10 characters).';
  return errors;
}

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
          {isSuccess ? 'Message sent!' : 'Failed to send'}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {isSuccess
            ? "I'll get back to you within 24–48 hours."
            : 'Something went wrong. Please try again.'}
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

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 text-xs mt-1.5 font-mono"
          style={{ color: '#ef4444' }}
        >
          <AlertCircle size={11} />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [toast, setToast] = useState<'success' | 'error' | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof EMPTY_FORM, boolean>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    // Clear error for this field once user starts fixing it
    if (touched[name as keyof typeof EMPTY_FORM]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FieldErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FieldErrors] }));
  };

  const showToast = (type: 'success' | 'error') => {
    setToast(type);
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'loading') return;

    // Mark all fields as touched and validate
    setTouched({ name: true, email: true, subject: true, message: true });
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return; // stop — show inline errors

    setState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState('success');
        setForm(EMPTY_FORM);
        setErrors({});
        setTouched({});
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

  const getBorderColor = (field: keyof typeof EMPTY_FORM) => {
    if (errors[field]) return '#ef4444';
    if (touched[field] && form[field]) return 'var(--accent)';
    return 'var(--border)';
  };

  const fields = [
    { name: 'name' as const, label: 'Your Name', type: 'text' },
    { name: 'email' as const, label: 'Email Address', type: 'email' },
    { name: 'subject' as const, label: 'Subject', type: 'text' },
  ];

  return (
    <>
      <AnimatePresence>
        {toast && <Toast key={toast} state={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <CheckCircle size={56} className="accent-text" />
            </motion.div>
            <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Message sent!
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Thanks for reaching out. I&apos;ll get back to you within 24–48 hours.
            </p>
            <button
              onClick={() => setState('idle')}
              className="font-mono text-sm underline mt-2"
              style={{ color: 'var(--accent)' }}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {fields.map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=" "
                      disabled={state === 'loading'}
                      className="peer w-full px-4 pt-6 pb-2 rounded-xl text-sm font-medium outline-none transition-all duration-200 disabled:opacity-60"
                      style={{
                        background: 'var(--surface)',
                        border: `1px solid ${getBorderColor(field.name)}`,
                        color: 'var(--text-primary)',
                      }}
                    />
                    <label
                      htmlFor={field.name}
                      className="absolute left-4 top-4 text-xs font-mono transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs"
                      style={{ color: errors[field.name] ? '#ef4444' : 'var(--text-tertiary)', fontSize: '0.7rem' }}
                    >
                      {field.label}
                    </label>
                  </div>
                  <FieldError message={errors[field.name]} />
                </motion.div>
              ))}

              {/* Message textarea */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
              >
                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                    disabled={state === 'loading'}
                    className="peer w-full px-4 pt-6 pb-2 rounded-xl text-sm font-medium outline-none transition-all duration-200 resize-none disabled:opacity-60"
                    style={{
                      background: 'var(--surface)',
                      border: `1px solid ${getBorderColor('message')}`,
                      color: 'var(--text-primary)',
                    }}
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-3 text-xs font-mono pointer-events-none"
                    style={{ color: errors.message ? '#ef4444' : 'var(--text-tertiary)', fontSize: '0.7rem' }}
                  >
                    Your Message
                  </label>
                </div>
                <FieldError message={errors.message} />
              </motion.div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={state === 'loading'}
                className="w-full"
                onClick={handleSubmit}
              >
                <Send size={16} />
                Send Message
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
