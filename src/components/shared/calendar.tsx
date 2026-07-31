"use client";

type Slot = { id: string; startTime: string; endTime: string; available: boolean };

type CalendarProps = {
  date: string;
  onDateChange: (value: string) => void;
  slots: Slot[];
  selectedTime: string;
  onSelectTime: (time: string) => void;
  labels: {
    preferredDate: string;
    slots: string;
    noSlots: string;
  };
};

export function Calendar({ date, onDateChange, slots, selectedTime, onSelectTime, labels }: CalendarProps) {
  return (
    <div className="rounded-3xl border border-line bg-card p-6">
      <label htmlFor="date" className="text-sm font-semibold">
        {labels.preferredDate}
      </label>
      <input
        id="date"
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => onDateChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-2"
      />
      <p className="mt-5 text-sm font-semibold">{labels.slots}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {slots.length === 0 ? <p className="col-span-2 text-sm text-foreground/70">{labels.noSlots}</p> : null}
        {slots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            onClick={() => onSelectTime(slot.startTime)}
            className={`rounded-xl border px-3 py-2 text-sm ${
              selectedTime === slot.startTime
                ? "border-foreground bg-foreground text-background"
                : "border-line bg-white hover:bg-muted/60"
            }`}
          >
            {slot.startTime}
          </button>
        ))}
      </div>
    </div>
  );
}
