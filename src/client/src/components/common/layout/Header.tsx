import styled from '@emotion/styled';

const StyledHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '25px 60px',
  boxShadow: '0 10px 30px 0 rgb(82 63 105 / 5%)',
  height: '65px',
  position: 'fixed',
  top: 0,
  right: 0,
  left: '260px',
  backgroundColor: '#6565ca',
  zIndex: 99,
});

const Header = () => {
  return <StyledHeader></StyledHeader>;
};

export default Header;
