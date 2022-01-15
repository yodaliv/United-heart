import { SupervisedUserCircle, HomeWork, People, Collections, EmojiTransportation, Storefront } from '@material-ui/icons';

import Login from '../views/pages/Auth/Login';
import Signup from '../views/pages/Auth/Signup';
import VerifyEmail from '../views/pages/Auth/VerifyEmail';
import Forgot from '../views/pages/Auth/Forgot';
import Reset from '../views/pages/Auth/Reset';
import Home from '../views/pages/Main/Home';
import Account from '../views/pages/Main/Account';
import InventoryRequest from '../views/pages/Main/Request';
import Members from '../views/pages/Main/Members';
import Package from '../views/pages/Main/Package';
import News from '../views/pages/Main/News';
import Terms from '../views/pages/Main/Terms';
import Privacy from '../views/pages/Main/Privacy';
import UIC from '../views/pages/Admin/UIC';
import Organization from '../views/pages/Admin/Organization';
import User from '../views/pages/Admin/User';
import SCP from '../views/pages/Admin/SCP';
import Donation from '../views/pages/Admin/Donation';
import Inventory from '../views/pages/Admin/Inventory';
import Request from '../views/pages/Admin/Request';

import NotFound from '../views/pages/NotFound';

const routes = [
  {
    layout: '/auth',
    path: '/login',
    component: Login,
  },
  {
    layout: '/auth',
    path: '/signup',
    component: Signup,
  },
  {
    layout: '/auth',
    path: '/forgot',
    component: Forgot,
  },
  {
    layout: '/auth',
    path: '/verify-email',
    component: VerifyEmail,
  },
  {
    layout: '/auth',
    path: '/reset',
    component: Reset,
  },
  {
    layout: '/',
    path: '/',
    auth: false,
    exact: true,
    component: Home,
  },
  {
    layout: '/',
    path: '/account',
    auth: true,
    component: Account,
  },
  {
    layout: '/',
    path: '/donation/:id/request',
    auth: true,
    component: InventoryRequest,
  },
  {
    layout: '/',
    path: '/members',
    auth: true,
    component: Members,
  },
  {
    layout: '/',
    path: '/package',
    auth: true,
    component: Package,
  },
  {
    layout: '/',
    path: '/news',
    auth: true,
    component: News,
  },
  {
    layout: '/',
    path: '/terms',
    auth: false,
    component: Terms,
  },
  {
    layout: '/',
    path: '/privacy',
    auth: false,
    component: Privacy,
  },
  {
    layout: '/admin',
    path: '/uic',
    name: 'admin',
    icon: SupervisedUserCircle,
    component: UIC,
  },
  {
    layout: '/admin',
    path: '/org',
    name: 'organization',
    icon: HomeWork,
    component: Organization,
  },
  {
    layout: '/admin',
    path: '/user',
    name: 'user',
    icon: People,
    component: User,
  },
  {
    layout: '/admin',
    path: '/services',
    name: 'services',
    icon: Collections,
    collapse: true,
    children: [
      {
        path: '/scp',
        name: 'scp',
        icon: EmojiTransportation,
        component: SCP,
      },
      {
        path: '/donation',
        name: 'donation',
        icon: Storefront,
        component: Donation,
      },
      {
        path: '/donation/:id/inventory',
        component: Inventory,
      },
      {
        path: '/donation/:id/request',
        component: Request,
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;