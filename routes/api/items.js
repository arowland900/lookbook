const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');


router.use(require('../../config/auth'));
router.post('/multiple-file-upload', itemsCtrl.addPhoto);
router.post('/', checkAuth, itemsCtrl.create);


/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }
module.exports = router;
