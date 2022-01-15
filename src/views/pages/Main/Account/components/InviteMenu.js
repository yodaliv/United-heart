import React, { useState } from 'react';
import { Menu, ListItem } from '@material-ui/core';

import { ActionButton } from '../../../../../components/Buttons';
import { MoreIcon } from '../../../../../components/Icons';

import { userTypes } from '../../../../../constants';

const InviteMenu = (props) => {
  const { text, onFinish } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFinish = (type) => {
    handleClose();
    onFinish(type);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <ActionButton onClick={handleClick}>
        <MoreIcon />
      </ActionButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ListItem button onClick={() => handleFinish(userTypes.admin)}>
          <p className="text-xs text-blue-cornflower font-semibold cursor-pointer">{text.inviteAdmin}</p>
        </ListItem>
        <ListItem button onClick={() => handleFinish(userTypes.ambassador)}>
          <p className="text-xs text-blue-cornflower font-semibold cursor-pointer">{text.inviteAmbassador}</p>
        </ListItem>
      </Menu>
    </>
  )
};



export default InviteMenu;