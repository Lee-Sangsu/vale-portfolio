/** Vale's current favorites, shown (and played as 30s previews) on the About iPod. */
/** `startAt`: second of the 30s clip where playback begins (skips a slow intro). */
export type Song = { title: string; artist: string; startAt?: number };

export const SONGS: Song[] = [
  { title: "Lost on You", artist: "LP" },
  { title: "BOOMPALA", artist: "LE SSERAFIM" },
  { title: "Solifican12", artist: "Milo J" },
  { title: "Runaway Baby", artist: "Bruno Mars" },
  { title: "Run Rabbit", artist: "Mollie Elizabeth" },
  { title: "The Thrill Is Gone", artist: "RAYE", startAt: 10 },
  { title: "One Thing", artist: "Lola Young" },
  { title: "Legendario", artist: "Nathy Peluso" },
  { title: "Feel", artist: "Robbie Williams" },
  { title: "La Tortura", artist: "Shakira" },
  { title: "A me mi piace", artist: "Alfa & Manu Chao" },
  { title: "Ta fête", artist: "Stromae" },
  { title: "Todo Lo Bueno Tarda", artist: "Alcolirykoz" },
];

export const songKey = (song: Song) => `${song.artist} - ${song.title}`;
