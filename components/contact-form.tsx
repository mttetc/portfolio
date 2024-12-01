'use client';

import { useToast } from '@/hooks/use-toast';
import { contactAction } from '@/lib/actions/contact';
import { motion } from 'framer-motion';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { FiSend } from 'react-icons/fi';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full p-4 rounded-xl font-medium relative overflow-hidden group disabled:opacity-70"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] transition-transform group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--primary))] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center justify-center gap-2">
        <span>{pending ? 'Sending...' : 'Send Message'}</span>
        <FiSend className={`${pending ? '' : 'group-hover:translate-x-1'} transition-transform`} />
      </div>
    </motion.button>
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
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Message Sent Successfully',
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
    } else if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={state.values?.name}
            className={`glass w-full placeholder:text-[hsl(var(--text-muted))] p-4 rounded-xl focus:outline-none focus:ring-2 transition-all ${
              state.fieldErrors?.name
                ? 'ring-2 ring-red-500 focus:ring-red-500'
                : 'focus:ring-[hsl(var(--primary))]'
            }`}
          />
          {state.fieldErrors?.name && (
            <span className="text-sm text-red-500 mt-1">{state.fieldErrors.name}</span>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={state.values?.email}
            className={`glass w-full placeholder:text-[hsl(var(--text-muted))] p-4 rounded-xl focus:outline-none focus:ring-2 transition-all ${
              state.fieldErrors?.email
                ? 'ring-2 ring-red-500 focus:ring-red-500'
                : 'focus:ring-[hsl(var(--primary))]'
            }`}
          />
          {state.fieldErrors?.email && (
            <span className="text-sm text-red-500 mt-1">{state.fieldErrors.email}</span>
          )}
        </div>
      </div>
      <div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          defaultValue={state.values?.subject}
          className={`glass w-full placeholder:text-[hsl(var(--text-muted))] p-4 rounded-xl focus:outline-none focus:ring-2 transition-all ${
            state.fieldErrors?.subject
              ? 'ring-2 ring-red-500 focus:ring-red-500'
              : 'focus:ring-[hsl(var(--primary))]'
          }`}
        />
        {state.fieldErrors?.subject && (
          <span className="text-sm text-red-500 mt-1">{state.fieldErrors.subject}</span>
        )}
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Message"
          rows={6}
          defaultValue={state.values?.message}
          className={`glass w-full p-4 placeholder:text-[hsl(var(--text-muted))] rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
            state.fieldErrors?.message
              ? 'ring-2 ring-red-500 focus:ring-red-500'
              : 'focus:ring-[hsl(var(--primary))]'
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
