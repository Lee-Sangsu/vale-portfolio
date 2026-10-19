/** Vale's current favorites, shown (and played as 30s previews) on the About iPod. */
export type Song = { title: string; artist: string };

export const SONGS: Song[] = [
  { title: "Lost on You", artist: "LP" },
  { title: "Solifican12", artist: "Milo J" },
  { title: "Runaway Baby", artist: "Bruno Mars" },
  { title: "The Thrill Is Gone", artist: "RAYE" },
  { title: "Spiders", artist: "Lola Young" },
  { title: "Legendario", artist: "Nathy Peluso" },
  { title: "Feel", artist: "Robbie Williams" },
  { title: "Hips Don't Lie", artist: "Shakira" },
  { title: "Papaoutai", artist: "Stromae" },
  { title: "Todo Lo Bueno Tarda", artist: "Alcolirykoz" },
];

export const songKey = (song: Song) => `${song.artist} - ${song.title}`;
