import { cookies } from "next/headers";

export type Locale = "en" | "sr";
export type Theme = "light" | "dark";

export async function getPreferences(): Promise<{ locale: Locale; theme: Theme }> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const localeSetCookie = cookieStore.get("locale_set")?.value;
  const themeCookie = cookieStore.get("theme")?.value;

  const locale: Locale = localeSetCookie === "1" && localeCookie === "sr" ? "sr" : "en";
  const theme: Theme = themeCookie === "dark" ? "dark" : "light";

  return { locale, theme };
}
