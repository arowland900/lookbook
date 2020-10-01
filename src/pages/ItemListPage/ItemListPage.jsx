import React, { Component } from 'react';
import { Route, Switch,Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import $ from 'jquery';
import SingleItem from '../../components/SingleItem/SingleItem'
import './ItemListPage.css';

class ItemPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user
		}
	}

	fadeDiv = () => {
		let div = document.querySelector('.my-closet')
			// setTimeout(function(){
				$(div).fadeIn('slow')
				
			// }, 500)
		
			
	}

		/*--- Lifecycle Methods ---*/

	componentDidMount = async () => {
			await this.fadeDiv()
	}

	render() {
		// console.log("ITEM PAGE USER: ", this.props.user)
		return (
			<div className="my-closet" style={{margin: '0 auto'}}>
				
				<div className="flex-h align-flex-end" style={{paddingBottom: '2em'}}>
					This is the Item Page!! WOO!
			
				</div>

				<div className='PuppyListPage-grid'>
				
					{this.props.items.map((item,idx) => 

					<Link
						className='btn btn-xs btn-info'
						to={{
							pathname: '/details',
							state: {item},
						}}
						key={idx}
					>
					
                        <SingleItem
                            item={item}
                            key={item._id}
							/>
					</Link>
                    )}
					
                </div>

			</div>
		);
	}
};

export default ItemPage;