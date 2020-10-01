import React from 'react';
// import {Link} from 'react-router-dom';
import './SingleItem.css';

function SingleItem({ item }) {

	return (
		<div >
			<div >
				<h3 style={{ textAlign: 'center' }}>{item.name}</h3>
				<div style={{margin: '0 auto'}}>
					<img className='center-cropped'
						src={item.photos[0]} alt={item.name}
						
					/>
				</div>
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