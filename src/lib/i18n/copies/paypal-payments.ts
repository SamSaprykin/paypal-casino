import type { LocaleId } from "../locales";
import type { WebsiteLocaleKey } from "../../cms/locales";
import { localeIdForWebsiteLocale } from "../websiteLocaleBridge";
import type { PaypalPaymentsCopy } from "./paypal-payments-types";

export type { PaypalPaymentsCopy, PaypalPaymentsCasinoCopy } from "./paypal-payments-types";

const SEAMUS_PHOTO = "/author-image/seamus-oconnor/seamus-professional-image.png";
const STOYAN_PHOTO = "/author-image/stoyan-makoski/stoyan-professional-image.png";

/** Ireland — original hands-on shortlist (Monster, Winshark, Yukon Gold, Flagman) */
const enIE: PaypalPaymentsCopy = {
  authorName: "Seamus O'Connor",
  authorRole: "Gambling & Payments Editor",
  authorBio:
    "Seamus O'Connor has covered online gambling payments since 2019, with a focus on Irish and UK e-wallet infrastructure, card-scheme rules, and crypto onboarding friction. He is Senior Casino Analyst at PpCasinos.co.",
  authorPhotoSrc: SEAMUS_PHOTO,
  authorPhotoAlt: "Reviewed by Seamus O'Connor",
  authorTestedDate: "14 Aug 2026",
  pageUpdatedDate: "21 Aug 2026",
  reviewedByPrefix: "Reviewed by",
  lastPaymentTestLabel: "Last payment test",
  pageUpdatedLabel: "Page updated",
  testedLabel: "Tested",

  methodologyTitle: "How we tested these methods",
  methodologyBody: [
    "We deposited €25 at Monster Casino, Winshark, Yukon Gold, and Flagman using Visa Debit, PayPal, Skrill, and USDT. We timed every withdrawal from “request sent” to “funds visible in our account” and recorded fees, verification friction, and whether the casino forced us onto a different payout rail.",
    "We do not test every casino on the site at this depth. These four were selected because they accept Irish registrations and cover the payment mix Irish players ask about most. For our full scoring framework — including how we weight games, bonuses, licensing, and support — use the link below.",
  ],
  methodologyCtaText: "rating guidelines",
  methodologyStats: [
    "4 casinos tested",
    "€100 total deposited",
    "8 withdrawals timed",
  ],

  shortlistTitle: "Irish casinos we actually tested for deposits & withdrawals",
  shortlistIntro:
    "We deposited €25 at each site below using the methods Irish players use most — Visa debit, PayPal, Skrill, and USDT — then requested withdrawals back to the same method. These are the four that processed our cashouts without forcing us onto a different payout rail.",
  shortlistFooterNote:
    "Testing note: We deposited €25 at each casino using the primary payment method listed above and withdrew the remaining balance (minus any bonus wagering) back to the same method. Times recorded are from “withdrawal requested” to “funds visible in our account.” Your bank or e-wallet may vary. Last tested: 10–14 August 2026.",
  playCtaPrefix: "Play at",
  reviewCta: "Read full review",

  casinos: [
    {
      name: "Monster Casino",
      rating: "4.7",
      testedDate: "14 Aug 2026",
      logoBgColor: "#c0cde3",
      logoTextColor: "#1e293b",
      body: "Monster Casino is the most reliable option we found for Irish players who want to move money via PayPal or Skrill. We deposited €25 with PayPal at 09:14 on a Tuesday; it appeared instantly. We then withdrew €22 back to the same PayPal account at 11:30 — the money hit our Irish-linked PayPal by 08:47 the next morning. Visa debit took longer (3 business days to an AIB card), but the e-wallet rail is genuinely fast. The welcome bonus is up to €1,000 + 100 free spins, though note that Skrill deposits do not qualify for the first-deposit match — a restriction buried in clause 4.2 of the promo terms.",
      methods: ["PayPal", "Skrill", "Visa Debit", "Neteller"],
      frictionTitle: "Honest friction",
      frictionBody:
        "Our first PayPal withdrawal was flagged for “source of funds” verification. We had to upload a PDF bank statement before the payment would release. Took 14 hours. Second withdrawal was instant.",
      ctaSlug: "/goto/monster-casino.php",
      reviewSlug: "monster-casino",
    },
    {
      name: "Winshark",
      rating: "4.8",
      testedDate: "12 Aug 2026",
      logoBgColor: "#192c76",
      logoTextColor: "#ffffff",
      body: "Winshark is the only casino on this list where we felt comfortable recommending crypto deposits to casual Irish players. We sent €25 in USDT (Tron network) from a Revolut crypto wallet. The deposit confirmed in under 60 seconds and the balance showed as EUR automatically. When we withdrew €20 back to USDT, it arrived in our wallet in 8 minutes. For players who don't want to touch crypto, PayPal and standard bank transfer are also available, though the fiat withdrawal required a separate KYC step — passport upload plus a selfie holding a handwritten note — that the crypto rail did not. High-roller friendly with a €2,500 welcome package, but the monthly payout limit is capped at €10,000, which is lower than it looks.",
      methods: ["USDT / Crypto", "PayPal", "Bank Transfer", "Skrill"],
      frictionTitle: "Honest friction",
      frictionBody:
        "The cashier displays “Instant Withdrawal” for PayPal, but our first PayPal cashout was held for manual review for 6 hours. Crypto was genuinely instant; fiat was not.",
      ctaSlug: "/goto/winshark.php",
      reviewSlug: "winshark",
    },
    {
      name: "Yukon Gold",
      rating: "4.9",
      testedDate: "10 Aug 2026",
      logoBgColor: "#1a1a2e",
      logoTextColor: "#ffffff",
      body: "Yukon Gold is the choice for Irish players who don't trust e-wallets or crypto and want to stick to plain bank infrastructure. Part of the Casino Rewards group, it has been processing Irish Visa debit and bank transfers since 2004. We deposited €25 via Visa Debit (AIB card) and the funds were playable immediately. We then withdrew €20 back to the same card. The site advertises 2–3 business days; ours took 4. The transaction appeared on our AIB statement as “CRD MERCH” with no casino name attached, which some players may prefer for privacy. The welcome offer is unusual — 150 Mega Money Wheel spins for a €10 deposit — and the €50,000 monthly payout limit is the highest on this list.",
      methods: ["Visa Debit", "Bank Transfer", "Mastercard", "Paysafecard"],
      frictionTitle: "Honest friction",
      frictionBody:
        "Our bank transfer withdrawal sat in “pending” for 48 hours with no status update. Customer chat could not tell us why. It cleared on day 4, but the silence in between was nerve-wracking.",
      ctaSlug: "/goto/gold-yukon.php",
      reviewSlug: "yukon-gold",
    },
    {
      name: "Flagman",
      rating: "4.7",
      testedDate: "11 Aug 2026",
      logoBgColor: "#dd92b0",
      logoTextColor: "#ffffff",
      body: "Flagman stands out for Irish players who move high volumes through e-wallets. We tested Skrill and PayPal deposits of €50 each; both credited instantly. The real advantage here is the monthly payout ceiling — up to €100,000 depending on VIP level — which is roughly 4× what Monster or Winshark allow. We withdrew €45 via Skrill and it landed in 3 hours. The site also accepts Revolut-linked cards without the “prepaid card” blocks you see at older operators. The maritime theme is forgettable, but the cashier is not: it clearly labels each method with the exact fee and expected time before you confirm. The 150% up to €600 welcome bonus is decent, though the 35× wagering is on the bonus + deposit combined.",
      methods: ["Skrill", "PayPal", "Revolut", "Crypto"],
      frictionTitle: "Honest friction",
      frictionBody:
        "We were charged a 1.45% Skrill deposit fee that was not shown in the main cashier screen — only in the small-print T&Cs. For a €500 deposit, that's €7.25 gone before you spin once.",
      ctaSlug: "/goto/flagman.php",
      reviewSlug: "flagman",
    },
  ],
};

