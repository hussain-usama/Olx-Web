import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logoutUser } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

export default function HeaderMenu({user}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate=useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const userProfile = () => {
    navigate('/profile')
  };

  const handleLogout = () => {
     logoutUser()
  };

  const handleClose=()=>{
    setAnchorEl(null);
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <p style={{textTransform:'lowercase', textDecoration:'underline', fontSize:'15px', color:'black'}}
           onClick={handleClick}>
            {user?.email ?? ''}
        </p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={userProfile} style={{width:'200px'}}>Profile</MenuItem>
        <MenuItem onClick={handleLogout} style={{width:'200px'}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}