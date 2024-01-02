import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import  ShoppingCart  from '../ShoppingCart'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'

  const account = localStorage.getItem('account')
  const parsedAccount = account ? JSON.parse(account) : null


  const hasAnAccount = !!parsedAccount && Object.keys(parsedAccount).length > 0

  const isUserSignOut = context.signOut

  
  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(true)
  }

  const renderView = () => {
    if (isUserSignOut) {
      return(
        <li>
          <NavLink
            to='/Ecommerce-Shopi/sign-in'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            onClick={()=> handleSignOut()}>
            Sign in
          </NavLink>
        </li>
      )
    } 
    if(hasAnAccount && !isUserSignOut){
      return(
        <>
        <li className='text-black/60'>
          {parsedAccount?.email}
        </li>
        <li>
          <NavLink
            to='/Ecommerce-Shopi/my-orders'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Ecommerce-Shopi/my-account'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Ecommerce-Shopi/sign-in'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            onClick={()=> handleSignOut()}>
            Sign out
          </NavLink>
        </li>
        <ShoppingCart />
        
        </>
      )
    }
  }
  
  return (
    <nav className='flex justify-between items-center bg-white fixed z-10 top-0 w-full py-5 px-8 text-sm font-light shadow-sm'>
      <ul className='flex items-center gap-3'>
        <li className='font-semibold text-lg'>
          <NavLink to='/Ecommerce-Shopi/'>
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Ecommerce-Shopi/'
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Ecommerce-Shopi/clothes'
            onClick={() => context.setSearchByCategory('clothes')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Ecommerce-Shopi/electronics'
            onClick={() => context.setSearchByCategory('electronics')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Ecommerce-Shopi/furnitures'
            onClick={() => context.setSearchByCategory('furnitures')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Ecommerce-Shopi/toys'
            onClick={() => context.setSearchByCategory('toys')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/Ecommerce-Shopi/others'
            onClick={() => context.setSearchByCategory('others')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Others
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
      {renderView()}
      </ul>
    </nav>
  )
}

export default Navbar