// Sva osnovna podešavanja sajta na jednom mestu – slobodno menjajte tekst i podatke.
export const site = {
  name: "Mua Julija Nesić",
  title: "Mua Julija Nesić – Profesionalna šminka | Vlasotince i Beograd",
  description:
    "Profesionalna šminka za venčanja, proslave, fotografisanja i posebne prilike. Zakažite termin u Vlasotincu ili Beogradu.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://muajulijanesic.rs",
  phone: "+381621737511",
  phoneDisplay: "+381 62 173 7511",
  instagram: "mua.julijanesic",
  cities: ["Vlasotince", "Beograd"],
  // Besplatan ključ sa https://web3forms.com – upiti iz forme stižu na nesicjulija030@gmail.com (ključ nije tajna).
  bookingFormKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "b99bb9a8-1d54-4297-a950-3393027a5883",
};

export const links = {
  instagram: `https://instagram.com/${site.instagram}`,
  instagramDm: `https://ig.me/m/${site.instagram}`,
  whatsapp: (text?: string) =>
    `https://wa.me/${site.phone.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`,
  viber: `viber://chat?number=${encodeURIComponent(site.phone)}`,
  tel: `tel:${site.phone}`,
};
