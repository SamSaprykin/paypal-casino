/**
 * Inline article image for markdown `div.content-image`.
 * Uses public URLs (e.g. /assets/se/home-page-hero.png).
 */
export function ArticleContentImage({
  src,
  alt = "",
  caption,
}) {
  if (!src || typeof src !== "string" || !src.trim()) return null;

  return (
    <figure className="my-8 flex flex-col items-center">
      <img
        src={src.trim()}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-auto w-full max-w-full rounded-xl object-contain shadow-sm ring-1 ring-slate-200 sm:max-w-[60%]"
      />
      {caption ? (
        <figcaption className="mt-3 max-w-full text-center text-sm italic text-slate-500 sm:max-w-[60%]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
