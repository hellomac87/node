var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var passwordHash = require('../libs/passwordHash');
//passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//passport serializeUser, deserializeUser
passport.serializeUser(function(user, done){
    console.log(serializeUser);
    done(null, user);
});
passport.deserializeUser(function(user, done){
    console.log('deserializeUser');
    done(null, user);
});

//passport 정책 작성
passport.use(new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback:true
    },
    function(req, username, password, done){
        UserModel.findOne({ 
            username : username ,
            password : passwordHash(password)},
            function(err, user){
                if(!user){
                    return done(null, false,{ message:'아이디 또는 비밀번호 오류 입니다'});
                }else{
                    return done(null, user);
                }
            }
        );
    }
));

router.get('/', function(req, res){
    res.render('accounts/login');
});
router.get('/login', function(req, res){
    res.render('accounts/login');
})

//회원가입
router.get('/join', function(req, res){
    res.render('accounts/join');
});

router.post('/join', function(req, res){
    var User = new UserModel({
        username: req.body.username,
        password:passwordHash(req.body.password), //암호화
        displayname : req.body.displayname
    });

    User.save(function(err){
        res.send('<script>alert("회원가입 성공");\
        location.href="/accounts/login";</script>')
    })
});


module.exports = router;