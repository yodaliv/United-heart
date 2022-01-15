import React from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';

import routes from '../../../routes';
import background from '../../../assets/img/background/auth-screen-background.png';
import headerLogo from '../../../assets/img/logo-united-hearts-for-canada.png';

import { appName } from '../../../constants';
import { useTranslations } from '../../../hooks/translations';

function Auth() {
  const text = useTranslations('auth');
  const getRoutes = () => {
    return routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="lg:flex">
      <div className="flex-3 lg:h-screen xs:h-full xs:block relative h-screen overflow-hidden hidden">
        <img className="w-full lg:min-h-full object-cover" src={background} alt="auth screen background" />
        <div className="w-full h-full flex justify-center z-50 absolute inset-0">
          <div className="flex flex-col justify-between w-3/4">
            <Link to="/"><img className="h-12.5 mt-5" src={headerLogo} alt="Logo for UHC" /></Link>
            <div>
              <p className="text-shadow sm:text-4.5xl text-2xl font-semibold -tracking-1.75 text-white whitespace-nowrap">{appName}</p>
              <p className="text-shadow sm:text-lg text-sm leading-1.83 text-white opacity-75 mt-2.5 sm:mb-7.5 mb-4">{text.join}</p>
              <p className="opacity-50 sm:my-12.5 mb-6 text-white whitespace-nowarp"><Link to="/terms" className="hover:underline">{text.terms}</Link> | <Link to="/privacy" className="hover:underline">{text.privacy}</Link></p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:h-screen xs:h-full h-screen flex flex-2 justify-center lg:py-0 sm:py-20 py-10">
        <Switch>
          {getRoutes()}
          <Redirect from="/auth" to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
}

export default Auth;
