import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ItemPage from '../ItemPage/ItemPage';
import NewItemPage from '../NewItemPage/NewItemPage';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';



class App extends Component {
	constructor() {
		super();
		this.state = {
			user: userService.getUser(),
			items: []
		};
	}




	/*--- Callback Methods ---*/
	handleAddItem = async newItemData => {
		const newItem = await fetch('/api/items', {
			method: 'POST',
			headers: { 
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + tokenService.getToken(),
			},
			body: JSON.stringify(newItemData)
		}).then(res => res.json());
		this.setState(state => ({
			items: [...state.items, newItem]
		}),
			// Using cb to wait for state to update before rerouting
			() => {
				console.log(this.state.items)
				this.props.history.push('/')
			});
	}





	handleLogout = () => {
		userService.logout();
		this.setState({ user: null });
	}

	handleSignupOrLogin = () => {
		this.setState({ user: userService.getUser() });
	}



	render() {
		return (
			<div>
				<header className='header-footer'>L O O K &nbsp;&nbsp;&nbsp;  B O O K</header>
				<Switch>
					<Route exact path='/' render={() =>
						<HomePage
							user={this.state.user}
							handleLogout={this.handleLogout}
							handleAddItem={this.handleAddItem}
						/>
					} />

					<Route exact path='/signup' render={({ history }) =>
						<SignupPage
							history={history}
							handleSignupOrLogin={this.handleSignupOrLogin}
						/>
					} />
					<Route exact path='/login' render={({ history }) =>
						<LoginPage
							history={history}
							handleSignupOrLogin={this.handleSignupOrLogin}
						/>
					} />
					<Route exact path='/items' render={({ history }) =>
						<ItemPage
							history={history}
							handleSignupOrLogin={this.handleSignupOrLogin}
						/>
					} />
					<Route exact path='/new' render={({ history }) =>
						<NewItemPage
							history={history}
							user={this.state.user}
							handleLogout={this.handleLogout}
							handleAddItem={this.handleAddItem}
						/>
					} />

				</Switch>
			</div>
		);
	}
}

export default App;