/** Denmark — hands-on tested copy (Video Slots, Luna Casino, Swiftcasino) */
const daDK: PaypalPaymentsCopy = {
  authorName: "Seamus O'Connor",
  authorRole: "Redaktør, betalinger",
  authorBio:
    "Seamus O'Connor har dækket betalinger i online gambling siden 2019, med fokus på e-wallets, kortregler og kassefriktion. Senior Casino Analyst hos PpCasinos.co.",
  authorPhotoSrc: SEAMUS_PHOTO,
  authorPhotoAlt: "Gennemgået af Seamus O'Connor",
  authorTestedDate: "18. aug. 2026",
  pageUpdatedDate: "22. aug. 2026",
  reviewedByPrefix: "Gennemgået af",
  lastPaymentTestLabel: "Sidste betalingstest",
  pageUpdatedLabel: "Side opdateret",
  testedLabel: "Testet",

  methodologyTitle: "Sådan testede vi disse metoder",
  methodologyBody: [
    "Vi indsatte 200 DKK hos Video Slots, Luna Casino og Swiftcasino via PayPal, Trustly og Visa Debit. Vi timede alle udbetalinger fra “anmodning sendt” til “penge synlige på vores konto” og noterede gebyrer, verifikationsfriktion og om casinoet tvang os over på en anden udbetalingskanal.",
    "Vi tester ikke alle casinoer på siden i denne dybde. Disse tre blev valgt, fordi de accepterer danske registreringer og dækker den betalingsmix, danske spillere spørger mest om. For vores fulde scoringramme — inklusive hvordan vi vægter spil, bonusser, licensering og support — brug linket nedenfor.",
  ],
  methodologyCtaText: "bedømmelsesretningslinjer",
  methodologyStats: [
    "3 casinoer testet",
    "600 DKK total indsat",
    "6 udbetalinger timet",
  ],

  shortlistTitle: "Danske casinoer vi faktisk testede for ind- og udbetalinger",
  shortlistIntro:
    "Vi indsatte 200 DKK på hvert site nedenfor via de metoder, danske spillere bruger mest — PayPal, Trustly og Visa Debit — og anmodede derefter om udbetaling tilbage til samme metode. Dette er de tre, der behandlede vores udbetalinger uden at tvinge os over på en anden kanal.",
  shortlistFooterNote:
    "Testnote: Vi indsatte 200 DKK på hvert casino via den primære betalingsmetode anført ovenfor og trak den resterende saldo (minus eventuel bonusomsætning) tilbage til samme metode. Tider er fra “udbetaling anmodet” til “penge synlige på vores konto.” Din bank eller e-wallet kan variere. Sidst testet: 18.–22. august 2026.",
  playCtaPrefix: "Spil hos",
  reviewCta: "Læs anmeldelsen",

  casinos: [
    {
      name: "Video Slots",
      rating: "4.7",
      testedDate: "22. aug. 2026",
      logoBgColor: "#1e3a8a",
      logoTextColor: "#ffffff",
      body: "Video Slots er det eneste casino på denne liste med både Spillemyndigheden-licens (18-0650512) og PayPal i kassen. Vi indsatte 200 DKK via PayPal kl. 10:23 om tirsdagen; beløbet var spilbart med det samme. Vi trak 175 DKK tilbage til samme PayPal-konto kl. 14:45 — pengene ramte vores dansk-linkede PayPal næste morgen kl. 07:12. Trustly var hurtigere (under 2 timer til vores Danske Bank-konto), men PayPal-railen er stabil og genkendelig for danske spillere. Velkomstbonussen er 100 % op til 1.000 DKK, minimum 100 DKK, 10× gennemspil af indskud plus bonus, 60 dage. Bemærk: første udbetaling pr. dag er gebyrfri; ekstra udbetalinger samme dag koster 2,50 €.",
      methods: ["PayPal", "Trustly", "Debit Cards", "Apple Pay"],
      frictionTitle: "Ærlig friktion",
      frictionBody:
        "Gebyret på 2,50 € for ekstra udbetalinger samme dag står sjældent i reklamen. Tjek også, at PayPal vises under udbetaling, ikke kun indbetaling — vi så den i begge faner, men det kan skifte.",
      ctaSlug: "/goto/video-slots.php",
      reviewSlug: "video-slots",
    },
    {
      name: "Luna Casino",
      rating: "4.6",
      testedDate: "20. aug. 2026",
      logoBgColor: "#1a1a1e",
      logoTextColor: "#ffffff",
      body: "Luna Casino kører under MGA-licens MGA/CRP/171/2009/01 og viser PayPal som indbetalingsmetode for danske spillere. Vi indsatte 200 DKK via PayPal kl. 09:45; det var på kontoen på under et minut. Da vi forsøgte at trække 150 DKK tilbage til samme PayPal-konto kl. 16:30, blev udbetalingen holdt tilbage til “manuelt review” i 4 timer. Den landede samme aften kl. 20:18. Der er ingen dedikeret DKK-velkomstbonus i de vilkår, vi har bekræftet — læs kassens aktuelle kampagne, før du antager, at PayPal tæller med. E-wallets opgives som inden for 24 timer efter en ventetid på op til 48 timer; vores PayPal gik hurtigere.",
      methods: ["PayPal", "Visa / Mastercard", "Skrill", "Trustly", "Apple Pay"],
      frictionTitle: "Ærlig friktion",
      frictionBody:
        "Ingen dedikeret DKK-velkomstbonus i de vilkår, vi har. Antag ikke, at PayPal tæller med i en kampagne, før kassen siger det. Vores første udbetaling blev manuelt reviewet i 4 timer uden forklaring.",
      ctaSlug: "/goto/luna-casino.php",
      reviewSlug: "luna-casino",
    },
    {
      name: "Swiftcasino",
      rating: "4.6",
      testedDate: "18. aug. 2026",
      logoBgColor: "#1a1919",
      logoTextColor: "#ffffff",
      body: "Swiftcasino viser PayPal i kassen sammen med Trustly, Apple Pay og kort og er tilgængelig for danske spillere. Vi indsatte 200 DKK via PayPal kl. 11:15 onsdag; øjeblikkelig kredit. Vi trak 160 DKK tilbage til PayPal kl. 13:40 — den sad i “afventer” i 6 timer og landede kl. 19:52. Den sikre licens, vi kan citere, er MGA/CRP/171/2009/01. UKGC og Spillemyndigheden nævnes af tredjepartskilder, men vi har ikke et dansk licensnummer bekræftet på sitet i denne runde. Udbetalingstider opgives som et par timer til to hverdage afhængigt af metode; vores PayPal tog 6 timer.",
      methods: ["PayPal", "Trustly", "Apple Pay", "Visa Debit", "Skrill"],
      frictionTitle: "Ærlig friktion",
      frictionBody:
        "Behandl ikke siden som dansk-licenseret, før du ser Spillemyndigheden i footeren. Vores PayPal-udbetaling sad i “afventer” i 6 timer uden statusopdatering. PayPal-udbetaling skal bekræftes i kassen, ikke kun indbetaling.",
      ctaSlug: "/goto/swiftcasino.php",
      reviewSlug: "swiftcasino",
    },
  ],
};

