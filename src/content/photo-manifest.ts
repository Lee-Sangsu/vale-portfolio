/**
 * Curated photo manifest — hand-picked photos per slot, per project.
 *
 * The auto-resolver (lib/photos) walks folders and dumps whatever's there.
 * That works as a fallback but it's not editorial. This file pins specific
 * images to specific spaces so the page reads on purpose.
 *
 * Slot semantics:
 *   - cover:       the single hero shot at the top of the project page
 *   - polaroid:    3-6 photos for the scattered pile section
 *   - mosaic:      3-6 photos for the masonry mid-body grid
 *   - mainCarousel: 5-12 photos for the bottom "Gallery" carousel
 *   - decks:       named sub-carousels for things like "Post — Last call"
 *
 * Paths are RELATIVE to /public (no leading slash, will get URL-encoded
 * by the resolver). Use the real folder/file names including spaces.
 */

export type DeckEntry = {
  label: string;
  /** Either an explicit photo list, OR a folder whose contents become the deck. */
  photos?: string[];
  folder?: string;
};

export type ProjectManifest = {
  cover?: string;
  /** Optional second photo shown as a Mac-window pop next to the title block. */
  spotlight?: string;
  polaroid?: string[];
  mosaic?: string[];
  mainCarousel?: string[];
  decks?: DeckEntry[];
};

const PUBLIC_PHOTOS = "photos";

// ── HEROES ────────────────────────────────────────────────────────────
export const HERO_MANIFEST: Record<string, ProjectManifest> = {
  "global-youth-summit": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/_MG_3552.png`,
    spotlight: `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/Frame 1.png`,
    polaroid: [
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_0028.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_0035.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_0073.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_0150.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_0193.png`,
    ],
    mosaic: [
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/_MG_3741.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/_MG_3745.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/_MG_3547.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_0215.png`,
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_0024.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_0045.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_0169.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/IMG_9007.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/Group 2865.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/0f801f12-278d-4c87-bc6b-282f645c1a95.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/7be3151c-9df2-4025-8875-c0ed5bb94fa0.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/1726430907873.jpeg`,
    ],
  },

  "misiones-internacionales": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9755.png`,
    polaroid: [
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_3685.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9790.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9799.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9822.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9831.png`,
    ],
    mosaic: [
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9877.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9920.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/FF21DB4A-DAA4-4467-B7C0-08B1163447C3.png`,
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9755.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_3685.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9790.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9799.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9822.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9831.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9877.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9920.png`,
    ],
  },

  "sejong-hackathon": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3845.png`,
    polaroid: [
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3841.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3856.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3865.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3884.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3893.png`,
    ],
    mosaic: [
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3842.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3843.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3844.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3847.png`,
    ],
    decks: [
      { label: "Post — Capítulo 1", folder: `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/Post 1` },
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3860.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3871.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3873.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3877.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3881.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3883.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3898.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3899.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3908.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3913.png`,
    ],
  },

  "jal-nomadher": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/jal-nomadher/Banner.png`,
    spotlight: `${PUBLIC_PHOTOS}/Favorite projects/jal-nomadher/Travel Buddy App Banner.png`,
    mosaic: [
      `${PUBLIC_PHOTOS}/Favorite projects/jal-nomadher/Giveaway App Banner.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/jal-nomadher/Travel Buddy App Banner.png`,
    ],
    decks: [
      { label: "Last call",      folder: `${PUBLIC_PHOTOS}/Favorite projects/jal-nomadher/Post - Last call` },
      { label: "Announcement",   folder: `${PUBLIC_PHOTOS}/Favorite projects/jal-nomadher/Post - Announcement` },
      { label: "Giveaway",       folder: `${PUBLIC_PHOTOS}/Favorite projects/jal-nomadher/Post - giveaway` },
      // Brand campaigns lived next door — surfaced here so they're visible.
      { label: "Kiwitaxi",       folder: `${PUBLIC_PHOTOS}/NomadHer/Campañas/Kiwitaxi/Joycee  KiwiTaxi blog post images proposal` },
      { label: "NordVPN",        folder: `${PUBLIC_PHOTOS}/NomadHer/Campañas/NordVPN/NorVPN - Lounge Post` },
      { label: "Superalink",     folder: `${PUBLIC_PHOTOS}/NomadHer/Campañas/Superalink/Lounge` },
      { label: "Jeju Workation", folder: `${PUBLIC_PHOTOS}/NomadHer/Campañas/Jeju Workation/Jeju Carrusel App ` },
    ],
  },

  "nomadher-app": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/03 iPhone Mockups.png`,
    spotlight: `${PUBLIC_PHOTOS}/NomadHer/Piezas Graficas/Frame 1.png`,
    mosaic: [
      `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/Lounge/Lounge screen.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/Lounge/Lounge banners.png`,
      `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/Travel buddie/Travel Buddie.png`,
    ],
    decks: [
      { label: "Lounge",           folder: `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/Lounge` },
      { label: "Travel Buddie",    folder: `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/Travel buddie` },
      { label: "GuideBooks",       folder: `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/New proposals/GuideBooks` },
      { label: "Meetup flow",      folder: `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/New proposals/Meetup creation flow` },
      { label: "Travel Status",    folder: `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/New proposals/Travel Status creation flow` },
      { label: "Perks",            folder: `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/New proposals/Perks` },
      { label: "App Store",        folder: `${PUBLIC_PHOTOS}/NomadHer/Piezas Graficas/Appstore` },
      { label: "She Can Travel — Marketing", folder: `${PUBLIC_PHOTOS}/NomadHer/She Can travel Anywhere/Marketing` },
      { label: "Merch",            folder: `${PUBLIC_PHOTOS}/NomadHer/She Can travel Anywhere/Merch` },
      { label: "Mapas",            folder: `${PUBLIC_PHOTOS}/NomadHer/She Can travel Anywhere/Mapas` },
      { label: "Banner",           folder: `${PUBLIC_PHOTOS}/NomadHer/She Can travel Anywhere/Banner` },
      { label: "Poster",           folder: `${PUBLIC_PHOTOS}/NomadHer/She Can travel Anywhere/Poster` },
      { label: "Where to Stay",    folder: `${PUBLIC_PHOTOS}/NomadHer/Best Marketing /Where to stay Pt1` },
      { label: "Solo Travel '26",  folder: `${PUBLIC_PHOTOS}/NomadHer/Best Marketing /How to solo travel in 2026` },
      { label: "Solo Travel Berlin", folder: `${PUBLIC_PHOTOS}/NomadHer/Best Marketing /How to solo travel in Berlin` },
      { label: "Digital Nomad",    folder: `${PUBLIC_PHOTOS}/NomadHer/Best Marketing /How to work as a digital Nomad` },
      { label: "She Is…",          folder: `${PUBLIC_PHOTOS}/NomadHer/Best Marketing /she is...` },
    ],
  },
};

