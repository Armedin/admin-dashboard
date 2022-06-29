import styled from '@emotion/styled';
import { ChevronDownSolid } from '@kukui/icons';
import { Button, Menu, MenuItem } from '@kukui/ui';
import { useState } from 'react';

export interface ActionType {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface ActionsProps {
  actions?: ActionType[];
  onClose?: () => void;
}

const StyledMenu = styled(Menu)({
  '&.KukuiMenu': {
    marginTop: '6px',
    minWidth: '180px',
  },
  '.KukuiMenuItem': {
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
  },
  '.KukuiSvgIcon': {
    fontSize: '16px',
    marginRight: '8px',
  },
});

const Actions = ({ actions = [] }: ActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="secondary"
        sx={{ height: '36px', fontSize: '0.8rem' }}
        onClick={handleOpen}
      >
        Actions
        <ChevronDownSolid sx={{ marginLeft: '8px', fontSize: '12px' }} />
      </Button>

      <StyledMenu
        open={open}
        anchorEl={anchorEl}
        PopperProps={{ placement: 'bottom-end' }}
        onClose={handleClose}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick();
              handleClose();
            }}
          >
            {action.icon}
            {action.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default Actions;
