import React from 'react';
import {  Link } from 'react-router-dom';
import './ItemDetailPage.css';

const ItemDetailPage = (props) => {
    console.log("PROPS: ", props)
  const item = props.location.state.item
  console.log(item)
  
  return (
    <div className='ItemDetailPage'>
      {item ?
        <div className='ItemDetailPage-starship'>
          <span>NAME:</span>
          <span>{item.name}</span>
          <span>DESCRIPTION:</span>
          <span>{item.description}</span>
          <span>
            <img src={item.photos[0]} alt=""/>
          </span>
          <Link to='/'>RETURN</Link>
        </div>
        :
        <h3>Loading...</h3>
      }
    </div>
  );
};

export default ItemDetailPage;