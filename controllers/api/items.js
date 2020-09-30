const Item = require('../../models/item');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');
require('dotenv').config();

module.exports = {
	addPhoto,
	create
};


// PHOTO ADDING HELPER FUNCTIONS FOR AWS
const s3 = new aws.S3({
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	Bucket: 'look-book-app'
});

function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}

// Multiple File Uploads ( max 4 )
const uploadsBusinessGallery = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'look-book-app',
		acl: 'public-read',
		key: function (req, file, cb) {
			cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
		}
	}),
	limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
}).array('galleryImage', 4);




async function addPhoto(req, res) {
	// console.log("REQ",req.data)
	// router.post('/multiple-file-upload', (req, res) => {
	console.log('hitting multi function in routes')
	uploadsBusinessGallery(req, res, (error) => {
		console.log('files', req.files);
		if (error) {
			console.log('errors', error);
			res.json({ error: error });
		} else {
			// If File not found
			if (req.files === undefined) {
				console.log('Error: No File Selected!');
				res.json('Error: No File Selected');
			} else {
				// If Success
				let fileArray = req.files,
					fileLocation;
				const galleryImgLocationArray = [];
				for (let i = 0; i < fileArray.length; i++) {
					fileLocation = fileArray[i].location;
					console.log('filenm', fileLocation);
					galleryImgLocationArray.push(fileLocation)
				}
				// await Item.create()
				// Save the file name into database
				res.json({
					filesArray: fileArray,
					locationArray: galleryImgLocationArray
				});
			}
		}
	});
	// });
}

async function create(req,res){
	console.log("HITTING CREATE IN CONTROLLER")
	console.log(req.body)
	const item = await Item.create(req.body);
	console.log("item created!: ", item)
  	res.status(201).json(item);
}