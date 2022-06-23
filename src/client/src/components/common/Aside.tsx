import styled from '@emotion/styled';
import { ChartNetwork, Shelves } from '@kukui/icons';
import { Box } from '@kukui/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavLink from './NavLink';

const StyledAside = styled('div')`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  width: 260px;
  background-color: #1e1e2d;
  color: #fff;
  box-shadow: 0 1px 3px 0 rgb(54 74 99 / 2%);
  display: flex;
  flex-direction: column;
  font-size: 13px;
`;
const Brand = styled('div')`
  padding: 0 24px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: none;
`;
const Nav = styled('div')`
  width: 100%;
  flex: 1 1 100%;
`;
const NavItem = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
`;
const NavTitle = styled('span')({
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: 'var(--text-primary)',
});
const NavDesc = styled('span')({
  fontSize: '11px',
  lineHeight: '1.5',
  opacity: 0.5,
});

const navLinks = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <ChartNetwork />,
  },
  {
    name: 'Products',
    href: '/products',
    icon: <Shelves />,
  },
];

const Aside = () => {
  const { pathname } = useRouter();

  return (
    <StyledAside>
      <Brand>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.9rem',
              color: 'var(--text-default)',
            }}
          >
            A
          </Box>
          <Box
            sx={{
              marginLeft: '0.75rem',
              fontSize: '1.15rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
            }}
          >
            Amortentia
          </Box>
        </Box>
      </Brand>
      <Nav>
        <NavItem>
          <NavTitle>Applications</NavTitle>
          <NavDesc>Navigate through applications</NavDesc>
        </NavItem>
        {navLinks.map(navLink => (
          <NavLink href={navLink.href} exact={navLink.href === '/'}>
            {navLink.icon}
            {navLink.name}
          </NavLink>
        ))}
      </Nav>
    </StyledAside>
  );
};

export default Aside;
