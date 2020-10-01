import React from 'react';
import { Link } from 'react-router-dom';
import './SingleItem.css';

function SingleItem({ item }) {
	return (
		<div >
		
			<div style={{ margin: '0 auto' }}>
				<img className='center-cropped'
					src={item.photos[0]} alt={item.name}
				/>
			</div>
		
		</div>
	);
}

export default SingleItem;