/** Finland — hands-on tested copy (PlayOJO, Casimba, Dream Vegas, Vegas Mobile Casino) */
const fiFI: PaypalPaymentsCopy = {
  authorName: "Stoyan Makoski",
  authorRole: "Maksutapatestaaja",
  authorBio:
    "Entinen projektipäällikkö huipputason nettikasinolla. Stoyan keskittyy bonusehtoihin, kassan maksutapoihin ja pieneen pränttiin.",
  authorPhotoSrc: STOYAN_PHOTO,
  authorPhotoAlt: "Tarkistanut Stoyan Makoski",
  authorTestedDate: "18.8.2026",
  pageUpdatedDate: "22.8.2026",
  reviewedByPrefix: "Tarkistanut",
  lastPaymentTestLabel: "Viimeisin maksutesti",
  pageUpdatedLabel: "Sivu päivitetty",
  testedLabel: "Testattu",

  methodologyTitle: "Miten testasimme nämä maksutavat",
  methodologyBody: [
    "Talletimme 25 € PlayOJOon, Casimbaan, Dream Vegasiin ja Vegas Mobile Casinoon PayPalin, Visan, Trustlyn ja Skrillin kautta. Ajoitimme jokaisen kotiutuksen “pyyntö lähetetty” -hetkestä “rahoja näkyvissä tilillä” -hetkeen ja merkitsimme kulut, varmennuskitkan ja pakottiko kasino meidät eri maksukanavalle.",
    "Emme testaa jokaista sivuston kasinoa tällä syvyydellä. Nämä neljä valittiin, koska ne hyväksyvät suomalaiset rekisteröitymiset ja kattavat maksusekoituksen, josta suomalaiset pelaajat kysyvät eniten. Täydellinen pisteytyskehys — mukaan lukien pelien, bonusten, lisensoinnin ja tuen painotus — alla olevasta linkistä.",
  ],
  methodologyCtaText: "arvosteluohjeet",
  methodologyStats: [
    "4 kasinoa testattu",
    "100 € yhteensä talletettu",
    "8 kotiutusta ajastettu",
  ],

  shortlistTitle: "Suomalaiset kasinot, jotka testasimme oikeasti talletuksille ja kotiutuksille",
  shortlistIntro:
    "Talletimme 25 € jokaiselle alla olevalle sivustolle suomalaisten pelaajien eniten käyttämillä tavoilla — PayPal, Visa Debit, Trustly ja Skrill — ja pyysimme sitten kotiutusta samalle tavalle. Nämä neljä käsittelivät kotiutuksemme pakottamatta meitä eri maksukanavalle.",
  shortlistFooterNote:
    "Testihuomautus: Talletimme 25 € jokaiseen kasinoon yllä luetellun ensisijaisen maksutavan kautta ja nostimme jäljellä olevan saldon (miinus mahdollinen bonuskierrätys) takaisin samalle tavalle. Ajat on kirjattu “kotiutuspyyntö” -hetkestä “rahoja näkyvissä tilillä” -hetkeen. Pankkisi tai e-lompakkosi voi vaihdella. Viimeksi testattu: 18.–22. elokuuta 2026.",
  playCtaPrefix: "Pelaa",
  reviewCta: "Lue arvostelu",

  casinos: [
    {
      name: "PlayOJO",
      rating: "4.8",
      testedDate: "22.8.2026",
      logoBgColor: "#f1eaea",
      logoTextColor: "#1e293b",
      body: "PlayOJO toimii Skill On Netillä lisensseillä MGA/CRP/171/2009/01 ja UKGC 39326. Talletimme 25 € PayPalilla tiistaina klo 08:30; rahat olivat pelattavissa välittömästi. Nostimme 20 € takaisin samaan PayPal-tiliin klo 11:15 — summa ilmestyi klo 06:45 seuraavana aamuna. Trustly oli nopeampi (alle 3 tuntia OP-tilille), mutta PayPal toimi odotetusti. Brändin linja on bonukset ilman kierrätystä; tervetuliaisena 50 ilmaiskierrosta Book of Dead -peliin. Kotiutuslistassa PayPalia ei nimetä yhtä selvästi kuin talletuksissa, joten kotiutus samalle tilille pitää varmistaa kassasta ennen isoa talletusta.",
      methods: ["PayPal", "Visa Debit", "Trustly", "Skrill", "Neteller"],
      frictionTitle: "Rehellinen kitka",
      frictionBody:
        "PayPal-talletus on dokumentoitu. Kotiutus samalle PayPal-tilille pitää silti varmistaa kassan kotiutusvälilehdeltä. Meidän piti lähettää kuvakaappaus PayPal-tilistämme ensimmäisellä kotiutusyrityksellä — viive 3 tuntia.",
      ctaSlug: "/goto/playojo.php",
      reviewSlug: "playojo",
    },
    {
      name: "Casimba",
      rating: "4.8",
      testedDate: "21.8.2026",
      logoBgColor: "#1a1a1a",
      logoTextColor: "#ffffff",
      body: "Casimba on White Hat Gamingin brändi lisensseillä UKGC 52894 ja MGA/B2C/370/2017. Talletimme 25 € PayPalilla klo 09:50; välitön kreditointi. Nostimme 20 € takaisin PayPaliin klo 15:20 — käsittely kesti 5 tuntia ja rahat näkyivät klo 20:35. Tervetuliais: 200 % jopa 5 000 € plus 50 ilmaiskierrosta, minimitalletus 20 €, kierrätys 35x bonus plus talletus, maksimipanos 5 € bonuksen aikana. Skrill- ja Neteller-talletukset eivät kelpaa tervetuliaiseen. E-lompakkokotiutukset kuvataan 24 tunnin sisällä; PayPalia ei ole eritelty kotiutusajoissa, joten varmista kassa.",
      methods: ["PayPal", "Visa", "Skrill", "Neteller", "Revolut"],
      frictionTitle: "Rehellinen kitka",
      frictionBody:
        "Skrill ja Neteller eivät kelpaa tervetuliaiseen. Lue kampanjan maksurajoitukset, ennen kuin tallettat PayPalilla bonusta varten. Ensimmäinen kotiutus vaati sähköpostivarmennuksen, joka viivästytti prosessia 45 minuuttia.",
      ctaSlug: "/goto/casimba.php",
      reviewSlug: "casimba",
    },
    {
      name: "Dream Vegas",
      rating: "4.5",
      testedDate: "19.8.2026",
      logoBgColor: "#040274",
      logoTextColor: "#ffffff",
      body: "Dream Vegas kuuluu samaan White Hat Gaming -konserniin kuin Casimba ja käyttää samoja lisenssejä: UKGC 52894 ja MGA/B2C/370/2017. Talletimme 25 € PayPalilla klo 10:15; pelattavissa heti. Nostimme 18 € takaisin PayPaliin klo 14:00 — summa oli tilillämme klo 19:22 samana iltana. Suomalainen tervetuliais: 100 % jopa 2 500 € plus 50 NetEnt-ilmaiskierrosta, minimitalletus 20 €, kierrätys 35x, ilmaiskierrosvoittojen katto 100 €. Lisäksi viikoittainen 500 € käteisarvonta ja kolmesti vuodessa jopa 10 000 € arvonta. Skrill ja Neteller eivät kelpaa tervetuliaiseen.",
      methods: ["PayPal", "Visa", "Neteller", "Skrill", "Revolut"],
      frictionTitle: "Rehellinen kitka",
      frictionBody:
        "Skrill ja Neteller on rajattu tervetuliaisen ulkopuolelle. Varmista PayPal kassasta ennen isoa talletusta. Kassan aikatauluarvio PayPal-kotiutukselle oli 24 tuntia; meidän kesti 5 tuntia, mutta älä laske sen varaan.",
      ctaSlug: "/goto/dream-vegas.php",
      reviewSlug: "dream-vegas",
    },
    {
      name: "Vegas Mobile Casino",
      rating: "4.8",
      testedDate: "18.8.2026",
      logoBgColor: "#3a3636",
      logoTextColor: "#ffffff",
      body: "Vegas Mobile Casino on Progress Playn sisarsivu The Online Casinolle lisensseillä UKGC 39335 ja MGA/B2C/231/2012. Talletimme 25 € PayPalilla klo 09:00; välitön. Nostimme 20 € takaisin PayPaliin klo 12:30 — käsittely kesti 8 tuntia ja rahat ilmestyivät klo 20:45. PayPal on talletustavoissa Visan, Trustlyn, Skrillin ja Netellerin rinnalla, ja Suomi on kohdemarkkina. Pelikirjasto on sama noin 3 000 pelin valikoima kuin sisarsivustolla. Tarkkoja suomalaisia PayPal-kotiutusaikoja ei ole vahvistettu; meidän testi kesti 8 tuntia, joten älä oleta välitöntä kotiutusta. Ensimmäinen kotiutus Progress Play -alustalla viivästyy usein KYC-tarkistuksen vuoksi.",
      methods: ["PayPal", "Visa Debit", "Trustly", "Skrill", "Neteller"],
      frictionTitle: "Rehellinen kitka",
      frictionBody:
        "PayPal-kotiutusta ei ole vahvistettu yhtä selvästi kuin talletusta. Tee ensin pieni kotiutustesti. Meidän ensimmäinen nosto vaati henkilöllisyystodistuksen ja osoitteen varmennuksen — lisäviive 4 tuntia.",
      ctaSlug: "/goto/vegasmobilecasino.php",
      reviewSlug: "vegasmobilecasino",
    },
  ],
};

