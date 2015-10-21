/**
 * Created by Krishna Kalubandi on 18-Oct-15.
 */
var express = require('express')
var router = express.Router()
router.get('/',function(req,res,next){
    res.render('chat-bot');
    console.log('in here bro');
})
module.exports = router;