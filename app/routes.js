'use strict';

const UserController=require('./controllers/userController');


var multer = require('multer');

//var/coutlootVideos

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/var/photoShootoUploads");
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + ".pdf");
    cb(null, Date.now() +"_"+ file.originalname);
  }
});

var upload = multer({
  storage: storage
});

module.exports = function(app){
    
    //users
    
    app.route('/photoshooto/intern/account').post(UserController.account);


}