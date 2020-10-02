import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './ItemDetailPage.css';

class ItemDetailPage extends Component {

  state = {
    item:'', 
    itemInfo: ''
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
    console.log("ITEM: ", item)
    await this.fadeDiv()

  }
  render() {
    return (
      <div className='itemDetailPage'>
        {this.state.item ?
          <div className='mainCard'>
            <div className='infoHolder'>
{/* DEPENDING ON WHETHER THE IMAGE IS TALLER OR WIDER, USE THE HEIGHT OR WIDTH AS THE DEFAULT PROPERTY,
BUT SET A MAXIMUM SIZE --- https://www.grailed.com/listings/16820170-iron-heart-14oz-selvedge-denim-slim-straight-cut-jeans-666s-142bb */}
              <h3>{this.state.item.name}</h3>
              <p>{this.state.item.description}</p>
            </div>
            <div className='imgHolder'>
              <img src={this.state.item.photos[0]} alt="" className='mainImg'/>
      
              <div className="carousel">
                {this.state.item.photos.map((p, i) => {
                  return <img src={p} alt="" className={`ItemDetailPage-center-cropped tiny${i}`}/>
                })}
              </div>
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