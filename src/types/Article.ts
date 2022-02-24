/** All data associated with a Markdown file. */
export type Article = {
  meta: Meta
  /** **Unsanitized** HTML. */
  html: string
  type: ArticleType
  /** Relative canonical URL. */
  url: string
}

export type ArticleType =
  | 'Homepage'
  | 'Index'
  | 'Log'
  | 'Note'
  | 'Profile'
  | 'Work'

/** Metadata at the top of a markdown file. */
export type Meta = {
  dateModified: string
  datePublished: string
  keywords: string[]
  headline: string
  image?: string | undefined
  title?: string | undefined
}
