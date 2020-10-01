import React from 'react';
// import {Link} from 'react-router-dom';
import './SingleItem.css';

function SingleItem({ item }) {

  return (
    <div className='panel panel-default'>
      <div className="panel-heading">
        <h3 className='panel-title'>{item.name}</h3>
        <p className='panel-title img-padding'>{item.description}</p>
          <img className='center-cropped'
            src={item.photos[0]} alt={item.name}
          />
      </div>
      {/* <div className='panel-footer PuppyListItem-action-panel'>
        <Link
          className='btn btn-xs btn-info'
          to={{
            pathname: '/details',
            state: {item}
          }}
        >
          DETAILS
        </Link>
      </div> */}
    </div>
  );
}

export default SingleItem;