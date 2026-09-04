/**
 * Sweden homepage toplist — card fields seeded from research casino-list.html.
 * Logos: `/casino-logos/*` from `public/` when we have the asset.
 * `visitUrl` uses our `/goto/` affiliate routes when the casino exists in CMS.
 */

export interface SwedenCasinoOfferStat {
  label: string;
  value: string;
  /** e.g. "35x" wagering requirement */
  wagering?: string;
}

export interface SwedenToplistCasino {
  id: string;
  /** CMS slug when this casino exists in `src/data/content/casinos/` */
  cmsSlug?: string;
  name: string;
  backgroundColor: string;
  /** Path under `public/`, e.g. `/casino-logos/mr-vegas-logo.png`. Empty if missing. */
  logoUrl: string;
  advantages: string[];
  bonus?: SwedenCasinoOfferStat | null;
  freeSpins?: SwedenCasinoOfferStat | null;
  /** Shown when bonus/freeSpins are absent */
  highlight?: string | null;
  visitUrl: string;
  reviewUrl?: string | null;
  withdrawalTime?: string | null;
  withdrawalMethodLabel?: string | null;
  termsUrl?: string | null;
  position: number;
}

export const SWEDEN_TOPLIST_CASINOS: SwedenToplistCasino[] = [
  {
    id: "mr-vegas-casino",
    cmsSlug: "mr-vegas",
    name: "Mr Vegas Casino",
    backgroundColor: "#000000",
    logoUrl: "/casino-logos/mr-vegas-logo.png",
    advantages: [
      "Free spins utan omsättning",
      "Wheel of Vegas",
      "#5 i CasinoTempen 2024",
    ],
    bonus: { label: "Bonus", value: "2 000 kr", wagering: "35x" },
    freeSpins: { label: "Free Spins", value: "11", wagering: "0x" },
    visitUrl: "/goto/mr-vegas.php",
    reviewUrl: null,
    withdrawalTime: "1 min",
    withdrawalMethodLabel: "genomsnittlig uttagstid Trustly",
    position: 1,
  },
  {
    id: "kungaslottet",
    cmsSlug: "kungaslottet",
    name: "Kungaslottet",
    backgroundColor: "#249cec",
    logoUrl: "/casino-logos/kunga-slottet-logo.png",
    advantages: [
      "Sveriges största bonus",
      "#1 på snabba uttag",
      "8 000+ spel",
    ],
    bonus: { label: "Bonus", value: "20 000 kr", wagering: "125x" },
    freeSpins: { label: "Free Spins", value: "150", wagering: "35x" },
    visitUrl: "/goto/kungaslottet.php",
    reviewUrl: null,
    withdrawalTime: "Direkt",
    withdrawalMethodLabel: "genomsnittlig uttagstid Trustly",
    position: 2,
  },
  {
    id: "jubla",
    cmsSlug: "jubla-casino",
    name: "Jubla",
    backgroundColor: "#ccecff",
    logoUrl: "/casino-logos/jubla_casino_logo.png",
    advantages: [
      "Nytt casino 2025",
      "Trustly, Swish & Zimpler",
      "5:e plats av 85 casinon",
    ],
    highlight: "Betalar snabbast i våra tester",
    visitUrl: "/goto/jubla-casino.php",
    reviewUrl: null,
    withdrawalTime: "Direkt",
    withdrawalMethodLabel: "genomsnittlig uttagstid Zimpler",
    position: 3,
  },
  {
    id: "videoslots",
    cmsSlug: "video-slots",
    name: "Videoslots",
    backgroundColor: "#131313",
    logoUrl: "/casino-logos/video-slots-logo.png",
    advantages: [
      "Free spins utan omsättning",
      "Slotsturneringar",
      "8 000 casinospel + betting",
    ],
    bonus: { label: "Bonus", value: "2 000 kr", wagering: "35x" },
    freeSpins: { label: "Free Spins", value: "11", wagering: "0x" },
    visitUrl: "/goto/video-slots.php",
    reviewUrl: null,
    withdrawalTime: "1.9 min",
    withdrawalMethodLabel: "genomsnittlig uttagstid Swish",
    position: 4,
  },

  {
    id: "mega-riches",
    cmsSlug: "megariches",
    name: "Mega Riches",
    backgroundColor: "#000000",
    logoUrl: "/casino-logos/megariches-logo.png",
    advantages: [
      "Snabba utbetalningar",
      "Sveriges största bonus",
      "Ägs av Videoslots",
    ],
    bonus: { label: "Bonus", value: "25 000 kr", wagering: "125x" },
    freeSpins: { label: "Free Spins", value: "150", wagering: "35x" },
    visitUrl: "/goto/megariches.php",
    reviewUrl: null,
    withdrawalTime: "Direkt",
    withdrawalMethodLabel: "genomsnittlig uttagstid Swish",
    position: 5,
  },
  {
    id: "betmgm",
    name: "BetMGM",
    backgroundColor: "#000000",
    logoUrl: "/casino-logos/bet-mgm-logo.svg",
    advantages: [
      "Free spins utan omsättning",
      "#2 av 85 casinon",
      "Direkta uttag med Swish",
    ],
    bonus: { label: "Bonus", value: "4 000 kr", wagering: "20x" },
    freeSpins: { label: "Free Spins", value: "200", wagering: "0x" },
    visitUrl: "",
    reviewUrl: null,
    withdrawalTime: "Direkt",
    withdrawalMethodLabel: "genomsnittlig uttagstid Swish",
    position: 6,
  },
  {
    id: "playkasino",
    cmsSlug: "playkasino",
    name: "PlayKasino",
    backgroundColor: "#0f1528",
    logoUrl: "/casino-logos/play-kasino-logo.png",
    advantages: ["Nyast i Sverige", "Från SkillOnNet", "6 000+ spel"],
    highlight: "Nytt från mars 2026",
    visitUrl: "/goto/playkasino.php",
    reviewUrl: null,
    withdrawalTime: "114 min",
    withdrawalMethodLabel: "genomsnittlig uttagstid Swish",
    position: 7,
  },
  {
    id: "klirr-casino",
    cmsSlug: "klirr-casino",
    name: "Klirr Casino",
    backgroundColor: "#0f7663",
    logoUrl: "/casino-logos/klirr-casino-logo.jpg",
    advantages: [
      "Direkta Swish-uttag",
      "Krångelfri registrering",
      "Support 24/7",
    ],
    highlight: "Inget krångel. Bara spela & ta ut.",
    visitUrl: "/goto/klirr-casino.php",
    reviewUrl: null,
    withdrawalTime: "Direkt",
    withdrawalMethodLabel: "genomsnittlig uttagstid Zimpler",
    position: 8,
  },
  {
    id: "pop-casino",
    cmsSlug: "pop-casino",
    name: "Pop Casino",
    backgroundColor: "#fba72b",
    logoUrl: "/casino-logos/pop-casino-logo.png",
    advantages: [
      "Bubblande spelglädje",
      "Snabba utbetalningar",
      "Support dygnet runt",
    ],
    highlight: "Pay N Play med BankID — snabb start",
    visitUrl: "/goto/pop-casino.php",
    reviewUrl: null,
    withdrawalTime: "0.6 min",
    withdrawalMethodLabel: "genomsnittlig uttagstid Zimpler",
    position: 9,
  },
  {
    id: "frank-and-fred-casino",
    cmsSlug: "frank-fred",
    name: "Frank & Fred Casino",
    backgroundColor: "#070707",
    logoUrl: "/casino-logos/frank-fred-logo.png",
    advantages: [
      "Alla populära spel",
      "Spela direkt med BankID",
      "Mobilanpassat",
    ],
    highlight: "Uttag på 1 minut",
    visitUrl: "/goto/frankfred.php",
    reviewUrl: null,
    withdrawalTime: "1.3 min",
    withdrawalMethodLabel: "genomsnittlig uttagstid Swish",
    position: 10,
  },
];
