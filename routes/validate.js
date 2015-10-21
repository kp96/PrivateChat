var express = require('express');
var router = express.Router();
var request = require('request')
/* GET home page. */
router.get('/', function(req, res, next) {
    request.post({
        url :'http://vitacademics-rel.herokuapp.com/api/v2/vellore/login',
        form : {
            regno : "13BIT0089",
            dob : "06011996",
            mobile : "9490211842"
        }
    },function(error, response, body) {
        if(!error) {
            res.end(body)
           
        }

    })

})

module.exports = router
