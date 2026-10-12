import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { FaqList } from "@/components/site/faq-list";
import { InsightCard } from "@/components/site/insight-card";
import { JsonLd } from "@/components/site/json-ld";
import { BrandMark } from "@/components/site/logo";
import { Photo } from "@/components/site/photo";
import { CheckList, CtaBand, SectionHeading, Tag, practiceTone } from "@/components/site/sections";
import { formatInsightDate, getInsight, insights, relatedInsights } from "@/content/insights";
import { getService } from "@/content/services";
import { faqJsonLd, organizationId, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { photoSrc } from "@/lib/photos";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

// Articles are prerendered and must be complete in the HTML for crawlers that do not run JavaScript.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.metaTitle,
    absoluteTitle: true,
    description: insight.description,
    path: `/insights/${insight.slug}`,
    article: {
      publishedTime: insight.published,
      modifiedTime: insight.updated,
      section: insight.category,
      tags: insight.tags,
    },
  });
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const path = `/insights/${insight.slug}`;
  const service = getService(insight.serviceSlug);
  const related = relatedInsights(insight);
  const { Body } = insight;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    headline: insight.title,
    description: insight.description,
    image: [absoluteUrl(photoSrc(insight.image))],
    datePublished: insight.published,
    dateModified: insight.updated,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
    articleSection: insight.category,
    keywords: insight.tags.join(", "),
    inLanguage: "en-US",
    isPartOf: { "@id": `${absoluteUrl("/insights")}#blog` },
    ...(service ? { about: { "@type": "Service", name: service.heading, url: absoluteUrl(`/services/${service.slug}`) } } : {}),
  };

  return (
    <>
      <header className="pt-[4.5rem] lg:pt-24">
        <div className="theme-dark bg-base">
        <div className="page-container py-10 md:py-14">
          <div className="rise">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Insights", path: "/insights" },
                { name: insight.title, path },
              ]}
            />
          </div>
          <Tag label={insight.category} className="rise mt-7" />
          <h1 className="rise mt-3 max-w-[28ch] text-display font-bold text-fg">{insight.title}</h1>
          <p className="rise mt-5 max-w-[46rem] text-lede text-fg-muted">{insight.description}</p>
          <p className="rise mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-fg-soft">
            <span>
              By{" "}
              <Link href="/about" className="text-fg underline decoration-fg/30 hover:decoration-accent">
                Anoka Advisors
              </Link>
            </span>
            <span>
              Updated <time dateTime={insight.updated}>{formatInsightDate(insight.updated)}</time>
            </span>
            <span>{insight.readMinutes} min read</span>
          </p>
        </div>
        </div>
        <div className="page-container">
          <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-panel md:mt-12 md:aspect-[21/9]">
            <Photo name={insight.image} alt="" priority sizes="(min-width: 1280px) 72rem, 100vw" className="kenburns object-cover" />
          </div>
        </div>
      </header>

      <div className="page-container grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <article className="min-w-0 lg:col-span-8">
          <section aria-labelledby="takeaways-heading" className="card mb-12 border-l-4 border-bright p-6 md:p-8">
            <h2 id="takeaways-heading" className="text-[1.5rem] font-bold text-fg">
              Key takeaways
            </h2>
            <div className="mt-5">
              <CheckList items={insight.keyTakeaways} />
            </div>
          </section>

          <div className="article-prose max-w-[46rem]">
            <Body />
          </div>

          <section aria-labelledby="article-faq" className="mt-16 max-w-[46rem]">
            <h2 id="article-faq" className="text-section mb-6 text-fg">
              Frequently asked questions
            </h2>
            <FaqList faqs={insight.faqs} />
          </section>

          <aside className="card mt-14 flex max-w-[46rem] gap-5 p-6">
            <BrandMark className="size-12 shrink-0" />
            <div>
              <p className="font-semibold text-fg">Written by Anoka Advisors</p>
              <p className="mt-1 text-[0.975rem] text-fg-muted">
                Anoka Advisors is an independent US consulting firm focused on healthcare, telehealth and pharmacy
                operations. This guide is general information, not legal, medical or billing advice.{" "}
                <Link href="/about" className="text-link">
                  About the firm
                </Link>
              </p>
            </div>
          </aside>
        </article>

        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <nav aria-label="In this article" className="card border-t-4 border-bright p-6">
              <h2 className="text-[0.875rem] font-bold tracking-[0.05em] text-accent uppercase">In this article</h2>
              <ol className="mt-4 space-y-2.5 text-[0.9375rem]">
                {insight.toc.map((item, index) => (
                  <li key={item.id} className="flex gap-3">
                    <span className="w-5 shrink-0 text-fg-soft">{index + 1}.</span>
                    <a href={`#${item.id}`} className="text-fg-muted no-underline hover:text-accent">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {service ? (
              <div className={`card group relative ${practiceTone(service.name)}`}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Photo name={service.images.card} alt="" sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="px-5 pt-5 pb-6">
                  <p className="tag">Related service</p>
                  <h2 className="mt-2 text-[1.25rem] font-bold text-fg">
                    <Link href={`/services/${service.slug}`} className="text-fg no-underline after:absolute after:inset-0 hover:text-ocean">
                      {service.heading}
                    </Link>
                  </h2>
                  <p className="mt-2 text-[0.9375rem] text-fg-muted">{service.summary}</p>
                </div>
              </div>
            ) : null}

            <div className="theme-dark theme-navy bg-base p-6">
              <h2 className="text-[1.375rem] font-bold text-fg">Talk it through</h2>
              <p className="mt-2 text-[0.9375rem] text-fg-muted">A one-to-one video meeting to talk through your situation and agree next steps.</p>
              <Link href="/book" className="btn btn-accent mt-5 w-full">
                Book a consultation
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <section aria-labelledby="related-heading" className="bg-deep py-16 md:py-24">
        <div className="page-container">
          <SectionHeading center title="Related insights" id="related-heading" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <InsightCard key={item.slug} insight={item} index={index} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/insights" className="btn btn-ghost">
              All insights
            </Link>
          </div>
        </div>
      </section>

      <CtaBand image={service?.images.cta} />

      <JsonLd
        data={webPageJsonLd({
          path,
          name: insight.metaTitle,
          description: insight.description,
          image: photoSrc(insight.image),
          datePublished: insight.published,
          dateModified: insight.updated,
        })}
      />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd(insight.faqs, path)} />
    </>
  );
}
