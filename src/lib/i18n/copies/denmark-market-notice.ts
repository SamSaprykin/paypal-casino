/**
 * Shared compliance / market notice for Denmark website pages.
 * Rendered via DenmarkMarketNotice.astro when locale === "denmark".
 */
export interface DenmarkMarketNoticeLink {
  label: string;
  href: string;
}

export interface DenmarkMarketNoticeCopy {
  title: string;
  taxTitle: string;
  taxBody: string;
  cryptoTaxTitle: string;
  cryptoTaxBody: string;
  cryptoTaxSource: DenmarkMarketNoticeLink;
  rofusTitle: string;
  rofusBody: string;
  rofusLink: DenmarkMarketNoticeLink;
  amlTitle: string;
  amlBody: string;
  amlLink: DenmarkMarketNoticeLink;
  disclaimer: string;
}

export const DENMARK_MARKET_NOTICE_COPY: DenmarkMarketNoticeCopy = {
  title: "Vigtigt for spillere i Danmark",
  taxTitle: "Skat af spillegevinster",
  taxBody:
    "Gevinster fra casinoer med dansk licens er som udgangspunkt skattefrie. Gevinster fra udbydere uden for EU/EØS (typisk Curaçao) er som udgangspunkt skattepligtige som personlig indkomst og skal indberettes.",
  cryptoTaxTitle: "Kursgevinst på kryptovaluta",
  cryptoTaxBody:
    "Skatterådet har i SKM2018.104.SR lagt til grund, at bitcoins typisk erhverves med spekulationshensigt. Gevinst ved salg er derfor personlig indkomst, og tab er som udgangspunkt fradragsberettiget. Modtagelse af nye mønter ved hardfork (fx Bitcoin Cash) er normalt skattefri ved tildeling, men beskattes ved senere salg.",
  cryptoTaxSource: {
    label: "SKM2018.104.SR på info.skat.dk",
    href: "https://info.skat.dk/data.aspx?oid=2271294",
  },
  rofusTitle: "ROFUS gælder kun licenserede udbydere",
  rofusBody:
    "ROFUS (Register Over Frivilligt Udelukkede Spillere) blokerer dig kun hos udbydere under Spillemyndighedens tilsyn. Internationale og kryptocasinoer uden dansk licens er ikke tilsluttet — her skal du bruge casinoets egne grænser eller selvudelukkelse.",
  rofusLink: {
    label: "ROFUS.nu",
    href: "https://rofus.nu",
  },
  amlTitle: "Hvidvask og KYC",
  amlBody:
    "Hvidvaskloven stiller krav om kundekendskab (KYC) og ID-kontrol. Det er en hovedårsag til, at dansk-licenserede casinoer ikke tilbyder kryptovaluta, og til at seriøse udbydere beder om ID ved større udbetalinger.",
  amlLink: {
    label: "Hvidvaskloven (retsinformation.dk)",
    href: "https://www.retsinformation.dk/eli/lta/2020/1782",
  },
  disclaimer:
    "Dette er alene orientering og udgør ikke juridisk eller skattemæssig rådgivning. Kontakt Skattestyrelsen, en revisor eller StopSpillet, hvis du er i tvivl.",
};
