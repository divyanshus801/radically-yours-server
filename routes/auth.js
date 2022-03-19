const express = require('express');
const router = express.Router();
const {signup, signin, getUserList} = require('../controller/auth');

// const {   validateSignupRequest,isRequestValidated,validateSigninRequest } = require('../validators/auth');




router.post('/signup', signup);

router.post('/signin', signin);

router.get('/getUsersList', getUserList);

//router.post('/profile',requireSignin,(req,res) => {
//res.status(200).json({user: 'profile'});
//});

module.exports = router;