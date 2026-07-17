import type { LocaleId } from "../locales";
import type { PrivacySection, StaticSitePagesCopy } from "./static-site-types";
import {
  privacySectionsDa,
  privacySectionsDe,
  privacySectionsFi,
  privacySectionsNb,
  termsSectionsDa,
  termsSectionsDe,
  termsSectionsFi,
  termsSectionsNb,
} from "./static-site-english-legal";

const privacySv: PrivacySection[] = [
  {
    title: "Syfte med datainsamling",
    body: "Vi samlar in besökares e-postadresser via ett frivilligt nyhetsbrevsformulär med samtycke. Uppgifterna används främst för kommunikation och marknadsföring anpassad till vår målgrupp.",
  },
  {
    title: "Uppgifter vi behandlar",
    body: "Vi sparar e-postadresser från användare som valt att få nyhetsbrev. Uppgifterna delas inte med tredje part och hanteras enligt GDPR. Vi lagrar e-post och ev.motsvarande användarnamn.",
  },
  {
    title: "Hur vi samlar in uppgifter",
    body: "Uppgifterna samlas in via nyhetsbrevsformuläret på webbplatsen och när du frivilligt lämnar dem i andra kontakter.",
  },
  {
    title: "Behandling och överföring",
    body: "Vi säljer eller delar inte data med tredje part. Data kan överföras utanför EU av vår databehandlare med skydd enligt GDPR och tillämplig lag.",
  },
  {
    title: "Datasäkerhet",
    body: "Vi skyddar dina personuppgifter med fysiska och digitala säkerhetsåtgärder. Endast behörig personal behandlar uppgifterna konfidentiellt.",
  },
  {
    title: "Dina rättigheter",
    body: "Enligt GDPR har du rätt till tillgång, rättelse och radering. Kontakta vårt dataskyddsombud (DPO). Vi svarar inom de tidsfrister som lagen kräver.",
  },
];

const termsSv: PrivacySection[] = [
  {
    title: "Godkännande",
    body: 'Genom att använda PpCasinos.co ("vi", "oss") accepterar du dessa villkor. Annars ska du inte använda webbplatsen.',
  },
  {
    title: "Endast information",
    body: "Vi publicerar guider och recensioner. Vi driver inget casino, erbjuder inga speltjänster och tar inte emot insatser. Inget på sidan är juridisk eller ekonomisk rådgivning.",
  },
  {
    title: "Affiliatelänkar",
    body: "Vissa länkar kan vara affiliatelänkar. Vi kan få ersättning när du besöker operatörer. Det ändrar inte vår redaktionella frihet; läs alltid operatörens villkor och licens.",
  },
  {
    title: "Innehåll och tredje part",
    body: "Vi strävar efter korrekt information, men bonusar och regler ändras. Externa sajter tillhandahålls av tredje part; vi ansvarar inte för deras innehåll eller tillgänglighet.",
  },
  {
    title: "Ansvarsbegränsning",
    body: "I den utsträckning lagen tillåter ansvarar vi inte för förlust eller skada från användning av webbplatsen eller tillit till innehållet, inklusive spel hos tredje part.",
  },
  {
    title: "Åldersgräns",
    body: "Webbplatsen vänder sig till myndiga personer 18+ (eller högre laglig ålder där du bor).",
  },
  {
    title: "Ändringar",
    body: "Vi kan uppdatera villkoren. Fortsatt användning efter ändring innebär att du accepterar de nya villkoren.",
  },
];

