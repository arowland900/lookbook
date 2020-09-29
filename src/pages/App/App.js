import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';

import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
    };
  }




  /*--- Callback Methods ---*/



  


  handleLogout = () => {  
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
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
            />
          }/>
   
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>

        </Switch>
      </div>
    );
  }
}

export default App;
