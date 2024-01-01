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
  const context = useContext(ShoppingCartContext)
  const isUserSignOut = context.signOut
  console.log("sign out ", isUserSignOut);
  const parsedAccount = context.account || {};

  // Comprobamos si hay un usuario autenticado
  const isAuthenticated = Object.keys(parsedAccount).length > 0;
  console.log("parsed account ", parsedAccount);
  console.log("si esta autentificado: ", isAuthenticated);
  let routes = useRoutes([
    { path: '/', element: isAuthenticated ? <Home /> : <SignOut /> },
    { path: '/clothes', element: isAuthenticated ? <Home /> : <SignOut /> },
    { path: '/electronics', element: isAuthenticated ? <Home /> : <SignOut /> },
    { path: '/furnitures', element: isAuthenticated ? <Home /> : <SignOut /> },
    { path: '/toys', element: isAuthenticated ? <Home /> : <SignOut /> },
    { path: '/others', element: isAuthenticated ? <Home /> : <SignOut /> },
    { path: '/my-account', element: isUserSignOut ? <SignOut/> : <MyAccount /> },
    { path: '/my-order', element: isUserSignOut ? <SignOut/> : <MyOrder /> },
    { path: '/my-orders', element: isUserSignOut ? <SignOut/> : <MyOrders /> },
    { path: '/my-orders/last', element: isUserSignOut ? <SignOut/> : <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignOut /> },
    { path: '/*', element: <NotFound /> },
  ])

  return routes
}

const App = () => {
  const context = useContext(ShoppingCartContext); 
  useEffect(() => {
    const account = localStorage.getItem('account');
    if (account) {
      const parsedAccount = JSON.parse(account);
      context && context.setAccount && context.setAccount(parsedAccount);
      console.log(parsedAccount);
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