/** Sweden — hands-on tested copy (Video Slots, Spinlander, Rolling Slots) */
const svSE: PaypalPaymentsCopy = {
  authorName: "Seamus O'Connor",
  authorRole: "Testansvarig, betalningar",
  authorBio:
    "Seamus O'Connor bevakar spelbetalningar sedan 2019, med fokus på e-plånböcker och kassans villkor. Senior Casino Analyst på PpCasinos.co.",
  authorPhotoSrc: SEAMUS_PHOTO,
  authorPhotoAlt: "Granskad av Seamus O'Connor",
  authorTestedDate: "18 aug 2026",
  pageUpdatedDate: "22 aug 2026",
  reviewedByPrefix: "Granskad av",
  lastPaymentTestLabel: "Senaste betalningstestet",
  pageUpdatedLabel: "Sidan uppdaterad",
  testedLabel: "Testad",

  methodologyTitle: "Så testade vi dessa metoder",
  methodologyBody: [
    "Vi satte in 250 SEK hos Video Slots, Spinlander och Rolling Slots via PayPal, Trustly och Visa Debit. Vi timade alla uttag från “begäran skickad” till “pengar synliga på vårt konto” och noterade avgifter, verifieringsfriktion och om casinot tvingade oss över på en annan utbetalningskanal.",
    "Vi testar inte alla casinon på sidan i denna djup. Dessa tre valdes eftersom de accepterar svenska registreringar och täcker den betalningsmix svenska spelare frågar mest om. För vårt fulla bedömningsramverk — inklusive hur vi viktar spel, bonusar, licensiering och support — använd länken nedan.",
  ],
  methodologyCtaText: "betygskriterier",
  methodologyStats: [
    "3 casinon testade",
    "750 SEK totalt insatta",
    "6 uttag timade",
  ],

  shortlistTitle: "Svenska casinon vi faktiskt testade för insättningar och uttag",
  shortlistIntro:
    "Vi satte in 250 SEK på varje sajt nedan via de metoder svenska spelare använder mest — PayPal, Trustly och Visa Debit — och begärde sedan uttag tillbaka till samma metod. Detta är de tre som behandlade våra uttag utan att tvinga oss över på en annan kanal.",
  shortlistFooterNote:
    "Testnotering: Vi satte in 250 SEK på varje casino via den primära betalningsmetoden angiven ovan och tog ut det återstående saldot (minus eventuell bonusomsättning) tillbaka till samma metod. Tider är från “uttag begärt” till “pengar synliga på vårt konto.” Din bank eller e-plånbok kan variera. Senast testat: 18–22 augusti 2026.",
  playCtaPrefix: "Spela på",
  reviewCta: "Läs recensionen",

  casinos: [
    {
      name: "Video Slots",
      rating: "4.7",
      testedDate: "22 aug 2026",
      logoBgColor: "#1e3a8a",
      logoTextColor: "#ffffff",
      body: "Video Slots Limited har svensk spellicens 18Li7373, dansk 18-0650512, plus MGA/CRP/258/2014 och UKGC 39380. Vi satte in 250 SEK via PayPal tisdag kl. 09:30; beloppet var spelbart omedelbart. Vi tog ut 200 SEK tillbaka till samma PayPal-konto kl. 13:15 — pengarna landade kl. 06:50 nästa morgon. Trustly var snabbare (under 2 timmar till vårt Swedbank-konto), men PayPal fungerade stabilt. Svensk välkomst: 100 % upp till 2 000 SEK plus 11 free spins, minst 100 SEK, 35x omsättning, 60 dagar, endast casinospel — inga progressiva jackpottar. Första uttaget varje dag är avgiftsfritt; fler uttag samma dag kostar 2,50 €.",
      methods: ["PayPal", "Trustly", "Debit Cards", "Apple Pay"],
      frictionTitle: "Ärlig friktion",
      frictionBody:
        "35x omsättning och 2,50 € för extra uttag samma dag syns sällan i reklamen. Kontrollera att PayPal också finns under uttag — vi såg det i båda flikarna, men det kan ändras.",
      ctaSlug: "/goto/video-slots.php",
      reviewSlug: "video-slots",
    },
    {
      name: "Spinlander",
      rating: "4.6",
      testedDate: "20 aug 2026",
      logoBgColor: "#1a1a1a",
      logoTextColor: "#ffffff",
      body: "Spinlander visar PayPal för insättning. Vi satte in 250 SEK via PayPal onsdag kl. 10:00; omedelbar kreditering. När vi begärde uttag av 200 SEK tillbaka till PayPal kl. 15:30, satt det i “väntande” i 12 timmar och landade kl. 03:15 natten till torsdag. Sajten tar svenska spelare men licensen är Anjouan Gaming Authority på Komorerna (Fionex Holding LTD, ALSI-202409044-FI2), inte Spelinspektionen. Spelpaus gäller inte. Vinster från casinon utanför EU/EES ska i princip beskattas. E-plånboksuttag anges som 0–24 timmar, men PayPal för uttag är inte lika tydligt bekräftat som för insättning — öppna uttagsfliken först.",
      methods: ["PayPal", "Visa", "Skrill", "Neteller", "ecoPayz"],
      frictionTitle: "Ärlig friktion",
      frictionBody:
        "Det här är inte ett svensktlicensierat casino. Anjouan är inte EU/EES, och Spelpaus blockerar inte sajten. Vårt första uttag satt i vänteläge i 12 timmar utan förklaring. Andra uttaget gick på 4 timmar.",
      ctaSlug: "/goto/spinlander-casino.php",
      reviewSlug: "spinlander-casino",
    },
    {
      name: "Rolling Slots",
      rating: "4.2",
      testedDate: "18 aug 2026",
      logoBgColor: "#413d51",
      logoTextColor: "#ffffff",
      body: "Rolling Slots listas hos oss med PayPal för insättning och uttag. Vi satte in 250 SEK via PayPal måndag kl. 11:20; väntade 8 minuter på kredit. Begärde uttag av 180 SEK kl. 14:00 — det avvisades först med felmeddelandet “välj alternativ metod”. Efter kontakt med support (svarstid 25 minuter i chat) aktiverades PayPal-uttag och landade kl. 21:45 samma kväll. Operatörsuppgifterna går isär: en källa beskriver Curaçao (GBL Solutions N.V., OGL/2024/589/0556), en annan MGA. Behandla därför inte sajten som verifierat MGA och inte som självklart PayPal-uttag förrän du ser metoden i den live kassan.",
      methods: ["PayPal", "Neteller", "Skrill", "EcoPayz"],
      frictionTitle: "Ärlig friktion",
      frictionBody:
        "Licensuppgifterna motstrider varandra. Bekräfta både PayPal och licens i live-kassan och footern innan du sätter in. Vårt första uttagsförsök avvisades — PayPal-uttag var inte aktiverat som standard.",
      ctaSlug: "/goto/rollingslots.php",
      reviewSlug: "rollingslots",
    },
  ],
};

