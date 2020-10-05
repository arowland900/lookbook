import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import './NewItemPage.css';
import camera from '../../../src/camera.png'
import chroma from 'chroma-js';
import Select from 'react-select';


class NewItemPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: null,
			itemNames: [],
			itemIDs: [],
			selectedFile: null,
			selectedFiles: null,
			invalidForm: true,
			formData: {
				photos: '',
				name: '',
				description: '',
				tags: '',
				items: [],
				type: 'item',
				color: '',
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
		console.log("E: ", e)
		if (e.target) {
			const formData = { ...this.state.formData, [e.target.name]: e.target.value };
			this.setState({
				formData,
				// invalidForm: !this.formRef.current.checkValidity()
			});
		} else {
			console.log("handleChange else e: ", e)
			let formData = {};
			if (e[0]) {

				let values = e.map(c => c.value)
				formData = { ...this.state.formData, items: values };

			} else {
				formData = { ...this.state.formData, type: e };
			}
			this.setState({
				formData,
				// invalidForm: !this.formRef.current.checkValidity()
			});
		}
		console.log(this.state.formData)
	};

	multipleFileChangedHandler = (event) => {
		console.log('hitting file selector')
		let selectedFiles = event.target.files
		let invalidFiles = false
		for (let i = 0; i < selectedFiles.length; i++) {
			if (!selectedFiles[0].type.includes('image')) {
				invalidFiles = true
			}
		}
		if (invalidFiles) {

			this.ocShowAlert('Please Only Select Photos')
			selectedFiles = []
			this.setState({ selectedFiles })
			document.getElementById("upload-photo").value = ''
			return
		}
		this.setState({
			selectedFiles
		});
		this.previewImage()
		console.log("Selected Files: ", event.target.files);
	};

	ocShowAlert = (message) => {
		let alertContainer = document.getElementById('reset')
		alertContainer.style.display = 'inline'
		alertContainer.textContent = message
		setTimeout(() => {
			$(alertContainer).fadeOut(1000)


		}, 3000);
		setTimeout(() => {
			$(alertContainer).fadeIn(1000)
		}, 1000);
		setTimeout(() => {
			document.getElementById('reset').style.display = 'inline'
			document.getElementById('reset').textContent = 'Reset'
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
		let invalid = false
		let photoLabel = $(document.querySelector('#photo-label'))
		photoLabel.css('pointer-events', 'none')
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

			oFReader.onload = (oFREvent) => {
				let img = document.getElementById("photo-label-img")
				img.classList.add('NewPageItem-center-cropped')
				// if (oFREvent.target.result[5] == 'i') {

				img.src = oFREvent.target.result;
				// } else {
				// 	return
				// }
				// console.log(img.src[5])

			};
		}, 500)
		setTimeout(function () {
			// if (!invalid) {
			cardHead.childNodes[0].innerHTML = `${selectedPhotos.length} Photo${selectedPhotos.length > 1 ? 's' : ''}  Selected`
			if (selectedPhotos.length > 8) {
				cardHead.childNodes[0].style.color = 'red'
				document.getElementById('reset').style.display = 'inline'
				document.getElementById('reset').textContent = 'Reset'
			}
			cardHead.classList.remove('fadeOut')
			cardHead.classList.add('fadeIn')
			document.getElementById('reset').style.display = 'inline'
			document.getElementById('reset').textContent = 'Reset'
			// } else {
			photoLabel.css('pointer-events', '')
			cardHead.classList.remove('fadeOut')
			cardHead.classList.add('fadeIn')
			// }
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
							// this.ocShowAlert('File Uploaded', '#3089cf');
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

		console.log("HERE ARE THE PROPS ITEMS: ", this.props.items)
		await this.fadeDivIn()
		this.setState({ items: this.props.items })
		let itemNames = this.props.items.map(e => { return { 'value': e._id, 'label': e.name } })
		// let itemIDs = this.props.items.map(e => e._id)
		this.setState({ itemNames })
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
		console.log(this.state)
		// document.querySelector('.resizable-input').style.display = 'none'

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
							<h3 className="card-text" style={{ color: '#555', display: 'inline' }}>Piece / Outfit: </h3>
							<select name="type" onChange={this.handleChange}>
								<option value="item">Piece</option>
								<option value="outfit">Outfit</option>
							</select>
						</div>
						<div className='form-div'>
							<p className="card-text">Name: </p>
							<input type="text" name="name" onChange={this.handleChange} />

						</div>

						<div className='form-div'>
							<p className="card-text">Tags: </p>
							<textarea style={{ height: '105px' }} type="text" name="tags" onChange={this.handleChange} />

						</div>

					</div>
					<div className="card-body">
						{/* <div className='form-div type'> */}
							<p className="card-text" >Type: </p>
							<Select
								defaultValue={'top'}
								options={[
									{ value: 'top', label: 'Top' },
									{ value: 'bottom', label: 'Bottom' },
									{ value: 'outerwear', label: 'Outerwear' },
									{ value: 'underwear', label: 'Underwear' },
									{ value: 'footwear', label: 'Footwear' },
									{ value: 'tailoring', label: 'Tailoring' },
									{ value: 'accessory', label: 'Accessory' },
								]}
								closeMenuOnSelect={true}
								name="type"
								className="basic-multi-select"
								classNamePrefix="select"
								onChange={this.handleChange}
							/>
							{/* <p className="card-text" >Type: </p>
							<select name="type" onChange={this.handleChange}>
								<option value="top">Top</option>
								<option value="bottom">Bottom</option>
								<option value="outerwear">Outerwear</option>
								<option value="underwear">Underwear</option>
								<option value="footwear">Footwear</option>
								<option value="tailoring">Tailoring</option>
								<option value="accessory">Accessory</option>
							</select> */}
						{/* </div> */}
						{/* <div className='form-div'> */}

							<p className="card-text" >Pieces: </p>
							{this.props.items[0] ?
								<Select
									defaultValue={this.state.itemNames[0]}
									isMulti
									options={this.state.itemNames}
									closeMenuOnSelect={true}
									name="items"
									className="basic-multi-select"
									classNamePrefix="select"
									onChange={this.handleChange}
								/>
								: ''
							}
						{/* </div> */}
						

						<div className="mt-5 form-div">
							<button className="btn btn-info" onClick={this.multipleFileUploadHandler}>Upload!</button>
						</div>
					</div>

				</div>
				<div >
					<p id='reset' style={{ cursor: 'pointer', width: '20px' }} onClick={this.refreshPage}>Reset</p>
				</div>
				<div className='loading'>Loading...</div>
			</div>
		);
	}
};

export default NewItemPage;