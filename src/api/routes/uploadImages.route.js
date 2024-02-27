const express = require('express');
const route = express.Router();
const middlewareUpload = require('../middleware/uploadImage');
const { uploadFiles } = require('../controllers/uploadImages.controller');

route.get('/',function(req,res){
    res.render('uploadImage');
  })
  route.post('/image',middlewareUpload.any(), uploadFiles);
  

  module.exports = route;