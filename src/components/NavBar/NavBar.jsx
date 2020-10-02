import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {

	let currentPage = window.location.pathname

	// console.log(props.user)
	let nav = props.user ?
		<div id='nav-holder'>
			{/* <span className='NavBar-welcome' style={{fontWeight: '900'}}>{props.user.name}</span> */}
      		{/* &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; */}
			<Link 
				to='/' 
				className='NavBar-link' 
				onClick={props.handleLogout}
			>Log Out </Link>
      		
			<Link 
				to='/items' 
				// className='NavBar-link'
				className={currentPage === '/items' ? 'NavBar-link active' : 'NavBar-link'}
			>&nbsp;&nbsp;My Closet</Link>
      		
			<Link 
				to='/new' 
				// className='NavBar-link'
				className={currentPage === '/new' ? 'NavBar-link active' : 'NavBar-link'}
			>&nbsp;&nbsp;New Piece / Outfit </Link>
      		
			<Link 
				to='/' 
				// className='NavBar-link' 
				className={currentPage === '/' ? ' NavBar-link active' : 'NavBar-link'}
			>&nbsp;&nbsp;Home</Link>
			</div>
			:
			<div>
				<Link 
					to='/login' 
					// className='NavBar-link'
					className={currentPage === '/login' ? 'NavBar-link active' : 'NavBar-link'}
				>Log In</Link>
				&nbsp;&nbsp;|&nbsp;&nbsp;
				<Link 
					to='/signup' 
					// className='NavBar-link'
					className={currentPage === '/signup' ? 'NavBar-link active' : 'NavBar-link'}
				>Sign Up</Link>
			</div>

	return (
		<div className='NavBar'>
			{nav}

		</div>
	);
};

export default NavBar;