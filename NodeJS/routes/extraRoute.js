const express = require('express');
const router = express.Router();

const ExtraController = require('../controllers/extraController');

router.get('/extra' , ExtraController.getExtra);
router.put('/extra_update' , ExtraController.update);
router.get('/update_year/:year', ExtraController.update_year);
router.get('/images/:image', ExtraController.images);
router.get('/set_language/:language', ExtraController.changeLanguage);

module.exports = router;