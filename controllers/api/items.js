const Item = require('../../models/item');

module.exports = {
  addPhoto
};

async function addPhoto(req, res) {
  console.log("WE ARE HITTING THE ADD PHOTO FUNCTION")
  console.log(req.files)
}