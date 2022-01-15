import React, { useEffect } from 'react';
import { withCookies } from 'react-cookie';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Sidebar from './components/Sidebar';

import routes from '../../../routes';
import { useUserContext } from '../../../context/UserContext';

function Admin(props) {
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
      if (prop.layout === '/admin') {
        if (prop.collapse) {
          return prop.children.map((child, key) => (
            <Route
              path={prop.layout + prop.path + child.path}
              component={child.component}
              key={key}
            />
          ))
        } else {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
      } else {
        return null;
      }
    });
  };

  return (
    <div className="min-h-screen">
      <Header history={history} userInfo={storedUserInfo} isAdmin={true} />
      <div className="w-full flex relative">
        <Sidebar history={history} />
        <div className="ml-14 lg:ml-50 w-mobile-admin-content lg:w-admin-content min-h-content bg-primary p-12">
          <Switch>
            {getRoutes()}
            <Redirect from="/admin" to="/admin/uic" />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withCookies(Admin);
