#!/usr/bin/env -S deno run --allow-read --allow-write --quiet
import { _createWalkEntry, expandGlob, WalkEntry } from 'fs';
import { ArticleEl, IndexEl } from '@/el/TemplateEl.tsx';
import { compareDates } from '@/types/Date.ts';
import { parseArticle } from '@/parsers/articleParser.ts';
import { parseYYYYMMDDDate } from '@/parsers/dateParser.ts';
import * as path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { Article, ArticleType } from '@/types/Article.ts';

const filename = path.fromFileUrl(import.meta.url);
const rootDir = path.join(path.dirname(filename), '..');
// #dirs
const mdRoutes: readonly Readonly<Route>[] = [
  {
    autoIndex: true,
    dirname: 'log',
    sort: 'datePublished',
    title: 'Log',
    type: 'Log',
  },
  {
    autoIndex: true,
    dirname: 'notes',
    sort: 'dateModified',
    title: 'Notes',
    type: 'Note',
  },
  {
    autoIndex: false,
    dirname: 'stephen',
    sort: 'dateModified',
    title: 'Profile',
    type: 'Profile',
  },
  {
    autoIndex: false,
    dirname: 'works',
    sort: 'dateModified',
    title: 'Works',
    type: 'Work',
  },
];
const extraMdFilenames: readonly [ArticleType, string][] = [
  ['Homepage', 'index.md'],
];
const mdExt = 'md';
const htmlExt = 'html';

interface Route {
  /** Whether to automatically generate an index. */
  autoIndex: boolean;
  dirname: string;
  sort: 'datePublished' | 'dateModified';
  title: string;
  type: ArticleType;
}

async function main(): Promise<void> {
  for (const { autoIndex, dirname, sort, title, type } of mdRoutes) {
    const entries = expandGlob(`${dirname}/**/*.${mdExt}`, {
      includeDirs: false,
    });
    const articles = [];
    for await (const entry of entries) {
      const article = await renderArticle(entry, type);
      articles.push(article);
    }
    articles
      .sort((lhs, rhs) =>
        compareDates(
          parseYYYYMMDDDate(lhs.meta[sort]),
          parseYYYYMMDDDate(rhs.meta[sort]),
        )
      )
      .reverse();

    const maxDateModified = articles.reduce(
      (max, article) =>
        compareDates(
            parseYYYYMMDDDate(max),
            parseYYYYMMDDDate(article.meta.dateModified),
          ) < 0
          ? article.meta.dateModified
          : max,
      articles[0].meta.dateModified,
    );
    const minDatePublished = articles.reduce(
      (min, article) =>
        compareDates(
            parseYYYYMMDDDate(min),
            parseYYYYMMDDDate(article.meta.datePublished),
          ) > 0
          ? article.meta.datePublished
          : min,
      articles[0].meta.datePublished,
    );
    const keywords = articles.reduce(
      (sum, article) => sum.concat(article.meta.keywords),
      [] as string[],
    );

    if (!autoIndex) continue;
    const index: Article = {
      meta: {
        dateModified: maxDateModified,
        datePublished: minDatePublished,
        keywords,
        headline: 'Index',
        title,
      },
      html: '',
      type: 'Index',
      url: dirname,
    };
    renderIndex(index, articles);
  }
  for (const [type, filename] of extraMdFilenames) {
    const entry = await _createWalkEntry(filename);
    await renderArticle(entry, type);
  }
}

async function renderIndex(
  article: Readonly<Article>,
  subarticles: readonly Readonly<Article>[],
): Promise<Article> {
  const htmlFilename = `${article.url}/index.${htmlExt}`;
  await renderHTML(
    <IndexEl article={article} subarticles={subarticles} />,
    htmlFilename,
  );
  return article;
}

async function renderArticle(
  entry: WalkEntry,
  type: ArticleType,
): Promise<Article> {
  const md = await Deno.readTextFile(entry.path);

  const url = entry.path.slice(rootDir.length + 1, -entry.name.length - 1);
  const article = parseArticle(type, url, md);

  const htmlFilename = `${entry.path.slice(0, -mdExt.length)}${htmlExt}`;
  await renderHTML(<ArticleEl article={article} />, htmlFilename);

  return article;
}

async function renderHTML(
  root: React.ReactElement,
  htmlFilename: string,
): Promise<void> {
  const html = `<!doctype html>${ReactDOMServer.renderToString(root)}`;
  await Deno.writeTextFile(htmlFilename, html);
}

await main();
