import React from 'react';

// #dirs
const links = Object.freeze(
  [
    ['Works', '/works'],
    ['Notes', '/notes'],
    ['Log', '/log'],
    ['Profile', '/stephen'],
  ] as const,
);

export function NavEl(): React.ReactElement {
  return (
    <nav>
      <ul className='nav__list'>
        <li className='nav__link-item'>
          <NavLink href='/'>
            <img
              className='logo'
              src='/logo.png'
              width='160'
              height='24'
              alt='NIEDZIELSKI'
            />
          </NavLink>
        </li>
        {links.map(([label, href], i) => (
          <li className='nav__link-item'>
            <NavLink key={i} href={href}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type NavLinkProps = {
  readonly children: React.ReactNode;
  readonly href: string;
};

function NavLink({ children, href }: NavLinkProps): React.ReactElement {
  return (
    <a className='nav__link' href={href}>
      {children}
    </a>
  );
}
