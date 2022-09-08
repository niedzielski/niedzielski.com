import { HeadingEl } from '@/el/HeadingEl.tsx';
import { HTMLPageEl } from '@/el/HTMLPageEl.tsx';
import { NavEl } from '@/el/NavEl.tsx';
import React from 'react';
import type { Article } from '@/types/Article.ts';

export type ArticleProps = Readonly<{ article: Readonly<Article> }>;

export function ArticleEl({ article }: TemplateProps): React.ReactElement {
  switch (article.type) {
    case 'Homepage':
      return <HomepageEl article={article} />;
    case 'Index':
    case 'Profile':
    case 'Work':
      if (article.meta.title == null) {
        throw Error(`"${article.url}" metadata title expected to be string.`);
      }
      return (
        <TemplateEl article={article}>
          <HeadingEl id='title' label={article.meta.title} level={1} />
          <MarkdownEl dangerousHTML={article.html} />
        </TemplateEl>
      );

    case 'Log':
    case 'Note':
      if (article.meta.title == null) {
        throw Error(`"${article.url}" metadata title expected to be string.`);
      }
      return (
        <TemplateEl article={article}>
          <HeadingEl id='title' label={article.meta.title} level={1} />
          <span className='subtitle'>{article.meta.headline}</span>
          <MarkdownEl dangerousHTML={article.html} />
        </TemplateEl>
      );
  }
}

export type HomepageProps = Readonly<{ article: Readonly<Article> }>;

export function HomepageEl({ article }: TemplateProps): React.ReactElement {
  return (
    <TemplateEl article={article}>
      <MarkdownEl dangerousHTML={article.html} />
    </TemplateEl>
  );
}

export type MarkdownProps = Readonly<{ dangerousHTML: string }>;

export function MarkdownEl(
  { dangerousHTML }: MarkdownProps,
): React.ReactElement {
  return (
    <div
      className='markdown'
      dangerouslySetInnerHTML={{ __html: dangerousHTML }}
    />
  );
}

export type IndexProps = Readonly<{
  article: Readonly<Article>;
  subarticles: readonly Readonly<Article>[];
}>;

export function IndexEl({
  article,
  subarticles,
}: IndexProps): React.ReactElement {
  return (
    <TemplateEl article={article}>
      <h1 id='title'>{article.meta.title}</h1>
      {subarticles.map((subarticle, i) => (
        <li key={i}>
          <a href={`/${subarticle.url}`}>{subarticle.meta.title}</a>{' '}
          <span>{subarticle.meta.headline}</span>
        </li>
      ))}
    </TemplateEl>
  );
}

export type TemplateProps = Readonly<{
  article: Readonly<Article>;
  children?: React.ReactNode;
}>;

export function TemplateEl({
  article,
  children,
}: TemplateProps): React.ReactElement {
  return (
    <HTMLPageEl
      dateModified={article.meta.dateModified}
      datePublished={article.meta.datePublished}
      headline={article.meta.headline}
      image={article.meta.image}
      keywords={article.meta.keywords}
      title={article.meta.title}
      url={article.url}
    >
      <header>
        <NavEl />
      </header>
      <div className='page'>
        <main>{children}</main>
        <footer>
          <small className='footer__text'>
            © Stephen Niedzielski. This page was published on{' '}
            <time dateTime={article.meta.dateModified}>
              {article.meta.datePublished}
            </time>{' '}
            and modified{' '}
            <time dateTime={article.meta.dateModified}>
              {article.meta.dateModified}
            </time>
            .
          </small>
        </footer>
      </div>
    </HTMLPageEl>
  );
}
