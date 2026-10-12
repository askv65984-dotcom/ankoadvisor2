import Link from "next/link";
import type { CSSProperties } from "react";
import { formatInsightDate, type Insight } from "@/content/insights";
import { Photo } from "./photo";
import { Tag } from "./sections";

/**
 * Article card used on the Insights hub, the home page, service pages and related lists: a grey panel
 * with the photo across the top and a gold "Read more" button at the foot. The row layout puts a
 * small square photo beside the words, for side columns.
 */
export function InsightCard({
  insight,
  index = 0,
  headingLevel = "h3",
  layout = "stacked",
}: {
  insight: Insight;
  index?: number;
  headingLevel?: "h2" | "h3";
  layout?: "stacked" | "row";
}) {
  const Heading = headingLevel;
  const row = layout === "row";
  return (
    <article
      data-reveal
      style={{ "--d": `${index * 80}ms` } as CSSProperties}
      className={`group relative flex bg-panel ${row ? "flex-col sm:flex-row sm:items-stretch" : "flex-col"}`}
    >
      <div className={`relative overflow-hidden ${row ? "aspect-[16/9] sm:aspect-auto sm:w-40 sm:shrink-0" : "aspect-[16/9]"}`}>
        <Photo
          name={insight.image}
          alt=""
          sizes={row ? "(min-width: 640px) 10rem, 90vw" : "(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className={`flex flex-1 flex-col ${row ? "p-4 sm:p-5" : "px-4 pt-5 pb-7 sm:px-5"}`}>
        <Tag label={insight.category} />
        <Heading className={`mt-2 leading-snug font-bold text-fg ${row ? "text-[1.125rem]" : "text-[1.3125rem]"}`}>
          <Link href={`/insights/${insight.slug}`} className="text-fg no-underline after:absolute after:inset-0 group-hover:text-ocean">
            {insight.title}
          </Link>
        </Heading>
        <p className="mt-1.5 text-[0.9375rem] text-fg-soft">
          <time dateTime={insight.updated}>{formatInsightDate(insight.updated)}</time>
          <span aria-hidden="true"> &middot; </span>
          {insight.readMinutes} min read
        </p>
        <p className={`mt-3 flex-1 text-fg-muted ${row ? "line-clamp-2 text-[0.9375rem]" : ""}`}>{insight.description}</p>
        {row ? null : (
          <span aria-hidden="true" className="mt-6">
            <span className="btn btn-accent min-h-10 px-7 py-2.5 text-[0.8125rem]">Read more</span>
          </span>
        )}
      </div>
    </article>
  );
}
