export type PaypalPaymentsCasinoCopy = {
  name: string;
  rating: string;
  testedDate: string;
  logoBgColor: string;
  logoTextColor: string;
  body: string;
  methods: string[];
  frictionTitle: string;
  frictionBody: string;
  ctaSlug: string;
  reviewSlug: string;
};

export type PaypalPaymentsCopy = {
  authorName: string;
  authorRole: string;
  authorBio: string;
  authorPhotoSrc: string;
  authorPhotoAlt: string;
  authorTestedDate: string;
  pageUpdatedDate: string;
  reviewedByPrefix: string;
  lastPaymentTestLabel: string;
  pageUpdatedLabel: string;
  testedLabel: string;

  methodologyTitle: string;
  methodologyBody: string[];
  methodologyCtaText: string;
  methodologyStats: string[];

  shortlistTitle: string;
  shortlistIntro: string;
  shortlistFooterNote: string;
  playCtaPrefix: string;
  reviewCta: string;

  casinos: PaypalPaymentsCasinoCopy[];
};
