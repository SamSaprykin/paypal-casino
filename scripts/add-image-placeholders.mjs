/**
 * Adds commented CustomImage placeholders to page MDX files and imageType
 * comments to pages that already have active image sections.
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const ROOT = "src/data/content/pages";
const LOCALES = ["ireland", "germany", "denmark", "finland", "norway", "sweden"];

const HEADER =
  "  # CustomImage via kind: image + src in meta.json — uncomment when asset exists in src/images/content/";

function injectAfterId(content, afterId, block, { isLast = false } = {}) {
  if (content.includes(`#   id: ${afterId.split("-").slice(-2).join("-")}`)) {
    // rough skip if placeholder id fragment already injected for this anchor
  }
  const kinds = ["contentComponent", "howTo", "faqComponent", "image"];
  for (const kind of kinds) {
    const mid = new RegExp(
      `(  - kind: ${kind}\\n    id: ${escapeRe(afterId)}[\\s\\S]*?)(\\n  - kind:)`,
      "m",
    );
    if (mid.test(content)) {
      return content.replace(mid, `$1\n${block}$2`);
    }
  }
  if (isLast) {
    const end = new RegExp(
      `(  - kind: contentComponent\\n    id: ${escapeRe(afterId)}[\\s\\S]*?)(\\n---\\s*$)`,
      "m",
    );
    if (end.test(content)) {
      return content.replace(end, `$1\n${block}$2`);
    }
    const endHowTo = new RegExp(
      `(  - kind: howTo\\n    id: ${escapeRe(afterId)}[\\s\\S]*?)(\\n---\\s*$)`,
      "m",
    );
    if (endHowTo.test(content)) {
      return content.replace(endHowTo, `$1\n${block}$2`);
    }
  }
  throw new Error(`Could not find anchor ${afterId}`);
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function block(id, imageType, src, alt, caption) {
  const cap = caption.includes(":") ? `"${caption}"` : caption;
  return `${HEADER}
  # imageType: ${imageType} | src: ${src}
  # - kind: image
  #   id: ${id}
  #   alt: ${alt}
  #   caption: ${cap}`;
}

const PAGE_BLOCKS = () => ({
  "home-page": {
    ireland: [
      {
        afterId: "cc19c2f3-0994-47bd-b143-61f880188e97",
        ...text(
          "hp-img-hero",
          "ai-generated",
          "home-page-hero.webp",
          "Casino payment methods compared for Irish players in 2026",
          "PayPal, cards, e-wallets and crypto — pick the route that fits your priorities.",
        ),
      },
      {
        afterId: "e6695325-bdb3-4018-a6bd-fd0729b66642",
        beforeId: true,
        ...text(
          "hp-img-comparison",
          "stock",
          "home-page-payment-comparison.webp",
          "Side-by-side comparison of casino deposit and withdrawal speeds",
          "Speed, fees and privacy vary more than most players expect.",
        ),
      },
      {
        afterId: "e6695325-bdb3-4018-a6bd-fd0729b66642",
        isLast: true,
        ...text(
          "hp-img-trust",
          "screenshot",
          "home-page-paypal-deposit.webp",
          "PayPal selected as deposit method in a casino cashier on mobile",
          "Screenshot: confirm PayPal appears in the cashier before you rely on it for withdrawals.",
        ),
      },
    ],
    germany: localePack("de"),
    denmark: localePack("dk"),
    finland: localePack("fi"),
    norway: localePack("no"),
    sweden: localePack("se"),
  },
  "paypal-casino": {
    ireland: paypalPack("ie"),
    germany: paypalPack("de"),
    denmark: paypalPack("dk"),
    finland: paypalPack("fi"),
    norway: paypalPack("no"),
    sweden: paypalPack("se"),
  },
  "blocked-casinos": {
    ireland: blockedPack("ie"),
    germany: blockedPack("de"),
    denmark: blockedPack("dk"),
    finland: blockedPack("fi"),
    norway: blockedPack("no"),
    sweden: blockedPack("se"),
  },
});

function text(id, imageType, src, alt, caption) {
  return { id, imageType, src, alt, caption };
}

function localePack(loc) {
  const t = HOME_TEXT[loc];
  return [
    {
      afterId: "cc19c2f3-0994-47bd-b143-61f880188e97",
      ...text("hp-img-hero", "ai-generated", "home-page-hero.webp", t.heroAlt, t.heroCap),
    },
    {
      afterId: "e6695325-bdb3-4018-a6bd-fd0729b66642",
      beforeId: true,
      ...text(
        "hp-img-comparison",
        "stock",
        "home-page-payment-comparison.webp",
        t.compAlt,
        t.compCap,
      ),
    },
    {
      afterId: "e6695325-bdb3-4018-a6bd-fd0729b66642",
      isLast: true,
      ...text("hp-img-trust", "screenshot", "home-page-paypal-deposit.webp", t.trustAlt, t.trustCap),
    },
  ];
}

function paypalPack(loc) {
  const t = PAYPAL_TEXT[loc];
  return [
    {
      afterId: "aa19a9ee-2bab-4720-85a2-8d5dc3ec7189",
      ...text("pp-img-hero", "ai-generated", "paypal-casino-hero.webp", t.heroAlt, t.heroCap),
    },
    {
      afterId: "a4821b7b-189c-4088-a106-b3114b938889",
      beforeId: true,
      ...text("pp-img-cashier", "screenshot", "paypal-casino-cashier.webp", t.cashierAlt, t.cashierCap),
    },
    {
      afterId: "a4821b7b-189c-4088-a106-b3114b938889",
      isLast: true,
      ...text("pp-img-security", "stock", "paypal-casino-security.webp", t.securityAlt, t.securityCap),
    },
  ];
}

function blockedPack(loc) {
  const t = BLOCKED_TEXT[loc];
  return [
    {
      afterId: "bc-intro",
      ...text("bc-img-hero", "stock", "blocked-casinos-hero.webp", t.heroAlt, t.heroCap),
    },
    {
      afterId: "bc-why",
      ...text("bc-img-warning", "stock", "blocked-casinos-warning.webp", t.warnAlt, t.warnCap),
    },
    {
      afterId: "bc-howto",
      ...text(
        "bc-img-alternatives",
        "ai-generated",
        "blocked-casinos-alternatives.webp",
        t.altAlt,
        t.altCap,
      ),
    },
  ];
}

const HOME_TEXT = {
  ie: {
    heroAlt: "Casino payment methods compared for Irish players in 2026",
    heroCap: "PayPal, cards, e-wallets and crypto — pick the route that fits your priorities.",
    compAlt: "Side-by-side comparison of casino deposit and withdrawal speeds",
    compCap: "Speed, fees and privacy vary more than most players expect.",
    trustAlt: "PayPal selected as deposit method in a casino cashier on mobile",
    trustCap:
      "Screenshot: confirm PayPal appears in the cashier before you rely on it for withdrawals.",
  },
  de: {
    heroAlt: "Casino-Zahlungsmethoden im Vergleich für deutsche Spieler 2026",
    heroCap: "PayPal, Karten, E-Wallets und Krypto — wählen Sie die passende Route.",
    compAlt: "Vergleich von Ein- und Auszahlungsgeschwindigkeit im Casino",
    compCap: "Geschwindigkeit, Gebühren und Datenschutz unterscheiden sich stark.",
    trustAlt: "PayPal als Einzahlungsmethode in der Casino-Kasse auf dem Handy",
    trustCap:
      "Screenshot: Prüfen Sie vor der Einzahlung, ob PayPal in der Kasse angezeigt wird.",
  },
  dk: {
    heroAlt: "Casino-betalingsmetoder sammenlignet for danske spillere 2026",
    heroCap: "PayPal, kort, e-wallets og krypto — vælg den rute der passer dig.",
    compAlt: "Sammenligning af ind- og udbetalingshastighed på casinoer",
    compCap: "Hastighed, gebyrer og privatliv varierer mere end mange forventer.",
    trustAlt: "PayPal valgt som indbetalingsmetode i casino-kassen på mobil",
    trustCap: "Screenshot: bekræft at PayPal vises i kassen, før du indbetaler.",
  },
  fi: {
    heroAlt: "Kasinon maksutavat vertailussa suomalaisille pelaajille 2026",
    heroCap: "PayPal, kortit, e-lompakot ja krypto — valitse sinulle sopiva reitti.",
    compAlt: "Kasinon talletus- ja kotiutusnopeuksien vertailu",
    compCap: "Nopeus, kulut ja yksityisyys vaihtelevat enemmän kuin moni odottaa.",
    trustAlt: "PayPal valittuna talletustavaksi kasinon kassalla mobiilissa",
    trustCap: "Kuvakaappaus: varmista ennen talletusta, että PayPal näkyy kassalla.",
  },
  no: {
    heroAlt: "Casino-betalingsmetoder sammenlignet for norske spillere 2026",
    heroCap: "PayPal, kort, e-lommebøker og krypto — velg ruten som passer deg.",
    compAlt: "Sammenligning av innskudds- og uttaks hastighet på kasinoer",
    compCap: "Hastighet, gebyrer og personvern varierer mer enn mange tror.",
    trustAlt: "PayPal valgt som innskuddsmetode i kasino-kassen på mobil",
    trustCap: "Skjermbilde: bekreft at PayPal vises i kassen før du setter inn.",
  },
  se: {
    heroAlt: "Casino-betalningsmetoder jämförda för svenska spelare 2026",
    heroCap: "PayPal, kort, e-plånböcker och krypto — välj rutten som passar dig.",
    compAlt: "Jämförelse av insättnings- och uttagshastighet på casinon",
    compCap: "Hastighet, avgifter och integritet skiljer sig mer än många tror.",
    trustAlt: "PayPal valt som insättningsmetod i casino-kassan på mobil",
    trustCap: "Skärmdump: bekräfta att PayPal syns i kassan innan du sätter in.",
  },
};

const PAYPAL_TEXT = {
  ie: {
    heroAlt: "Best PayPal casinos for Irish players in 2026",
    heroCap: "Licensed operators with fast PayPal deposits and withdrawals.",
    cashierAlt: "Casino cashier showing PayPal as a deposit and withdrawal option",
    cashierCap: "Screenshot: open the cashier on your device and confirm PayPal is listed.",
    securityAlt: "PayPal buyer protection and casino licence badges",
    securityCap: "PayPal plus a visible licence is a strong trust combination.",
  },
  de: {
    heroAlt: "Beste PayPal-Casinos für deutsche Spieler 2026",
    heroCap: "Lizenzierte Anbieter mit schnellen PayPal-Ein- und Auszahlungen.",
    cashierAlt: "Casino-Kasse mit PayPal als Ein- und Auszahlungsoption",
    cashierCap: "Screenshot: Kasse auf dem Gerät öffnen und PayPal-Verfügbarkeit prüfen.",
    securityAlt: "PayPal-Käuferschutz und Casino-Lizenz-Siegel",
    securityCap: "PayPal plus sichtbare Lizenz ist eine starke Vertrauenskombination.",
  },
  dk: {
    heroAlt: "Bedste PayPal-casinoer for danske spillere 2026",
    heroCap: "Licenserede operatører med hurtige PayPal-ind- og udbetalinger.",
    cashierAlt: "Casino-kasse med PayPal som ind- og udbetalingsmulighed",
    cashierCap: "Screenshot: åbn kassen på enheden og bekræft at PayPal vises.",
    securityAlt: "PayPal-køberbeskyttelse og casino-licensmærker",
    securityCap: "PayPal plus synlig licens er en stærk tillidskombination.",
  },
  fi: {
    heroAlt: "Parhaat PayPal-kasinot suomalaisille pelaajille 2026",
    heroCap: "Lisensoidut operaattorit nopeilla PayPal-talletuksilla ja kotiutuksilla.",
    cashierAlt: "Kasinon kassa, jossa PayPal on talletus- ja kotiutusvaihtoehto",
    cashierCap: "Kuvakaappaus: avaa kassa laitteella ja varmista PayPal-näkyvyys.",
    securityAlt: "PayPal-ostajan suoja ja kasinon lisenssimerkit",
    securityCap: "PayPal ja näkyvä lisenssi muodostavat vahvan luottamuspaketin.",
  },
  no: {
    heroAlt: "Beste PayPal-kasinoer for norske spillere 2026",
    heroCap: "Lisensierte operatører med raske PayPal-innskudd og uttak.",
    cashierAlt: "Casino-kasse med PayPal som innskudds- og uttaksalternativ",
    cashierCap: "Skjermbilde: åpne kassen på enheten og bekreft at PayPal vises.",
    securityAlt: "PayPal-kjøperbeskyttelse og kasino-lisensmerker",
    securityCap: "PayPal pluss synlig lisens er en sterk tillitssignal.",
  },
  se: {
    heroAlt: "Bästa PayPal-casinon för svenska spelare 2026",
    heroCap: "Licensierade operatörer med snabba PayPal-insättningar och uttag.",
    cashierAlt: "Casino-kassa med PayPal som insättnings- och uttagsalternativ",
    cashierCap: "Skärmdump: öppna kassan på enheten och bekräfta att PayPal syns.",
    securityAlt: "PayPal-köparskydd och casino-licensmärken",
    securityCap: "PayPal plus synlig licens är en stark förtroendekombination.",
  },
};

const BLOCKED_TEXT = {
  ie: {
    heroAlt: "Online casinos paused from affiliate promotion on this site",
    heroCap: "Blocked here means we are not sending live referral links right now.",
    warnAlt: "Warning checklist for paused casino promotions",
    warnCap: "Affiliate pauses, compliance holds and expired tracking are common reasons.",
    altAlt: "Player choosing a licensed alternative casino",
    altCap: "Compare licence, banking and bonus terms before you switch brands.",
  },
  de: {
    heroAlt: "Online-Casinos, die vorübergehend nicht beworben werden",
    heroCap: "Gesperrt bedeutet hier: derzeit keine live Affiliate-Links von uns.",
    warnAlt: "Warn-Checkliste für pausierte Casino-Promotions",
    warnCap: "Affiliate-Pausen, Compliance-Holds und abgelaufenes Tracking sind typische Gründe.",
    altAlt: "Spieler wählt ein lizenziertes Alternativ-Casino",
    altCap: "Vergleichen Sie Lizenz, Banking und Bonusbedingungen vor dem Wechsel.",
  },
  dk: {
    heroAlt: "Online casinoer sat på pause fra affiliate-promovering på dette site",
    heroCap: "Blokeret betyder her: ingen live henvisningslinks fra os lige nu.",
    warnAlt: "Advarselstjekliste for pausede casino-kampagner",
    warnCap: "Affiliate-pauser, compliance-holds og udløbet tracking er almindelige årsager.",
    altAlt: "Spiller vælger et licenseret alternativt casino",
    altCap: "Sammenlign licens, betalinger og bonusvilkår før du skifter mærke.",
  },
  fi: {
    heroAlt: "Verkkokasinot, joiden affiliate-mainonta on tauolla tällä sivustolla",
    heroCap: "Estetty tarkoittaa: emme lähetä live-viittauslinkkejä juuri nyt.",
    warnAlt: "Varoituslista keskeytetyille kasinokampanjoille",
    warnCap: "Affiliate-tauot, compliance-pidätykset ja vanhentunut seuranta ovat yleisiä syitä.",
    altAlt: "Pelaaja valitsee lisensoidun vaihtoehtokasinon",
    altCap: "Vertaa lisenssiä, maksuja ja bonusehtoja ennen brändinvaihtoa.",
  },
  no: {
    heroAlt: "Nettkasinoer satt på pause fra affiliate-promotering på dette nettstedet",
    heroCap: "Blokkert betyr her: ingen live henvisningslenker fra oss akkurat nå.",
    warnAlt: "Advarselssjekkliste for pausede kasino-kampanjer",
    warnCap: "Affiliate-pauser, compliance-holds og utløpt sporing er vanlige årsaker.",
    altAlt: "Spiller velger et lisensiert alternativt kasino",
    altCap: "Sammenlign lisens, betalinger og bonusvilkår før du bytter merke.",
  },
  se: {
    heroAlt: "Onlinecasinon pausade från affiliate-marknadsföring på den här sidan",
    heroCap: "Blockerad betyder här: inga live-referenslänkar från oss just nu.",
    warnAlt: "Varningschecklista för pausade casinokampanjer",
    warnCap: "Affiliate-pauser, compliance-holds och utgången spårning är vanliga skäl.",
    altAlt: "Spelare väljer ett licensierat alternativt casino",
    altCap: "Jämför licens, betalningar och bonusvillkor innan du byter varumärke.",
  },
};

function injectBeforeId(content, beforeId, block) {
  const re = new RegExp(
    `(\\n)(  - kind: contentComponent\\n    id: ${escapeRe(beforeId)})`,
    "m",
  );
  if (!re.test(content)) throw new Error(`Could not find beforeId ${beforeId}`);
  return content.replace(re, `\n${block}$1$2`);
}

function processPage(pageDir, locale, specs) {
  const fp = join(ROOT, pageDir, `${locale}.mdx`);
  let content = readFileSync(fp, "utf8");
  const marker = `#   id: ${specs[0].id}`;
  if (content.includes(marker)) {
    console.log("skip", pageDir, locale);
    return;
  }

  // Process in reverse order for beforeId injections on same anchor
  const ordered = [...specs].reverse();
  for (const spec of ordered) {
    const b = block(spec.id, spec.imageType, spec.src, spec.alt, spec.caption);
    if (spec.beforeId) {
      content = injectBeforeId(content, spec.afterId, b);
    } else {
      content = injectAfterId(content, spec.afterId, b, { isLast: spec.isLast });
    }
  }
  writeFileSync(fp, content);
  console.log("updated", pageDir, locale);
}

for (const [pageDir, locales] of Object.entries(PAGE_BLOCKS())) {
  for (const locale of LOCALES) {
    processPage(pageDir, locale, locales[locale]);
  }
}

const IMAGE_TYPES = {
  "new-casinos": {
    "nc-img-hero": ["ai-generated", "new-casinos-hero.webp"],
    "nc-img-review": ["stock", "new-casinos-how-we-review.webp"],
    "nc-img-safety": ["stock", "new-casinos-safety-checklist.webp"],
    "nc-img-bonus": ["ai-generated", "new-casinos-welcome-bonus.webp"],
    "nc-img-mobile": ["stock", "new-casinos-mobile-play.webp"],
  },
  "casino-bonuses": {
    "bn-img-hero": ["ai-generated", "casino-bonuses-hero.webp"],
    "bn-img-welcome": ["ai-generated", "casino-bonuses-welcome-offer.webp"],
    "bn-img-wagering": ["stock", "casino-bonuses-wagering.webp"],
    "bn-img-freespins": ["ai-generated", "casino-bonuses-free-spins.webp"],
    "bn-img-cashback": ["stock", "casino-bonuses-cashback-vip.webp"],
  },
};

function addImageTypeComments(pageDir) {
  const types = IMAGE_TYPES[pageDir];
  for (const locale of LOCALES) {
    const fp = join(ROOT, pageDir, `${locale}.mdx`);
    let content = readFileSync(fp, "utf8");
    let changed = false;
    for (const [id, [imageType, src]] of Object.entries(types)) {
      const comment = `  # imageType: ${imageType} | src: ${src} (in meta.json)`;
      const re = new RegExp(
        `(  - kind: image\\n    id: ${id}\\n)(    alt:)`,
        "m",
      );
      if (content.includes(comment)) continue;
      if (re.test(content)) {
        content = content.replace(re, `$1${comment}\n$2`);
        changed = true;
      }
    }
    if (changed) {
      writeFileSync(fp, content);
      console.log("imageType comments", pageDir, locale);
    }
  }
}

addImageTypeComments("new-casinos");
addImageTypeComments("casino-bonuses");
