import React, { Component } from 'react';
import $ from 'jquery';
import './ItemDetailPage.css';

class ItemDetailPage extends Component {

	state = {
		item: '',
		currentImg: ''
	}


	fadeDiv = () => {
		let div = document.querySelector('.itemDetailPage')
		$(div).fadeIn('slow')
	}

	resize = () => {
		let mainImg = document.querySelector('.mainImg')
		console.log('MAIN IMG HEIGHT: ', mainImg.height)
		if(mainImg.height > mainImg.width){
			$(mainImg).css('height', 500)
			$(mainImg).css('width', 'auto')
		} else {
			$(mainImg).css('width', 500)
			$(mainImg).css('height', 'auto')
		}
	}

	/*--- Lifecycle Methods ---*/

	componentDidMount = async () => {
		let item = await this.props.location.state.item
		let currentImg = item.photos[0]
		this.setState({ item, currentImg })
		await this.resize()
		// console.log("STATE: ", this.state)
		await this.fadeDiv()

	}
	render() {
		let img = this.state.item 
		? <img src={this.state.item.photos[0]} alt="" className='mainImg' />
		: ''
		// console.log("IMG: ", img)

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
							<div className='imgSquare'>

								{img}
							</div>

							<div className="carousel">
								{this.state.item.photos.map((p, i) => {
									return <img src={p} alt="" key={i} className={`ItemDetailPage-center-cropped tiny${i}`} />

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