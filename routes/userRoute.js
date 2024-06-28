const express = require('express');
const router = express.Router();

const md_auth = require('../middlewares/authenticate');
const md_admin = require('../middlewares/admin');

const multipart = require('connect-multiparty');
const middlewarMultipart = multipart({uploadDir:'./uploads/users'});

let UserController = require('../controllers/userController');

    router.post('/save' , UserController.save);
    router.post('/uploadImage/:id' ,  middlewarMultipart , UserController.uploadImage);
    router.get('/getUser/:id' , UserController.getUser);
    router.post('/getUser_noLogin' , UserController.getUser_noLogin);
    router.put('/update/:id',  md_auth.authenticated ,   UserController.update);
    router.post('/updatePassword/:id',   md_auth.authenticated ,  UserController.updatePassword);
    router.get('/delete/:id',  md_auth.authenticated ,  UserController.delete);
    router.post('/login' , UserController.login);
    router.get('/getImage/:image', UserController.getImage);
    router.post('/sendToken', UserController.sendToken);
    router.post('/verifyToken', UserController.verifyToken);
    router.post('/resetPassword/:id', UserController.resetPassword);
    router.post('/editRole', [ md_auth.authenticated , md_admin.admin ] ,  UserController.editRole);


module.exports = router;