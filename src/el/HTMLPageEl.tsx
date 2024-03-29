import React from 'react';

export type HTMLPageProps = {
  readonly children: React.ReactNode;
  readonly dateModified: string;
  readonly datePublished: string;
  readonly keywords: string[];
  readonly headline: string;
  readonly image?: string | undefined;
  readonly title?: string | undefined;
  readonly url: string;
};

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
  const canonicalURL = `https://oidoid.com/${url}`;
  const blob = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: {
      '@type': 'Person',
      name: 'Stephen Niedzielski',
      url: 'https://oidoid.com',
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
          content="upgrade-insecure-requests; form-action 'none'; base-uri: 'none'; frame-ancestors 'none'; default-src 'none'; img-src 'self' data:; script-src 'unsafe-inline'; style-src 'self'; connect-src 'self'; media-src 'self'"
        />
        <meta http-equiv='refresh' content='0;url=https://oidoid.com' />
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
