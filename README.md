# Mua Julija Nesić – sajt

Moderan, jednostranični sajt (Next.js + Tailwind) za šminkerku iz Vlasotinca i Beograda. Bez baze i bez troškova održavanja.

## Pokretanje
```bash
npm install
npm run dev      # http://localhost:3000
```

## Najčešće izmene
- **Telefon, Instagram, gradovi:** `src/lib/site.ts`
- **Galerija:** svaka objava je jedan album – folder `public/media/<GGGG-MM-DD>-<id>/` sa fajlovima `01.jpg`, `02.mp4`… i opcionim `opis.txt`. Na početnoj strani su samo radovi navedeni u `public/media/izdvojeno.txt` (ime foldera po redu), a svi radovi su na strani `/portfolio`. Instagram izvoz se ubacuje komandom `python3 scripts/import-instagram.py <raspakovan-izvoz> public/media`.
- **Boje (tamna/svetla tema):** `src/app/globals.css`

## Rezervacije
Klijentkinja popuni formu (grad, datum, vreme, ime, telefon, napomena) i klikne „Pošalji upit“. Upit stiže na email **nesicjulija030@gmail.com** preko besplatnog servisa [Web3Forms](https://web3forms.com). Ključ se upisuje u `src/lib/site.ts` (`bookingFormKey`). Ako slanje ne uspe, nudi se slanje preko WhatsApp-a.

## AI pomoćnik
`AGENTS.md` sadrži pravila projekta za AI alate, a agent `sadrzaj` (`.github/agents/sadrzaj.agent.md`) služi za dodavanje fotografija/videa i izmene teksta.
