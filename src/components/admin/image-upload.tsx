"use client";

import { useState } from "react";

export function ImageUpload({ name = "imageUrl" }: { name?: string }) {
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={url} required />
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Or paste image URL"
        className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm"
      />
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const payload = (await response.json()) as { url?: string; error?: string };
            if (payload.url) setUrl(payload.url);
            setUploading(false);
          }}
          className="block w-full text-sm"
        />
        {uploading ? <span className="text-xs text-foreground/70">Uploading...</span> : null}
      </div>
      {url ? <p className="text-xs text-foreground/70">Uploaded: {url}</p> : null}
    </div>
  );
}
