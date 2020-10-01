import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {

	let currentPage = window.location.pathname

	// console.log(props.user)
	let nav = props.user ?
		<div>
			<span className='NavBar-welcome'>Welcome {props.user.name}!</span>
      		&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
			<Link 
				to='/' 
				className='NavBar-link' 
				onClick={props.handleLogout}
			>Log Out</Link>
      		&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
			<Link 
				to='/items' 
				// className='NavBar-link'
				className={currentPage == '/items' ? 'NavBar-link active' : 'NavBar-link'}
			>My Closet</Link>
      		&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
			<Link 
				to='/new' 
				// className='NavBar-link'
				className={currentPage == '/new' ? 'NavBar-link active' : 'NavBar-link'}
			>New Piece / Outfit</Link>
      		&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
			<Link 
				to='/' 
				// className='NavBar-link' 
				className={currentPage == '/' ? ' NavBar-link active' : 'NavBar-link'}
			>Home</Link>
			</div>
			:
			<div>
				<Link 
					to='/login' 
					// className='NavBar-link'
					className={currentPage == '/login' ? 'NavBar-link active' : 'NavBar-link'}
				>Log In</Link>
				&nbsp;&nbsp;|&nbsp;&nbsp;
				<Link 
					to='/signup' 
					// className='NavBar-link'
					className={currentPage == '/signup' ? 'NavBar-link active' : 'NavBar-link'}
				>Sign Up</Link>
			</div>

	return (
		<div className='NavBar'>
			{nav}

		</div>
	);
};

export default NavBar;