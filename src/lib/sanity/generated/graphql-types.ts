export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Block = {
  __typename?: 'Block';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<Maybe<Span>>>;
  level?: Maybe<Scalars['Float']['output']>;
  listItem?: Maybe<Scalars['String']['output']>;
  style?: Maybe<Scalars['String']['output']>;
};

export type BlockOrFileOrImage = Block | File | Image;

export type BlogAuthor = Document & {
  __typename?: 'BlogAuthor';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  expertise?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type BlogAuthorFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  bio?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type BlogAuthorSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type BlogPost = Document & {
  __typename?: 'BlogPost';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  author?: Maybe<BlogAuthor>;
  bodyRaw?: Maybe<Scalars['JSON']['output']>;
  cardDescription?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  featuredImage?: Maybe<Image>;
  highlightsRaw?: Maybe<Scalars['JSON']['output']>;
  relatedCasinosList?: Maybe<Array<Maybe<Casino>>>;
  relatedCasinosTitle?: Maybe<Scalars['String']['output']>;
  seoComponent?: Maybe<SeoComponent>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BlogPostFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  author?: InputMaybe<BlogAuthorFilter>;
  cardDescription?: InputMaybe<StringFilter>;
  category?: InputMaybe<StringFilter>;
  created?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  featuredImage?: InputMaybe<ImageFilter>;
  relatedCasinosTitle?: InputMaybe<StringFilter>;
  seoComponent?: InputMaybe<SeoComponentFilter>;
  slug?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type BlogPostSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  cardDescription?: InputMaybe<SortOrder>;
  category?: InputMaybe<SortOrder>;
  created?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  featuredImage?: InputMaybe<ImageSorting>;
  relatedCasinosTitle?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type Bonus = Document & {
  __typename?: 'Bonus';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  bonusBackgroundColor?: Maybe<Scalars['String']['output']>;
  bonusLogo?: Maybe<Image>;
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  partnersTermsAndConditionalLink?: Maybe<Scalars['String']['output']>;
  referralUrl?: Maybe<Scalars['String']['output']>;
};

export type BonusFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  bonusBackgroundColor?: InputMaybe<StringFilter>;
  bonusLogo?: InputMaybe<ImageFilter>;
  code?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  partnersTermsAndConditionalLink?: InputMaybe<StringFilter>;
  referralUrl?: InputMaybe<StringFilter>;
};

export type BonusSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  bonusBackgroundColor?: InputMaybe<SortOrder>;
  bonusLogo?: InputMaybe<ImageSorting>;
  code?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  partnersTermsAndConditionalLink?: InputMaybe<SortOrder>;
  referralUrl?: InputMaybe<SortOrder>;
};

export type BonusesList = Document & {
  __typename?: 'BonusesList';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  bonuses?: Maybe<Array<Maybe<Bonus>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BonusesListFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  title?: InputMaybe<StringFilter>;
};

export type BonusesListIntl = Document & {
  __typename?: 'BonusesListIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  bonuses?: Maybe<Array<Maybe<Bonus>>>;
  title?: Maybe<IntlText>;
};

export type BonusesListIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  title?: InputMaybe<IntlTextFilter>;
};

export type BonusesListIntlOrCasinoListIntlOrContentComponentIntlOrFaqComponentIntlOrFeaturedArticlesIntlOrGameOfTheMonthIntlOrHeroDefaultWithCasinoCardsIntlOrHeroTextIntlOrHowToIntlOrSeoComponentIntl = BonusesListIntl | CasinoListIntl | ContentComponentIntl | FaqComponentIntl | FeaturedArticlesIntl | GameOfTheMonthIntl | HeroDefaultWithCasinoCardsIntl | HeroTextIntl | HowToIntl | SeoComponentIntl;

export type BonusesListIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<IntlTextSorting>;
};

export type BonusesListSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Casino = Document & {
  __typename?: 'Casino';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  availableInCountries?: Maybe<CasinoAvailableInCountries>;
  backgroundColor?: Maybe<Color>;
  bonuses?: Maybe<Array<Maybe<Bonus>>>;
  casinoName?: Maybe<Scalars['String']['output']>;
  depositMethods?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  license?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Image>;
  payoutLimits?: Maybe<Scalars['String']['output']>;
  payoutTimes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Overall score from 0 to 5 in steps of 0.1 */
  rating?: Maybe<Scalars['Float']['output']>;
  referralUrl?: Maybe<Scalars['String']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  software?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  userRecommendationsRecommendedNumber?: Maybe<Scalars['Float']['output']>;
  userRecommendationsTotalNumber?: Maybe<Scalars['Float']['output']>;
  withdrawalMethod?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CasinoAvailableInCountries = {
  __typename?: 'CasinoAvailableInCountries';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  denmark?: Maybe<Scalars['Boolean']['output']>;
  finland?: Maybe<Scalars['Boolean']['output']>;
  germany?: Maybe<Scalars['Boolean']['output']>;
  ireland?: Maybe<Scalars['Boolean']['output']>;
  norway?: Maybe<Scalars['Boolean']['output']>;
  sweden?: Maybe<Scalars['Boolean']['output']>;
};

export type CasinoAvailableInCountriesFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  denmark?: InputMaybe<BooleanFilter>;
  finland?: InputMaybe<BooleanFilter>;
  germany?: InputMaybe<BooleanFilter>;
  ireland?: InputMaybe<BooleanFilter>;
  norway?: InputMaybe<BooleanFilter>;
  sweden?: InputMaybe<BooleanFilter>;
};

export type CasinoAvailableInCountriesSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  denmark?: InputMaybe<SortOrder>;
  finland?: InputMaybe<SortOrder>;
  germany?: InputMaybe<SortOrder>;
  ireland?: InputMaybe<SortOrder>;
  norway?: InputMaybe<SortOrder>;
  sweden?: InputMaybe<SortOrder>;
};

export type CasinoFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  availableInCountries?: InputMaybe<CasinoAvailableInCountriesFilter>;
  backgroundColor?: InputMaybe<ColorFilter>;
  casinoName?: InputMaybe<StringFilter>;
  license?: InputMaybe<StringFilter>;
  logo?: InputMaybe<ImageFilter>;
  payoutLimits?: InputMaybe<StringFilter>;
  rating?: InputMaybe<FloatFilter>;
  referralUrl?: InputMaybe<StringFilter>;
  shortDescription?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  userRecommendationsRecommendedNumber?: InputMaybe<FloatFilter>;
  userRecommendationsTotalNumber?: InputMaybe<FloatFilter>;
};

