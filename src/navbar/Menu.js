import { Settings } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import React from 'react';
import { useNavigate } from 'react-router-dom';



export default function MenuPopupState() {
  const navigate = useNavigate(); // For programmatic navigation

  return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button {...bindTrigger(popupState)}>
              <Settings />
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
