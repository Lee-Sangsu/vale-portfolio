import { SONGS, songKey, type Song } from "@/content/songs";

type ItunesResult = {
  trackName?: string;
  artistName?: string;
  previewUrl?: string;
};

const norm = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");

async function findPreview(song: Song): Promise<string | null> {
  try {
    const url = new URL("https://itunes.apple.com/search");
    url.searchParams.set("term", `${song.title} ${song.artist}`);
    url.searchParams.set("media", "music");
    url.searchParams.set("entity", "song");
    url.searchParams.set("limit", "10");

    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { results?: ItunesResult[] };

    const byArtist = (data.results ?? []).filter(
      (r) =>
        r.previewUrl &&
        r.artistName &&
        norm(r.artistName).includes(norm(song.artist)),
    );
    // Prefer the studio track; fall back to any version by that artist
    // (e.g. a live recording when the studio one is not in the store).
    const exact = byArtist.find(
      (r) => r.trackName && norm(r.trackName) === norm(song.title),
    );
    return (exact ?? byArtist[0])?.previewUrl ?? null;
  } catch {
    return null;
  }
}

/** 30-second Apple previews for the iPod songs; `null` when none is found. */
export async function getSongPreviews(): Promise<Record<string, string | null>> {
  const entries = await Promise.all(
    SONGS.map(async (song) => [songKey(song), await findPreview(song)] as const),
  );
  return Object.fromEntries(entries);
}
