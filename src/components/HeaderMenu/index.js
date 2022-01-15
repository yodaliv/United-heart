import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Menu } from '@material-ui/icons';

import HeaderButton from './HeaderButton';
import { PeopleIcon, CubeIcon, NewsIcon, DonationIcon, AvatarIcon } from './HeaderIcons';
import { UserDropDown, AuthDropDown } from './HeaderDropdowns';
import { BlueButton } from '../Buttons';

import { userTypes } from '../../constants';
import { useTranslations } from '../../hooks/translations';

const HeaderMenu = (props) => {
  const { history, userInfo, isAdmin, cookies } = props;
  const text = useTranslations('header');
  const [showDropDowns, setShowDropDowns] = useState({
    user: null,
    auth: null,
  });

  const handleOpenDropDown = (type, event) => {
    setShowDropDowns({ ...showDropDowns, [type]: event.currentTarget });
  };

  const handleCloseDropDown = (type) => {
    setShowDropDowns({ ...showDropDowns, [type]: null });
  };

  const handleClick = (action) => {
    switch (action) {
      case 'home':
        history.push('/');
        handleCloseDropDown('user');
        break;
      case 'admin':
        history.push('/admin');
        handleCloseDropDown('user');
        break;
      case 'account':
        history.push('/account');
        handleCloseDropDown('user');
        break;
      case 'sign-out':
        cookies.remove('userInfo', { path: '/' });
        history.push('/auth');
        handleCloseDropDown('user');
        break;

      default:
        break;
    }
  };

  return (
    userInfo ? (
      <>
        <div className="sm:block hidden">
          {userInfo.role !== userTypes.uicAdmin && (
            <>
              <Link to="/news">
                <HeaderButton>
                  <NewsIcon />
                </HeaderButton>
              </Link>
              <Link to="/members">
                <HeaderButton>
                  <PeopleIcon />
                </HeaderButton>
              </Link>
              <div className="hidden">
                <HeaderButton>
                  <DonationIcon />
                </HeaderButton>
                <Link to="/package">
                  <HeaderButton>
                    <CubeIcon />
                  </HeaderButton>
                </Link>
              </div>
            </>
          )}
          <HeaderButton onClick={e => handleOpenDropDown('user', e)}>
            {Boolean(userInfo.avatar) ? (
              <img className="w-8 h-8 rounded-half" src={userInfo.avatar} alt="avatar" />
            ) : (
              <AvatarIcon />
            )}
          </HeaderButton>
        </div>
        <div className="sm:hidden block"><Menu fontSize="large" onClick={e => handleOpenDropDown('user', e)} /></div>
        <UserDropDown text={text} anchorEl={showDropDowns.user} isAdmin={isAdmin} userInfo={userInfo} onClick={handleClick} onClose={() => handleCloseDropDown('user')} />
      </>
    ) : (
      <>
        <div className="mr-10 sm:block hidden">
          <Link to="/auth/signup"><BlueButton>{text.signup}</BlueButton></Link>
        </div>
        <Link to="/auth/login"><span className="text-blue-cornflower font-semibold cursor-pointer hover:opacity-80 whitespace-nowrap sm:block hidden">{text.login}</span></Link>
        <div className="sm:hidden block"><Menu fontSize="large" onClick={e => handleOpenDropDown('auth', e)} /></div>
        <AuthDropDown text={text} anchorEl={showDropDowns.auth} history={history} onClose={() => handleCloseDropDown('auth')} />
      </>
    )
  );
};

export default withCookies(HeaderMenu);
