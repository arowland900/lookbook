import React, { Component } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import './HomePage.css';

class HomePage extends Component {

	render() {
		console.log("HOME PAGE USER: ", this.props.user)
		return (
			<div className="GamePage">
				{/* <NavBar
					user={this.props.user}
					handleLogout={this.props.handleLogout}
				/> */}
				<div className="flex-h align-flex-end">
					This is the Home Page!! WOO!
			
				</div>
				
			</div>
		);
	}
};

export default HomePage;