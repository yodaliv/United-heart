import { withStyles } from '@material-ui/core/styles';
import { Divider, ListItem, ListItemText, Menu } from '@material-ui/core';

import { userTypes } from '../../constants';

const StyledMenu = withStyles({
  paper: {
    padding: '0 0 6px 0',
    width: '223px',
    borderRadius: '6px',
    boxShadow: '0 20px 20px 8px rgba(0, 0, 0, 0.09)',
    border: 'solid 1px #eaebec',
    margin: '12px 0',
    '& .MuiList-padding': {
      padding: 0
    }
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

const MenuItem = withStyles({
  root: {
    outline: 'none'
  },
})(ListItem);

const MenuText = withStyles({
  root: {
    '& .MuiTypography-body1': {
      fontFamily: 'Poppins',
      fontSize: '17px',
      fontWeight: 'bold',
      color: '#2e2e2e',
    },
    '& .MuiTypography-body2': {
      fontFamily: 'Poppins',
      fontSize: '12px',
      fontWeight: '500'
    }
  },
})(ListItemText);

const MenuLink = withStyles({
  root: {
    '& span': {
      fontFamily: 'Poppins',
      fontSize: '14px',
      fontWeight: '500',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.71',
      letterSpacing: 'normal',
      color: '#4588ff',
      cursor: 'pointer'
    }
  }
})(ListItemText);

const UserDropDown = ({ text, anchorEl, isAdmin, userInfo, onClick, onClose }) => {
  const getRoleName = (role) => {
    switch (role) {
      case userTypes.uicAdmin:
        return text.uicAdmin;
      case userTypes.masterAdmin:
        return text.masterAdmin;
      case userTypes.admin:
        return text.admin;
      case userTypes.ambassador:
        return text.ambassador;
      case userTypes.student:
        return text.student;

      default:
        return '';
    }
  };

  return (
    <StyledMenu
      id="user-dropdown"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem>
        <MenuText
          primary={`${userInfo.firstname} ${userInfo.lastname}`}
          secondary={getRoleName(userInfo.role)}
        />
      </MenuItem>
      <Divider />
      {userInfo.role === userTypes.uicAdmin ? isAdmin ? (
        <MenuItem>
          <MenuLink
            primary={text.gotoHome}
            onClick={() => onClick('home')}
          />
        </MenuItem>
      ) : (
        <MenuItem>
          <MenuLink
            primary={text.gotoAdmin}
            onClick={() => onClick('admin')}
          />
        </MenuItem>
      ) : null}
      {userInfo.role !== userTypes.uicAdmin && (
        <MenuItem>
          <MenuLink
            primary={text.account}
            onClick={() => onClick('account')}
          />
        </MenuItem>
      )}
      <MenuItem>
        <MenuLink
          primary={text.signout}
          onClick={() => onClick('sign-out')}
        />
      </MenuItem>
    </StyledMenu>
  );
};

const AuthDropDown = ({ text, anchorEl, history, onClose }) => (
  <StyledMenu
    id="auth-dropdown"
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={onClose}
  >
    <MenuItem>
      <MenuLink
        primary={text.signup}
        onClick={() => history.push('/auth/signup')}
      />
    </MenuItem>
    <MenuItem>
      <MenuLink
        primary={text.login}
        onClick={() => history.push('/auth/login')}
      />
    </MenuItem>
  </StyledMenu>
);

export { UserDropDown, AuthDropDown };
