import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ItemListPage from '../ItemListPage/ItemListPage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';
import NewItemPage from '../NewItemPage/NewItemPage';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';
import NavBar from '../../components/NavBar/NavBar'



class App extends Component {
	constructor() {
		super();
		this.state = {
			user: userService.getUser(),
			items: []
		};
	}




	/*--- Callback Methods ---*/

	

	getItem = (idx) => {
		return this.state.items[idx];
	  }
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
			items: [newItem, ...state.items]
		}),
			// Using cb to wait for state to update before rerouting
			() => {
				console.log(this.state.items)
				this.props.history.push('/items')
			});
	}





	handleLogout = async () => {
		console.log("LOGGING OUT")
		await userService.logout();
		await this.setState({ user: null });
		await this.componentDidMount()
	}

	handleSignupOrLogin = async () => {
		await this.setState({ user: userService.getUser() });
		await this.componentDidMount()
	}


	/*--- Lifecycle Methods ---*/

	componentDidMount = async () => {
		console.log('here is user: ', userService.getUser())
		let user = userService.getUser()
		if (user) {
			const items = await fetch('/api/items', {
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + tokenService.getToken(),
				}
			})
				.then(res => res.json());

			this.setState({ items });
		} else {
			console.log("no user logged in")
		}
		console.log(this.state.items)
	}


	render() {
		return (
			<div>
				<header className='header-footer'>L O O K &nbsp;&nbsp;&nbsp;  B O O K</header>
				<NavBar
					user={this.state.user}
					handleLogout={this.handleLogout}
				/>
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
						<ItemListPage
							history={history}
							user={this.state.user}
							handleSignupOrLogin={this.handleSignupOrLogin}
							items={this.state.items}
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
					<Route path='/details' render={({location}) =>
						<ItemDetailPage
							location={location}
							user={this.state.user}
							getItem={this.getItem}
						/>
					} />

				</Switch>
			</div>
		);
	}
}

export default App;
