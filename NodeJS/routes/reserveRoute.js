const express = require('express');
const router = express.Router();

const ReserveController = require('../controllers/reserveController');

router.post('/save_reserve' , ReserveController.save);
router.get('/get_reserve/:id', ReserveController.getReserve);
router.get('/get_userReserve/:id', ReserveController.getReserve_byUser);
router.get('/get_homeReserve/:id', ReserveController.getReserve_byHome);
router.get('/get_reserves', ReserveController.getReserves);
router.put('/update_reserve/:id', ReserveController.completeReserve);
router.post('/refund/:id', ReserveController.refund);


module.exports = router;