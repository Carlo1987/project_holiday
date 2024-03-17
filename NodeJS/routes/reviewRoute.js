const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/reviewController');

router.post('/save' , ReviewController.save);
router.get('/reviews', ReviewController.getLastReview);
router.get('/review_home/:id' , ReviewController.getReviewHome);
router.get('/get_avatar/:id' , ReviewController.getAvatar);
router.get('/get_review/:id', ReviewController.getReview);
router.put('/update_review/:id', ReviewController.updateReview);
router.delete('/delete_review/:id', ReviewController.delete);


module.exports = router;