# Contentful Integration

This directory contains the Contentful CMS integration for the casino review application.

## Setup

1. **Environment Variables**: Add the following to your `.env.local` file:

   ```
   CONTENTFUL_SPACE_ID=your_space_id_here
   CONTENTFUL_TOKEN=your_access_token_here
   ```

2. **Content Model**: Ensure your Contentful space has the following content types:

   - `Casino` - Main casino content type
   - `Bonus` - Bonus information
   - `SeoComponent` - SEO metadata
   - `FaqComponent` - FAQ sections

3. **GraphQL Code Generation**: Run the following command to generate TypeScript types:
   ```bash
   npm run generate-contentful
   ```

## Files

- `client.ts` - Contentful GraphQL client setup
- `queries.ts` - GraphQL queries for fetching casino data
- `fragments.ts` - Reusable GraphQL fragments
- `utils.ts` - Helper functions and data transformation
- `generated/` - Auto-generated TypeScript types (do not edit manually)

## Usage

```typescript
import { getCasinoBySlug } from "@/lib/contentful/utils";

const casino = await getCasinoBySlug("casino-slug");
```

## Content Model Structure

### Casino Content Type

- `slug` (Text) - Unique identifier
- `casinoName` (Text) - Casino name
- `logo` (Media) - Casino logo
- `website` (Text) - Casino website URL
- `casinoRates` (Number) - Rating score
- `trustScore` (Number) - Trust score
- `userRecommendation` (Number) - User recommendation percentage
- `welcomeBonus` (Text) - Welcome bonus description
- `logoBackgroundColor` (Text) - Background color for logo
- `payoutLimits` (Text) - Payout limits information
- `payoutTimes` (Text) - Payout times information
- `depositMethods` (Text, multiple) - Available deposit methods
- `withdrawalMethods` (Text, multiple) - Available withdrawal methods
- `withdrawalTimes` (Text) - Withdrawal processing times
- `withdrawalLimits` (Text) - Withdrawal limits
- `software` (Text, multiple) - Software providers
- `referralUrl` (Text) - Affiliate/referral URL
- `content` (Rich Text) - Main casino review content
- `overviews` (Text) - Casino overview/summary
- `bonusesCollection` (Reference, multiple) - Related bonuses
- `seoComponent` (Reference) - SEO metadata
- `faqComponent` (Reference) - FAQ section

### Bonus Content Type

- `title` (Text) - Bonus title
- `description` (Text) - Bonus description
- `terms` (Text) - Terms and conditions
- `bonusCode` (Text) - Bonus code (optional)
- `bonusType` (Text) - Type of bonus
- `amount` (Number) - Bonus amount (optional)
- `percentage` (Number) - Bonus percentage (optional)
- `freeSpins` (Number) - Number of free spins (optional)
- `wagering` (Text) - Wagering requirements
- `minDeposit` (Number) - Minimum deposit (optional)
- `maxBonus` (Number) - Maximum bonus amount (optional)
- `validFor` (Text) - Validity period
- `gameRestrictions` (Text) - Game restrictions
- `countryRestrictions` (Text) - Country restrictions
- `link` (Text) - Bonus claim link

### SEO Component Content Type

- `seoTitle` (Text) - SEO title
- `seoDescription` (Text) - SEO description
- `seoKeywords` (Text) - SEO keywords (optional)
- `openGraphTitle` (Text) - Open Graph title (optional)
- `openGraphDescription` (Text) - Open Graph description (optional)
- `openGraphImage` (Media) - Open Graph image (optional)

### FAQ Component Content Type

- `title` (Text) - FAQ section title
- `questionsCollection` (Reference, multiple) - FAQ questions

### FAQ Question Content Type

- `question` (Text) - The question
- `answer` (Rich Text) - The answer
