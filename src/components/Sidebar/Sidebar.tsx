import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'

import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MonitorIcon from '@mui/icons-material/Monitor'
import DiamondIcon from '@mui/icons-material/Diamond'
import Man2RoundedIcon from '@mui/icons-material/Man2Rounded'
import Woman2RoundedIcon from '@mui/icons-material/Woman2Rounded'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import { useAppSelector } from '../../redux/store'
import CartItems from '../CartItems/CartItems'
import './Sidebar.css'

export default function Sidebar() {
  const cartIDs = useAppSelector((state) => state.cart.cartIDs)
  let params = useParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  let sidebarStyles = {}
  let cart = <></>
  if (isExpanded) {
    sidebarStyles = {
      maxWidth: '18rem',
      minWidth: '18rem'
    }
    cart = (
      <div>
        <CartItems />
      </div>
    )
  } else {
    sidebarStyles = {
      maxWidth: '4.2rem',
      minWidth: '4.2rem'
    }
    cart = (
      <div className='cart' onClick={() => setIsExpanded(!isExpanded)}>
        <div className='icon-container'>
          <ShoppingCartOutlinedIcon />
        </div>
        <div className='cart-badge'>
          <p>{cartIDs.length}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='sidebar' style={sidebarStyles}>
      <div
        className='close-sidebar-button'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ArrowBackIcon
          style={isExpanded ? { rotate: 'none' } : { rotate: '180deg' }}
        />
      </div>
      <div className='sidebar-title'>
        <Link to='/products'>Fake Store</Link>
      </div>

      <div>
        <ul>
          <li>
            <Link
              className={searchParams.get('category') === null ? 'active' : ''}
              to='/products'
            >
              <div className='icon-container'>
                <BorderAllRoundedIcon />
              </div>
              <div className='category-title'>Browse All</div>
            </Link>
          </li>
          <li>
            <Link
              className={
                searchParams.get('category') === 'electronics' ? 'active' : ''
              }
              to='/products?category=electronics'
            >
              <div className='icon-container'>
                <MonitorIcon />
              </div>
              <div className='category-title'>Electronics</div>
            </Link>
          </li>

          <li>
            <Link
              className={
                searchParams.get('category') === 'jewelery' ? 'active' : ''
              }
              to='/products?category=jewelery'
            >
              <div className='icon-container'>
                <DiamondIcon />
              </div>
              <div className='category-title'>Jewelry</div>
            </Link>
          </li>
          <li>
            <Link
              className={
                searchParams.get('category') === "men's clothing"
                  ? 'active'
                  : ''
              }
              to="/products?category=men's+clothing"
            >
              <div className='icon-container'>
                <Man2RoundedIcon />
              </div>
              <div className='category-title'>Men's&nbsp;Clothing</div>
            </Link>
          </li>
          <li>
            <Link
              className={
                searchParams.get('category') === "women's clothing"
                  ? 'active'
                  : ''
              }
              to="/products?category=women's+clothing"
            >
              <div className='icon-container'>
                <Woman2RoundedIcon />
              </div>
              <div className='category-title'>Women's&nbsp;Clothing</div>
            </Link>
          </li>
        </ul>
      </div>
      {cartIDs.length !== 0 && (
        <>
          <div
            style={{
              borderBottom: '1px solid #eee',
              margin: '1rem 1.3rem 0 1.3rem'
            }}
          ></div>
          <div>{cart}</div>
        </>
      )}
    </div>
  )
}
