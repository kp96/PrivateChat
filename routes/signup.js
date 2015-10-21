var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
router.post('/',function(req,res,next){
    var ref = new Firebase("https://popping-heat-218.firebaseio.com");
    ref.createUser({
        email : req.body.email,
        password : req.body.password
    }, function(error, userData){
        if (error) {
            console.log("Error creating user:", error);
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            res.render('/',{message:'Registration Successful! Please login'});
        }
    });

});
module.exports = router;