// ── MENTIONS ──────────────────────────────────────────────────────────
export const MENTION_MANIFEST: Record<string, ProjectManifest> = {
  // BOOST LAB
  "trankition-13": {
    cover: `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/02.jpg`,
    mosaic: [
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/03.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/06.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/08.jpg`,
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/01.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/02.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/03.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/04.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/05.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/06.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/07.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/trankition-13/08.jpg`,
    ],
  },
  "wellness-workshop-seoul": {
    cover: `${PUBLIC_PHOTOS}/BOOST LAB/wellness-workshop-seoul/1.png`,
    mosaic: [
      `${PUBLIC_PHOTOS}/BOOST LAB/wellness-workshop-seoul/2.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/wellness-workshop-seoul/3.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/wellness-workshop-seoul/4.png`,
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/BOOST LAB/wellness-workshop-seoul/1.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/wellness-workshop-seoul/2.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/wellness-workshop-seoul/3.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/wellness-workshop-seoul/4.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/wellness-workshop-seoul/5.png`,
    ],
  },
  "entrepreneur-summit-seoul": {
    cover: `${PUBLIC_PHOTOS}/BOOST LAB/entrepreneur-summit-seoul/Seoul Entrepreneur Summit Image 2024-03-23 at 00.12.13 (1).png`,
    polaroid: [
      `${PUBLIC_PHOTOS}/BOOST LAB/entrepreneur-summit-seoul/IMG_3001_VSCO.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/entrepreneur-summit-seoul/Seoul Entrepreneur Summit Image 2024-03-23 at 09.54.06 (1) (1).png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/entrepreneur-summit-seoul/Seoul Entrepreneur Summit Image 2024-03-23 at 00.12.13 (1).png`,
    ],
  },
  "women-entrepreneur-summit-seoul": {
    cover: `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/Group 2864.png`,
    polaroid: [
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/SWES - @haritza.8x-008.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/SWES - @haritza.8x-016.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/SWES - @haritza.8x-028.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/SWES - @haritza.8x-075.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/SWES - @haritza.8x-112.png`,
    ],
    mosaic: [
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/SWES - @haritza.8x-030.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/SWES - @haritza.8x-034.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/SWES - @haritza.8x-147.png`,
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/Group 2864.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/1A215FAC-A6FD-4E0D-B2BF-CCE0758127D5.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/1B8C321D-5F18-4F1C-A369-A8D5DEF2074F.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/2E7B93E8-E729-4F9C-B64C-D86CD67C1E31.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/3385E3EB-B8D3-4CED-ADD8-61290FFB69FD.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/32F6B46F-8539-4AC5-921D-318E67767094.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/13DE60AA-E0D7-4E2E-8EEC-E734E147F65F.png`,
    ],
  },
  "youth-future-talent": {
    cover: `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/53317903610_24c01c87ec_o copy.jpg`,
    polaroid: [
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/IMG_0613.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/IMG_0980.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/IMG_2991.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/IMG_3562.png`,
    ],
    mosaic: [
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/53317669903_4e9f3191e2_o.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/53316564317_786d9279ed_o.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/c8d1b659-156d-4879-b0a3-5c51464803bc.png`,
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/53317669908_42b5b4a299_o copy.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/53317903610_24c01c87ec_o copy.jpg`,
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/eb9a573d-4ad6-497f-a9eb-14013ac0edb0.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/429de2cf-f563-455c-9ca8-927f2c1d600f.png`,
      `${PUBLIC_PHOTOS}/BOOST LAB/youth-future-talent/0D5BE08D-7845-4190-ABB0-74EC9FD28E89.png`,
    ],
  },

  // N9NE
  "nobled-coffee": {
    cover: `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3839.png`,
    mosaic: [
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_1646.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3492.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3829.png`,
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3839.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3829.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3798.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3494.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3492.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_1646.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_0613.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/Rectangle.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/Rectangle 554 copy.png`,
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/Group 2856.png`,
    ],
  },
  "eats-real": {
    cover: `${PUBLIC_PHOTOS}/N9NE/eats-real/laptop.png`,
    spotlight: `${PUBLIC_PHOTOS}/N9NE/eats-real/laptop.png`,
    mosaic: [
      `${PUBLIC_PHOTOS}/N9NE/eats-real/IMG_3682.png`,
      `${PUBLIC_PHOTOS}/N9NE/eats-real/IMG_3295_VSCO.jpg`,
      `${PUBLIC_PHOTOS}/N9NE/eats-real/Group 2635.png`,
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/N9NE/eats-real/laptop.png`,
      `${PUBLIC_PHOTOS}/N9NE/eats-real/Group 2859.png`,
      `${PUBLIC_PHOTOS}/N9NE/eats-real/Group 2859 copy.png`,
      `${PUBLIC_PHOTOS}/N9NE/eats-real/Group 2635.png`,
      `${PUBLIC_PHOTOS}/N9NE/eats-real/IMG_3682.png`,
      `${PUBLIC_PHOTOS}/N9NE/eats-real/IMG_3295_VSCO.jpg`,
    ],
  },
  "hola-guesthouse-jeju": {
    cover: `${PUBLIC_PHOTOS}/N9NE/hola-guesthouse-jeju/Group 2863.png`,
    mainCarousel: [
      `${PUBLIC_PHOTOS}/N9NE/hola-guesthouse-jeju/Group 2863.png`,
    ],
  },

  // Independent
  "brujula-etica": {
    cover: `${PUBLIC_PHOTOS}/Independent/brujula-etica/Poster 1.png`,
    mosaic: [
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Poster 2.png`,
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Grilla 1.png`,
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Instagram story - 1b 1.png`,
    ],
    mainCarousel: [
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Podcast 2 1.png`,
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Podcast 3 - 4a.png`,
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Podcast 3 - 4b.png`,
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Podcast 4 - 1a.png`,
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Podcast 4 - 1b.png`,
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Podcast 4 - 1c.png`,
      `${PUBLIC_PHOTOS}/Independent/brujula-etica/Story Podact 2.png`,
    ],
  },
  "opuesto-sas": {
    cover: `${PUBLIC_PHOTOS}/Independent/opuesto-sas/Group 2412.png`,
    mosaic: [
      `${PUBLIC_PHOTOS}/Independent/opuesto-sas/Group 2871.png`,
      `${PUBLIC_PHOTOS}/Independent/opuesto-sas/Group 2872.png`,
      `${PUBLIC_PHOTOS}/Independent/opuesto-sas/Free_Business_Card_Mockup_1 2.png`,
    ],
  },
  "santa-juliana": {
    cover: `${PUBLIC_PHOTOS}/Independent/santa-juliana/Bruchure/1.png`,
    decks: [
      { label: "Brand Book", folder: `${PUBLIC_PHOTOS}/Independent/santa-juliana/Santa Juliana - Brand Book` },
      { label: "Brochure",   folder: `${PUBLIC_PHOTOS}/Independent/santa-juliana/Bruchure` },
    ],
  },
  "serema-hotel": {
    decks: [
      { label: "Guía",            folder: `${PUBLIC_PHOTOS}/Independent/serema-hotel/Plantilla Guia` },
      { label: "Habitaciones",    folder: `${PUBLIC_PHOTOS}/Independent/serema-hotel/Plantilla Habitaciones - Promos` },
    ],
  },
  "teampreneurship-cooperative": {
    cover: `${PUBLIC_PHOTOS}/Independent/teampreneurship-cooperative/팀프러너십  교육협동조합.png`,
  },

  // Travelling University
  "mentes-sin-fronteras": {
    cover: `${PUBLIC_PHOTOS}/Travelling University/mentes-sin-fronteras/2. Overview + Vision.png`,
    mosaic: [
      `${PUBLIC_PHOTOS}/Travelling University/mentes-sin-fronteras/5. Benefits.png`,
      `${PUBLIC_PHOTOS}/Travelling University/mentes-sin-fronteras/6. Agenda morning.png`,
      `${PUBLIC_PHOTOS}/Travelling University/mentes-sin-fronteras/1) Instagram post (Chat - ALEJANDRA BARRERA).png`,
    ],
    decks: [
      { label: "Post 1",       folder: `${PUBLIC_PHOTOS}/Travelling University/mentes-sin-fronteras/Post 1` },
      { label: "Post 2",       folder: `${PUBLIC_PHOTOS}/Travelling University/mentes-sin-fronteras/Post 2 ` },
      { label: "Post 3",       folder: `${PUBLIC_PHOTOS}/Travelling University/mentes-sin-fronteras/post 3` },
      { label: "Fondos Zoom",  folder: `${PUBLIC_PHOTOS}/Travelling University/mentes-sin-fronteras/Fondos Zoom` },
    ],
  },
  "talent-scouting": {
    cover: `${PUBLIC_PHOTOS}/Speaker externado/IMG_3753.jpeg`,
    polaroid: [
      `${PUBLIC_PHOTOS}/Speaker externado/1742259380803.jpeg`,
      `${PUBLIC_PHOTOS}/Speaker externado/1742259383069.jpeg`,
      `${PUBLIC_PHOTOS}/Speaker externado/1742259383835.jpeg`,
      `${PUBLIC_PHOTOS}/Speaker externado/1742259384949.jpeg`,
      `${PUBLIC_PHOTOS}/Speaker externado/A11AB772-4BD6-49CE-B66D-28E56B583563.jpg`,
      `${PUBLIC_PHOTOS}/Foto con embajador de corea en colombia.jpg`,
    ],
  },
};

/** url-encodes a path the way Next.js <Image> expects (preserves slashes). */
export function encodeAsset(p: string | undefined): string | undefined {
  if (!p) return undefined;
  return "/" + p.split("/").map(encodeURIComponent).join("/");
}

/** Maps a deck spec into the resolved {label, photos[]} shape. */
export function resolveDecks(
  decks: DeckEntry[] | undefined,
  walk: (folder: string) => string[],
): { label: string; photos: string[] }[] {
  if (!decks) return [];
  return decks
    .map((d) => {
      if (d.photos && d.photos.length) {
        return { label: d.label, photos: d.photos.map((p) => encodeAsset(p)!) };
      }
      if (d.folder) {
        return { label: d.label, photos: walk(d.folder) };
      }
      return { label: d.label, photos: [] };
    })
    .filter((g) => g.photos.length > 0);
}
