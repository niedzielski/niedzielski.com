import {HeadingEl, HeadingLevel} from '@/el/HeadingEl.tsx'
import {marked} from 'marked'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

const options = Object.freeze({gfm: true, smartLists: true})
const renderer = Object.freeze({
  heading(text: string, level: HeadingLevel): string {
    return ReactDOMServer.renderToString(
      <HeadingEl label={text} level={level} />
    )
  }
})
marked.use({renderer})

export function parseHTML(markdown: string): string {
  return marked.parse(markdown, options)
}
