import React from 'react';
// import {Link} from 'react-router-dom';
import './SingleItem.css';

function SingleItem({item}) { 
  return (
    <div className='panel panel-default'>
      <div className="panel-heading">
        <h3 className='panel-title'>{item.name}</h3>
        <p className='panel-title'>{item.description}</p>
        {item.photos.map((photo, idx) => {
          return <img key={idx} src={photo} alt=""/>
        })}
        {/* <img src={item.} alt=""/> */}
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