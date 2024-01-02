import { useRoutes, BrowserRouter } from 'react-router-dom'
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

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext);
  const account = localStorage.getItem('account');
  const parsedAccount = account ? JSON.parse(account) : null;
  const hasAnAccount = !!parsedAccount && Object.keys(parsedAccount).length > 0;
  const isUserSignOut = context.signOut;

  let routes = [];

  // Si el usuario está desconectado y no tiene cuenta, mostrar opciones para crear una cuenta o iniciar sesión
  if (!hasAnAccount && !isUserSignOut) {
    routes = [
      { path: '/', element: <SignOut /> },
      { path: '/sign-in', element: <SignOut /> },
      { path: '/clothes', element: <SignOut /> },
      { path: '/electronics', element:<SignOut /> },
      { path: '/furnitures', element: <SignOut /> },
      { path: '/toys', element: <SignOut /> },
      { path: '/others', element: <SignOut /> },
    ];
  } else {
    // Si el usuario tiene una cuenta o ha iniciado sesión
    routes = [
      { path: '/', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/clothes', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/electronics', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/furnitures',element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/toys', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/others', element: !isUserSignOut ? <Home /> : <SignOut /> },
      { path: '/my-account', element: <MyAccount /> },
      { path: '/my-order', element: <MyOrder /> },
      { path: '/my-orders', element: <MyOrders /> },
      { path: '/my-orders/last', element: <MyOrder /> },
      { path: '/my-orders/:id', element: <MyOrder /> },
      { path: '/sign-in', element: <SignOut /> },
      { path: '/*', element: <NotFound /> },
    ];
  }

  const routing = useRoutes(routes);

  return routing;
}

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
  )
}

export default App
