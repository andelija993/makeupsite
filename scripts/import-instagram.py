"""Pretvara Instagram export u albume za galeriju.

Upotreba: python3 scripts/import-instagram.py <raspakovan-export> public/media

Svaka objava/reel postaje folder public/media/<YYYY-MM-DD>-<id>/ sa fajlovima 01.jpg, 02.mp4 (+ 02.poster.jpg) ... i opis.txt (tekst objave)
Fotografije se smanjuju na najviše 1440px, za video se pravi sličica (poster).
"""
import hashlib, json, os, re, shutil, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

SRC, OUT = sys.argv[1], sys.argv[2]
A = os.path.join(SRC, "your_instagram_activity/media/")
MAX = 1440


def load(name):
    path = A + name
    return json.load(open(path)) if os.path.exists(path) else None


albums = []  # (timestamp, [uri, ...], opis)
seen = set()


def clean(text):
    """Instagram JSON čuva UTF-8 kao latin1; uklanja #tagove i @pominjanja."""
    if not text:
        return ""
    try:
        text = text.encode("latin1").decode("utf8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        pass
    text = re.sub(r"[#@][^\s#@]+", "", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\s*\n\s*", "\n", text).strip(" \n•-–|")
    return text[:280] if re.search(r"\w", text) else ""


def add(uris, ts, caption=""):
    new = [u for u in uris if u not in seen and os.path.exists(os.path.join(SRC, u))]
    if new:
        albums.append((ts, new, clean(caption)))
        seen.update(new)


for p in load("posts_1.json") or []:
    add(
        [m["uri"] for m in p["media"]],
        p.get("creation_timestamp") or p["media"][0]["creation_timestamp"],
        p.get("title") or p["media"][0].get("title"),
    )
for p in load("posts.json") or []:
    ms = [m for lv in p.get("label_values", []) if "media" in lv for m in lv["media"]]
    caption = next((lv.get("value") for lv in p.get("label_values", []) if lv.get("label") == "Caption"), "")
    if ms:
        add([m["uri"] for m in ms if m["uri"].startswith("media/posts/")], p.get("timestamp") or ms[0]["creation_timestamp"], caption)
for key, f in [("ig_reels_media", "reels.json"), ("ig_igtv_media", "igtv_videos.json")]:
    for p in (load(f) or {}).get(key, []):
        add([m["uri"] for m in p["media"]], p["media"][0]["creation_timestamp"], p["media"][0].get("title"))

# Isti video ponekad postoji i kao objava i kao reel – zadrži samo prvi.
hashes, deduped = set(), []
for ts, uris, caption in albums:
    keep = []
    for u in uris:
        h = hashlib.md5(open(os.path.join(SRC, u), "rb").read()).hexdigest()
        if h not in hashes:
            hashes.add(h)
            keep.append(u)
    if keep:
        deduped.append((ts, keep, caption))
albums = deduped

jobs, videos = [], []
for ts, uris, caption in albums:
    base = f"{datetime.fromtimestamp(ts):%Y-%m-%d}-{os.path.splitext(os.path.basename(uris[0]))[0]}"
    folder = os.path.join(OUT, base)
    os.makedirs(folder, exist_ok=True)
    if caption:
        open(os.path.join(folder, "opis.txt"), "w").write(caption + "\n")
    for i, u in enumerate(uris, 1):
        src = os.path.join(SRC, u)
        is_video = u.lower().endswith((".mp4", ".mov"))
        dst = os.path.join(folder, f"{i:02d}.mp4" if is_video else f"{i:02d}.jpg")
        jobs.append((src, dst, is_video))
        if is_video:
            videos.append((src, os.path.join(folder, f"{i:02d}.poster.jpg")))


def longest_side(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path], capture_output=True, text=True).stdout
    return max(int(l.split()[-1]) for l in out.splitlines() if "pixel" in l)


def process(job):
    src, dst, is_video = job
    if os.path.exists(dst):
        return
    if is_video:
        shutil.copy2(src, dst)
        return
    args = ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "80"]
    if longest_side(src) > MAX:
        args += ["-Z", str(MAX)]
    subprocess.run(args + [src, "--out", dst], capture_output=True, check=True)


with ThreadPoolExecutor(8) as ex:
    list(ex.map(process, jobs))

tmp = tempfile.mkdtemp()
todo = [(s, p) for s, p in videos if not os.path.exists(p)]
for i in range(0, len(todo), 25):
    chunk = todo[i : i + 25]
    subprocess.run(["qlmanage", "-t", "-s", "900", "-o", tmp] + [s for s, _ in chunk], capture_output=True)
    for src, poster in chunk:
        png = os.path.join(tmp, os.path.basename(src) + ".png")
        if os.path.exists(png):
            subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "75", png, "--out", poster], capture_output=True)
        else:
            print("bez sličice:", src)
shutil.rmtree(tmp, ignore_errors=True)

print(f"albumi: {len(albums)}, fajlova: {len(jobs)}, video: {len(videos)}")
