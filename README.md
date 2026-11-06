# Mua Julija Nesić – sajt

Moderan, jednostranični sajt (Next.js + Tailwind) za šminkerku iz Vlasotinca i Beograda. Bez baze i bez troškova održavanja.

## Pokretanje
```bash
npm install
npm run dev      # http://localhost:3000
```

## Najčešće izmene
- **Telefon, Instagram, gradovi:** `src/lib/site.ts`
- **Galerija:** ubacite slike u `public/media/foto/`, video u `public/media/video/` – sajt ih sam prikazuje (najnovije prvo po imenu fajla).
- **Boje (tamna/svetla tema):** `src/app/globals.css`

## Rezervacije
Klijentkinja popuni formu (grad, datum, vreme, ime, telefon, napomena) i klikne „Pošalji upit“. Upit stiže na email **nesicjulija030@gmail.com** preko besplatnog servisa [Web3Forms](https://web3forms.com). Ključ se upisuje u `src/lib/site.ts` (`bookingFormKey`). Ako slanje ne uspe, nudi se slanje preko WhatsApp-a.

## AI pomoćnik
`AGENTS.md` sadrži pravila projekta za AI alate, a agent `sadrzaj` (`.github/agents/sadrzaj.agent.md`) služi za dodavanje fotografija/videa i izmene teksta.