export type CasinoList = Document & {
  __typename?: 'CasinoList';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  anchorTitle?: Maybe<Scalars['String']['output']>;
  casinoList?: Maybe<Array<Maybe<Casino>>>;
  copyAfterRaw?: Maybe<Scalars['JSON']['output']>;
  copyBefore?: Maybe<Scalars['String']['output']>;
};

export type CasinoListFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  anchorTitle?: InputMaybe<StringFilter>;
  copyBefore?: InputMaybe<StringFilter>;
};

export type CasinoListIntl = Document & {
  __typename?: 'CasinoListIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  anchorTitle?: Maybe<IntlText>;
  casinoList?: Maybe<Array<Maybe<Casino>>>;
  copyAfter?: Maybe<IntlBlockContent>;
  copyBefore?: Maybe<IntlText>;
};

export type CasinoListIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  anchorTitle?: InputMaybe<IntlTextFilter>;
  copyAfter?: InputMaybe<IntlBlockContentFilter>;
  copyBefore?: InputMaybe<IntlTextFilter>;
};

export type CasinoListIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  anchorTitle?: InputMaybe<IntlTextSorting>;
  copyAfter?: InputMaybe<IntlBlockContentSorting>;
  copyBefore?: InputMaybe<IntlTextSorting>;
};

export type CasinoListSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  anchorTitle?: InputMaybe<SortOrder>;
  copyBefore?: InputMaybe<SortOrder>;
};

export type CasinoRating = Document & {
  __typename?: 'CasinoRating';
  /**
   * Date the document was created
   * @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up.
   */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /**
   * Document ID
   * @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up.
   */
  _id?: Maybe<Scalars['ID']['output']>;
  /** @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up. */
  _key?: Maybe<Scalars['String']['output']>;
  /**
   * Current document revision
   * @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up.
   */
  _rev?: Maybe<Scalars['String']['output']>;
  /**
   * Document type
   * @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up.
   */
  _type?: Maybe<Scalars['String']['output']>;
  /**
   * Date the document was last modified
   * @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up.
   */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up. */
  ratingNumber?: Maybe<Scalars['Float']['output']>;
  /** @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up. */
  ratingType?: Maybe<Scalars['String']['output']>;
};

export type CasinoRatingFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  ratingNumber?: InputMaybe<FloatFilter>;
  ratingType?: InputMaybe<StringFilter>;
};

export type CasinoRatingSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  ratingNumber?: InputMaybe<SortOrder>;
  ratingType?: InputMaybe<SortOrder>;
};

export type CasinoSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  availableInCountries?: InputMaybe<CasinoAvailableInCountriesSorting>;
  backgroundColor?: InputMaybe<ColorSorting>;
  casinoName?: InputMaybe<SortOrder>;
  license?: InputMaybe<SortOrder>;
  logo?: InputMaybe<ImageSorting>;
  payoutLimits?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  referralUrl?: InputMaybe<SortOrder>;
  shortDescription?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  userRecommendationsRecommendedNumber?: InputMaybe<SortOrder>;
  userRecommendationsTotalNumber?: InputMaybe<SortOrder>;
};

export type Color = {
  __typename?: 'Color';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  alpha?: Maybe<Scalars['Float']['output']>;
  hex?: Maybe<Scalars['String']['output']>;
  hsl?: Maybe<HslaColor>;
  hsv?: Maybe<HsvaColor>;
  rgb?: Maybe<RgbaColor>;
};

export type ColorFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  alpha?: InputMaybe<FloatFilter>;
  hex?: InputMaybe<StringFilter>;
  hsl?: InputMaybe<HslaColorFilter>;
  hsv?: InputMaybe<HsvaColorFilter>;
  rgb?: InputMaybe<RgbaColorFilter>;
};

export type ColorSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  alpha?: InputMaybe<SortOrder>;
  hex?: InputMaybe<SortOrder>;
  hsl?: InputMaybe<HslaColorSorting>;
  hsv?: InputMaybe<HsvaColorSorting>;
  rgb?: InputMaybe<RgbaColorSorting>;
};

export type ContentComponentIntl = Document & {
  __typename?: 'ContentComponentIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  bodyMarkdown?: Maybe<IntlMarkdown>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ContentComponentIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  bodyMarkdown?: InputMaybe<IntlMarkdownFilter>;
  name?: InputMaybe<StringFilter>;
};

export type ContentComponentIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  bodyMarkdown?: InputMaybe<IntlMarkdownSorting>;
  name?: InputMaybe<SortOrder>;
};

export type CrossDatasetReference = {
  __typename?: 'CrossDatasetReference';
  _dataset?: Maybe<Scalars['String']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  _projectId?: Maybe<Scalars['String']['output']>;
  _ref?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  _weak?: Maybe<Scalars['Boolean']['output']>;
};

export type CrossDatasetReferenceFilter = {
  _dataset?: InputMaybe<StringFilter>;
  _key?: InputMaybe<StringFilter>;
  _projectId?: InputMaybe<StringFilter>;
  _ref?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _weak?: InputMaybe<BooleanFilter>;
};

export type CrossDatasetReferenceSorting = {
  _dataset?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _projectId?: InputMaybe<SortOrder>;
  _ref?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _weak?: InputMaybe<SortOrder>;
};

export type CtaButton = Document & {
  __typename?: 'CtaButton';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  buttonType?: Maybe<Scalars['String']['output']>;
  copy?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CtaButtonFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  buttonType?: InputMaybe<StringFilter>;
  copy?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type CtaButtonIntl = Document & {
  __typename?: 'CtaButtonIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  buttonType?: Maybe<Scalars['String']['output']>;
  copy?: Maybe<IntlText>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CtaButtonIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  buttonType?: InputMaybe<StringFilter>;
  copy?: InputMaybe<IntlTextFilter>;
  url?: InputMaybe<StringFilter>;
};

export type CtaButtonIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  buttonType?: InputMaybe<SortOrder>;
  copy?: InputMaybe<IntlTextSorting>;
  url?: InputMaybe<SortOrder>;
};

export type CtaButtonSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  buttonType?: InputMaybe<SortOrder>;
  copy?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type DateFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Date']['input']>;
};

export type DatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A Sanity document */
export type Document = {
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DocumentFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
};

