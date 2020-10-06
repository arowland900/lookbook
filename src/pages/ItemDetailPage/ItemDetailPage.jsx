import React, { Component } from 'react';
import $ from 'jquery';
import './ItemDetailPage.css';

class ItemDetailPage extends Component {

	state = {
		item: '',
		currentImg: '',
		allImgs: [],
		edit: false,
		invalidForm: false,
		formData: this.props.location.state.item
	}



	formRef = React.createRef();

	handleSubmit = e => {
		e.preventDefault();
		this.props.handleUpdateItem(this.state.formData);
	};

	handleChange = e => {
		const formData = { ...this.state.formData, [e.target.name]: e.target.value };
		this.setState({
			formData,
			invalidForm: !this.formRef.current.checkValidity()
		});
	};

	fadeDiv = () => {
		let div = document.querySelector('.itemDetailPage')
		$(div).fadeIn('slow')
	}

	resize = (i, el) => {
		console.log("hitting resize")
		let mainImg = document.querySelector(i)
		if (mainImg.height + 50 > mainImg.width) {
			console.log('taller')
			$(mainImg).css('height', 500)
			$(mainImg).css('width', 'auto')
		} else {
			console.log('wider')
			$(mainImg).css('width', 550)
			$(mainImg).css('height', 'auto')
		}
		if (el) {
			mainImg.src = el.src
		}
	}



	changeImg = async (e, clickOne, clickTwo) => {
		console.log("Hitting")
		console.log("e: ", e)
		console.log("clickOne: ", clickOne)
		console.log("clickTwo: ", clickTwo)
		// function had to run multiple times to properly resize image on click
		if (clickTwo) return
		// get siblings of element (all other images) and make them not selected
		let siblings = e.target.parentNode.children
		let el = e.target
		// console.log(siblings)
		for (let i = 0; i < siblings.length; i++) {
			siblings[i].classList.add('not-selected')
		}
		// get clicked element and make it the selected one
		el.classList.remove('not-selected')
		el.classList.add('selected')

		this.setState({ currentImg: el.src })
		this.resize('.imgSquare img', el)
		// first recursive statement
		if (!clickOne) this.changeImg(e, true)
		// second recursive statement to ultimately break the loop
		if (clickOne && !clickTwo) this.changeImg(e, true, true)
	}

	showEdit = () => {
		let edit = !this.state.edit
		this.setState({ edit })
	}

	/*--- Lifecycle Methods ---*/

	componentDidMount = async () => {
		console.log("mounted itemDetailPage")
		let item = await this.props.location.state.item
		let currentImg = this.state.currentImg ? this.state.currentImg : item.photos[0]
		this.setState({ item, currentImg })
		await this.resize('.mainImg')
		await this.fadeDiv()
		if (this.state.item.photos.length === 8) {
			$(document.querySelector('.carousel')).css('justify-content', 'space-between')

		} else {
			let tinyImgs = document.querySelectorAll('.ItemDetailPage-center-cropped')
			for (let i = 0; i < tinyImgs.length; i++) {
				console.log(tinyImgs[i])
				tinyImgs[i].setAttribute('style', 'margin-right: .5em')
			}

		}
		console.log("ITEM: ", item)
		console.log("STATE: ", this.state)
		// await this.changeImg()
		document.querySelector('h2').addEventListener('click', this.showEdit)


	}

	render() {

		let img = this.state.item
			? <img src={this.state.item.photos[0]} alt="" className='mainImg' />
			: ''

		return (
			<div className='itemDetailPage'>
				{this.state.item ?
					<div className='mainCard'>
						<div className='infoHolder'>
						<h2 id='item-edit'>Edit Item</h2>
							{/* DEPENDING ON WHETHER THE IMAGE IS TALLER OR WIDER, USE THE HEIGHT OR WIDTH AS THE DEFAULT PROPERTY,
BUT SET A MAXIMUM SIZE --- https://www.grailed.com/listings/16820170-iron-heart-14oz-selvedge-denim-slim-straight-cut-jeans-666s-142bb */}
							{this.state.edit ?
								<div>
									<form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
										<div className="form-group">
											<label>Name</label>
											<input
												className="form-control"
												name="name"
												value={this.state.formData.name}
												onChange={this.handleChange}
												required
											/>
										</div>

										<button
											type="submit"
											className="btn btn-xs"
											disabled={this.state.invalidForm}
										>
											SAVE PUPPY
         								 </button>&nbsp;&nbsp;

									</form>
								</div>
								:

								<div>

									<h3>{this.state.item.name}</h3>
									<p>{this.state.item.description}</p>
									
								</div>
							}
						</div>
						<div className='imgHolder'>
							<div className='imgSquare'>

								{img}
							</div>

							<div className="carousel">
								{/* <div> */}

								{

									this.state.item.photos.map((p, i) => {
										return <img src={p} alt="" key={i} onClick={this.changeImg} className={`ItemDetailPage-center-cropped tiny${i} ${!i ? '' : 'not-selected'}`} />


									})}

								{/* </div> */}
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