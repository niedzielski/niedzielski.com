import React from 'react';

export type HTMLPageProps = Readonly<{
  children: React.ReactNode;
  dateModified: string;
  datePublished: string;
  keywords: string[];
  headline: string;
  image?: string;
  title?: string;
  url: string;
}>;

export function HTMLPageEl({
  children,
  dateModified,
  datePublished,
  keywords,
  headline,
  image,
  title,
  url,
}: HTMLPageProps): React.ReactElement {
  const canonicalURL = `https://niedzielski.com/${url}`;
  const blob = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: {
      '@type': 'Person',
      name: 'Stephen Niedzielski',
      url: 'https://niedzielski.com',
    },
    dateModified,
    datePublished,
    headline,
    image,
    name: title,
    url: canonicalURL,
    publisher: {
      '@type': 'Organization',
      logo: 'https://oidoid.com/oidoid.png',
      name: 'oidoid',
      url: 'https://oidoid.com',
    },
  });
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={keywords.join()} />
        {/* #theme */}
        <meta name='theme-color' content='#f2f5f5' />
        <meta name='creator' content='Stephen Niedzielski' />
        <link rel='canonical' href={canonicalURL}></link>
        <meta
          http-equiv='Content-Security-Policy'
          content="default-src 'none'; img-src 'self' data:; script-src 'unsafe-inline'; style-src 'self'; connect-src 'self'; media-src 'self'"
        />
        <title>
          {title == null ? 'NIEDZIELSKI' : `${title} - NIEDZIELSKI`}
        </title>
        <link rel='stylesheet' href='/index.css' />
        <link rel='icon' href='/favicon.png?v=0.0.0' />
      </head>
      <body>
        {children}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: blob }}
        />
      </body>
    </html>
  );
}
