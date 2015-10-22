var app = angular.module("chatbot", ['firebase','ngRoute','luegg.directives']);
app.controller('chatController',function($scope, $firebaseArray, socket){
    socket.init();
    $scope.messages = [{content:'hello',username:'jason',img: 'http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}];
    $scope.users = [{username:'jason',img:'http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}];
    var ref = new Firebase("https://popping-heat-218.firebaseio.com/messages");
    socket.on('connect', function(data) {
        var name = $.urlParam('nick');
        var gravatar = $.urlParam('gravatar');
        socket.emit('join', {username: name, img: gravatar});

    });
    socket.on('online',function(data) {
        $scope.users = $scope.users.concat(data);
    });
    socket.on('broad',function(data) {
        $scope.messages = $scope.messages.concat(data);
    });

    $scope.submit = function() {
        var name = $.urlParam('nick');
        var message = $scope.user.message;
        $scope.user.message = "";
        var gravatar = $.urlParam('gravatar');
        var chatObject = {content: message, username: name, img: gravatar };
        $scope.data = $firebaseArray(ref);
        $scope.data.$add(chatObject);
        socket.emit('messages', chatObject);
    }
});
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
}