const classicSv: StaticSitePagesCopy["classicGamesHub"] = {
  metaTitle: "Klassiska spel | Tetris, Sudoku, patiens i webbläsaren",
  metaDescription:
    "Spela Tetris, Sudoku, patiens m.m. gratis i webbläsaren — utan nedladdning, bara för nöje.",
  ogTitle: "Klassiska spel | Paypalcasinoguides",
  ogDescription:
    "Gratis webbspel: Tetris, Tetris 50, Sudoku, Klondike. Inte spel om pengar.",
  keywords: ["spel", "tetris", "sudoku", "patiens", "webbläsare"],
  schemaName: "Klassiska spel",
  schemaDescription:
    "Gratis minispel i webbläsaren. Endast underhållning, inte riktiga pengar.",
  breadcrumbHome: "Hem",
  h1: "Klassiska spel",
  intro:
    "Vi erbjuder små, gratis spel direkt i webbläsaren — inget konto, ingen nedladdning. Inte spel om pengar; bara en kort paus och skoj.",
  pickGame: "Välj spel",
  games: {
    tetris: {
      tagline: "Endless / highscore",
      description:
        "Rensa rader och klättra i nivå tills tornet når toppen. Jaga rekord? Börja här.",
      cta: "Spela Tetris →",
    },
    tetris50: {
      tagline: "50 rader",
      description:
        "Målet är att rensa totalt 50 rader — då vinner du rundan. Du kan fortfarande game over om du slarvar.",
      cta: "Spela Tetris 50 →",
    },
    sudoku: {
      tagline: "9×9",
      description:
        "Placera siffror 1–9 utan upprepning i rad, kolumn eller ruta. Givna rutor är låsta; fel markeras.",
      cta: "Spela Sudoku →",
    },
    solitaire: {
      tagline: "Klondike",
      description:
        "Använd leken, bygg fundament A→K i färg, och kolumner med växlande färger nedåt.",
      cta: "Spela patiens →",
    },
    yukon: {
      tagline: "Ingen stockhög",
      description:
        "Alla kort ligger med framsidan upp. Flytta högar när lead-kortet är tillåtet, bygg fundament A→K (med valfri ångra).",
      cta: "Spela Yukon →",
    },
    russian: {
      tagline: "Bygg i samma färg",
      description:
        "Ingen stock; kolumner nedåt i samma färg; dolda kort vänds när de frigörs — svårare än Yukon.",
      cta: "Spela Russian →",
    },
  },
  footerComparison: {
    beforeTetris: "Osäker på vad du ska välja? Jämförelsen",
    tetrisLabel: "Tetris",
    between: "mot",
    tetris50Label: "Tetris 50",
    after: "(samma tabell) finns på respektive spelsida under spelytan.",
  },
};

export const STATIC_SITE_TRANSLATIONS: Record<
  Exclude<LocaleId, "en-IE">,
  StaticSitePagesCopy
