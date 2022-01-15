import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, InputBase, Menu, Select } from '@material-ui/core';

import { MemberAddIcon } from '../../../../../components/Icons';

const StyledButton = withStyles({
  root: {
    width: 48,
    minWidth: 48,
    height: 48,
    backgroundColor: '#1D1D1B',
    borderRadius: 6,
    '&:hover': {
      backgroundColor: '#1A1A1A',
    },
    '&:focus': {
      outline: 'none',
    },
  },
})(Button);

const StyledMenu = withStyles({
  paper: {
    margin: '12px 0',
  },
})(Menu);

const TextInput = withStyles({
  root: {
    width: '100%',
    height: '52px',
    borderRadius: '6px',
    border: 'solid 2px #f0f0f0',
    backgroundColor: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: '500',
    color: '#2e2e2e'
  },
  input: {
    padding: '16px',
  }
})(InputBase);

const BlackButton = withStyles({
  root: {
    width: '100%',
    height: 48,
    color: '#FFFFFF',
    padding: '6px 16px',
    backgroundColor: '#1D1D1B',
    textTransform: 'inherit',
    '&:hover': {
      backgroundColor: '#1A1A1A',
    },
    '&:focus': {
      outline: 'none',
    },
    '& span': {
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: 500,
    },
  },
})(Button);

const InviteButton = (props) => {
  return (
    <StyledButton {...props}>
      <MemberAddIcon />
    </StyledButton>
  )
};

const InviteMenu = (props) => {
  const { text, types, values, onChange, onFinish } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSend = () => {
    handleClose();
    onFinish();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <InviteButton onClick={handleClick} />
      <StyledMenu
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
        <div className="flex flex-col w-100 p-7.5">
          <p className="text-3xl font-semibold">{text.invites}</p>
          <span className="text-sm text-gray-400 mt-4">{text.inviteDescription}</span>
          <div className="mt-10">
            <div>
              <TextInput
                placeholder={text.firstname}
                value={values.firstname}
                onChange={e => onChange('firstname', e.target.value)}
              />
            </div>
            <div className="mt-6">
              <TextInput
                placeholder={text.lastname}
                value={values.lastname}
                onChange={e => onChange('lastname', e.target.value)}
              />
            </div>
            <div className="mt-6">
              <TextInput
                placeholder={text.email}
                value={values.email}
                onChange={e => onChange('email', e.target.value)}
              />
            </div>
            <div className="mt-6">
              <TextInput
                placeholder={text.faculty}
                value={values.faculty}
                onChange={e => onChange('faculty', e.target.value)}
              />
            </div>
            <div className="mt-6">
              <Select
                native
                value={values.type}
                onChange={e => onChange('type', parseInt(e.target.value))}
                input={<TextInput />}
              >
                {types.map((type, idx) => (
                  <option key={idx} value={type.id}>{type.name}</option>
                ))}
              </Select>
            </div>
            <div className="mt-9">
              <BlackButton onClick={() => handleSend()}>{text.send}</BlackButton>
            </div>
          </div>
        </div>
      </StyledMenu>
    </>
  )
};



export default InviteMenu;