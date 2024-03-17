const express = require('express');
const router = express.Router();

const multipart = require('connect-multiparty');
const middlewarMultipart_avatar = multipart({uploadDir:'./uploads/homes/avatars'});
const middlewarMultipart_image = multipart({uploadDir:'./uploads/homes/images'});

const HomeController = require('../controllers/homeController');

router.post('/save', HomeController.save);
router.post('/upload_avatar/:id', middlewarMultipart_avatar , HomeController.avatarHome);
router.post('/upload_images/:id', middlewarMultipart_image, HomeController.imagesHome);
router.get('/get_homes', HomeController.getHomes);
router.get('/get_one_home/:id', HomeController.getSingleHome);
router.put('/update_datasHome/:id', HomeController.update_datasHome);
router.put('/update_detailsHome/:id', HomeController.update_detailsHome);
router.put('/update_pricesHome/:id', HomeController.update_pricesHome);
router.get('/get_avatar/:image', HomeController.getAvatar);
router.get('/get_image/:image', HomeController.getImage);
router.get('/delete_image/:id/:image', HomeController.deleteImage);
router.delete('/delete_home/:id', HomeController.deleteHome);
router.post('/update_price_newYear/:id', HomeController.update_price_newYear);

module.exports = router;