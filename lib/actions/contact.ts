'use server';

import { ContactFormSchema } from '@/lib/schemas/contact-form';
import { headers } from 'next/headers';
import { RateLimit } from '@/lib/utils/rate-limit';

// 5 requests per minute per IP
const rateLimit = new RateLimit(5, 60 * 1000);

type ActionResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
};

export async function contactAction(prevState: unknown, formData: FormData): Promise<ActionResponse> {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1';

  const values = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  };

  // Check rate limit
  if (!rateLimit.check(ip)) {
    return {
      error: 'Too many requests. Please try again later.',
      values,
    };
  }

  const validatedFields = ContactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    const fieldErrors: Record<string, string> = {};
    validatedFields.error.issues.forEach(issue => {
      if (issue.path[0]) {
        fieldErrors[issue.path[0].toString()] = issue.message;
      }
    });
    return { values, fieldErrors };
  }

  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error('Discord webhook not configured');
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [
          {
            title: `💌 New Contact Form Message`,
            description: `**Subject:** ${values.subject}`,
            color: 0x6366f1,
            fields: [
              { name: '👤 From', value: values.name, inline: true },
              { name: '📧 Email', value: values.email, inline: true },
              { name: '💬 Message', value: values.message },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'Portfolio Contact Form',
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send to Discord');
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return { error: 'Failed to send message. Please try again later.', values };
  }
}
