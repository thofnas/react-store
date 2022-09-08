import { useSearchParams, Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'

import './Sidebar.css'

export default function Sidebar() {
  let params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  console.log(
    searchParams.get("men's clothing") === "men's clothing" && 'active'
  )

  return (
    <div className='sidebar'>
      <div className='sidebar-row'>
        <Link to='/products' style={{ color: '#efefef' }}>
          Store
        </Link>
      </div>
      <div className='sidebar-row'>
        <p>Categoties:</p>
        <ul>
          <li>
            <Link
              className={
                searchParams.get('category') === 'electronics' ? 'active' : ''
              }
              to='/products?category=electronics'
            >
              Electronics
            </Link>
          </li>
          <li>
            <Link
              className={
                searchParams.get('category') === 'jewelery' ? 'active' : ''
              }
              to='/products?category=jewelery'
            >
              Jewelery
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
              Men's Clothing
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
              Women's Clothing
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
