import { useSearchParams, Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'

import './Sidebar.css'

export default function Sidebar() {
  let params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const categoryHandler = (value: string) => {
    navigate('/products')
    setSearchParams({ category: value })
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-row'>
        <Link to='/products' style={{ color: '#efefef' }}>
          Store
        </Link>
      </div>
      <div className='sidebar-row'>
        image.png
        <p>Categoties</p>
        <ul>
          <li
            className={(searchParams.get('electronics') && 'active') || ''}
            onClick={() => categoryHandler('electronics')}
          >
            Electronics
          </li>
          <li
            className={(searchParams.get('jewelery') && 'active') || ''}
            onClick={() => categoryHandler('jewelery')}
          >
            Jewelery
          </li>
          <li
            className={(searchParams.get("men's clothing") && 'active') || ''}
            onClick={() => categoryHandler("men's clothing")}
          >
            Men's Clothing
          </li>
          <li
            className={(searchParams.get("women's clothing") && 'active') || ''}
            onClick={() => categoryHandler("women's clothing")}
          >
            Women's Clothing
          </li>
        </ul>
      </div>
    </div>
  )
}
