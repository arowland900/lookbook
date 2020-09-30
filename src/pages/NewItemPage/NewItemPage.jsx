import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import NavBar from '../../components/NavBar/NavBar';
import './NewItemPage.css';

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
				photos: ''
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
		console.log(this.state.formData)
		const formData = { ...this.state.formData, [e.target.name]: e.target.value };
		this.setState({
			formData,
			// invalidForm: !this.formRef.current.checkValidity()
		});
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

	multipleFileUploadHandler = () => {
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
							let fileName = response.data;
							console.log('fileName', fileName);
							const formData = { ...this.state.formData, 'photos': fileName.locationArray };
							this.setState({
								formData,
								// invalidForm: !this.formRef.current.checkValidity()
							});
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
	render() {
		return (
			<div className="GamePage">
				<NavBar
					user={this.props.user}
					handleLogout={this.props.handleLogout}
				/>
				
				<div id="oc-alert-container"></div>
				<div className="card border-light mb-3" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
					<div className="card-header">
						<h3 style={{ color: '#555', marginLeft: '12px' }}>Upload Muliple Images</h3>
						<p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 400px x 400px ( Max 2MB )</p>
					</div>
					<div className="card-body">
						<p className="card-text">Please upload the Gallery Images for your gallery</p>
						<input type="file" multiple onChange={this.multipleFileChangedHandler} />

					</div>
					<div className="card-body">
						<p className="card-text">Name</p>
						<input type="text" name="name" onChange={this.handleChange} />
						<p className="card-text">Description</p>
						<input type="text" name="description" onChange={this.handleChange} />
						<div className="mt-5">
							<button className="btn btn-info" onClick={this.multipleFileUploadHandler}>Upload!</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default NewItemPage;