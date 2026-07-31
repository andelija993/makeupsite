"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Calendar } from "@/components/shared/calendar";
import { bookingSchema } from "@/lib/validations";
import { submitBooking } from "@/app/actions";
import { Button } from "@/components/ui/button";
import type { z } from "zod";

type Service = { id: string; name: string };
type Slot = { id: string; startTime: string; endTime: string; available: boolean };

type BookingValues = z.infer<typeof bookingSchema>;

type BookingFormLabels = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  selectService: string;
  notes: string;
  preferredDate: string;
  slots: string;
  noSlots: string;
  submitting: string;
  submit: string;
};

export function BookingForm({ services, labels }: { services: Service[]; labels: BookingFormLabels }) {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { website: "" },
  });

  const selectedTime = watch("time");

  useEffect(() => {
    if (!selectedDate) return;
    const load = async () => {
      const response = await fetch(`/api/availability?date=${selectedDate}`);
      const payload = (await response.json()) as { slots: Slot[] };
      setSlots(payload.slots ?? []);
    };
    void load();
  }, [selectedDate]);

  const onSubmit = (values: BookingValues) => {
    const payload = { ...values, date: selectedDate };
    startTransition(async () => {
      const result = await submitBooking(payload);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      reset();
      setSelectedDate("");
      setSlots([]);
    });
  };

  const serviceOptions = useMemo(() => services, [services]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-3xl border border-line bg-card p-6">
        <div className="grid gap-4">
          <input type="hidden" {...register("website")} />
          <div>
            <label className="text-sm font-semibold">{labels.fullName}</label>
            <input {...register("fullName")} className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2" />
            {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p> : null}
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
            <label className="text-sm font-semibold">{labels.service}</label>
            <select {...register("serviceId")} className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2">
              <option value="">{labels.selectService}</option>
              {serviceOptions.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold">{labels.notes}</label>
            <textarea {...register("notes")} rows={4} className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Calendar
          date={selectedDate}
          onDateChange={(value) => {
            setSelectedDate(value);
            setValue("date", value);
          }}
          slots={slots}
          selectedTime={selectedTime || ""}
          onSelectTime={(time) => setValue("time", time)}
          labels={{
            preferredDate: labels.preferredDate,
            slots: labels.slots,
            noSlots: labels.noSlots,
          }}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? labels.submitting : labels.submit}
        </Button>
      </div>
    </form>
  );
}
