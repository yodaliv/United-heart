import React, { useEffect } from 'react';
import { withCookies } from 'react-cookie';
import { Route, Switch } from 'react-router-dom';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import routes from '../../../routes';
import { userTypes } from '../../../constants';
import { useUserContext } from '../../../context/UserContext';

function Main(props) {
  const { cookies, history } = props;
  const storedUserInfo = cookies.get('userInfo');
  const { setUserInfo } = useUserContext();

  useEffect(() => {
    if (Boolean(cookies.get('userInfo'))) {
      setUserInfo(cookies.get('userInfo'));
    } else {
      setUserInfo(false);
    }
  }, [cookies, setUserInfo]);

  const getRoutes = () => {
    return routes.map((prop, key) => {
      if (prop.layout === '/') {
        if ((storedUserInfo && storedUserInfo.role !== userTypes.uicAdmin) || !prop.auth)
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
              {...prop}
            />
          );
        else
          return null;
      } else if (prop.path === '*') {
        return (
          <Route
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
    <div className="min-h-screen">
      <Header history={history} userInfo={storedUserInfo} isAdmin={false} />
      <div className="w-full h-full">
        <Switch>{getRoutes()}</Switch>
      </div>
      <Footer />
    </div>
  );
}

export default withCookies(Main);
