const express = require('express');
const router = express.Router();
const path = require('path');

const multipart = require('connect-multiparty');
const middlewarMultipart = multipart({uploadDir:'./uploads/users'});

let UserController = require('../controllers/userController');

    router.post('/save' , UserController.save);
    router.post('/uploadImage/:id' , middlewarMultipart , UserController.uploadImage);
    router.get('/getUser/:id' , UserController.getUser);
    router.put('/update/:id', UserController.update);
    router.post('/updatePassword/:id', UserController.updatePassword);
    router.delete('/delete/:id', UserController.delete);
    router.post('/login' , UserController.login);
    router.get('/getImage/:image', UserController.getImage);
    router.post('/sendToken', UserController.sendToken);
    router.post('/verifyToken', UserController.verifyToken);
    router.post('/resetPassword/:id', UserController.resetPassword);
    router.post('/editRole', UserController.editRole);

    router.get('/prova', function(req,res){
        return res.sendFile(path.join(__dirname,'../prova.html'));
    });


module.exports = router;