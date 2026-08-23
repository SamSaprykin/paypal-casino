import type { AuthorProfile, AuthorRecord } from "./types";

const enProfile: AuthorProfile = {
  role: "Lead Content Editor",
  bio: "Former project manager at a tier-one online casino. After five years in the gambling industry, Stoyan founded an independent editorial business to help players understand bonuses, payment methods, and the fine print operators rarely explain — turning insider knowledge into clear, honest guides.",
};

const fiProfile: AuthorProfile = {
  role: "Pääsisältötoimittaja",
  bio: "Entinen projektipäällikkö huipputason nettikasinolla. Viiden vuoden pelialan kokemuksen jälkeen Stoyan perusti itsenäisen toimituksellisen yrityksen auttaakseen pelaajia ymmärtämään bonuksia, maksutapoja ja operaattoreiden pienellä präntättyjä ehtoja.",
};

const daProfile: AuthorProfile = {
  role: "Ledende indholdsredaktør",
  bio: "Tidligere projektleder hos et tier-one online casino. Efter fem år i spilindustrien grundlagde Stoyan en uafhængig redaktion, der hjælper spillere med at forstå bonusser, betalingsmetoder og det med småt.",
};

const svProfile: AuthorProfile = {
  role: "Ledande innehållsredaktör",
  bio: "Tidigare projektledare på ett tier-one-casinobolag. Efter fem år i spelbranschen grundade Stoyan en oberoende redaktion för att hjälpa spelare förstå bonusar, betalmetoder och det finstilta.",
};

const nbProfile: AuthorProfile = {
  role: "Ledende innholdsredaktør",
  bio: "Tidligere prosjektleder hos et tier-one nettkasino. Etter fem år i spillbransjen grunnla Stoyan en uavhengig redaksjon som hjelper spillere å forstå bonuser, betalingsmetoder og det som står med liten skrift.",
};

export const stoyanMakoski: AuthorRecord = {
  id: "stoyan-makoski",
  name: "Stoyan Makoski",
  image: "/author-image/stoyan-makoski/stoyan-professional-image.png",
  email: "stoyanmakoski@gmail.com",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/stoyan-makoski-43bb26420/",
    x: "https://x.com/stoyanmakoski",
    facebook: "https://www.facebook.com/profile.php?id=61591847338255",
    instagram: "https://www.instagram.com/stoyanmakoski/",
  },
  profiles: {
    ireland: enProfile,
    germany: enProfile,
    denmark: daProfile,
    finland: fiProfile,
    norway: nbProfile,
    sweden: svProfile,
  },
};
