const express = require('express');
const router = express.Router();

const ExtraController = require('../controllers/extraController');

const md_auth = require('../middlewares/authenticate');
const md_admin = require('../middlewares/admin');

router.get('/get_extra' , ExtraController.getExtra);
router.put('/update_extra' , [md_auth.authenticated,md_admin.admin] , ExtraController.update);
router.get('/update_year/:year', ExtraController.update_year);
router.get('/images/:image', ExtraController.images);
router.post('/contact', ExtraController.contact);

module.exports = router;