export type DocumentSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
};

export type FaqComponent = Document & {
  __typename?: 'FaqComponent';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  faqItems?: Maybe<Array<Maybe<FaqItem>>>;
  spaceTop?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FaqComponentFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  spaceTop?: InputMaybe<FloatFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FaqComponentIntl = Document & {
  __typename?: 'FaqComponentIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  faqItems?: Maybe<Array<Maybe<FaqItemIntl>>>;
  spaceTop?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<IntlText>;
};

export type FaqComponentIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  spaceTop?: InputMaybe<FloatFilter>;
  title?: InputMaybe<IntlTextFilter>;
};

export type FaqComponentIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  spaceTop?: InputMaybe<SortOrder>;
  title?: InputMaybe<IntlTextSorting>;
};

export type FaqComponentSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  spaceTop?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type FaqItem = Document & {
  __typename?: 'FaqItem';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Markdown-supported answer content. */
  faqAnswer?: Maybe<Scalars['String']['output']>;
  faqQuestion?: Maybe<Scalars['String']['output']>;
};

export type FaqItemFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  faqAnswer?: InputMaybe<StringFilter>;
  faqQuestion?: InputMaybe<StringFilter>;
};

export type FaqItemIntl = Document & {
  __typename?: 'FaqItemIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  faqAnswer?: Maybe<IntlMarkdown>;
  faqQuestion?: Maybe<IntlText>;
};

export type FaqItemIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  faqAnswer?: InputMaybe<IntlMarkdownFilter>;
  faqQuestion?: InputMaybe<IntlTextFilter>;
};

export type FaqItemIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  faqAnswer?: InputMaybe<IntlMarkdownSorting>;
  faqQuestion?: InputMaybe<IntlTextSorting>;
};

export type FaqItemSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  faqAnswer?: InputMaybe<SortOrder>;
  faqQuestion?: InputMaybe<SortOrder>;
};

export type FeaturedArticles = Document & {
  __typename?: 'FeaturedArticles';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  descriptionRaw?: Maybe<Scalars['JSON']['output']>;
  relatedArticles?: Maybe<Array<Maybe<BlogPost>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeaturedArticlesFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FeaturedArticlesIntl = Document & {
  __typename?: 'FeaturedArticlesIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<IntlMarkdown>;
  relatedArticles?: Maybe<Array<Maybe<BlogPost>>>;
  title?: Maybe<IntlText>;
};

export type FeaturedArticlesIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<IntlMarkdownFilter>;
  title?: InputMaybe<IntlTextFilter>;
};

export type FeaturedArticlesIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<IntlMarkdownSorting>;
  title?: InputMaybe<IntlTextSorting>;
};

export type FeaturedArticlesSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type File = {
  __typename?: 'File';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityFileAsset>;
  media?: Maybe<GlobalDocumentReference>;
};

export type FileFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  asset?: InputMaybe<SanityFileAssetFilter>;
  media?: InputMaybe<GlobalDocumentReferenceFilter>;
};

export type FileSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  media?: InputMaybe<GlobalDocumentReferenceSorting>;
};

export type FloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export type GameOfTheMonth = Document & {
  __typename?: 'GameOfTheMonth';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  casinoLinks?: Maybe<Array<Maybe<CtaButton>>>;
  gameDescriptionRaw?: Maybe<Scalars['JSON']['output']>;
  gameName?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  link?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type GameOfTheMonthFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  gameName?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageFilter>;
  link?: InputMaybe<StringFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type GameOfTheMonthIntl = Document & {
  __typename?: 'GameOfTheMonthIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  casinoLinks?: Maybe<Array<Maybe<CtaButtonIntl>>>;
  gameDescription?: Maybe<IntlMarkdown>;
  gameName?: Maybe<IntlText>;
  image?: Maybe<Image>;
  link?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<IntlText>;
  title?: Maybe<IntlText>;
};

export type GameOfTheMonthIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  gameDescription?: InputMaybe<IntlMarkdownFilter>;
  gameName?: InputMaybe<IntlTextFilter>;
  image?: InputMaybe<ImageFilter>;
  link?: InputMaybe<StringFilter>;
  subtitle?: InputMaybe<IntlTextFilter>;
  title?: InputMaybe<IntlTextFilter>;
};

export type GameOfTheMonthIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  gameDescription?: InputMaybe<IntlMarkdownSorting>;
  gameName?: InputMaybe<IntlTextSorting>;
  image?: InputMaybe<ImageSorting>;
  link?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<IntlTextSorting>;
  title?: InputMaybe<IntlTextSorting>;
};

export type GameOfTheMonthSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  gameName?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageSorting>;
  link?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type Geopoint = {
  __typename?: 'Geopoint';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  alt?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
};

export type GeopointFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  alt?: InputMaybe<FloatFilter>;
  lat?: InputMaybe<FloatFilter>;
  lng?: InputMaybe<FloatFilter>;
};

export type GeopointSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  alt?: InputMaybe<SortOrder>;
  lat?: InputMaybe<SortOrder>;
  lng?: InputMaybe<SortOrder>;
};

export type GlobalDocumentReference = {
  __typename?: 'GlobalDocumentReference';
  _key?: Maybe<Scalars['String']['output']>;
  _ref?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  _weak?: Maybe<Scalars['Boolean']['output']>;
};

export type GlobalDocumentReferenceFilter = {
  _key?: InputMaybe<StringFilter>;
  _ref?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _weak?: InputMaybe<BooleanFilter>;
};

export type GlobalDocumentReferenceSorting = {
  _key?: InputMaybe<SortOrder>;
  _ref?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _weak?: InputMaybe<SortOrder>;
};

export type HeroDefaultWithCasinoCards = Document & {
  __typename?: 'HeroDefaultWithCasinoCards';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  callToAction?: Maybe<CtaButton>;
  casinos?: Maybe<Array<Maybe<Casino>>>;
  ctaTitle?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type HeroDefaultWithCasinoCardsFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  callToAction?: InputMaybe<CtaButtonFilter>;
  ctaTitle?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type HeroDefaultWithCasinoCardsIntl = Document & {
  __typename?: 'HeroDefaultWithCasinoCardsIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  callToAction?: Maybe<CtaButtonIntl>;
  casinos?: Maybe<Array<Maybe<Casino>>>;
  ctaTitle?: Maybe<IntlText>;
  description?: Maybe<IntlText>;
  title?: Maybe<IntlText>;
};

export type HeroDefaultWithCasinoCardsIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  callToAction?: InputMaybe<CtaButtonIntlFilter>;
  ctaTitle?: InputMaybe<IntlTextFilter>;
  description?: InputMaybe<IntlTextFilter>;
  title?: InputMaybe<IntlTextFilter>;
};

export type HeroDefaultWithCasinoCardsIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  ctaTitle?: InputMaybe<IntlTextSorting>;
  description?: InputMaybe<IntlTextSorting>;
  title?: InputMaybe<IntlTextSorting>;
};

export type HeroDefaultWithCasinoCardsSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  ctaTitle?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type HeroText = Document & {
  __typename?: 'HeroText';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  copyRaw?: Maybe<Scalars['JSON']['output']>;
};

export type HeroTextFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
};

export type HeroTextIntl = Document & {
  __typename?: 'HeroTextIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  copy?: Maybe<IntlMarkdown>;
};

export type HeroTextIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  copy?: InputMaybe<IntlMarkdownFilter>;
};

export type HeroTextIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  copy?: InputMaybe<IntlMarkdownSorting>;
};

export type HeroTextSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
};

export type HowTo = Document & {
  __typename?: 'HowTo';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  howToItems?: Maybe<Array<Maybe<HowToItem>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type HowToFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  title?: InputMaybe<StringFilter>;
};

export type HowToIntl = Document & {
  __typename?: 'HowToIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  howToItems?: Maybe<Array<Maybe<HowToItemIntl>>>;
  title?: Maybe<IntlText>;
};

export type HowToIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  title?: InputMaybe<IntlTextFilter>;
};

export type HowToIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<IntlTextSorting>;
};

export type HowToItem = Document & {
  __typename?: 'HowToItem';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  iconName?: Maybe<Scalars['String']['output']>;
  steps?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type HowToItemFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  iconName?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type HowToItemIntl = Document & {
  __typename?: 'HowToItemIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  iconName?: Maybe<Scalars['String']['output']>;
  steps?: Maybe<IntlStringArray>;
  title?: Maybe<IntlText>;
};

export type HowToItemIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  iconName?: InputMaybe<StringFilter>;
  steps?: InputMaybe<IntlStringArrayFilter>;
  title?: InputMaybe<IntlTextFilter>;
};

export type HowToItemIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  iconName?: InputMaybe<SortOrder>;
  steps?: InputMaybe<IntlStringArraySorting>;
  title?: InputMaybe<IntlTextSorting>;
};

export type HowToItemSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  iconName?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type HowToSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type HslaColor = {
  __typename?: 'HslaColor';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  a?: Maybe<Scalars['Float']['output']>;
  h?: Maybe<Scalars['Float']['output']>;
  l?: Maybe<Scalars['Float']['output']>;
  s?: Maybe<Scalars['Float']['output']>;
};

export type HslaColorFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  a?: InputMaybe<FloatFilter>;
  h?: InputMaybe<FloatFilter>;
  l?: InputMaybe<FloatFilter>;
  s?: InputMaybe<FloatFilter>;
};

export type HslaColorSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  a?: InputMaybe<SortOrder>;
  h?: InputMaybe<SortOrder>;
  l?: InputMaybe<SortOrder>;
  s?: InputMaybe<SortOrder>;
};

export type HsvaColor = {
  __typename?: 'HsvaColor';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  a?: Maybe<Scalars['Float']['output']>;
  h?: Maybe<Scalars['Float']['output']>;
  s?: Maybe<Scalars['Float']['output']>;
  v?: Maybe<Scalars['Float']['output']>;
};

export type HsvaColorFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  a?: InputMaybe<FloatFilter>;
  h?: InputMaybe<FloatFilter>;
  s?: InputMaybe<FloatFilter>;
  v?: InputMaybe<FloatFilter>;
};

export type HsvaColorSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  a?: InputMaybe<SortOrder>;
  h?: InputMaybe<SortOrder>;
  s?: InputMaybe<SortOrder>;
  v?: InputMaybe<SortOrder>;
};

export type IdFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Checks if the value matches the given word/words. */
  matches?: InputMaybe<Scalars['ID']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['ID']['input']>;
  nin?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Image = {
  __typename?: 'Image';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityImageAsset>;
  crop?: Maybe<SanityImageCrop>;
  hotspot?: Maybe<SanityImageHotspot>;
  media?: Maybe<GlobalDocumentReference>;
};

export type ImageFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  asset?: InputMaybe<SanityImageAssetFilter>;
  crop?: InputMaybe<SanityImageCropFilter>;
  hotspot?: InputMaybe<SanityImageHotspotFilter>;
  media?: InputMaybe<GlobalDocumentReferenceFilter>;
};

export type ImageSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  crop?: InputMaybe<SanityImageCropSorting>;
  hotspot?: InputMaybe<SanityImageHotspotSorting>;
  media?: InputMaybe<GlobalDocumentReferenceSorting>;
};

export type IntFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Int']['input']>;
};

export type IntlBlockContent = {
  __typename?: 'IntlBlockContent';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  denmark?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  finland?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  germany?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  ireland?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  norway?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  sweden?: Maybe<Scalars['String']['output']>;
};

export type IntlBlockContentFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  denmark?: InputMaybe<StringFilter>;
  finland?: InputMaybe<StringFilter>;
  germany?: InputMaybe<StringFilter>;
  ireland?: InputMaybe<StringFilter>;
  norway?: InputMaybe<StringFilter>;
  sweden?: InputMaybe<StringFilter>;
};

export type IntlBlockContentSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  denmark?: InputMaybe<SortOrder>;
  finland?: InputMaybe<SortOrder>;
  germany?: InputMaybe<SortOrder>;
  ireland?: InputMaybe<SortOrder>;
  norway?: InputMaybe<SortOrder>;
  sweden?: InputMaybe<SortOrder>;
};

export type IntlDescription = {
  __typename?: 'IntlDescription';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  denmark?: Maybe<Scalars['String']['output']>;
  finland?: Maybe<Scalars['String']['output']>;
  germany?: Maybe<Scalars['String']['output']>;
  ireland?: Maybe<Scalars['String']['output']>;
  norway?: Maybe<Scalars['String']['output']>;
  sweden?: Maybe<Scalars['String']['output']>;
};