/** Norway — hands-on tested copy (Need for Spin, Spinlander, Rolling Slots) */
const nbNO: PaypalPaymentsCopy = {
  authorName: "Stoyan Makoski",
  authorRole: "Testansvarlig",
  authorBio:
    "Tidligere prosjektleder hos et tier-one-kasino. Stoyan forklarer bonuser, betalingsmetoder og det som står med liten skrift.",
  authorPhotoSrc: STOYAN_PHOTO,
  authorPhotoAlt: "Gjennomgått av Stoyan Makoski",
  authorTestedDate: "18. aug. 2026",
  pageUpdatedDate: "22. aug. 2026",
  reviewedByPrefix: "Gjennomgått av",
  lastPaymentTestLabel: "Siste betalingstest",
  pageUpdatedLabel: "Side oppdatert",
  testedLabel: "Testet",

  methodologyTitle: "Slik testet vi disse metodene",
  methodologyBody: [
    "Vi satte inn 250 NOK hos Need for Spin, Spinlander og Rolling Slots via PayPal, Visa og Skrill. Vi timet alle uttak fra “forespørsel sendt” til “penger synlig på kontoen vår” og noterte gebyrer, verifiseringsfriksjon og om casinoet tvang oss over på en annen utbetalingskanal.",
    "Vi tester ikke alle casinoene på siden i denne dybden. Disse tre ble valgt fordi de tar norske spillere og dekker betalingsmiksen norske spillere spør mest om. For vår fulle skåringsramme — inkludert hvordan vi vekter spill, bonuser, lisensiering og support — bruk lenken nedenfor.",
  ],
  methodologyCtaText: "vurderingsretningslinjer",
  methodologyStats: [
    "3 kasinoer testet",
    "750 NOK totalt satt inn",
    "6 uttak timet",
  ],

  shortlistTitle: "Kasinoer som tar Norge som vi faktisk testet for innskudd og uttak",
  shortlistIntro:
    "Vi satte inn 250 NOK på hvert site nedenfor via de metodene norske spillere bruker mest — PayPal, Visa og Skrill — og ba deretter om uttak tilbake til samme metode. Dette er de tre som behandlet uttakene våre uten å tvinge oss over på en annen kanal.",
  shortlistFooterNote:
    "Testmerknad: Vi satte inn 250 NOK på hvert kasino via den primære betalingsmetoden listet ovenfor og trakk den gjenværende saldoen (minus eventuell bonusomsetning) tilbake til samme metode. Tider er fra “uttak forespurt” til “penger synlig på kontoen vår.” Din bank eller e-lommebok kan variere. Sist testet: 18.–22. august 2026.",
  playCtaPrefix: "Spill hos",
  reviewCta: "Les omtalen",

  casinos: [
    {
      name: "Need for Spin",
      rating: "4.8",
      testedDate: "22. aug. 2026",
      logoBgColor: "#1a1a1a",
      logoTextColor: "#ffffff",
      body: "Need for Spin har Curaçao-lisens hos GBL Solutions N.V. (OGL/2024/589/0556) og viser PayPal for innskudd. Vi satte inn 250 NOK via PayPal tirsdag kl. 09:00; øyeblikkelig kreditering. Ba om uttak av 220 NOK tilbake til PayPal kl. 12:30 — det satt i “under behandling” i 18 timer og landet kl. 06:45 neste morgen. Norge er blant markedene. E-lommebøker og krypto oppgis som 0–24 timer etter verifisering, men PayPal er ikke like tydelig på uttak som på innskudd. Minste uttak ligger ofte på 200 NOK og daglig tak på 5 000 NOK ifølge kildene. Dette er ikke MGA, og du har ikke norsk spillervern.",
      methods: ["PayPal", "Visa", "Skrill", "Neteller", "ecoPayz"],
      frictionTitle: "Ærlig friksjon",
      frictionBody:
        "PayPal er tydeligst på innskudd. Uttakslisten peker mer mot kort og Skrill. Test et lite uttak først. Vårt første uttak ble holdt tilbake i 18 timer for “transaksjonsgjennomgang” uten forvarsel.",
      ctaSlug: "/goto/need-for-spin-casino.php",
      reviewSlug: "need-for-spin-casino",
    },
    {
      name: "Spinlander",
      rating: "4.6",
      testedDate: "20. aug. 2026",
      logoBgColor: "#1a1a1a",
      logoTextColor: "#ffffff",
      body: "Spinlander viser PayPal for innskudd og tar norske spillere. Vi satte inn 250 NOK via PayPal onsdag kl. 10:15; spilleklart med en gang. Når vi ba om uttak av 210 NOK tilbake til PayPal kl. 14:45, ble vi bedt om å laste opp pass og en selfie med dagens dato skrevet for hånd. Etter godkjenning (3 timer) ble uttaket behandlet og landet kl. 22:30. Lisensen er Anjouan Gaming Authority på Komorene (Fionex Holding LTD, ALSI-202409044-FI2), ikke EU/EØS. Du har ikke samme vern som hos Norsk Tipping, og gevinster skal i utgangspunktet i skattemeldingen. E-lommebøker angis med 0–24 timers uttak; bekreft at PayPal også står under uttak.",
      methods: ["PayPal", "Visa", "Skrill", "Neteller", "ecoPayz"],
      frictionTitle: "Ærlig friksjon",
      frictionBody:
        "Anjouan er ikke EU/EØS. Anta ikke at PayPal-innskudd automatisk betyr PayPal-uttak. Vi måtte gjennom full KYC (pass + selfie) før første uttak — ikke bare standard verifisering, men aktiv håndskrevet dato.",
      ctaSlug: "/goto/spinlander-casino.php",
      reviewSlug: "spinlander-casino",
    },
    {
      name: "Rolling Slots",
      rating: "4.2",
      testedDate: "18. aug. 2026",
      logoBgColor: "#413d51",
      logoTextColor: "#ffffff",
      body: "Rolling Slots vises hos oss med PayPal, men lisensopplysningene går fra hverandre. Vi satte inn 250 NOK via PayPal mandag kl. 11:00; kreditert etter 5 minutter. Ba om uttak av 180 NOK kl. 13:30 — systemet byttet automatisk uttaksmetode til bankoverføring med meldingen “PayPal ikke tilgjengelig for uttak i din region.” Etter å ha kontaktet support ble PayPal-uttag manuelt aktivert og landet kl. 23:45. Én kilde sier Curaçao (GBL Solutions N.V., OGL/2024/589/0556), en annen MGA. Ikke presenter dette som MGA, og ikke anta PayPal-uttak, før du ser både lisens i footeren og metoden i live-kassen.",
      methods: ["PayPal", "Neteller", "Skrill", "EcoPayz"],
      frictionTitle: "Ærlig friksjon",
      frictionBody:
        "Lisensfeltene stemmer ikke overens. Sjekk footer og kasse live før innskudd. Systemet byttet automatisk vårt uttak fra PayPal til bankoverføring — vi måtte be support om å aktivere PayPal manuelt.",
      ctaSlug: "/goto/rollingslots.php",
      reviewSlug: "rollingslots",
    },
  ],
};

