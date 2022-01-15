import { Link } from 'react-router-dom';

import HeaderMenu from './HeaderMenu';
import headerLogo from '../assets/img/logo-united-hearts-for-canada.png';

const Header = ({ history, userInfo, isAdmin }) => {
  return (
    <header className="flex justify-center items-center bg-white w-full h-header border border-solid border-gray-100 z-20 relative">
      <div className="container">
        <div className="flex items-center justify-between px-4 sm:px-6 xl:px-8">
          {Boolean(userInfo?.org_logo_url) ? (
            <Link to="/"><img className="h-12.5" src={userInfo.org_logo_url} alt="Logo for UHC" /></Link>
          ) : (
            <Link to="/"><img className="h-12.5" src={headerLogo} alt="Logo for UHC" /></Link>
          )}
          <div className="flex justify-center items-center">
            <HeaderMenu history={history} userInfo={userInfo} isAdmin={isAdmin} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
