const express = require('express');
const router = express.Router();

const ReserveController = require('../controllers/reserveController');

const md_auth = require('../middlewares/authenticate');
const md_admin = require('../middlewares/admin');

router.post('/save_reserve' , ReserveController.save);
router.get('/get_reserve/:id',  ReserveController.getReserve);
router.get('/get_userReserve/:id', md_auth.authenticated , ReserveController.getReserve_byUser);
router.post('/get_homeReserve', [ md_auth.authenticated , md_admin.admin ] , ReserveController.getReserve_byHome);
router.get('/get_reserves', ReserveController.getReserves);
router.put('/update_reserve/:id', ReserveController.completeReserve);
router.post('/refund/:id',  ReserveController.refund);


module.exports = router;