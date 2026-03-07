'use client';

import { toast } from 'sonner';
import { contactAction } from '@/lib/actions/contact';
import { motion } from 'motion/react';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { FiSend } from 'react-icons/fi';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
    >
      <span>{pending ? 'Sending...' : 'Send Message'}</span>
      <FiSend />
    </button>
  );
}

const initialState = {
  error: undefined,
  success: false,
  fieldErrors: {} as Record<string, string>,
  values: {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
};

export function ContactForm() {
  const [state, formAction] = useActionState(contactAction, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success('Message Sent Successfully', {
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border p-6 md:p-8 space-y-5"
    >
      <div>
        <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder="John Doe"
          defaultValue={state.values?.name}
          className={`bg-muted border w-full placeholder:text-muted-foreground p-4 rounded-xl focus:outline-hidden focus:ring-2 transition-all text-base ${
            state.fieldErrors?.name
              ? 'ring-2 ring-red-500 focus:ring-red-500'
              : 'focus:ring-primary'
          }`}
        />
        {state.fieldErrors?.name && (
          <span className="text-sm text-red-500 mt-1">{state.fieldErrors.name}</span>
        )}
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder="john@example.com"
          defaultValue={state.values?.email}
          className={`bg-muted border w-full placeholder:text-muted-foreground p-4 rounded-xl focus:outline-hidden focus:ring-2 transition-all text-base ${
            state.fieldErrors?.email
              ? 'ring-2 ring-red-500 focus:ring-red-500'
              : 'focus:ring-primary'
          }`}
        />
        {state.fieldErrors?.email && (
          <span className="text-sm text-red-500 mt-1">{state.fieldErrors.email}</span>
        )}
      </div>
      <input type="hidden" name="subject" value="Contact form" />
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Your message..."
          rows={5}
          defaultValue={state.values?.message}
          className={`bg-muted border w-full p-4 placeholder:text-muted-foreground rounded-xl focus:outline-hidden focus:ring-2 transition-all resize-none text-base ${
            state.fieldErrors?.message
              ? 'ring-2 ring-red-500 focus:ring-red-500'
              : 'focus:ring-primary'
          }`}
        />
        {state.fieldErrors?.message && (
          <span className="text-sm text-red-500 mt-1">{state.fieldErrors.message}</span>
        )}
      </div>
      <SubmitButton />
    </motion.form>
  );
}
