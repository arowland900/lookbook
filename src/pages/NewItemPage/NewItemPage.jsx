import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import './NewItemPage.css';
import camera from '../../../src/camera.png'
import { Link } from 'react-router-dom';

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

	refreshPage = () => {
		window.location.reload()
	}

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
		this.previewImage()
		console.log("Selected Files: ", event.target.files);
	};

	ocShowAlert = (message, background = '#3089cf') => {
		let alertContainer = document.getElementById('reset')
		alertContainer.style.display = 'inline'
		alertContainer.textContent = message
		// let alertContainer = document.querySelector('#reset'),
		// alertEl = document.createElement('div'),
		// textNode = document.createTextNode(message);
		// $(alertEl).css('background', background);
		// alertEl.appendChild(textNode);
		// alertContainer.appendChild(textNode);
		setTimeout(function () {
			$(alertContainer).fadeOut(1000);
			// $(alertEl).remove();
		}, 5000);
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

	previewImage = (drag) => {
		$(document.querySelector('#photo-label')).css('pointer-events', 'none')
		let cardHead = document.querySelector('.card-header')
		cardHead.classList.add('fadeOut')

		let oFReader = new FileReader();
		let selectedPhotos
		if (drag) {
			selectedPhotos = this.state.selectedFiles
		} else {
			selectedPhotos = document.getElementById("upload-photo").files
		}
		console.log("selected Photos: ", selectedPhotos)
		setTimeout(() => {
			oFReader.readAsDataURL(selectedPhotos[0]);

			oFReader.onload = function (oFREvent) {
				let img = document.getElementById("photo-label-img")
				img.classList.add('NewPageItem-center-cropped')
				img.src = oFREvent.target.result;

			};
		}, 500)
		setTimeout(function () {
			cardHead.childNodes[0].innerHTML = `${selectedPhotos.length} Photo${selectedPhotos.length > 1 ? 's' : ''}  Selected`
			if (selectedPhotos.length > 8) {
				cardHead.childNodes[0].style.color = 'red'
				document.getElementById('reset').style.display = 'block'
				document.getElementById('reset').textContent = 'Reset'
			}
			cardHead.classList.remove('fadeOut')
			cardHead.classList.add('fadeIn')
		}, 1000)

	};

	multipleFileUploadHandler = () => {

		// this.fadeDiv()
		const data = new FormData();
		data.itemInfo = this.state.formData
		let selectedFiles = this.state.selectedFiles;

		// If file selected
		if (selectedFiles) {
			for (let i = 0; i < selectedFiles.length; i++) {
				data.append('galleryImage', selectedFiles[i], selectedFiles[i].name);
			}
			// data.append('name', this.state.formData.name)
			// data.append('description', this.state.formData.description)
			// console.log("data being sent: ", data)
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
							this.fadeDiv()
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

		// ALLOW DRAG AND DROP
		let dropArea = document.getElementById('photo-label')
			;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
				dropArea.addEventListener(eventName, preventDefaults, false)
			})
		function preventDefaults(e) {
			e.preventDefault()
			e.stopPropagation()
		}
		;['dragenter', 'dragover'].forEach(eventName => {
			dropArea.addEventListener(eventName, highlight, false)
		})

			;['dragleave', 'drop'].forEach(eventName => {
				dropArea.addEventListener(eventName, unhighlight, false)
			})

		function highlight(e) {
			dropArea.classList.add('highlight')
		}

		function unhighlight(e) {
			dropArea.classList.remove('highlight')
		}
		dropArea.addEventListener('drop', handleDrop, false)

		let handleFiles = (selectedFiles) => {
			// ([...files]).forEach(this.multipleFileUploadHandler)
			this.setState({ selectedFiles })
			let selectedPhotos = document.getElementById("upload-photo").files
			selectedPhotos = selectedFiles
			console.log("Here are the files:", selectedFiles)
			console.log("Here are the photos:", selectedPhotos)

			this.previewImage(true)
		}
		function handleDrop(e) {
			let dt = e.dataTransfer
			let files = dt.files

			handleFiles(files)
		}



		// END DRAG AND DROP
	}

	render() {
		return (
			<div className="whole-page">


				{/* <div id="oc-alert-container"></div> */}
				<div
					className="card border-light mb-3 whole-card"
					style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}
				>
					<div className="card-header">
						<h3 style={{ color: '#555', display: 'block' }}>Select Up To 8 Images</h3>
						<label id='photo-label' style={{ width: '200px', height: '200px' }} htmlFor="upload-photo">
							<img id='photo-label-img' src={camera} alt="" style={{ height: '200px', width: '200px', margin: '0 auto', objectFit: 'cover' }} />
						</label>
						{/* <p className="card-text">Please upload the Gallery Images for your gallery</p> */}
						<input id='upload-photo' type="file" multiple onChange={this.multipleFileChangedHandler} />
						{/* <div >
							<p id='reset' onClick={this.refreshPage}>Reset</p>
						</div> */}
					</div>
					<div className="card-body">
						<div className='form-div'>

							<p className="card-text">Piece / Outfit: </p>
							<select name="type" onChange={this.handleChange}>
								<option value="item">Piece</option>
								<option value="outfit">Outfit</option>
							</select>
						</div>
						{/* <div className='form-div'>
							<p className="card-text">Type: </p>
							<select name="type" onChange={this.handleChange}>
								<option value="shoes">Shoes</option>
								<option value="top">Top</option>
							</select>
						</div> */}
						<div className='form-div'>

							<p className="card-text" >Season: </p>
							<select name="season" onChange={this.handleChange}>
								<option value="fw">Fall + Winter</option>
								<option value="ss">Spring + Summer</option>
							</select>
						</div>
						<div className='form-div'>
							<p className="card-text">Name: </p>
							<input type="text" name="name" onChange={this.handleChange} />

						</div>
						<div className='form-div'>

							<p className="card-text">Description: </p>
							<textarea type="text" name="description" onChange={this.handleChange} />
						</div>
						<div className="mt-5 form-div">
							<button className="btn btn-info" onClick={this.multipleFileUploadHandler}>Upload!</button>
						</div>
					</div>
					<div className="card-body">
						<div className='form-div'>

							<p className="card-text">Piece / Outfit: </p>
							<select name="type" onChange={this.handleChange}>
								<option value="item">Piece</option>
								<option value="outfit">Outfit</option>
							</select>
						</div>
						<div className='form-div'>

							<p className="card-text">Season: </p>
							<select name="season" onChange={this.handleChange}>
								<option value="fw">Fall + Winter</option>
								<option value="ss">Spring + Summer</option>
							</select>
						</div>
						<div className='form-div'>
							<p className="card-text">Name: </p>
							<input type="text" name="name" onChange={this.handleChange} />

						</div>
						<div className='form-div'>

							<p className="card-text">Description: </p>
							<textarea type="text" name="description" onChange={this.handleChange} />
						</div>
						<div className="mt-5 form-div">
							<button className="btn btn-info" onClick={this.multipleFileUploadHandler}>Upload!</button>
						</div>
					</div>

				</div>
				<div >
					<p id='reset' onClick={this.refreshPage}>Reset</p>
				</div>
				<div className='loading'>Loading...</div>
			</div>
		);
	}
};

export default NewItemPage;