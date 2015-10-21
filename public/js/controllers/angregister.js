/**
 * Created by Krishna Kalubandi on 18-Oct-15.
 */
var app = angular.module('register', ["firebase"]);
var ref = new Firebase("https://popping-heat-218.firebaseio.com");
app.controller('registerController', function($scope){

    $scope.login = function() {

        ref.authWithPassword({
            email    : $scope.user.login.email,
            password : $scope.user.login.password
        }, function(error, authData) {

            if(!error) {
                console.log(authData);
            }else {
                console.log('Error ' + error);
            }

        }, {
            remember: "sessionOnly"
        });
    }
    $scope.submit = function() {

           if(true) {

               ref.createUser({
                   email : $scope.user.email,
                   password : $scope.user.password
               }, function(error, userData){
                   if (error) {
                       console.log("Error creating user:", error);
                   } else {
                       console.log("Successfully created user account with uid:", userData.uid);
                   }
               });
           }else {
               $scope.message = "Please correct your fields";
           }
    };



});