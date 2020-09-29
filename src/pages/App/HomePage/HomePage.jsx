import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './HomePage.css';

const HomePage = (props) => {
  return (
    <div className="GamePage">
      <NavBar
        user={props.user}
        handleLogout={props.handleLogout}
      />
      <div className="flex-h align-flex-end">
       This is the Home Page!! WOO!

      </div>
    </div>
  );

};

export default HomePage;