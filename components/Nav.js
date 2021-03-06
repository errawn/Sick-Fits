import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'

const Nav = () => (
  <User>
    {({ data: { currentUser } }) => (
    <NavStyles>
      <Link href='/'>
        <a>Shop</a>
      </Link>
      { currentUser && (
        <>
          <Link href='/sell'>
            <a>Sell</a>
          </Link>
          <Link href='/orders'>
            <a>Orders</a>
          </Link>
          <Link href='/me'>
            <a>Account</a>
          </Link>
          <Signout />
        </>
      )}
      { !currentUser && (
        <Link href='/signup'>
          <a>Signup</a>
        </Link>
      )}
    </NavStyles>
    )}
  </User>
)

export default Nav