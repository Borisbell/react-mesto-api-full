import React from 'react';
import logo from '../images/header/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <Link to="signin" className="header__link">
        <img src={logo} alt="Логотип" className="header__logo"/>
      </Link>
      {
        props.loggedIn ?
        <nav className='header__nav'>
          <p className="paragraph">{props.userData}</p>
          <button className='header__nav-link header__button' onClick={props.signOut}>Выйти</button>
        </nav>
        :
        <nav className='header__nav'>
          <Link to={props.navLink} className="header__nav-link">{props.navText}</Link>
        </nav>
      }
    </header>
  );
}
    
export default Header;