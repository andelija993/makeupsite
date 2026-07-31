"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { z } from "zod";
import { submitContact } from "@/app/actions";
import { contactSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";

type ContactValues = z.infer<typeof contactSchema>;

type ContactFormLabels = {
  name: string;
  email: string;
  phone: string;
  message: string;
  sending: string;
  send: string;
};

export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: "" },
  });

  const onSubmit = (values: ContactValues) => {
    startTransition(async () => {
      const result = await submitContact(values);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-line bg-card p-6">
      <input type="hidden" {...register("website")} />
      <div>
        <label className="text-sm font-semibold">{labels.name}</label>
        <input {...register("name")} className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2" />
      </div>
      <div>
        <label className="text-sm font-semibold">{labels.email}</label>
        <input {...register("email")} className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2" />
      </div>
      <div>
        <label className="text-sm font-semibold">{labels.phone}</label>
        <input {...register("phone")} className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2" />
      </div>
      <div>
        <label className="text-sm font-semibold">{labels.message}</label>
        <textarea {...register("message")} rows={5} className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2" />
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? labels.sending : labels.send}
      </Button>
    </form>
  );
}
