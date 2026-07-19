import type { AuthorProfile, AuthorRecord } from "./types";

const enProfile: AuthorProfile = {
  role: "Senior Casino Analyst",
  bio: "Senior Casino Analyst with over 8 years of experience in the Irish gambling industry. Seamus specializes in bonus analysis and player protection.",
  expertise: [
    "Bonus Analysis",
    "Player Protection",
    "Irish Gambling Law",
    "Online Casino Strategy",
    "iGaming Regulations",
    "Responsible Gambling Advocacy",
    "Blockchain Technology",
  ],
  about: [
    "Seamus O’Connor is a leading voice in the intersection of decentralized finance (DeFi) and online entertainment. With a background in Software Engineering and a career that spans the early days of Bitcoin to the current NFT and Metaverse expansion, Seamus bridges the gap between complex tech and the everyday user.",
    "Seamus spent five years as a blockchain developer before transitioning into technical journalism and consultancy. He provides deep-dive reviews of crypto-casinos, evaluates the security of smart contracts, and tracks the volatility of the assets used in modern gambling. He is known for his “security-first” approach, teaching readers how to manage private keys and navigate the anonymity of the blockchain without falling victim to common pitfalls.",
  ],
};

const fiProfile: AuthorProfile = {
  role: "Johtava kasinoanalyytikko",
  bio: "Johtava kasinoanalyytikko, jolla on yli 8 vuoden kokemus Irlannin uhkapelialalta. Seamus on erikoistunut bonusanalyysiin ja pelaajien suojeluun.",
  expertise: [
    "Bonusanalyysi",
    "Pelaajien suojelu",
    "Irlannin uhkapelilainsäädäntö",
    "Nettikasinostrategia",
    "iGaming-sääntely",
    "Vastuullisen pelaamisen edistäminen",
    "Lohkoketjuteknologia",
  ],
  about: [
    "Seamus O’Connor on johtava ääni hajautetun rahoituksen (DeFi) ja verkkoviihteen risteyskohdassa. Ohjelmistosuunnittelun taustalla ja uralla, joka ulottuu Bitcoinin alkuajoista nykyiseen NFT- ja Metaverse-laajenemiseen, Seamus rakentaa siltaa monimutkaisen teknologian ja tavallisen käyttäjän välille.",
    "Seamus työskenteli viisi vuotta lohkoketjukehittäjänä ennen siirtymistään tekniseen journalismiin ja konsultointiin. Hän tekee perusteellisia arvioita kryptokasinoista, arvioi älysopimusten turvallisuutta ja seuraa nykyaikaisessa uhkapelaamisessa käytettyjen varojen volatiliteettia.",
  ],
};

export const seamusOConnor: AuthorRecord = {
  id: "seamus-oconnor",
  name: "Seamus O’Connor",
  image: "/author-image/seamus-oconnor/seamus-professional-image.png",
  email: "oconnorseamus1985@gmail.com",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/seamus-o-connor-434b39420/",
    x: "https://x.com/oconnorseam",
    facebook: "https://www.facebook.com/profile.php?id=61591516332584",
    instagram: "https://www.instagram.com/seamus__oconnor/",
  },
  externalProfiles: [{ label: "IrishLucky", url: "https://irishlucky.com" }],
  profiles: {
    ireland: enProfile,
    germany: enProfile,
    denmark: enProfile,
    finland: fiProfile,
    norway: enProfile,
    sweden: enProfile,
  },
};
