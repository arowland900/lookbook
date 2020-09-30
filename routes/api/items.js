const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');

router.post('/multiple-file-upload', itemsCtrl.addPhoto);
router.post('/', itemsCtrl.create);

module.exports = router;
