import React from 'react'

// import './HeadingEl.css'

export type HeadingProps = Readonly<{
  /** Fragment identifier for linking. */
  id?: string
  label: string
  level: HeadingLevel
}>

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export function HeadingEl({
  label,
  level,
  id = escapeStr(label)
}: HeadingProps): React.ReactElement {
  const H = headingLevelToEl[level]
  return (
    <H className={`heading heading--${level}`} id={id}>
      <a className='heading__fragment' href={`#${id}`}>
        #
      </a>
      {label}
    </H>
  )
}

function escapeStr(str: string): string {
  return str
    .slice(0, 128)
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
}

type HProps = Readonly<{
  children: React.ReactNode
  className: string
  id: string
}>

const headingLevelToEl: Readonly<
  Record<HeadingLevel, (props: HProps) => React.ReactElement>
> = Object.freeze({
  1: props => <h1 {...props} />,
  2: props => <h2 {...props} />,
  3: props => <h3 {...props} />,
  4: props => <h4 {...props} />,
  5: props => <h5 {...props} />,
  6: props => <h6 {...props} />
})
