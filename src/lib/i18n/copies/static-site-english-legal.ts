import type { PrivacySection } from "./static-site-types";

export const privacySectionsEn: PrivacySection[] = [
  {
    title: "Purpose of data collection",
    body: "We collect users' email addresses through a voluntary newsletter subscription form, based on the consent of our visitors. This information is primarily used for communication and marketing purposes, specifically tailored to our audience.",
  },
  {
    title: "Data we collect",
    body: "We maintain a list of email addresses from users who have opted in to receive our newsletter and communications. This data is not shared with third parties and is managed in accordance with GDPR standards. We only store email addresses and related usernames or account names.",
  },
  {
    title: "Data collection methods",
    body: "Data is collected through our newsletter subscription form on our site and potentially during other interactions when users voluntarily provide their information.",
  },
  {
    title: "Data processing",
    body: "We do not share data with third parties. However, data may be transferred outside the European Union by the data processor for processing purposes, always ensuring compliance with GDPR and relevant data protection laws.",
  },
  {
    title: "Data security",
    body: "PpCasinos.co is committed to safeguarding your personal data with the highest level of care, employing both physical and digital security measures for our cloud-based storage. Your data is processed confidentially and only by authorized personnel.",
  },
  {
    title: "Accessing your personal data",
    body: "Under GDPR, you have the right to request access to your personal data collected by us. To review your details, contact our Data Protection Officer (DPO). You can also request the removal or update of your personal data in our database. All inquiries will be addressed promptly, in line with GDPR timelines.",
  },
];

export const termsSectionsEn: PrivacySection[] = [
  {
    title: "Acceptance",
    body: 'By accessing or using PpCasinos.co ("we", "us", "our"), you agree to these Terms. If you do not agree, please stop using the site.',
  },
  {
    title: "Informational service only",
    body: "We publish guides and reviews for information. We do not operate an online casino, offer gambling services, or process wagers. Nothing on this site is legal, financial, or professional advice.",
  },
  {
    title: "Affiliate relationships",
    body: "Some links may be affiliate links. We may receive compensation when you visit third-party operators. This does not affect our editorial independence, but you should always read the operator's own terms and licence information before playing.",
  },
  {
    title: "Accuracy and third-party content",
    body: "We aim to keep information accurate and up to date, but bonuses, payment methods, and rules change. External sites and games are provided by third parties; we are not responsible for their content, availability, or practices.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of the site or reliance on its content, including losses linked to gambling with third-party operators.",
  },
  {
    title: "Age restriction",
    body: "The site is intended for adults aged 18+ (or the legal age in your jurisdiction). Do not use the site if you are under the legal age for gambling where you live.",
  },
  {
    title: "Changes",
    body: "We may update these Terms from time to time. Continued use of the site after changes means you accept the revised Terms.",
  },
];

function withTitles(
  sections: PrivacySection[],
  titles: string[],
): PrivacySection[] {
  return sections.map((s, i) => ({
    body: s.body,
    title: titles[i] ?? s.title,
  }));
}

const privacyTitlesDa = [
  "Formål med dataindsamling",
  "Data vi behandler",
  "Indsamling",
  "Behandling og overførsel",
  "Datasikkerhed",
  "Dine rettigheder",
];

const termsTitlesDa = [
  "Accept",
  "Kun information",
  "Affiliatelinks",
  "Indhold og tredjeparter",
  "Ansvarsbegrænsning",
  "Aldersgrænse",
  "Ændringer",
];

const privacyTitlesFi = [
  "Tietojen keruun tarkoitus",
  "Kerättävät tiedot",
  "Keruumenetelmät",
  "Käsittely ja siirrot",
  "Tietoturva",
  "Oikeutesi",
];

const termsTitlesFi = [
  "Hyväksyntä",
  "Vain informaatio",
  "Affiliate-linkit",
  "Sisältö ja kolmannet osapuolet",
  "Vastuunrajoitus",
  "Ikäraja",
  "Muutokset",
];

const privacyTitlesDe = [
  "Zweck der Datenerhebung",
  "Welche Daten wir verarbeiten",
  "Erhebung",
  "Verarbeitung und Übermittlung",
  "Sicherheit",
  "Ihre Rechte",
];

const termsTitlesDe = [
  "Zustimmung",
  "Nur Informationen",
  "Affiliate-Links",
  "Inhalte und Dritte",
  "Haftungsbeschränkung",
  "Altersgrenze",
  "Änderungen",
];

const privacyTitlesNb = [
  "Formål med innsamling",
  "Data vi behandler",
  "Innsamling",
  "Behandling og overføring",
  "Datasikkerhet",
  "Dine rettigheter",
];

const termsTitlesNb = [
  "Aksept",
  "Kun informasjon",
  "Affiliatelenker",
  "Innhold og tredjeparter",
  "Ansvarsbegrensning",
  "Aldersgrense",
  "Endringer",
];

export const privacySectionsDa = withTitles(privacySectionsEn, privacyTitlesDa);
export const termsSectionsDa = withTitles(termsSectionsEn, termsTitlesDa);
export const privacySectionsFi = withTitles(privacySectionsEn, privacyTitlesFi);
export const termsSectionsFi = withTitles(termsSectionsEn, termsTitlesFi);
export const privacySectionsDe = withTitles(privacySectionsEn, privacyTitlesDe);
export const termsSectionsDe = withTitles(termsSectionsEn, termsTitlesDe);
export const privacySectionsNb = withTitles(privacySectionsEn, privacyTitlesNb);
export const termsSectionsNb = withTitles(termsSectionsEn, termsTitlesNb);
