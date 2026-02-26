import React, {type ReactNode} from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  const navLinks = [
    { label: 'Concepts', to: '/concepts/overview' },
    { label: 'Contracts', to: '/contracts/v4/overview' },
    { label: 'SDKs', to: '/sdk/v4/overview' },
    { label: 'APIs', to: '/api/overview' },
    { label: 'Support', to: '/builder-support/get-funded' },
    { label: 'LLMs', to: '/llms/overview' },
  ];

  return (
    <ul className="menu__list">
      {navLinks.map((link, i) => (
        <li key={i} className="menu__list-item">
          <Link
            className="menu__link"
            to={link.to}
            onClick={() => mobileSidebar.toggle()}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
