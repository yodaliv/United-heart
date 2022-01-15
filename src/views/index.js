import React, { useEffect } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import Loader from '../components/Loader';
import { MessageDialog } from '../components/Dialogs';

import Admin from '../views/layouts/Admin';
import Auth from '../views/layouts/Auth';
import Main from '../views/layouts/Main';

import { userTypes } from '../constants';
import { useAppContext } from '../context/AppContext';
import { useUserContext } from '../context/UserContext';

function Views(props) {
  const { cookies } = props;
  const storedUserInfo = cookies.get('userInfo');
  const { loading, message, setMessage } = useAppContext();
  const { setUserInfo } = useUserContext();

  useEffect(() => {
    if (Boolean(cookies.get('userInfo'))) {
      setUserInfo(cookies.get('userInfo'));
    } else {
      setUserInfo(false);
    }
  }, [cookies, setUserInfo]);

  return (
    <>
      <Router>
        <Switch>
          <Route path='/admin' render={props => storedUserInfo?.role === userTypes.uicAdmin ? (<Admin {...props} />) : (<Redirect to={{ pathname: '/' }} />)} />
          <Route path='/auth' render={props => <Auth {...props} />} />
          <Route path='/' render={props => <Main {...props} />} />
        </Switch>
      </Router>
      <MessageDialog
        open={message.open}
        title={message.title}
        description={message.description}
        onClose={(event, reason) => reason !== 'clickaway' && setMessage({ ...message, open: false })}
      />
      <Loader open={loading} />
    </>
  );
}

export default withCookies(Views);
