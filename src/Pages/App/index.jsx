import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import { ShoppingCartContext, ShoppingCartProvider } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignOut from '../SignOut'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'
import { useContext, useEffect } from 'react'

const useAppRoutes = (hasAnAccount, isUserSignOut) => {
  let defaultRoute = '/Ecommerce-Shopi/';
  let routes = [];

  if (!hasAnAccount || isUserSignOut) {
    defaultRoute = '/Ecommerce-Shopi/sign-in';
    routes = [
      { path: '/Ecommerce-Shopi/*', element: <SignOut /> },
    ];
  } else {
    routes = [
      { path: '/', element: <Navigate to={defaultRoute} replace /> },
      { path: '/Ecommerce-Shopi/', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/Ecommerce-Shopi/clothes', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/Ecommerce-Shopi/electronics', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/Ecommerce-Shopi/furnitures', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/Ecommerce-Shopi/toys', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/Ecommerce-Shopi/others', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/Ecommerce-Shopi/my-account', element: <MyAccount /> },
      { path: '/Ecommerce-Shopi/my-order', element: <MyOrder /> },
      { path: '/Ecommerce-Shopi/my-orders', element: <MyOrders /> },
      { path: '/Ecommerce-Shopi/my-orders/last', element: <MyOrder /> },
      { path: '/Ecommerce-Shopi/my-orders/:id', element: <MyOrder /> },
      { path: '/Ecommerce-Shopi/sign-in', element: <SignOut /> },
      { path: '/Ecommerce-Shopi/*', element: <NotFound /> },
    ];
  }

  return { defaultRoute, routes };
};

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext);
  const account = localStorage.getItem('account');
  const parsedAccount = account ? JSON.parse(account) : null;
  const hasAnAccount = !!parsedAccount && Object.keys(parsedAccount).length > 0;
  const isUserSignOut = context.signOut;

  const { defaultRoute, routes } = useAppRoutes(hasAnAccount, isUserSignOut);
  const routing = useRoutes(routes);

  return routing;
};

const App = () => {
  const context = useContext(ShoppingCartContext);
  useEffect(() => {
    const account = localStorage.getItem('account');
    if (account) {
      const parsedAccount = JSON.parse(account);
      context && context.setAccount && context.setAccount(parsedAccount);
    }
  }, [context]);

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