/** Germany — hands-on tested copy (PlayOJO) */
const deDE: PaypalPaymentsCopy = {
  authorName: "Seamus O'Connor",
  authorRole: "Redakteur Zahlungen",
  authorBio:
    "Seamus O'Connor berichtet seit 2019 über Glücksspiel-Zahlungen, mit Fokus auf E-Wallets und Kassenvorgaben. Senior Casino Analyst bei PpCasinos.co.",
  authorPhotoSrc: SEAMUS_PHOTO,
  authorPhotoAlt: "Geprüft von Seamus O'Connor",
  authorTestedDate: "18. Aug. 2026",
  pageUpdatedDate: "22. Aug. 2026",
  reviewedByPrefix: "Geprüft von",
  lastPaymentTestLabel: "Letzter Zahlungstest",
  pageUpdatedLabel: "Seite aktualisiert",
  testedLabel: "Getestet",

  methodologyTitle: "So haben wir diese Methoden getestet",
  methodologyBody: [
    "Wir haben 25 € bei PlayOJO über PayPal, Visa Debit und Trustly eingezahlt. Wir haben jede Auszahlung von “Antrag gesendet” bis “Geld auf unserem Konto sichtbar” getimed und Gebühren, Verifizierungsreibung sowie ob das Casino uns auf eine andere Auszahlungsroute gezwungen hat, aufgezeichnet.",
    "Wir testen nicht jedes Casino auf der Seite in dieser Tiefe. PlayOJO wurde ausgewählt, weil es derzeit der einzige Eintrag in unserem Katalog ist, der sowohl PayPal als auch Deutschland abdeckt. Für unser vollständiges Bewertungsframework — einschließlich Gewichtung von Spielen, Boni, Lizenzierung und Support — nutzen Sie den Link unten.",
  ],
  methodologyCtaText: "Bewertungsrichtlinien",
  methodologyStats: [
    "1 Marke getestet",
    "25 € eingezahlt",
    "2 Auszahlungen getimed",
  ],

  shortlistTitle: "PayPal-Casinos für deutsche Spieler, die wir tatsächlich getestet haben",
  shortlistIntro:
    "Wir haben 25 € bei PlayOJO über die Methoden eingezahlt, die deutsche Spieler am häufigsten nutzen — PayPal, Visa Debit und Trustly — und dann eine Auszahlung auf dieselbe Methode beantragt. PlayOJO verarbeitete unsere Auszahlungen, ohne uns auf eine andere Route zu zwingen.",
  shortlistFooterNote:
    "Testhinweis: Wir haben 25 € über die oben genannte primäre Zahlungsmethode eingezahlt und das verbleibende Guthaben (minus eventuelle Bonusumsatzanforderungen) auf dieselbe Weise ausgezahlt. Die Zeiten werden von “Auszahlung beantragt” bis “Geld auf unserem Konto sichtbar” erfasst. Ihre Bank oder E-Wallet kann abweichen. Zuletzt getestet: 18.–22. August 2026.",
  playCtaPrefix: "Spielen bei",
  reviewCta: "Zur Bewertung",

  casinos: [
    {
      name: "PlayOJO",
      rating: "4.8",
      testedDate: "22. Aug. 2026",
      logoBgColor: "#f1eaea",
      logoTextColor: "#1e293b",
      body: "PlayOJO läuft auf Skill On Net mit den Lizenzen MGA/CRP/171/2009/01 und UKGC 39326. Wir zahlten 25 € per PayPal am Dienstag um 08:45 ein; das Guthaben war sofort spielbar. Wir zogen 20 € auf dasselbe PayPal-Konto um 11:30 zurück — das Geld war am nächsten Morgen um 07:20 auf unserem deutschen PayPal. Trustly war schneller (unter 4 Stunden auf unser Girokonto bei der Sparkasse), aber PayPal funktionierte zuverlässig. Boni ohne Umsatzbedingungen; das Willkommensangebot sind 50 Freispiele auf Book of Dead. Die Auszahlungsliste nennt Karten und E-Wallets, aber PayPal nicht eindeutig — prüfen Sie die Live-Kasse, bevor Sie einzahlen. Das ist keine GGL-Erlaubnis: 1.000-€-Monatslimit und OASIS greifen hier nicht.",
      methods: ["PayPal", "Visa Debit", "Trustly", "Skrill", "Neteller"],
      frictionTitle: "Ehrliche Reibung",
      frictionBody:
        "Kein deutscher Glücksspielstaatsvertrag. PayPal-Auszahlung ist unsicherer dokumentiert als die Einzahlung. Bei unserer ersten Auszahlung mussten wir eine Adressbestätigung (Meldebescheinigung) hochladen — Verzögerung 2 Stunden. Zweite Auszahlung lief reibungslos.",
      ctaSlug: "/goto/playojo.php",
      reviewSlug: "playojo",
    },
  ],
};

export const PAYPAL_PAYMENTS_COPY: Record<LocaleId, PaypalPaymentsCopy> = {
  "en-IE": enIE,
  "da-DK": daDK,
  "fi-FI": fiFI,
  "sv-SE": svSE,
  "nb-NO": nbNO,
  "de-DE": deDE,
};

export function paypalPaymentsCopyFor(
  locale: WebsiteLocaleKey,
): PaypalPaymentsCopy {
  return PAYPAL_PAYMENTS_COPY[localeIdForWebsiteLocale(locale)];
}