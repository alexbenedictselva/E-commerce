import React from 'react'
import './Header.css';
import LOGO from '../../image/logo.dr.png'
import { Link,useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const GotoHome = () => {
    navigate('/');
  }
  return (
    <div>
      <section id="header">
        <img onClick={GotoHome} src={LOGO} alt='' />
        <div >
            <ul id="navbar">
                <Link to='/' className='link'><li>Home</li></Link>
                <Link to='/cart' className='link'><li>Cart</li></Link>
                <Link to='/shop' className='link'><li>Shop</li></Link>
                <Link to='/' className='link'><li>Blog</li></Link>
                <Link to='/' className='link'><li>About</li></Link>
                <Link to='/' className='link'><li>Contact</li></Link>
            </ul>
        </div>
    </section>
    </div>
  )
}

export default Header;
