import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './ItemDetailPage.css';

class ItemDetailPage extends Component {
  // item = this.props.location.state.item

  state = {
    item:''
  }
  

  fadeDiv = () => {
    let div = document.querySelector('.itemDetailPage')
    // setTimeout(function(){
    $(div).fadeIn('slow')

    // }, 500)


  }

  /*--- Lifecycle Methods ---*/

  componentDidMount = async () => {
    let item = await this.props.location.state.item
    this.setState({ item })
    await this.fadeDiv()

  }
  render() {
    return (
      <div className='itemDetailPage'>
        {this.state.item ?
          <div className='ItemDetailPage-item'>
            <h3>{this.state.item.name}</h3>
            <p>{this.state.item.description}</p>
            <div className='imgHolder'>
              <img src={this.state.item.photos[0]} alt="" />
            </div>
          </div>
          :
          <h3>Loading...</h3>
        }
      </div>
    );
  }
};

export default ItemDetailPage;