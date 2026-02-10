import React, { useState } from 'react'
import './Header.css';
import { Link,useNavigate } from 'react-router-dom';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const GotoHome = () => {
    navigate('/');
  }
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  }
  
  return (
    <div>
      <section id="header">
        <img onClick={GotoHome} src="/ALX.png" alt='' />
        
        {/* Desktop Navigation */}
        <div className="desktop-nav">
            <ul id="navbar">
                <Link to='/' className='link'><li>Home</li></Link>
                <Link to='/cart' className='link'><li>Cart</li></Link>
                <Link to='/shop' className='link'><li>Shop</li></Link>
                {/* <Link to='/' className='link'><li>Blog</li></Link> */}
                {/* <Link to='/' className='link'><li>About</li></Link> */}
                {/* <Link to='/' className='link'><li>Contact</li></Link> */}
            </ul>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
        
        {/* Mobile Dropdown Menu */}
        <div className={`mobile-dropdown ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <Link to='/' className='link' onClick={closeMenu}><li>Home</li></Link>
            <Link to='/cart' className='link' onClick={closeMenu}><li>Cart</li></Link>
            <Link to='/shop' className='link' onClick={closeMenu}><li>Shop</li></Link>
            {/* <Link to='/' className='link' onClick={closeMenu}><li>Blog</li></Link> */}
            {/* <Link to='/' className='link' onClick={closeMenu}><li>About</li></Link> */}
            {/* <Link to='/' className='link' onClick={closeMenu}><li>Contact</li></Link> */}
          </ul>
        </div>
    </section>
    </div>
  )
}

export default Header;