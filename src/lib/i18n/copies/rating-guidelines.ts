import type { LocaleId } from "../locales";
import type { WebsiteLocaleKey } from "../../cms/locales";
import { localeIdForWebsiteLocale } from "../websiteLocaleBridge";
import type { RatingGuidelinesCopy } from "./rating-guidelines-types";

export type { RatingGuidelinesCopy } from "./rating-guidelines-types";

const en: RatingGuidelinesCopy = {
  metaTitle: "Casino Rating Guidelines 2026 | How We Score Online Casinos",
  metaDescription:
    "How PpCasinos.co reviews and rates online casinos: real deposits, bonus checks, PayPal payout tests, licensing, and support — plus what each score means.",
  ogTitle: "How We Rate Casinos | PpCasinos.co",
  ogDescription:
    "Our review methodology: registration, deposits, bonuses, games, support and withdrawals — scored across five pillars.",
  keywords: [
    "casino rating",
    "review methodology",
    "casino scores",
    "PayPal casino reviews",
    "how we rate casinos",
  ],
  schemaName: "Casino Rating Guidelines",
  schemaDescription:
    "Independent methodology for reviewing and scoring online casinos on PpCasinos.co.",
  breadcrumbHome: "Home",
  h1: "How we rate online casinos",
  lead: "Every casino we promote is reviewed by a person — not a bot checklist alone. We register, deposit, claim offers, play, contact support, and withdraw where possible. Below is exactly what we measure, how weights work, and how often scores change.",
  snippetTitle: "How we pick these casinos",
  snippetBody:
    "Our team tests listed brands with real player flows — including common banking options such as PayPal where available. We score each site across five pillars. Casinos below our publish threshold stay off the main ranking lists (and may appear on Blocked Casinos if we cannot promote them).",
  processTitle: "Our review process",
  processIntro:
    "We follow the same six steps for every brand so scores stay comparable across markets.",
  processSteps: [
    {
      title: "Registration test",
      body: "We sign up as a new player with no VIP treatment. Confusing forms, forced upsells, or a messy KYC path lower the score.",
    },
    {
      title: "Real deposit",
      body: "We deposit with methods players actually use in that market — PayPal, cards, e-wallets, Trustly/Swish where relevant — and note speed, fees, and minimums.",
    },
    {
      title: "Bonus claim",
      body: "We activate the welcome offer and read the terms. Wagering, max bet, max cashout, game weighting, and time limits are all checked for realism.",
    },
    {
      title: "Game testing",
      body: "We sample slots, table games, and live casino on desktop and mobile. We look for credible providers, stable play, and clear RTP/info where published.",
    },
    {
      title: "Support contact",
      body: "We ask a real question via live chat and/or email. Response time, clarity, and whether answers match the T&Cs are scored.",
    },
    {
      title: "Withdrawal test",
      body: "Where feasible we request a cashout and measure time from request to funds received, including extra verification friction.",
    },
  ],
  pillarsTitle: "The five rating pillars",
  pillarsIntro:
    "No single pillar can fully rescue a weak one. A casino needs a balanced performance to earn a strong overall score.",
  pillarsToggle: "Show details",
  pillars: [
    {
      name: "Games",
      weight: "25%",
      summary:
        "Library size and quality, mobile performance, and whether top-tier studios are present.",
      details: [
        "Breadth across slots, table, and live casino",
        "Stability on mobile browsers",
        "Recognised providers (e.g. Pragmatic, Play’n GO, Evolution)",
        "Transparency of game info / RTP where available",
      ],
    },
    {
      name: "Bonuses",
      weight: "25%",
      summary:
        "Headline value matters less than whether a real player can clear the offer fairly.",
      details: [
        "Wagering multiples and time limits",
        "Max bet / max cashout rules",
        "Game weighting and excluded titles",
        "Clarity of opt-in and code requirements",
      ],
    },
    {
      name: "Trust & licensing",
      weight: "20%",
      summary:
        "Regulatory standing, operator history, and a clean track record are foundational.",
      details: [
        "Licence visibility and reputation of the regulator",
        "Company / group history and brand continuity",
        "Complaint patterns and dispute signals",
        "Responsible gambling tools and age gates",
      ],
    },
    {
      name: "Payments",
      weight: "20%",
      summary:
        "We care about real withdrawal times and methods players use — especially PayPal on this site.",
      details: [
        "Deposit and withdrawal method coverage",
        "Measured cashout speed and pending periods",
        "Fees, limits, and verification friction",
        "PayPal / e-wallet reliability where advertised",
      ],
    },
    {
      name: "Support",
      weight: "10%",
      summary: "We test support ourselves instead of trusting homepage claims.",
      details: [
        "Live chat / email availability",
        "Time to first useful reply",
        "Accuracy vs published terms",
        "Language coverage for the market",
      ],
    },
  ],
  scoresTitle: "What the scores mean",
  scoresIntro:
    "Overall scores are weighted averages of the five pillars, rounded for display on casino cards.",
  bands: [
    {
      range: "4.8–5.0",
      label: "Outstanding",
      body: "Excels across pillars. Among the strongest options we recommend for that market.",
    },
    {
      range: "4.5–4.7",
      label: "Very good",
      body: "Strong all-rounder with only minor weaknesses that rarely hurt the core experience.",
    },
    {
      range: "4.0–4.4",
      label: "Good",
      body: "Worth recommending, with clear areas still open for improvement.",
    },
    {
      range: "Below 4.0",
      label: "Not on main lists",
      body: "We do not feature these on primary ranking pages. Brands we cannot promote may appear on Blocked Casinos instead.",
    },
  ],
  updatesTitle: "Scores are updated regularly",
  updatesBody:
    "Casinos change — bonuses shift, payout times slip, support quality varies. We revisit listed brands on a recurring cycle and sooner when something material happens (licence change, ownership change, broken referral link, or a spike in player issues). If a brand falls below standard or we lose a working promo path, it can leave the main lists.",
  independenceTitle: "Editorial independence",
  independenceBody:
    "Some outbound links are affiliate links — we may earn a commission if you sign up. That never sets the score. Ratings follow the pillars above. Always verify the operator’s current terms, licence, and responsible-gambling tools before you deposit. 18+ only.",
  faqTitle: "Rating FAQ",
  faq: [
    {
      question: "Do you really deposit and withdraw?",
      answer:
        "Yes where practical. We prioritise real banking flows (including PayPal when offered). Some markets or brand holds can limit how far a test goes; we note friction either way.",
    },
    {
      question: "Can a commercial deal raise a score?",
      answer:
        "No. Partnerships can affect whether we have a live referral link, not the numerical rating. Missing links are handled via blocked / alternatives flows.",
    },
    {
      question: "Why did a casino disappear from the list?",
      answer:
        "Usually a score drop, a market eligibility change, or a paused affiliate path. Check Blocked Casinos if promotions are paused.",
    },
    {
      question: "Are scores identical in every country?",
      answer:
        "Pillars are the same, but banking options, licensing context, and local offers differ — so market pages can show different shortlists and emphasis.",
    },
  ],
  footerNote:
    "PpCasinos.co — reviews are independent of commission. Gambling is for adults 18+ (or the higher legal age where you live). Please play responsibly.",
  ctaBlocked: "View blocked casinos",
  ctaHome: "Back to casino lists",
};