> = {
  "sv-SE": {
    contact: {
      metaTitle: "Kontakta oss | PayPal Casino Reviews",
      metaDescription:
        "Kontakta redaktionen för frågor, synpunkter eller tips om onlinecasino och betalmetoder.",
      ogTitle: "Kontakta oss | PayPal Casino Reviews",
      ogDescription: "Hör av dig om recensioner, guider och feedback.",
      keywords: ["kontakt", "paypal casino", "recensioner", "betalning"],
      schemaName: "Kontakta oss",
      schemaDescription: "Kontakt för PayPal Casino Reviews.",
      breadcrumbHome: "Hem",
      h1: "Kontakta oss",
      greeting: "Hej,",
      body: "Vi vill gärna höra från dig. Vårt mål är att ge uppdaterad och tydlig information om casino och betalningar. Saknar du något? Vill du veta mer om en metod eller operatör? Skriv till oss på",
      disclaimer:
        "Observera: Vi är ingen speloperatör och erbjuder inga speltjänster. Vi är en oberoende recensionssajt. Vi är inte anslutna till eller godkända av PayPal eller andra betalningsleverantörer som nämns.",
    },
    privacy: {
      metaTitle: "Integritetspolicy | PpCasinos.co",
      metaDescription:
        "Hur PpCasinos.co behandlar personuppgifter och nyhetsbrev enligt GDPR.",
      ogTitle: "Integritetspolicy | PpCasinos.co",
      ogDescription: "Dina rättigheter och hur vi lagrar uppgifter.",
      keywords: ["integritet", "GDPR", "PpCasinos"],
      schemaName: "Integritetspolicy",
      schemaDescription: "PpCasinos.co integritet och dataskydd.",
      breadcrumbHome: "Hem",
      h1: "Integritetspolicy",
      intro:
        'Den här integritetspolicy beskriver hur PpCasinos.co ("vi") följer GDPR och skyddar dina uppgifter.',
      sections: privacySv,
      dpoTitle: "Dataskyddsombud (DPO)",
      dpoBodyPrefix: "Frågor? Kontakta oss på:",
    },
    terms: {
      metaTitle: "Användarvillkor | PpCasinos.co",
      metaDescription:
        "Villkor för användning av PpCasinos.co och våra informationsmaterial.",
      ogTitle: "Användarvillkor | PpCasinos.co",
      ogDescription: "Läs villkor, åldersgräns och ansvarsfriskrivning.",
      keywords: ["villkor", "PpCasinos", "affiliate"],
      schemaName: "Användarvillkor",
      schemaDescription: "Villkor för PpCasinos.co.",
      breadcrumbHome: "Hem",
      h1: "Användarvillkor",
      intro:
        "Dessa villkor reglerar din användning av PpCasinos.co. Genom att använda sidan bekräftar du att du uppfyller ålderskrav och accepterar reglerna.",
      sections: termsSv,
      closing:
        "Frågor? Mejla info@ppcasinos.co så återkommer vi så snart vi kan.",
    },
    notFound: {
      metaTitle: "404 – sidan hittades inte",
      metaDescription: "Sidan du söker finns inte.",
      heading: "Sidan hittades inte",
      subheading: "404",
      body: "Sidan finns inte eller har flyttats.",
      ctaHome: "Till startsidan",
    },
    sitemap: {
      metaTitle: "Webbplatskarta | PayPal Casinos",
      metaDescription: "Alla sidor på PpCasinos.co inklusive blogg och guider.",
      ogTitle: "Webbplatskarta | PayPal Casinos",
      ogDescription: "Bläddra mellan huvudsidor, kategorier och artiklar.",
      keywords: ["webbplatskarta", "navigation"],
      h1: "Webbplatskarta",
      intro: "Hitta alla våra sidor och innehåll.",
      sectionMainPages: "Huvudsidor",
      sectionBlogCategories: "Bloggkategorier",
      sectionWebsitePages: "Webbplatssidor",
      sectionAllBlogPosts: "Alla blogginlägg",
      labels: {
        home: "Hem",
        blog: "Blogg",
        contact: "Kontakta oss",
        privacy: "Integritetspolicy",
        terms: "Användarvillkor",
        classicGames: "Klassiska spel",
        tetris: "Tetris",
        tetris50: "Tetris 50",
        sudoku: "Sudoku",
        solitaire: "Patiens",
        yukon: "Yukon-patiens",
        russian: "Rysk patiens",
      },
    },
    classicGamesHub: classicSv,
  },
  "da-DK": {
    contact: {
      metaTitle: "Kontakt os | PayPal Casino Reviews",
      metaDescription:
        "Skriv til os med spørgsmål, feedback eller idéer om online casinoer og betalingsmetoder.",
      ogTitle: "Kontakt os | PayPal Casino Reviews",
      ogDescription: "Kontakt om anmeldelser, guides og feedback.",
      keywords: ["kontakt", "paypal casino", "anmeldelser"],
      schemaName: "Kontakt os",
      schemaDescription: "Kontakt PayPal Casino Reviews.",
      breadcrumbHome: "Forside",
      h1: "Kontakt os",
      greeting: "Hej,",
      body: "Vi hører gerne fra dig. Vi arbejder for at levere opdateret information om casinoer og betaling. Mangler der noget? Skriv til os på",
      disclaimer:
        "Vi er ikke en spiludbyder. Vi er et uafhængigt review-site. Vi er ikke tilknyttet eller godkendt af PayPal eller andre betalingsudbydere, der nævnes.",
    },
    privacy: {
      metaTitle: "Privatlivspolitik | PpCasinos.co",
      metaDescription:
        "Sådan behandler PpCasinos.co persondata og nyhedsbreve i overensstemmelse med GDPR.",
      ogTitle: "Privatlivspolitik | PpCasinos.co",
      ogDescription: "Dine rettigheder og vores databehandling.",
      keywords: ["privatliv", "GDPR", "PpCasinos"],
      schemaName: "Privatlivspolitik",
      schemaDescription: "Privatliv for PpCasinos.co.",
      breadcrumbHome: "Forside",
      h1: "Privatlivspolitik",
      intro:
        "Denne politik beskriver, hvordan PpCasinos.co (“vi”) overholder GDPR og beskytter dine oplysninger.",
      sections: privacySectionsDa,
      dpoTitle: "Databeskyttelsesrådgiver (DPO)",
      dpoBodyPrefix: "Spørgsmål? Kontakt os på:",
    },
    terms: {
      metaTitle: "Vilkår | PpCasinos.co",
      metaDescription:
        "Vilkår for brug af PpCasinos.co og vores informationsindhold.",
      ogTitle: "Vilkår | PpCasinos.co",
      ogDescription: "Læs vilkår, alderskrav og ansvarsfraskrivelser.",
      keywords: ["vilkår", "PpCasinos"],
      schemaName: "Vilkår",
      schemaDescription: "Vilkår for PpCasinos.co.",
      breadcrumbHome: "Forside",
      h1: "Vilkår og betingelser",
      intro:
        "Disse vilkår regulerer din adgang til PpCasinos.co. Ved brug bekræfter du, at du opfylder alderskravene.",
      sections: termsSectionsDa,
      closing: "Spørgsmål? Skriv til info@ppcasinos.co.",
    },
    notFound: {
      metaTitle: "404 - Siden blev ikke fundet",
      metaDescription: "Siden findes ikke.",
      heading: "Siden findes ikke",
      subheading: "404",
      body: "Siden findes ikke eller er blevet flyttet.",
      ctaHome: "Gå til forsiden",
    },
    sitemap: {
      metaTitle: "Sitemap | PayPal Casinos",
      metaDescription: "Alle sider på PpCasinos.co.",
      ogTitle: "Sitemap | PayPal Casinos",
      ogDescription: "Navigation over sider og blogindlæg.",
      keywords: ["sitemap"],
      h1: "Sitemap",
      intro: "Find alle sider og indhold.",
      sectionMainPages: "Hovedsider",
      sectionBlogCategories: "Blogkategorier",
      sectionWebsitePages: "Websider",
      sectionAllBlogPosts: "Alle blogindlæg",
      labels: {
        home: "Forside",
        blog: "Blog",
        contact: "Kontakt os",
        privacy: "Privatlivspolitik",
        terms: "Vilkår",
        classicGames: "Klassiske spil",
        tetris: "Tetris",
        tetris50: "Tetris 50",
        sudoku: "Sudoku",
        solitaire: "Kabale",
        yukon: "Yukon kabale",
        russian: "Russisk kabale",
      },
    },
    classicGamesHub: {
      ...classicSv,
      breadcrumbHome: "Forside",
      h1: "Klassiske spil",
      intro:
        "Små, gratis spil i browseren — ingen konto, ingen download. Ikke pengespil; kun hurtig underholdning.",
      pickGame: "Vælg spil",
      metaTitle: "Klassiske spil | Tetris, Sudoku, kabale",
      metaDescription:
        "Spil Tetris, Sudoku, kabale gratis i browseren — kun for sjov.",
      ogTitle: "Klassiske spil | Paypalcasinoguides",
      ogDescription: "Gratis browserspil. Ikke rigtige penge.",
      schemaName: "Klassiske spil",
      schemaDescription: "Gratis minispil. Kun underholdning.",
      games: {
        ...classicSv.games,
        solitaire: {
          ...classicSv.games.solitaire,
          cta: "Spil kabale →",
        },
      },
      footerComparison: {
        beforeTetris: "I tvivl? Sammenligningen",
        tetrisLabel: "Tetris",
        between: "vs.",
        tetris50Label: "Tetris 50",
        after: "findes på spilsiderne under spillet.",
      },
    },
  },
  "fi-FI": {
    contact: {
      metaTitle: "Ota yhteyttä | PayPal Casino Reviews",
      metaDescription:
        "Ota yhteyttä kysymyksissä, palautteessa tai vihjeissä koskien nettikasinoita ja maksutapoja.",
      ogTitle: "Ota yhteyttä | PayPal Casino Reviews",
      ogDescription: "Yhteys arvosteluihin, oppaisiin ja palautteeseen.",
      keywords: ["yhteys", "paypal kasino"],
      schemaName: "Ota yhteyttä",
      schemaDescription: "PayPal Casino Reviews -yhteystiedot.",
      breadcrumbHome: "Etusivu",
      h1: "Ota yhteyttä",
      greeting: "Hei,",
      body: "Kuulemme mielellämme sinusta. Julkaisemme ajankohtaista tietoa kasinoista ja maksuista. Puuttuuko jotain? Kirjoita osoitteeseen",
      disclaimer:
        "Huom: Emme ole pelioperaattori emmekä tarjoa uhkapelipalveluita. Olemme riippumaton arvostelusivusto. Emme ole PayPalin tai muiden mainittujen maksupalveluiden sidoksissa.",
    },
    privacy: {
      metaTitle: "Tietosuojakäytäntö | PpCasinos.co",
      metaDescription:
        "Miten PpCasinos.co käsittelee henkilötietoja ja uutiskirjeitä GDPR:n mukaisesti.",
      ogTitle: "Tietosuojakäytäntö | PpCasinos.co",
      ogDescription: "Oikeutesi ja tietojen käsittely.",
      keywords: ["tietosuoja", "GDPR"],
      schemaName: "Tietosuojakäytäntö",
      schemaDescription: "PpCasinos.co tietosuoja.",
      breadcrumbHome: "Etusivu",
      h1: "Tietosuojakäytäntö",
      intro:
        'Tämä käytäntö kuvaa, miten PpCasinos.co ("me") noudattaa GDPR:ää ja suojaa tietojasi.',
      sections: privacySectionsFi,
      dpoTitle: "Tietosuojavastaava (DPO)",
      dpoBodyPrefix: "Kysyttävää? Ota yhteyttä:",
    },
    terms: {
      metaTitle: "Käyttöehdot | PpCasinos.co",
      metaDescription:
        "PpCasinos.co -sivuston käyttöehdot ja vastuuvapauslausekkeet.",
      ogTitle: "Käyttöehdot | PpCasinos.co",
      ogDescription: "Ehdot, ikärajat ja vastuunrajoitukset.",
      keywords: ["ehdot", "PpCasinos"],
      schemaName: "Käyttöehdot",
      schemaDescription: "PpCasinos.co ehdot.",
      breadcrumbHome: "Etusivu",
      h1: "Käyttöehdot",
      intro:
        "Nämä ehdot koskevat PpCasinos.co-sivuston käyttöä. Käyttämällä sivustoa vakuutat täyttäväsi ikävaatimukset ja hyväksyt ehdot.",
      sections: termsSectionsFi,
      closing: "Kysymyksiä? info@ppcasinos.co",
    },
    notFound: {
      metaTitle: "404 - Sivua ei löytynyt",
      metaDescription: "Haettua sivua ei löydy.",
      heading: "Sivua ei löytynyt",
      subheading: "404",
      body: "Sivua ei ole tai se on siirretty.",
      ctaHome: "Etusivulle",
    },
    sitemap: {
      metaTitle: "Sivukartta | PayPal Casinos",
      metaDescription: "PpCasinos.co -sivuston sivut ja blogi.",
      ogTitle: "Sivukartta | PayPal Casinos",
      ogDescription: "Selaa osioita ja artikkeleita.",
      keywords: ["sivukartta"],
      h1: "Sivukartta",
      intro: "Löydä kaikki sivumme.",
      sectionMainPages: "Pääsivut",
      sectionBlogCategories: "Blogikategoriat",
      sectionWebsitePages: "Sivuston sivut",
      sectionAllBlogPosts: "Kaikki blogikirjoitukset",
      labels: {
        home: "Etusivu",
        blog: "Blogi",
        contact: "Ota yhteyttä",
        privacy: "Tietosuojakäytäntö",
        terms: "Käyttöehdot",
        classicGames: "Klassikkopelit",
        tetris: "Tetris",
        tetris50: "Tetris 50",
        sudoku: "Sudoku",
        solitaire: "Pasianssi",
        yukon: "Yukon-pasianssi",
        russian: "Venäläinen pasianssi",
      },
    },
    classicGamesHub: {
      ...classicSv,
      breadcrumbHome: "Etusivu",
      h1: "Klassikkopelit",
      intro:
        "Pieniä ilmaispelejä selaimessa — ei tiliä, ei latausta. Ei oikeaa rahaa; vain hauskaa taukoa varten.",
      pickGame: "Valitse peli",
      metaTitle: "Klassikkopelit | Tetris, Sudoku, pasianssi",
      metaDescription:
        "Pelaa Tetristä, Sudokua ja pasianssia ilmaiseksi selaimessa.",
      ogTitle: "Klassikkopelit | Paypalcasinoguides",
      ogDescription: "Ilmaiset selainpelit. Ei oikeaa rahaa.",
      schemaName: "Klassikkopelit",
      schemaDescription: "Ilmaiset minipelit. Vain viihdettä.",
      footerComparison: {
        beforeTetris: "Etkö tiedä mitä kokeilet?",
        tetrisLabel: "Tetriksen",
        between: "ja",
        tetris50Label: "Tetris 50:n",
        after: "vertailu löytyy kyseisten pelisivujen pelialueen alta.",
      },
    },
  },
  "de-DE": {
    contact: {
      metaTitle: "Kontakt | PayPal Casino Reviews",
      metaDescription:
        "Kontaktieren Sie uns zu Fragen, Feedback oder Anregungen zu Online-Casinos und Zahlungsmethoden.",
      ogTitle: "Kontakt | PayPal Casino Reviews",
      ogDescription: "Kontakt zu Tests, Ratgebern und Feedback.",
      keywords: ["Kontakt", "PayPal Casino"],
      schemaName: "Kontakt",
      schemaDescription: "Kontakt zu PayPal Casino Reviews.",
      breadcrumbHome: "Startseite",
      h1: "Kontakt",
      greeting: "Guten Tag,",
      body: "Wir freuen uns über Ihre Nachricht. Unser Ziel ist aktuelle und verständliche Information zu Casinos und Zahlungen. Fehlt etwas? Schreiben Sie an",
      disclaimer:
        "Hinweis: Wir sind kein Glücksspielanbieter und bieten keine Glücksspieldienstleistungen. Wir sind ein unabhängiges Testportal. Wir stehen nicht in Verbindung mit PayPal oder anderen genannten Zahlungsanbietern.",
    },
    privacy: {
      metaTitle: "Datenschutz | PpCasinos.co",
      metaDescription:
        "Wie PpCasinos.co personenbezogene Daten und Newsletter gemäß DSGVO verarbeitet.",
      ogTitle: "Datenschutz | PpCasinos.co",
      ogDescription: "Ihre Rechte und unsere Datenverarbeitung.",
      keywords: ["Datenschutz", "DSGVO"],
      schemaName: "Datenschutz",
      schemaDescription: "Datenschutz bei PpCasinos.co.",
      breadcrumbHome: "Startseite",
      h1: "Datenschutz",
      intro:
        "Diese Erklärung beschreibt, wie PpCasinos.co („wir“) DSGVO-Anforderungen erfüllt und Ihre Daten schützt.",
      sections: privacySectionsDe,
      dpoTitle: "Datenschutzbeauftragter (DSB)",
      dpoBodyPrefix: "Fragen? Kontakt:",
    },
    terms: {
      metaTitle: "Nutzungsbedingungen | PpCasinos.co",
      metaDescription: "Bedingungen für die Nutzung von PpCasinos.co.",
      ogTitle: "Nutzungsbedingungen | PpCasinos.co",
      ogDescription: "AGB, Altersgrenzen und Haftungsausschlüsse.",
      keywords: ["AGB", "PpCasinos"],
      schemaName: "Nutzungsbedingungen",
      schemaDescription: "AGB für PpCasinos.co.",
      breadcrumbHome: "Startseite",
      h1: "Nutzungsbedingungen",
      intro:
        "Diese Bedingungen regeln die Nutzung von PpCasinos.co. Mit der Nutzung bestätigen Sie die Altersvoraussetzungen und akzeptieren die Regeln.",
      sections: termsSectionsDe,
      closing: "Fragen? E-Mail an info@ppcasinos.co",
    },
    notFound: {
      metaTitle: "404 - Seite nicht gefunden",
      metaDescription: "Die Seite wurde nicht gefunden.",
      heading: "Seite nicht gefunden",
      subheading: "404",
      body: "Die Seite existiert nicht oder wurde verschoben.",
      ctaHome: "Zur Startseite",
    },
    sitemap: {
      metaTitle: "Sitemap | PayPal Casinos",
      metaDescription: "Alle Seiten auf PpCasinos.co.",
      ogTitle: "Sitemap | PayPal Casinos",
      ogDescription: "Navigation zu Bereichen und Artikeln.",
      keywords: ["Sitemap"],
      h1: "Sitemap",
      intro: "Alle Seiten und Inhalte finden.",
      sectionMainPages: "Hauptseiten",
      sectionBlogCategories: "Blog-Kategorien",
      sectionWebsitePages: "Webseiten",
      sectionAllBlogPosts: "Alle Blogbeiträge",
      labels: {
        home: "Startseite",
        blog: "Blog",
        contact: "Kontakt",
        privacy: "Datenschutz",
        terms: "Nutzungsbedingungen",
        classicGames: "Klassische Spiele",
        tetris: "Tetris",
        tetris50: "Tetris 50",
        sudoku: "Sudoku",
        solitaire: "Solitär",
        yukon: "Yukon Solitär",
        russian: "Russisches Solitär",
      },
    },
    classicGamesHub: {
      ...classicSv,
      breadcrumbHome: "Startseite",
      h1: "Klassische Spiele",
      intro:
        "Kleine Gratis-Spiele im Browser — kein Konto, kein Download. Kein Echtgeldspiel; nur kurz entspannen.",
      pickGame: "Spiel wählen",
      metaTitle: "Klassische Spiele | Tetris, Sudoku, Solitär",
      metaDescription:
        "Tetris, Sudoku, Solitär kostenlos im Browser — nur zum Spaß.",
      ogTitle: "Klassische Spiele | Paypalcasinoguides",
      ogDescription: "Kostenlose Browser-Spiele. Kein Echtgeld.",
      schemaName: "Klassische Spiele",
      schemaDescription: "Kostenlose Minispiele. Nur Unterhaltung.",
      games: {
        tetris: {
          tagline: "Endlos / Highscore",
          description:
            "Räume Reihen frei und steige im Level, bis der Stapel oben ist.",
          cta: "Tetris spielen →",
        },
        tetris50: {
          tagline: "50-Reihen-Sprint",
          description:
            "Ziel: insgesamt 50 Reihen löschen — dann gewinnst du die Runde.",
          cta: "Tetris 50 spielen →",
        },
        sudoku: {
          tagline: "9×9",
          description:
            "Ziffern 1–9 ohne Wiederholung in Zeile, Spalte und Block. Vorgaben sind fix.",
          cta: "Sudoku spielen →",
        },
        solitaire: {
          tagline: "Klondike",
          description:
            "Vorrat und Ablage, Fundamente A→K farbig, Spalten abwechselnd farbig abwärts.",
          cta: "Solitär spielen →",
        },
        yukon: {
          tagline: "Ohne Nachziehstapel",
          description:
            "Alle Karten offen im Tableau. Foundations A→K, optional Rückgängig.",
          cta: "Yukon spielen →",
        },
        russian: {
          tagline: "Gleiche Farbe",
          description:
            "Ohne Nachziehstapel; Spalten gleiche Farbe abwärts; schwieriger als Yukon.",
          cta: "Russisches Solitär →",
        },
      },
      footerComparison: {
        beforeTetris: "Unsicher? Der",
        tetrisLabel: "Tetris",
        between: "–",
        tetris50Label: "Tetris-50",
        after: "-Vergleich steht auf den Spielseiten unter dem Spielfeld.",
      },
    },
  },
  "nb-NO": {
    contact: {
      metaTitle: "Kontakt oss | PayPal Casino Reviews",
      metaDescription:
        "Ta kontakt for spørsmål, tilbakemelding eller tips om nettcasino og betalingsmetoder.",
      ogTitle: "Kontakt oss | PayPal Casino Reviews",
      ogDescription: "Kontakt om omtaler, guider og tilbakemelding.",
      keywords: ["kontakt", "paypal casino"],
      schemaName: "Kontakt oss",
      schemaDescription: "Kontakt PayPal Casino Reviews.",
      breadcrumbHome: "Hjem",
      h1: "Kontakt oss",
      greeting: "Hei,",
      body: "Vi hører gjerne fra deg. Vi ønsker å gi oppdatert informasjon om casino og betaling. Send e-post til",
      disclaimer:
        "Vi er ikke et pengespillselskap og tilbyr ikke pengespill. Vi er en uavhengig anmeldelsesside. Vi er ikke tilknyttet PayPal eller andre betalingsleverandører som nevnes.",
    },
    privacy: {
      metaTitle: "Personvern | PpCasinos.co",
      metaDescription:
        "Hvordan PpCasinos.co behandler personopplysninger og nyhetsbrev i tråd med GDPR.",
      ogTitle: "Personvern | PpCasinos.co",
      ogDescription: "Dine rettigheter og vår databehandling.",
      keywords: ["personvern", "GDPR"],
      schemaName: "Personvern",
      schemaDescription: "Personvern på PpCasinos.co.",
      breadcrumbHome: "Hjem",
      h1: "Personvernerklæring",
      intro:
        "Denne erklæringen beskriver hvordan PpCasinos.co («vi») følger GDPR og beskytter dine opplysninger.",
      sections: privacySectionsNb,
      dpoTitle: "Personvernombud (DPO)",
      dpoBodyPrefix: "Spørsmål? Kontakt oss på:",
    },
    terms: {
      metaTitle: "Vilkår | PpCasinos.co",
      metaDescription: "Vilkår for bruk av PpCasinos.co.",
      ogTitle: "Vilkår | PpCasinos.co",
      ogDescription: "Les vilkår, aldersgrense og ansvarsbegrensning.",
      keywords: ["vilkår", "PpCasinos"],
      schemaName: "Vilkår",
      schemaDescription: "Vilkår for PpCasinos.co.",
      breadcrumbHome: "Hjem",
      h1: "Vilkår og betingelser",
      intro:
        "Disse vilkårene regulerer bruk av PpCasinos.co. Ved å bruke nettstedet bekrefter du at du oppfyller alderskrav og godtar vilkårene.",
      sections: termsSectionsNb,
      closing: "Spørsmål? E-post info@ppcasinos.co",
    },
    notFound: {
      metaTitle: "404 - Siden finnes ikke",
      metaDescription: "Finner ikke siden.",
      heading: "Siden finnes ikke",
      subheading: "404",
      body: "Siden finnes ikke eller er flyttet.",
      ctaHome: "Til forsiden",
    },
    sitemap: {
      metaTitle: "Nettstedskart | PayPal Casinos",
      metaDescription: "Alle sider på PpCasinos.co.",
      ogTitle: "Nettstedskart | PayPal Casinos",
      ogDescription: "Finn frem blant sider og blogginnlegg.",
      keywords: ["nettstedskart"],
      h1: "Nettstedskart",
      intro: "Utforsk alle sidene våre.",
      sectionMainPages: "Hovedsider",
      sectionBlogCategories: "Bloggkategorier",
      sectionWebsitePages: "Nettstedsider",
      sectionAllBlogPosts: "Alle blogginnlegg",
      labels: {
        home: "Hjem",
        blog: "Blogg",
        contact: "Kontakt oss",
        privacy: "Personvern",
        terms: "Vilkår",
        classicGames: "Klassiske spill",
        tetris: "Tetris",
        tetris50: "Tetris 50",
        sudoku: "Sudoku",
        solitaire: "Kabal",
        yukon: "Yukon-kabal",
        russian: "Russisk kabal",
      },
    },
    classicGamesHub: {
      ...classicSv,
      breadcrumbHome: "Hjem",
      h1: "Klassiske spill",
      intro:
        "Små gratisspill i nettleseren — ingen konto, ingen nedlasting. Ikke ekte penger; bare en kort pause.",
      pickGame: "Velg spill",
      metaTitle: "Klassiske spill | Tetris, Sudoku, kabal",
      metaDescription: "Spill Tetris, Sudoku og kabal gratis i nettleseren.",
      ogTitle: "Klassiske spill | Paypalcasinoguides",
      ogDescription: "Gratis nettleserspill. Ikke ekte penger.",
      schemaName: "Klassiske spill",
      schemaDescription: "Gratis minispill. Bare underholdning.",
      footerComparison: {
        beforeTetris: "Usikker? Sammenligningen",
        tetrisLabel: "Tetris",
        between: "mot",
        tetris50Label: "Tetris 50",
        after: "ligger på spillsidene under spillflaten.",
      },
    },
  },
};
