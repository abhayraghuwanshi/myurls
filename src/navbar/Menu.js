import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';



export default function MenuPopupState() {
  const navigate = useNavigate(); // For programmatic navigation

  return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button {...bindTrigger(popupState)}>
              <IconButton><Settings /></IconButton>
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={() => { navigate('/profile'); popupState.close(); }}>My account</MenuItem>
              <MenuItem onClick={() => { navigate('/marketplace'); popupState.close(); }}>MarketPlace</MenuItem>
              <MenuItem onClick={() => { navigate('/logout'); popupState.close(); }}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
}