export type IntlDescriptionFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  denmark?: InputMaybe<StringFilter>;
  finland?: InputMaybe<StringFilter>;
  germany?: InputMaybe<StringFilter>;
  ireland?: InputMaybe<StringFilter>;
  norway?: InputMaybe<StringFilter>;
  sweden?: InputMaybe<StringFilter>;
};

export type IntlDescriptionSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  denmark?: InputMaybe<SortOrder>;
  finland?: InputMaybe<SortOrder>;
  germany?: InputMaybe<SortOrder>;
  ireland?: InputMaybe<SortOrder>;
  norway?: InputMaybe<SortOrder>;
  sweden?: InputMaybe<SortOrder>;
};

export type IntlMarkdown = {
  __typename?: 'IntlMarkdown';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  denmark?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  finland?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  germany?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  ireland?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  norway?: Maybe<Scalars['String']['output']>;
  /** Markdown with preview and image upload. */
  sweden?: Maybe<Scalars['String']['output']>;
};

export type IntlMarkdownFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  denmark?: InputMaybe<StringFilter>;
  finland?: InputMaybe<StringFilter>;
  germany?: InputMaybe<StringFilter>;
  ireland?: InputMaybe<StringFilter>;
  norway?: InputMaybe<StringFilter>;
  sweden?: InputMaybe<StringFilter>;
};

export type IntlMarkdownSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  denmark?: InputMaybe<SortOrder>;
  finland?: InputMaybe<SortOrder>;
  germany?: InputMaybe<SortOrder>;
  ireland?: InputMaybe<SortOrder>;
  norway?: InputMaybe<SortOrder>;
  sweden?: InputMaybe<SortOrder>;
};

export type IntlStringArray = {
  __typename?: 'IntlStringArray';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  denmark?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  finland?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  germany?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  ireland?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  norway?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sweden?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type IntlStringArrayFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
};

export type IntlStringArraySorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
};

export type IntlText = {
  __typename?: 'IntlText';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  denmark?: Maybe<Scalars['String']['output']>;
  finland?: Maybe<Scalars['String']['output']>;
  germany?: Maybe<Scalars['String']['output']>;
  ireland?: Maybe<Scalars['String']['output']>;
  norway?: Maybe<Scalars['String']['output']>;
  sweden?: Maybe<Scalars['String']['output']>;
};

export type IntlTextFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  denmark?: InputMaybe<StringFilter>;
  finland?: InputMaybe<StringFilter>;
  germany?: InputMaybe<StringFilter>;
  ireland?: InputMaybe<StringFilter>;
  norway?: InputMaybe<StringFilter>;
  sweden?: InputMaybe<StringFilter>;
};

export type IntlTextSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  denmark?: InputMaybe<SortOrder>;
  finland?: InputMaybe<SortOrder>;
  germany?: InputMaybe<SortOrder>;
  ireland?: InputMaybe<SortOrder>;
  norway?: InputMaybe<SortOrder>;
  sweden?: InputMaybe<SortOrder>;
};

export type MediaTag = Document & {
  __typename?: 'MediaTag';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Slug>;
};

export type MediaTagFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  name?: InputMaybe<SlugFilter>;
};

export type MediaTagSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SlugSorting>;
};

export type RgbaColor = {
  __typename?: 'RgbaColor';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  a?: Maybe<Scalars['Float']['output']>;
  b?: Maybe<Scalars['Float']['output']>;
  g?: Maybe<Scalars['Float']['output']>;
  r?: Maybe<Scalars['Float']['output']>;
};

export type RgbaColorFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  a?: InputMaybe<FloatFilter>;
  b?: InputMaybe<FloatFilter>;
  g?: InputMaybe<FloatFilter>;
  r?: InputMaybe<FloatFilter>;
};

export type RgbaColorSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  a?: InputMaybe<SortOrder>;
  b?: InputMaybe<SortOrder>;
  g?: InputMaybe<SortOrder>;
  r?: InputMaybe<SortOrder>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  BlogAuthor?: Maybe<BlogAuthor>;
  BlogPost?: Maybe<BlogPost>;
  Bonus?: Maybe<Bonus>;
  BonusesList?: Maybe<BonusesList>;
  BonusesListIntl?: Maybe<BonusesListIntl>;
  Casino?: Maybe<Casino>;
  CasinoList?: Maybe<CasinoList>;
  CasinoListIntl?: Maybe<CasinoListIntl>;
  /** @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up. */
  CasinoRating?: Maybe<CasinoRating>;
  ContentComponentIntl?: Maybe<ContentComponentIntl>;
  CtaButton?: Maybe<CtaButton>;
  CtaButtonIntl?: Maybe<CtaButtonIntl>;
  Document?: Maybe<Document>;
  FaqComponent?: Maybe<FaqComponent>;
  FaqComponentIntl?: Maybe<FaqComponentIntl>;
  FaqItem?: Maybe<FaqItem>;
  FaqItemIntl?: Maybe<FaqItemIntl>;
  FeaturedArticles?: Maybe<FeaturedArticles>;
  FeaturedArticlesIntl?: Maybe<FeaturedArticlesIntl>;
  GameOfTheMonth?: Maybe<GameOfTheMonth>;
  GameOfTheMonthIntl?: Maybe<GameOfTheMonthIntl>;
  HeroDefaultWithCasinoCards?: Maybe<HeroDefaultWithCasinoCards>;
  HeroDefaultWithCasinoCardsIntl?: Maybe<HeroDefaultWithCasinoCardsIntl>;
  HeroText?: Maybe<HeroText>;
  HeroTextIntl?: Maybe<HeroTextIntl>;
  HowTo?: Maybe<HowTo>;
  HowToIntl?: Maybe<HowToIntl>;
  HowToItem?: Maybe<HowToItem>;
  HowToItemIntl?: Maybe<HowToItemIntl>;
  MediaTag?: Maybe<MediaTag>;
  SanityFileAsset?: Maybe<SanityFileAsset>;
  SanityImageAsset?: Maybe<SanityImageAsset>;
  SeoComponent?: Maybe<SeoComponent>;
  SeoComponentIntl?: Maybe<SeoComponentIntl>;
  WebsitePageIntl?: Maybe<WebsitePageIntl>;
  allBlogAuthor: Array<BlogAuthor>;
  allBlogPost: Array<BlogPost>;
  allBonus: Array<Bonus>;
  allBonusesList: Array<BonusesList>;
  allBonusesListIntl: Array<BonusesListIntl>;
  allCasino: Array<Casino>;
  allCasinoList: Array<CasinoList>;
  allCasinoListIntl: Array<CasinoListIntl>;
  /** @deprecated Overall scores now live on the casino document as `rating`. Delete these documents after the dataset is cleaned up. */
  allCasinoRating: Array<CasinoRating>;
  allContentComponentIntl: Array<ContentComponentIntl>;
  allCtaButton: Array<CtaButton>;
  allCtaButtonIntl: Array<CtaButtonIntl>;
  allDocument: Array<Document>;
  allFaqComponent: Array<FaqComponent>;
  allFaqComponentIntl: Array<FaqComponentIntl>;
  allFaqItem: Array<FaqItem>;
  allFaqItemIntl: Array<FaqItemIntl>;
  allFeaturedArticles: Array<FeaturedArticles>;
  allFeaturedArticlesIntl: Array<FeaturedArticlesIntl>;
  allGameOfTheMonth: Array<GameOfTheMonth>;
  allGameOfTheMonthIntl: Array<GameOfTheMonthIntl>;
  allHeroDefaultWithCasinoCards: Array<HeroDefaultWithCasinoCards>;
  allHeroDefaultWithCasinoCardsIntl: Array<HeroDefaultWithCasinoCardsIntl>;
  allHeroText: Array<HeroText>;
  allHeroTextIntl: Array<HeroTextIntl>;
  allHowTo: Array<HowTo>;
  allHowToIntl: Array<HowToIntl>;
  allHowToItem: Array<HowToItem>;
  allHowToItemIntl: Array<HowToItemIntl>;
  allMediaTag: Array<MediaTag>;
  allSanityFileAsset: Array<SanityFileAsset>;
  allSanityImageAsset: Array<SanityImageAsset>;
  allSeoComponent: Array<SeoComponent>;
  allSeoComponentIntl: Array<SeoComponentIntl>;
  allWebsitePageIntl: Array<WebsitePageIntl>;
};


export type RootQueryBlogAuthorArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryBlogPostArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryBonusArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryBonusesListArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryBonusesListIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryCasinoArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryCasinoListArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryCasinoListIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryCasinoRatingArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryContentComponentIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryCtaButtonArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryCtaButtonIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryFaqComponentArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryFaqComponentIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryFaqItemArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryFaqItemIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryFeaturedArticlesArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryFeaturedArticlesIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryGameOfTheMonthArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryGameOfTheMonthIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHeroDefaultWithCasinoCardsArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHeroDefaultWithCasinoCardsIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHeroTextArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHeroTextIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHowToArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHowToIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHowToItemArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHowToItemIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryMediaTagArgs = {
  id: Scalars['ID']['input'];
};


export type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID']['input'];
};


export type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID']['input'];
};


export type RootQuerySeoComponentArgs = {
  id: Scalars['ID']['input'];
};


export type RootQuerySeoComponentIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryWebsitePageIntlArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryAllBlogAuthorArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<BlogAuthorSorting>>;
  where?: InputMaybe<BlogAuthorFilter>;
};


export type RootQueryAllBlogPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<BlogPostSorting>>;
  where?: InputMaybe<BlogPostFilter>;
};


export type RootQueryAllBonusArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<BonusSorting>>;
  where?: InputMaybe<BonusFilter>;
};


export type RootQueryAllBonusesListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<BonusesListSorting>>;
  where?: InputMaybe<BonusesListFilter>;
};


export type RootQueryAllBonusesListIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<BonusesListIntlSorting>>;
  where?: InputMaybe<BonusesListIntlFilter>;
};


export type RootQueryAllCasinoArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CasinoSorting>>;
  where?: InputMaybe<CasinoFilter>;
};


export type RootQueryAllCasinoListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CasinoListSorting>>;
  where?: InputMaybe<CasinoListFilter>;
};


export type RootQueryAllCasinoListIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CasinoListIntlSorting>>;
  where?: InputMaybe<CasinoListIntlFilter>;
};


export type RootQueryAllCasinoRatingArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CasinoRatingSorting>>;
  where?: InputMaybe<CasinoRatingFilter>;
};


export type RootQueryAllContentComponentIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ContentComponentIntlSorting>>;
  where?: InputMaybe<ContentComponentIntlFilter>;
};


export type RootQueryAllCtaButtonArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CtaButtonSorting>>;
  where?: InputMaybe<CtaButtonFilter>;
};


export type RootQueryAllCtaButtonIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CtaButtonIntlSorting>>;
  where?: InputMaybe<CtaButtonIntlFilter>;
};


export type RootQueryAllDocumentArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<DocumentSorting>>;
  where?: InputMaybe<DocumentFilter>;
};


export type RootQueryAllFaqComponentArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FaqComponentSorting>>;
  where?: InputMaybe<FaqComponentFilter>;
};


export type RootQueryAllFaqComponentIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FaqComponentIntlSorting>>;
  where?: InputMaybe<FaqComponentIntlFilter>;
};


export type RootQueryAllFaqItemArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FaqItemSorting>>;
  where?: InputMaybe<FaqItemFilter>;
};


export type RootQueryAllFaqItemIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FaqItemIntlSorting>>;
  where?: InputMaybe<FaqItemIntlFilter>;
};


export type RootQueryAllFeaturedArticlesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FeaturedArticlesSorting>>;
  where?: InputMaybe<FeaturedArticlesFilter>;
};


export type RootQueryAllFeaturedArticlesIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FeaturedArticlesIntlSorting>>;
  where?: InputMaybe<FeaturedArticlesIntlFilter>;
};


export type RootQueryAllGameOfTheMonthArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<GameOfTheMonthSorting>>;
  where?: InputMaybe<GameOfTheMonthFilter>;
};


export type RootQueryAllGameOfTheMonthIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<GameOfTheMonthIntlSorting>>;
  where?: InputMaybe<GameOfTheMonthIntlFilter>;
};


export type RootQueryAllHeroDefaultWithCasinoCardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HeroDefaultWithCasinoCardsSorting>>;
  where?: InputMaybe<HeroDefaultWithCasinoCardsFilter>;
};


export type RootQueryAllHeroDefaultWithCasinoCardsIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HeroDefaultWithCasinoCardsIntlSorting>>;
  where?: InputMaybe<HeroDefaultWithCasinoCardsIntlFilter>;
};


export type RootQueryAllHeroTextArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HeroTextSorting>>;
  where?: InputMaybe<HeroTextFilter>;
};


export type RootQueryAllHeroTextIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HeroTextIntlSorting>>;
  where?: InputMaybe<HeroTextIntlFilter>;
};


export type RootQueryAllHowToArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HowToSorting>>;
  where?: InputMaybe<HowToFilter>;
};


export type RootQueryAllHowToIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HowToIntlSorting>>;
  where?: InputMaybe<HowToIntlFilter>;
};


export type RootQueryAllHowToItemArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HowToItemSorting>>;
  where?: InputMaybe<HowToItemFilter>;
};


export type RootQueryAllHowToItemIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HowToItemIntlSorting>>;
  where?: InputMaybe<HowToItemIntlFilter>;
};


export type RootQueryAllMediaTagArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MediaTagSorting>>;
  where?: InputMaybe<MediaTagFilter>;
};


export type RootQueryAllSanityFileAssetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SanityFileAssetSorting>>;
  where?: InputMaybe<SanityFileAssetFilter>;
};


export type RootQueryAllSanityImageAssetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SanityImageAssetSorting>>;
  where?: InputMaybe<SanityImageAssetFilter>;
};


export type RootQueryAllSeoComponentArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SeoComponentSorting>>;
  where?: InputMaybe<SeoComponentFilter>;
};


export type RootQueryAllSeoComponentIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SeoComponentIntlSorting>>;
  where?: InputMaybe<SeoComponentIntlFilter>;
};


export type RootQueryAllWebsitePageIntlArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<WebsitePageIntlSorting>>;
  where?: InputMaybe<WebsitePageIntlFilter>;
};

export type SanityAssetSourceData = {
  __typename?: 'SanityAssetSourceData';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  id?: Maybe<Scalars['String']['output']>;
  /** A canonical name for the source this asset is originating from */
  name?: Maybe<Scalars['String']['output']>;
  /** A URL to find more information about this asset in the originating source */
  url?: Maybe<Scalars['String']['output']>;
};

export type SanityAssetSourceDataFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SanityAssetSourceDataSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type SanityFileAsset = Document & {
  __typename?: 'SanityFileAsset';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  altText?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  sha1hash?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<SanityAssetSourceData>;
  title?: Maybe<Scalars['String']['output']>;
  uploadId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SanityFileAssetFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  altText?: InputMaybe<StringFilter>;
  assetId?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  extension?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  mimeType?: InputMaybe<StringFilter>;
  originalFilename?: InputMaybe<StringFilter>;
  path?: InputMaybe<StringFilter>;
  sha1hash?: InputMaybe<StringFilter>;
  size?: InputMaybe<FloatFilter>;
  source?: InputMaybe<SanityAssetSourceDataFilter>;
  title?: InputMaybe<StringFilter>;
  uploadId?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SanityFileAssetSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  altText?: InputMaybe<SortOrder>;
  assetId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  extension?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  mimeType?: InputMaybe<SortOrder>;
  originalFilename?: InputMaybe<SortOrder>;
  path?: InputMaybe<SortOrder>;
  sha1hash?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  source?: InputMaybe<SanityAssetSourceDataSorting>;
  title?: InputMaybe<SortOrder>;
  uploadId?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type SanityImageAsset = Document & {
  __typename?: 'SanityImageAsset';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  altText?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<SanityImageMetadata>;
  mimeType?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  sha1hash?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<SanityAssetSourceData>;
  title?: Maybe<Scalars['String']['output']>;
  uploadId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SanityImageAssetFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  altText?: InputMaybe<StringFilter>;
  assetId?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  extension?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<SanityImageMetadataFilter>;
  mimeType?: InputMaybe<StringFilter>;
  originalFilename?: InputMaybe<StringFilter>;
  path?: InputMaybe<StringFilter>;
  sha1hash?: InputMaybe<StringFilter>;
  size?: InputMaybe<FloatFilter>;
  source?: InputMaybe<SanityAssetSourceDataFilter>;
  title?: InputMaybe<StringFilter>;
  uploadId?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SanityImageAssetSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  altText?: InputMaybe<SortOrder>;
  assetId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  extension?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<SanityImageMetadataSorting>;
  mimeType?: InputMaybe<SortOrder>;
  originalFilename?: InputMaybe<SortOrder>;
  path?: InputMaybe<SortOrder>;
  sha1hash?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  source?: InputMaybe<SanityAssetSourceDataSorting>;
  title?: InputMaybe<SortOrder>;
  uploadId?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type SanityImageCrop = {
  __typename?: 'SanityImageCrop';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  bottom?: Maybe<Scalars['Float']['output']>;
  left?: Maybe<Scalars['Float']['output']>;
  right?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
};

export type SanityImageCropFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  bottom?: InputMaybe<FloatFilter>;
  left?: InputMaybe<FloatFilter>;
  right?: InputMaybe<FloatFilter>;
  top?: InputMaybe<FloatFilter>;
};

export type SanityImageCropSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  bottom?: InputMaybe<SortOrder>;
  left?: InputMaybe<SortOrder>;
  right?: InputMaybe<SortOrder>;
  top?: InputMaybe<SortOrder>;
};

export type SanityImageDimensions = {
  __typename?: 'SanityImageDimensions';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  aspectRatio?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type SanityImageDimensionsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  aspectRatio?: InputMaybe<FloatFilter>;
  height?: InputMaybe<FloatFilter>;
  width?: InputMaybe<FloatFilter>;
};

export type SanityImageDimensionsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  aspectRatio?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type SanityImageHotspot = {
  __typename?: 'SanityImageHotspot';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
};

export type SanityImageHotspotFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  height?: InputMaybe<FloatFilter>;
  width?: InputMaybe<FloatFilter>;
  x?: InputMaybe<FloatFilter>;
  y?: InputMaybe<FloatFilter>;
};

export type SanityImageHotspotSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
  x?: InputMaybe<SortOrder>;
  y?: InputMaybe<SortOrder>;
};

export type SanityImageMetadata = {
  __typename?: 'SanityImageMetadata';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  blurHash?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<SanityImageDimensions>;
  hasAlpha?: Maybe<Scalars['Boolean']['output']>;
  isOpaque?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Geopoint>;
  lqip?: Maybe<Scalars['String']['output']>;
  palette?: Maybe<SanityImagePalette>;
  thumbHash?: Maybe<Scalars['String']['output']>;
};

