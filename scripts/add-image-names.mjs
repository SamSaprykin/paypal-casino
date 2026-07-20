/**
 * Adds imageName to every CustomImage placeholder (meta.json + MDX comments).
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const ROOT = "src/data/content/pages";

/** id → { imageName, imageType, src } */
export const IMAGE_REGISTRY = {
  "hp-img-hero": {
    imageName: "Home Page Payment Methods Hero",
    imageType: "ai-generated",
    src: "home-page-hero.webp",
  },
  "hp-img-comparison": {
    imageName: "Payment Speed Comparison Chart",
    imageType: "stock",
    src: "home-page-payment-comparison.webp",
  },
  "hp-img-trust": {
    imageName: "PayPal Cashier Deposit Screen",
    imageType: "screenshot",
    src: "home-page-paypal-deposit.webp",
  },
  "pp-img-hero": {
    imageName: "PayPal Casino Hero",
    imageType: "ai-generated",
    src: "paypal-casino-hero.webp",
  },
  "pp-img-cashier": {
    imageName: "PayPal Cashier Deposit And Withdrawal Screen",
    imageType: "screenshot",
    src: "paypal-casino-cashier.webp",
  },
  "pp-img-security": {
    imageName: "PayPal Trust And Licence Badges",
    imageType: "stock",
    src: "paypal-casino-security.webp",
  },
  "bc-img-hero": {
    imageName: "Blocked Casino Paused Promotion Hero",
    imageType: "stock",
    src: "blocked-casinos-hero.webp",
  },
  "bc-img-warning": {
    imageName: "Blocked Casino Reasons Checklist",
    imageType: "stock",
    src: "blocked-casinos-warning.webp",
  },
  "bc-img-alternatives": {
    imageName: "Choosing Licensed Alternative Casino",
    imageType: "ai-generated",
    src: "blocked-casinos-alternatives.webp",
  },
  "fp-img-hero": {
    imageName: "Fast Payout Hero",
    imageType: "ai-generated",
    src: "fast-payout-hero.webp",
  },
  "fp-img-payments": {
    imageName: "Withdrawal Speed By Payment Method",
    imageType: "stock",
    src: "fast-payout-payments.webp",
  },
  "fp-img-cashier": {
    imageName: "Casino Withdrawal Cashier Screen",
    imageType: "screenshot",
    src: "fast-payout-cashier.webp",
  },
  "mc-img-hero": {
    imageName: "Mobile Casino Phone Hero",
    imageType: "ai-generated",
    src: "mobile-casinos-hero.webp",
  },
  "mc-img-mobile-play": {
    imageName: "Player On Smartphone Playing Slots",
    imageType: "stock",
    src: "mobile-casinos-mobile-play.webp",
  },
  "mc-img-cashier": {
    imageName: "Mobile PayPal Cashier Screen",
    imageType: "screenshot",
    src: "mobile-casinos-cashier.webp",
  },
  "nc-img-hero": {
    imageName: "New Casinos Launch Hero",
    imageType: "ai-generated",
    src: "new-casinos-hero.webp",
  },
  "nc-img-review": {
    imageName: "New Casino Review Checklist",
    imageType: "stock",
    src: "new-casinos-how-we-review.webp",
  },
  "nc-img-safety": {
    imageName: "Safety And Licensing Checklist",
    imageType: "stock",
    src: "new-casinos-safety-checklist.webp",
  },
  "nc-img-bonus": {
    imageName: "Welcome Bonus Offer Visual",
    imageType: "ai-generated",
    src: "new-casinos-welcome-bonus.webp",
  },
  "nc-img-mobile": {
    imageName: "Mobile Play At New Casino",
    imageType: "stock",
    src: "new-casinos-mobile-play.webp",
  },
  "bn-img-hero": {
    imageName: "Casino Bonuses Guide Hero",
    imageType: "ai-generated",
    src: "casino-bonuses-hero.webp",
  },
  "bn-img-welcome": {
    imageName: "Welcome Deposit Match Offer",
    imageType: "ai-generated",
    src: "casino-bonuses-welcome-offer.webp",
  },
  "bn-img-wagering": {
    imageName: "Wagering Requirements Explainer",
    imageType: "stock",
    src: "casino-bonuses-wagering.webp",
  },
  "bn-img-freespins": {
    imageName: "Free Spins Slot Reels Burst",
    imageType: "ai-generated",
    src: "casino-bonuses-free-spins.webp",
  },
  "bn-img-cashback": {
    imageName: "Cashback And VIP Loyalty Tiers",
    imageType: "stock",
    src: "casino-bonuses-cashback-vip.webp",
  },
};

const PAGE_DIRS = [
  "home-page",
  "paypal-casino",
  "blocked-casinos",
  "fast-payout-casinos",
  "mobile-casinos",
  "new-casinos",
  "casino-bonuses",
];

function updateMeta(pageDir) {
  const metaPath = join(ROOT, pageDir, "meta.json");
  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  let changed = false;
  for (const comp of meta.components ?? []) {
    if (comp.kind !== "image" || !comp.id) continue;
    const reg = IMAGE_REGISTRY[comp.id];
    if (!reg) continue;
    if (comp.name !== reg.imageName) {
      comp.name = reg.imageName;
      changed = true;
    }
  }
  if (changed) {
    writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`);
    console.log("meta", pageDir);
  }
}

function addImageNameToMdx(content, id, imageName) {
  const nameLine = `  # imageName: ${imageName}`;
  if (content.includes(nameLine)) return content;

  // Active image section
  const activeRe = new RegExp(
    `(  # imageType: [^\\n]*\\n  - kind: image\\n    id: ${id}\\n)`,
    "m",
  );
  if (activeRe.test(content)) {
    return content.replace(activeRe, `${nameLine}\n$1`);
  }

  // Commented placeholder — insert after CustomImage header or before imageType
  const commentedTypeRe = new RegExp(
    `(  # imageType: [^\\n]*\\n  # - kind: image\\n  #   id: ${id}\\n)`,
    "m",
  );
  if (commentedTypeRe.test(content)) {
    return content.replace(
      commentedTypeRe,
      `  # imageName: ${imageName}\n$1`,
    );
  }

  // Commented block without preceding CustomImage header match (imageType only)
  const typeOnlyRe = new RegExp(
    `(  # imageType: [^\\n]*\\n  # - kind: image\\n  #   id: ${id})`,
    "m",
  );
  if (typeOnlyRe.test(content)) {
    return content.replace(typeOnlyRe, `  # imageName: ${imageName}\n$1`);
  }

  return content;
}

function addNameFieldToCommentedBlock(content, id, imageName) {
  const re = new RegExp(`(  #   id: ${id}\\n)(  #   alt:)`, "m");
  if (!re.test(content)) return content;
  if (content.includes(`#   name: ${imageName}`)) return content;
  return content.replace(re, `$1  #   name: ${imageName}\n$2`);
}

for (const pageDir of PAGE_DIRS) {
  updateMeta(pageDir);
  for (const file of readdirSync(join(ROOT, pageDir)).filter((f) =>
    f.endsWith(".mdx"),
  )) {
    const fp = join(ROOT, pageDir, file);
    let content = readFileSync(fp, "utf8");
    const orig = content;
    for (const [id, reg] of Object.entries(IMAGE_REGISTRY)) {
      if (!content.includes(id)) continue;
      content = addImageNameToMdx(content, id, reg.imageName);
      content = addNameFieldToCommentedBlock(content, id, reg.imageName);
    }
    if (content !== orig) {
      writeFileSync(fp, content);
      console.log("mdx", pageDir, file);
    }
  }
}
