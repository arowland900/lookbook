import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SingleItem from '../../components/SingleItem/SingleItem'
import './ItemListPage.css';

class ItemPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user
		}
	}

	render() {
		console.log("ITEM PAGE USER: ", this.props.user)
		return (
			<div className="GamePage">
				<NavBar
					user={this.props.user}
					handleLogout={this.props.handleLogout}
				/>
				<div className="flex-h align-flex-end">
					This is the Item Page!! WOO!
			
				</div>
				<div className='PuppyListPage-grid'>
                    {this.props.items.map(item => 
                        <SingleItem
                            item={item}
                            key={item._id}
                        />
                    )}
                 </div>
			</div>
		);
	}
};

export default ItemPage;