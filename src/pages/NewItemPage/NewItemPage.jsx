import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import './NewItemPage.css';
import camera from '../../../src/camera.png'

class NewItemPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null,
			selectedFiles: null,
			invalidForm: true,
			formData: {
				name: '',
				description: '',
				photos: '',
				type: '',
				season: ''
			}
		}
	}

	// formRef = React.createRef();

	// handleSubmit = e => {
	// 	e.preventDefault();
	// 	this.props.handleAddItem(this.state.formData);
	// };

	handleChange = e => {
		console.log("hitting handle change!")
		const formData = { ...this.state.formData, [e.target.name]: e.target.value };
		this.setState({
			formData,
			// invalidForm: !this.formRef.current.checkValidity()
		});
		// console.log(this.state.formData)
	};

	multipleFileChangedHandler = (event) => {
		this.setState({
			selectedFiles: event.target.files
		});
		console.log(event.target.files);
	};

	ocShowAlert = (message, background = '#3089cf') => {
		let alertContainer = document.querySelector('#oc-alert-container'),
			alertEl = document.createElement('div'),
			textNode = document.createTextNode(message);
		alertEl.setAttribute('class', 'oc-alert-pop-up');
		$(alertEl).css('background', background);
		alertEl.appendChild(textNode);
		alertContainer.appendChild(alertEl);
		setTimeout(function () {
			$(alertEl).fadeOut('slow');
			$(alertEl).remove();
		}, 3000);
	};

	fadeDiv = () => {
		let div = document.querySelector('.whole-card'),
			loading = document.querySelector('.loading')
		setTimeout(function () {
			$(div).fadeOut('slow')

		}, 500)
		setTimeout(async function () {
			await $(loading).fadeIn(1000)
			$(loading).css('display', 'flex')

		}, 1000)

	}

	fadeDivIn = async () => {
		let div = document.querySelector('.whole-card')
		// setTimeout(function () {
			await $(div).fadeIn('slow')
			$(div).css('display', 'flex')
		// }, 500)


	}

	multipleFileUploadHandler = () => {
		this.fadeDiv()
		const data = new FormData();
		data.itemInfo = this.state.formData
		console.log("THIS IS DATA: ", data)
		let selectedFiles = this.state.selectedFiles;
		console.log('hitting multFileUpload')

		// If file selected
		if (selectedFiles) {
			for (let i = 0; i < selectedFiles.length; i++) {
				data.append('galleryImage', selectedFiles[i], selectedFiles[i].name);
			}
			data.append('name', this.state.formData.name)
			data.append('description', this.state.formData.description)
			console.log("data being sent: ", data)
			axios.post('/api/items/multiple-file-upload', data, {
				headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				}
			})
				.then((response) => {
					console.log('res', response);
					if (200 === response.status) {
						// If file size is larger than expected.
						if (response.data.error) {
							console.log(response.data.error)
							if ('LIMIT_FILE_SIZE' === response.data.error.code) {
								this.ocShowAlert('Max size: 2MB', 'red');
							} else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
								this.ocShowAlert('Max 4 images allowed', 'red');
							} else {
								// If not the given ile type
								this.ocShowAlert(response.data.error, 'red');
							}
						} else {
							// Success
							// this.fadeDiv()
							let fileName = response.data;
							console.log('fileName', fileName);
							const formData = { ...this.state.formData, 'photos': fileName.locationArray };
							this.setState({
								formData,
								// invalidForm: !this.formRef.current.checkValidity()
							});
							// await this.fadeDiv()
							this.props.handleAddItem(this.state.formData);
							this.ocShowAlert('File Uploaded', '#3089cf');
						}
					}
				}).catch((error) => {
					// If another error
					this.ocShowAlert(error, 'red');
				});
		} else {
			// if file not selected throw error
			this.ocShowAlert('Please upload file', 'red');
		}
	};


	/*--- Lifecycle Methods ---*/

	componentDidMount = async () => {
		console.log(camera)
		await this.fadeDivIn()
	}

	render() {
		return (
			<div className="GamePage">


				<div id="oc-alert-container"></div>
				<div 
					className="card border-light mb-3 whole-card" 
					style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}
				>
					<div className="card-header">
						<h3 style={{ color: '#555' }}>Select Up To 8 Images</h3>
						<label id='photo-label' htmlFor="upload-photo">
							<img id='photo-label-img' src={camera} alt="" style={{height: '200px', width: 'auto', margin: '0 auto'}}/>
						 </label>
						{/* <p className="card-text">Please upload the Gallery Images for your gallery</p> */}
						<input id='upload-photo' type="file" multiple onChange={this.multipleFileChangedHandler} />

					</div>
					<div className="card-body">
						<p className="card-text">Piece / Outfit</p>
						<select name="type" onChange={this.handleChange}>
							<option value="item">Piece</option>
							<option value="outfit">Outfit</option>
						</select>
						<p className="card-text">Season</p>
						<select name="season" onChange={this.handleChange}>
							<option value="fw">Fall + Winter</option>
							<option value="ss">Spring + Summer</option>
						</select>
						<p className="card-text">Name</p>
						<input type="text" name="name" onChange={this.handleChange} />
						<p className="card-text">Description</p>
						<textarea type="text" name="description" onChange={this.handleChange} />
						<div className="mt-5">
							<button className="btn btn-info" onClick={this.multipleFileUploadHandler}>Upload!</button>
						</div>
					</div>
				</div>
				<div className='loading'>Loading...</div>
			</div>
		);
	}
};

export default NewItemPage;