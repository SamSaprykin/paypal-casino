import type { AuthorProfile, AuthorRecord } from "./types";

const enProfile: AuthorProfile = {
  role: "Lead Content Editor",
  bio: "Former project manager at a tier-one online casino. After five years in the gambling industry, Stoyan founded an independent editorial business to help players understand bonuses, payment methods, and the fine print operators rarely explain — turning insider knowledge into clear, honest guides.",
};

const fiProfile: AuthorProfile = {
  role: "Pääsisältötoimittaja",
  bio: "Entinen projektipäällikkö huipputason nettikasinolla. Viiden vuoden pelialan kokemuksen jälkeen Stoyan perusti itsenäisen toimituksellisen yrityksen auttaakseen pelaajia ymmärtämään bonuksia, maksutapoja ja operaattoreiden pienellä präntättyjä ehtoja — muuttaen sisäpiirin tiedon selkeiksi, rehellisiksi oppaisi.",
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
    denmark: enProfile,
    finland: fiProfile,
    norway: enProfile,
    sweden: enProfile,
  },
};
