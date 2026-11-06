import fs from "node:fs";
import path from "node:path";

export type Slide = { src: string; type: "image" | "video"; poster?: string };
export type Album = { id: string; slides: Slide[]; type: "image" | "video"; date?: string; caption?: string };

const MONTHS = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];

function dateLabel(id: string) {
  const m = /^(\d{4})-(\d{2})/.exec(id);
  return m ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}.` : undefined;
}

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const PUBLIC = path.join(process.cwd(), "public");
const MEDIA_ROOT = path.join(PUBLIC, "media");

const url = (file: string) => "/" + path.relative(PUBLIC, file).split(path.sep).map(encodeURIComponent).join("/");
const byName = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });

function slidesIn(dir: string, files: string[]): Slide[] {
  const posters = new Set(files.filter((f) => f.toLowerCase().includes(".poster.")));
  return files
    .filter((f) => !posters.has(f))
    .sort(byName)
    .flatMap((f): Slide[] => {
      const ext = path.extname(f).toLowerCase();
      const full = path.join(dir, f);
      if (IMAGE_EXT.has(ext)) return [{ src: url(full), type: "image" }];
      if (!VIDEO_EXT.has(ext)) return [];
      const stem = f.slice(0, -ext.length);
      const poster = [...posters].find((p) => p.startsWith(`${stem}.poster.`));
      return [{ src: url(full), type: "video", poster: poster ? url(path.join(dir, poster)) : undefined }];
    });
}

/**
 * Svaki podfolder u public/media je jedan album (objava sa jednom ili više slika/videa, opciono opis.txt).
 * Fajlovi direktno u public/media su pojedinačne objave. Najnovije prvo (po imenu: YYYY-MM-DD-...).
 */
export function getAlbums(): Album[] {
  if (!fs.existsSync(MEDIA_ROOT)) return [];
  const entries = fs.readdirSync(MEDIA_ROOT, { withFileTypes: true }).filter((e) => !e.name.startsWith("."));

  const albums: Album[] = entries
    .filter((e) => e.isDirectory())
    .flatMap((entry): Album[] => {
      const dir = path.join(MEDIA_ROOT, entry.name);
      const slides = slidesIn(dir, fs.readdirSync(dir).filter((f) => !f.startsWith(".")));
      if (!slides.length) return [];
      const captionFile = path.join(dir, "opis.txt");
      const caption = fs.existsSync(captionFile) ? fs.readFileSync(captionFile, "utf8").trim() : undefined;
      return [{ id: entry.name, slides, type: slides[0].type, date: dateLabel(entry.name), caption: caption || undefined }];
    });

  const looseFiles = entries.filter((e) => e.isFile()).map((e) => e.name);
  for (const slide of slidesIn(MEDIA_ROOT, looseFiles)) {
    albums.push({ id: decodeURIComponent(slide.src.split("/").pop()!), slides: [slide], type: slide.type });
  }

  return albums.sort((a, b) => byName(b.id, a.id));
}

/**
 * Izdvojeni radovi za početnu stranu – redosled iz public/media/izdvojeno.txt.
 * Ako fajl ne postoji (ili je prazan), uzimaju se najnovije fotografije.
 */
export function getFeatured(albums: Album[], limit = 12): Album[] {
  const file = path.join(MEDIA_ROOT, "izdvojeno.txt");
  const ids = fs.existsSync(file)
    ? fs
        .readFileSync(file, "utf8")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"))
    : [];
  const byId = new Map(albums.map((a) => [a.id, a]));
  const picked = ids.flatMap((id) => byId.get(id) ?? []);
  const fallback = albums.filter((a) => a.type === "image" && !picked.includes(a));
  return [...picked, ...fallback].slice(0, limit);
}
