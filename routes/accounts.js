var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var passwordHash = require('../libs/passwordHash');

router.get('/', function(req, res){
    res.render('accounts/login');
});
router.get('/login', function(req, res){
    res.render('accounts/login');
})

//회원가입
router.get('/join', function(req, res){
    res.render('accounts/join');
})
router.post('/join', function(req, res){
    var User = new UserModel({
        username: req.body.username,
        password:passwordHash(req.body.password),
        displayname : req.body.displayname
    });

    User.save(function(err){
        res.send('<script>alert("회원가입 성공");\
        location.href="/accounts/login";</script>')
    })
});


module.exports = router;