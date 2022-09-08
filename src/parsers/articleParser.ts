import { assertNonBlank } from '@/types/string.ts';
import { assertObject } from '@/types/object.ts';
import { parseHTML } from '@/parsers/htmlParser.tsx';
import { parseYYYYMMDDDate } from '@/parsers/dateParser.ts';
import jsYAML from 'js-yaml';
import type { Article, ArticleType, Meta } from '@/types/Article.ts';
import type { JSONValue } from '@/types/JSON.ts';

export function parseArticle(
  type: ArticleType,
  url: string,
  yamlMarkdown: string,
): Article {
  const matches = yamlMarkdown.match(
    /(?:\s*^---$(?<yaml>.*)^---$)?(?<md>.*)/ms,
  );
  const { yaml, md } = matches?.groups ?? {};
  const obj = parseYAML(yaml);
  const html = parseHTML(md);
  if (html == null) throw Error(`Expected "${url}" Markdown to generate HTML.`);
  return { meta: parseMeta(url, obj), html, type, url };
}

const metaKeys: ReadonlySet<string> = new Set(
  <(keyof Meta)[]> [
    'dateModified',
    'datePublished',
    'keywords',
    'headline',
    'image',
    'title',
  ],
);

function parseMeta(url: string, val: JSONValue | undefined): Meta {
  assertObject(val, `"${url}" metadata expected to be an object.`);

  const unknownKeys = Object.keys(val).filter((key) => !metaKeys.has(key));
  if (unknownKeys.length > 0) {
    throw Error(
      `"${url}" metadata contains unknown properties: ${
        unknownKeys.join(
          ', ',
        )
      }.`,
    );
  }

  const dateModified = val.dateModified;
  if (
    typeof dateModified != 'string' ||
    parseYYYYMMDDDate(dateModified) == null
  ) {
    throw Error(
      `"${url}" metadata dateModified expected to be stringified as "YYYY-MM-DD".`,
    );
  }

  const datePublished = val.datePublished;
  if (
    typeof datePublished != 'string' ||
    parseYYYYMMDDDate(datePublished) == null
  ) {
    throw Error(
      `"${url}" metadata datePublished expected to be stringified as "YYYY-MM-DD".`,
    );
  }

  if (!Array.isArray(val.keywords)) {
    throw Error(`"${url}" metadata keywords expected to be an array.`);
  }
  const keywords = [];
  for (const keyword of val.keywords) {
    if (typeof keyword != 'string') {
      throw Error(`"${url}" metadata keyword expected to be string.`);
    }
    assertNonBlank(
      keyword,
      `"${url}" metadata keyword expected to be nonblank.`,
    );
    keywords.push(keyword);
  }

  const headline = val.headline;
  if (typeof headline != 'string') {
    throw Error(`"${url}" metadata headline expected to be string.`);
  }
  assertNonBlank(
    headline,
    `"${url}" metadata headline expected to be nonblank.`,
  );

  const image = val.image;
  if (image != null && typeof image != 'string') {
    throw Error(`"${url}" metadata image expected to be null or string.`);
  }
  if (image != null) {
    assertNonBlank(image, `"${url}" metadata image expected to be nonblank.`);
  }

  const title = val.title;
  if (title !== null && typeof title != 'string') {
    throw Error(`"${url}" metadata title expected to be string.`);
  }
  if (title != null) {
    assertNonBlank(title, `"${url}" metadata title expected to be nonblank.`);
  }

  return {
    dateModified,
    datePublished,
    keywords,
    headline,
    image: image ?? undefined,
    title: title ?? undefined,
  };
}

function parseYAML(yaml: string | undefined): JSONValue | undefined {
  return yaml == null ? undefined : <JSONValue> jsYAML.load(yaml);
}
