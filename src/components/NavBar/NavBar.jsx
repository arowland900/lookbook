import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    // console.log(props.user)
  let nav = props.user ?
    <div>
      <span className='NavBar-welcome'>Welcome {props.user.name}!</span>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to='' className='NavBar-link' onClick={props.handleLogout}>Log Out</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to='/items' className='NavBar-link'>My Closet</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to='/new' className='NavBar-link'>New Piece / Outfit</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to='/' className='NavBar-link'>Home</Link>
    </div>
    :
    <div>
      <Link to='/login' className='NavBar-link'>Log In</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to='/signup' className='NavBar-link'>Sign Up</Link>
    </div>

  return (
    <div className='NavBar'>
      {nav}
      
    </div>
  );
};

export default NavBar;