"use client";

import { useTransition } from "react";
import type { Locale, Theme } from "@/lib/preferences";
import type { getDictionary } from "@/lib/i18n";

type Dictionary = ReturnType<typeof getDictionary>;

type PreferenceSwitchesProps = {
  locale: Locale;
  theme: Theme;
  labels: Dictionary["switches"];
};

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
}

export function PreferenceSwitches({ locale, theme, labels }: PreferenceSwitchesProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="hidden items-center gap-2 md:flex">
      <label className="text-xs text-foreground/70">{labels.theme}</label>
      <select
        aria-label={labels.theme}
        defaultValue={theme}
        disabled={isPending}
        onChange={(event) => {
          const nextTheme = event.target.value as Theme;
          document.documentElement.classList.toggle("dark", nextTheme === "dark");
          setCookie("theme", nextTheme);
          startTransition(() => {
            window.location.reload();
          });
        }}
        className="rounded-lg border border-line bg-card px-2 py-1 text-xs"
      >
        <option value="light">{labels.light}</option>
        <option value="dark">{labels.dark}</option>
      </select>
      <label className="ml-2 text-xs text-foreground/70">{labels.language}</label>
      <select
        aria-label={labels.language}
        defaultValue={locale}
        disabled={isPending}
        onChange={(event) => {
          setCookie("locale", event.target.value);
          setCookie("locale_set", "1");
          startTransition(() => {
            window.location.reload();
          });
        }}
        className="rounded-lg border border-line bg-card px-2 py-1 text-xs"
      >
        <option value="en">{labels.english}</option>
        <option value="sr">{labels.serbian}</option>
      </select>
    </div>
  );
}
