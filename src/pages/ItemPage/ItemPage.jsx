import React, { Component } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import './ItemPage.css';

class ItemPage extends Component {

    

	render() {
		return (
			<div className="GamePage">
				<NavBar
					user={this.props.user}
					handleLogout={this.props.handleLogout}
				/>
				<div className="flex-h align-flex-end">
					This is the Item Page!! WOO!
			
				</div>
				
			</div>
		);
	}
};

export default ItemPage;