/** Localized shells: full native copy for major UI; detailed lists stay aligned with EN methodology. */
function localize(
  base: RatingGuidelinesCopy,
  patch: Partial<RatingGuidelinesCopy>,
): RatingGuidelinesCopy {
  return { ...base, ...patch };
}

export const RATING_GUIDELINES_COPY: Record<LocaleId, RatingGuidelinesCopy> = {
  "en-IE": en,
  "sv-SE": localize(en, {
    metaTitle: "Riktlinjer för casinobetyg 2026 | Så betygsätter vi",
    metaDescription:
      "Så granskar PpCasinos.co onlinecasinon: riktiga insatser, bonusvillkor, PayPal-uttag, licens och support — och vad varje betyg betyder.",
    ogTitle: "Så betygsätter vi casinon | PpCasinos.co",
    ogDescription:
      "Vår metod: registrering, insättning, bonus, spel, support och uttag — fem pelare.",
    keywords: ["casinobetyg", "recensionsmetod", "PayPal casino"],
    schemaName: "Riktlinjer för casinobetyg",
    schemaDescription: "Oberoende metod för att betygsätta onlinecasinon.",
    breadcrumbHome: "Hem",
    h1: "Så betygsätter vi onlinecasinon",
    lead: "Varje casino vi marknadsför granskas av en person — inte bara en bot-checklista. Vi registrerar, sätter in, aktiverar erbjudanden, spelar, kontaktar support och tar ut när det går. Här är vad vi mäter, hur vikterna fungerar och hur ofta betygen uppdateras.",
    snippetTitle: "Så väljer vi casinon",
    snippetBody:
      "Vi testar listade varumärken med riktiga spelarflöden — inklusive vanliga betalningar som PayPal där det finns. Vi betygsätter fem pelare. Casinon under publiceringströskeln syns inte på huvudlistorna (och kan finnas under Blockerade casinon om vi inte kan marknadsföra dem).",
    processTitle: "Vår granskningsprocess",
    processIntro:
      "Vi följer samma sex steg för varje varumärke så betygen går att jämföra mellan marknader.",
    pillarsTitle: "De fem betygspelearna",
    pillarsIntro:
      "Ingen enskild pelare kan rädda en svag helhet. Ett casino behöver balans för ett starkt totalbetyg.",
    pillarsToggle: "Visa detaljer",
    scoresTitle: "Vad betygen betyder",
    scoresIntro:
      "Totalbetyget är ett viktat medelvärde av de fem pelarna, avrundat på casinokorten.",
    updatesTitle: "Betygen uppdateras regelbundet",
    independenceTitle: "Redaktionell oberoende",
    faqTitle: "Vanliga frågor om betyg",
    ctaBlocked: "Visa blockerade casinon",
    ctaHome: "Tillbaka till casinolistorna",
    footerNote:
      "PpCasinos.co — recensioner är oberoende av provision. Spel är endast för 18+ (eller högre laglig ålder). Spela ansvarsfullt.",
  }),
  "da-DK": localize(en, {
    metaTitle: "Retningslinjer for casino-bedømmelser 2026 | Sådan scorer vi",
    metaDescription:
      "Sådan anmelder PpCasinos.co online kasinoer: rigtige indbetalinger, bonusvilkår, PayPal-udbetalinger, licens og support.",
    ogTitle: "Sådan vurderer vi kasinoer | PpCasinos.co",
    keywords: ["casino bedømmelse", "anmeldelsesmetode", "PayPal casino"],
    schemaName: "Retningslinjer for casino-bedømmelser",
    breadcrumbHome: "Hjem",
    h1: "Sådan vurderer vi online kasinoer",
    lead: "Hvert kasino, vi promoverer, gennemgås af et menneske — ikke kun en bot. Vi opretter konto, indbetaler, aktiverer tilbud, spiller, kontakter support og hæver når det er muligt. Her er præcis, hvad vi måler.",
    snippetTitle: "Sådan vælger vi kasinoer",
    snippetBody:
      "Vi tester listede brands med rigtige spillerflows — inkl. PayPal hvor det tilbydes. Vi scorer fem søjler. Kasinoer under vores publiceringstærskel kommer ikke på hovedlisterne.",
    processTitle: "Vores anmeldelsesproces",
    processIntro:
      "Vi følger de samme seks trin for hvert brand, så scoringer kan sammenlignes.",
    pillarsTitle: "De fem bedømmelsessøjler",
    pillarsIntro:
      "Ingen enkelt søjle kan redde en svag helhed. Et kasino skal præstere bredt.",
    pillarsToggle: "Vis detaljer",
    scoresTitle: "Hvad scoringerne betyder",
    scoresIntro: "Samlet score er et vægtet gennemsnit af de fem søjler.",
    updatesTitle: "Scoringer opdateres løbende",
    independenceTitle: "Redaktionel uafhængighed",
    faqTitle: "FAQ om bedømmelser",
    ctaBlocked: "Se blokerede kasinoer",
    ctaHome: "Tilbage til kasinolister",
    footerNote:
      "PpCasinos.co — anmeldelser er uafhængige af provision. Spil kun 18+. Spil ansvarligt.",
  }),
  "fi-FI": localize(en, {
    metaTitle: "Kasinoluokituksen ohjeet 2026 | Näin arvioimme kasinot",
    metaDescription:
      "Näin PpCasinos.co arvioi nettikasinot: talletukset, bonusehdot, PayPal-nostot, lisenssi ja tuki.",
    ogTitle: "Näin arvioimme kasinot | PpCasinos.co",
    keywords: ["kasinoluokitus", "arvostelumenetelmä", "PayPal kasino"],
    schemaName: "Kasinoluokituksen ohjeet",
    breadcrumbHome: "Etusivu",
    h1: "Näin arvioimme nettikasinot",
    lead: "Jokainen mainostamamme kasino arvioidaan ihmisen toimesta — ei pelkällä botilla. Rekisteröidymme, talletamme, lunastamme tarjouksia, pelaamme, otamme yhteyttä tukeen ja nostamme kun mahdollista.",
    snippetTitle: "Näin valitsemme kasinot",
    snippetBody:
      "Testaamme listattuja brändejä oikeilla pelaajavirroilla — myös PayPalilla kun se on tarjolla. Arvioimme viisi osa-aluetta. Julkaisukynnyksen alle jäävät eivät ole päälistoilla.",
    processTitle: "Arviointiprosessimme",
    processIntro: "Käytämme samoja kuutta vaihetta jokaiselle brändille.",
    pillarsTitle: "Viisi arviointipilaria",
    pillarsIntro:
      "Yksi vahva osa-alue ei pelasta heikkoa kokonaisuutta. Kasinon on suoriuduttava tasapainoisesti.",
    pillarsToggle: "Näytä tiedot",
    scoresTitle: "Mitä pisteet tarkoittavat",
    scoresIntro: "Kokonaisarvosana on viiden pilarin painotettu keskiarvo.",
    updatesTitle: "Pisteitä päivitetään säännöllisesti",
    independenceTitle: "Toimituksellinen riippumattomuus",
    faqTitle: "UKK arvioinneista",
    ctaBlocked: "Katso estetyt kasinot",
    ctaHome: "Takaisin kasinolistoihin",
    footerNote:
      "PpCasinos.co — arviot ovat riippumattomia provisioista. Pelaaminen vain 18+. Pelaa vastuullisesti.",
  }),
  "de-DE": localize(en, {
    metaTitle: "Casino-Bewertungsrichtlinien 2026 | So bewerten wir",
    metaDescription:
      "So prüft PpCasinos.co Online Casinos: echte Einzahlungen, Bonusbedingungen, PayPal-Auszahlungen, Lizenz und Support.",
    ogTitle: "So bewerten wir Casinos | PpCasinos.co",
    keywords: ["Casino Bewertung", "Testmethodik", "PayPal Casino"],
    schemaName: "Casino-Bewertungsrichtlinien",
    breadcrumbHome: "Startseite",
    h1: "So bewerten wir Online Casinos",
    lead: "Jedes Casino, das wir bewerben, wird von einem Menschen geprüft — nicht nur von einer Bot-Checkliste. Wir registrieren, zahlen ein, lösen Angebote ein, spielen, kontaktieren den Support und lassen auszahlen, wo möglich.",
    snippetTitle: "So wählen wir Casinos aus",
    snippetBody:
      "Wir testen gelistete Marken mit echten Spielerabläufen — inklusive PayPal, wo verfügbar. Wir bewerten fünf Säulen. Casinos unter der Veröffentlichungsschwelle erscheinen nicht in den Hauptlisten.",
    processTitle: "Unser Prüfprozess",
    processIntro:
      "Wir folgen denselben sechs Schritten für jede Marke, damit Scores vergleichbar bleiben.",
    pillarsTitle: "Die fünf Bewertungssäulen",
    pillarsIntro:
      "Keine einzelne Säule kann eine schwache Gesamtleistung ausgleichen. Ein Casino braucht Balance.",
    pillarsToggle: "Details anzeigen",
    scoresTitle: "Was die Scores bedeuten",
    scoresIntro:
      "Der Gesamtscore ist ein gewichteter Durchschnitt der fünf Säulen.",
    updatesTitle: "Scores werden regelmäßig aktualisiert",
    independenceTitle: "Redaktionelle Unabhängigkeit",
    faqTitle: "FAQ zur Bewertung",
    ctaBlocked: "Gesperrte Casinos ansehen",
    ctaHome: "Zurück zu den Casino-Listen",
    footerNote:
      "PpCasinos.co — Bewertungen sind unabhängig von Provisionen. Glücksspiel erst ab 18+. Bitte verantwortungsbewusst spielen.",
  }),
  "nb-NO": localize(en, {
    metaTitle: "Retningslinjer for casinovurdering 2026 | Slik scorer vi",
    metaDescription:
      "Slik vurderer PpCasinos.co nettcasinoer: ekte innskudd, bonusvilkår, PayPal-utbetalinger, lisens og support.",
    ogTitle: "Slik vurderer vi casinoer | PpCasinos.co",
    keywords: ["casinovurdering", "anmeldelsesmetode", "PayPal casino"],
    schemaName: "Retningslinjer for casinovurdering",
    breadcrumbHome: "Hjem",
    h1: "Slik vurderer vi nettcasinoer",
    lead: "Hvert casino vi promoterer vurderes av et menneske — ikke bare en bot. Vi registrerer, setter inn, aktiverer tilbud, spiller, kontakter support og tar ut når det er mulig.",
    snippetTitle: "Slik velger vi casinoer",
    snippetBody:
      "Vi tester listede merker med ekte spillerflyter — inkludert PayPal der det tilbys. Vi scorer fem søyler. Casinoer under publiseringsterskelen kommer ikke på hovedlistene.",
    processTitle: "Vår vurderingsprosess",
    processIntro:
      "Vi følger de samme seks stegene for hvert merke, slik at scorene kan sammenlignes.",
    pillarsTitle: "De fem vurderingssøylene",
    pillarsIntro:
      "Ingen enkelt søyle kan redde en svak helhet. Et casino må prestere bredt.",
    pillarsToggle: "Vis detaljer",
    scoresTitle: "Hva scorene betyr",
    scoresIntro: "Samlet score er et vektet gjennomsnitt av de fem søylene.",
    updatesTitle: "Scorene oppdateres jevnlig",
    independenceTitle: "Redaksjonell uavhengighet",
    faqTitle: "FAQ om vurdering",
    ctaBlocked: "Se blokkerte kasinoer",
    ctaHome: "Tilbake til kasinolistene",
    footerNote:
      "PpCasinos.co — anmeldelser er uavhengige av provisjon. Spill kun 18+. Spill ansvarlig.",
  }),
};

export function ratingGuidelinesCopyFor(
  locale: WebsiteLocaleKey,
): RatingGuidelinesCopy {
  return RATING_GUIDELINES_COPY[localeIdForWebsiteLocale(locale)];
}
