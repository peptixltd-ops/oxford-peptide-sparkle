import { Link } from "@tanstack/react-router";

export type ArticleCardData = {
  img: string;
  date: string;
  title: string;
  excerpt?: string;
  to?: string;
};

type Props = {
  article: ArticleCardData;
  variant?: "compact" | "full";
};

/**
 * Shared article/guide card used by the homepage Research Library and
 * the Research Hub index. When a Release 2 guide route exists it can be
 * passed via `to`.
 */
export function ArticleCard({ article, variant = "compact" }: Props) {
  const inner = (
    <>
      <div className="aspect-[4/3] overflow-hidden mb-3">
        <img
          src={article.img}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="text-[10px] text-muted-foreground mb-1.5 tracking-wider">{article.date}</div>
      <h3 className="font-display text-base font-semibold leading-snug group-hover:text-gold transition-colors">
        {article.title}
      </h3>
      {variant === "full" && article.excerpt && (
        <p className="text-sm text-muted-foreground mt-2">{article.excerpt}</p>
      )}
    </>
  );

  if (article.to) {
    return (
      <Link to={article.to} className="group cursor-pointer block focus-visible:outline-2 focus-visible:outline-gold">
        {inner}
      </Link>
    );
  }

  return (
    <article className="group block">
      {inner}
    </article>
  );
}
