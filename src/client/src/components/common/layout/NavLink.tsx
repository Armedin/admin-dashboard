import styled from '@emotion/styled';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import pathToRegexp from 'path-to-regexp';

interface NavLinkProps {
  children?: React.ReactNode;
  href: string;
  exact?: boolean;
}

const NavLinkRoot = styled('div')({
  color: '#fff',
  opacity: '0.8',
  fontWeight: '500',
  padding: '12px 24px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  svg: {
    marginRight: 16,
    opacity: 0.7,
  },

  '&.active': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: '#fff',
    opacity: 1,
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: '#fff',
    opacity: 1,
  },
});

const NavLink = (props: NavLinkProps) => {
  const { href, exact = false, children } = props;
  const { asPath } = useRouter();
  const isActive = pathToRegexp(href, [], {
    sensitive: true,
    end: !!exact,
  }).test(asPath);

  return (
    <Link href={href}>
      <NavLinkRoot className={clsx(isActive && 'active')}>
        {children}
      </NavLinkRoot>
    </Link>
  );
};

export default NavLink;
