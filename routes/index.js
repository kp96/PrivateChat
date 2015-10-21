var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {message : ''};
  res.render('index',data);
});
router.post('/signup',function(req,res,next){
  var ref = new Firebase("https://popping-heat-218.firebaseio.com");
  ref.createUser({
    email : req.body.email,
    password : req.body.password
  }, function(error, userData){
    if (error) {
      res.redirect('/?success=0');
    } else {
      var extra = {};
      console.log("Successfully created user account with uid:", userData.uid);
      var usersRef = ref.child('users');
      extra[userData.uid]= {
        nick : req.body.nick
      }
      usersRef.set(extra);
      res.redirect('/?success=1');
    }
  });
});
router.post('/signin',function(req,res,next){
  var ref = new Firebase("https://popping-heat-218.firebaseio.com");
  ref.authWithPassword({
    email    : req.body.email,
    password : req.body.password
  }, function(error, authData) {

    if(!error){
      var usersRef = ref.child('users');
      usersRef.once('value',function(data){
        var json = data.val();
        var uid = authData.uid;
        var redurl = '/chat?nick=' + json[uid].nick + '&gravatar=' + authData.password.profileImageURL;
        res.redirect(redurl);
      });

    }
    else {
      console.log(error);
    }
  }, {
    remember: "sessionOnly"
  });
});
module.exports = router;
