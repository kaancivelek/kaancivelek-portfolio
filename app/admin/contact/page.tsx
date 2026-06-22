/**
 * Admin Contact Page
 */

import { prisma } from "@/lib/prisma";
import { updateContact } from "./actions";
import { ContactForm } from "./ContactForm";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const contact = await prisma.contact.findFirst();

  const initialData = contact
    ? {
      email: contact.email,
      availability: contact.availability,
      timezone: contact.timezone,
      preferredContact: contact.preferredContact,
      responseTime: contact.responseTime,
      callToAction: contact.callToAction,
      socialLinks: contact.socialLinks,
    }
    : undefined;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Contact
        </h1>
        <p className="text-sm text-white/40 mt-1">
          Edit your contact information
        </p>
      </div>

      <ContactForm initialData={initialData} action={updateContact} />
    </div>
  );
}