export type SanityImageMetadataFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  blurHash?: InputMaybe<StringFilter>;
  dimensions?: InputMaybe<SanityImageDimensionsFilter>;
  hasAlpha?: InputMaybe<BooleanFilter>;
  isOpaque?: InputMaybe<BooleanFilter>;
  location?: InputMaybe<GeopointFilter>;
  lqip?: InputMaybe<StringFilter>;
  palette?: InputMaybe<SanityImagePaletteFilter>;
  thumbHash?: InputMaybe<StringFilter>;
};

export type SanityImageMetadataSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  blurHash?: InputMaybe<SortOrder>;
  dimensions?: InputMaybe<SanityImageDimensionsSorting>;
  hasAlpha?: InputMaybe<SortOrder>;
  isOpaque?: InputMaybe<SortOrder>;
  location?: InputMaybe<GeopointSorting>;
  lqip?: InputMaybe<SortOrder>;
  palette?: InputMaybe<SanityImagePaletteSorting>;
  thumbHash?: InputMaybe<SortOrder>;
};

export type SanityImagePalette = {
  __typename?: 'SanityImagePalette';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  darkMuted?: Maybe<SanityImagePaletteSwatch>;
  darkVibrant?: Maybe<SanityImagePaletteSwatch>;
  dominant?: Maybe<SanityImagePaletteSwatch>;
  lightMuted?: Maybe<SanityImagePaletteSwatch>;
  lightVibrant?: Maybe<SanityImagePaletteSwatch>;
  muted?: Maybe<SanityImagePaletteSwatch>;
  vibrant?: Maybe<SanityImagePaletteSwatch>;
};

export type SanityImagePaletteFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  darkMuted?: InputMaybe<SanityImagePaletteSwatchFilter>;
  darkVibrant?: InputMaybe<SanityImagePaletteSwatchFilter>;
  dominant?: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightMuted?: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightVibrant?: InputMaybe<SanityImagePaletteSwatchFilter>;
  muted?: InputMaybe<SanityImagePaletteSwatchFilter>;
  vibrant?: InputMaybe<SanityImagePaletteSwatchFilter>;
};

export type SanityImagePaletteSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  darkMuted?: InputMaybe<SanityImagePaletteSwatchSorting>;
  darkVibrant?: InputMaybe<SanityImagePaletteSwatchSorting>;
  dominant?: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightMuted?: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightVibrant?: InputMaybe<SanityImagePaletteSwatchSorting>;
  muted?: InputMaybe<SanityImagePaletteSwatchSorting>;
  vibrant?: InputMaybe<SanityImagePaletteSwatchSorting>;
};

export type SanityImagePaletteSwatch = {
  __typename?: 'SanityImagePaletteSwatch';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  foreground?: Maybe<Scalars['String']['output']>;
  population?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SanityImagePaletteSwatchFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  background?: InputMaybe<StringFilter>;
  foreground?: InputMaybe<StringFilter>;
  population?: InputMaybe<FloatFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SanityImagePaletteSwatchSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  foreground?: InputMaybe<SortOrder>;
  population?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type Sanity_DocumentFilter = {
  /** All documents that are drafts. */
  is_draft?: InputMaybe<Scalars['Boolean']['input']>;
  /** All documents referencing the given document ID. */
  references?: InputMaybe<Scalars['ID']['input']>;
};

export type SeoComponent = Document & {
  __typename?: 'SeoComponent';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  seoDescription?: Maybe<Scalars['String']['output']>;
  seoSlug?: Maybe<Scalars['String']['output']>;
  seoTitle?: Maybe<Scalars['String']['output']>;
};

export type SeoComponentFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  seoDescription?: InputMaybe<StringFilter>;
  seoSlug?: InputMaybe<StringFilter>;
  seoTitle?: InputMaybe<StringFilter>;
};

export type SeoComponentIntl = Document & {
  __typename?: 'SeoComponentIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  seoDescription?: Maybe<IntlDescription>;
  seoSlug?: Maybe<IntlText>;
  seoTitle?: Maybe<IntlText>;
};

export type SeoComponentIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  seoDescription?: InputMaybe<IntlDescriptionFilter>;
  seoSlug?: InputMaybe<IntlTextFilter>;
  seoTitle?: InputMaybe<IntlTextFilter>;
};

export type SeoComponentIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  seoDescription?: InputMaybe<IntlDescriptionSorting>;
  seoSlug?: InputMaybe<IntlTextSorting>;
  seoTitle?: InputMaybe<IntlTextSorting>;
};

export type SeoComponentSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  seoDescription?: InputMaybe<SortOrder>;
  seoSlug?: InputMaybe<SortOrder>;
  seoTitle?: InputMaybe<SortOrder>;
};

export type Slug = {
  __typename?: 'Slug';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  current?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type SlugFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  current?: InputMaybe<StringFilter>;
  source?: InputMaybe<StringFilter>;
};

export type SlugSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  current?: InputMaybe<SortOrder>;
  source?: InputMaybe<SortOrder>;
};

export type SortOrder =
  /** Sorts on the value in ascending order. */
  | 'ASC'
  /** Sorts on the value in descending order. */
  | 'DESC';

export type Span = {
  __typename?: 'Span';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  marks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text?: Maybe<Scalars['String']['output']>;
};

export type StringFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value matches the given word/words. */
  matches?: InputMaybe<Scalars['String']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type WebsitePageIntl = Document & {
  __typename?: 'WebsitePageIntl';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  components?: Maybe<Array<Maybe<BonusesListIntlOrCasinoListIntlOrContentComponentIntlOrFaqComponentIntlOrFeaturedArticlesIntlOrGameOfTheMonthIntlOrHeroDefaultWithCasinoCardsIntlOrHeroTextIntlOrHowToIntlOrSeoComponentIntl>>>;
  /** Internal label for editors (not shown on the site). */
  name?: Maybe<Scalars['String']['output']>;
  seoComponent?: Maybe<SeoComponentIntl>;
  slug?: Maybe<IntlText>;
};

export type WebsitePageIntlFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  name?: InputMaybe<StringFilter>;
  seoComponent?: InputMaybe<SeoComponentIntlFilter>;
  slug?: InputMaybe<IntlTextFilter>;
};

export type WebsitePageIntlSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<IntlTextSorting>;
};
