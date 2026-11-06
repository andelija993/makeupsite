import fs from "node:fs";
import path from "node:path";

export type MediaItem = { src: string; type: "image" | "video" };

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const MEDIA_ROOT = path.join(process.cwd(), "public", "media");

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".")) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/** Čita sve slike i video snimke iz public/media (uključujući podfoldere), najnoviji prvi. */
export function getMedia(): MediaItem[] {
  return walk(MEDIA_ROOT)
    .map((file) => ({ file, ext: path.extname(file).toLowerCase(), mtime: fs.statSync(file).mtimeMs }))
    .filter(({ ext }) => IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext))
    .sort((a, b) => b.file.localeCompare(a.file, undefined, { numeric: true }) || b.mtime - a.mtime)
    .map(({ file, ext }) => ({
      src: "/" + path.relative(path.join(process.cwd(), "public"), file).split(path.sep).map(encodeURIComponent).join("/"),
      type: VIDEO_EXT.has(ext) ? "video" : "image",
    }));
}
