import styled from '@emotion/styled';
import { Box, Typography } from '@kukui/ui';
import { Heart, BookOpen } from '@kukui/icons';
import Link from 'next/link';

const StyledTopbar = styled(Box)({
  background: '#080808',
  color: '#e8ebf0',
  fontSize: '12px',
  padding: '0 60px',
  height: '40px',
  display: 'flex',
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontWeight: 300,
});
const TopbarGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  lineHeight: '40px',
  marginRight: '28px',
  paddingRight: '28px',
  borderRight: '1px solid hsla(0, 0%, 80%, 0.5)',
  color: '#e8ebf0',
});

const Topbar = () => {
  return (
    <StyledTopbar>
      <Typography sx={{ fontWeight: 300, lineHeight: '40px' }}>
        Free Shipping Available!
      </Typography>

      <Box sx={{ textAlign: 'right', display: 'flex' }}>
        <TopbarGroup>
          <BookOpen fontSize="inherit" sx={{ marginRight: '6px' }} />
          <Link href="/">Browse Catalog</Link>
        </TopbarGroup>
        <TopbarGroup>
          <Heart fontSize="inherit" sx={{ marginRight: '6px' }} />
          <Link href="/">Who We Are</Link>
        </TopbarGroup>
      </Box>
    </StyledTopbar>
  );
};

export default Topbar;
