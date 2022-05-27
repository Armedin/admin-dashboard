import styled from '@emotion/styled';
import { Button as KukuiButton, ButtonProps } from '@kukui/ui';

const StyledButton = styled(KukuiButton)<ButtonProps>({
  height: '40px',
  fontSize: '0.8rem',
});

const Button = ({ ...props }: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default Button;
