var app = angular.module("privatechat", ["firebase"]);
app.controller('messageController',function($scope, $firebaseArray, socket){
    socket.init();
    var ref = new Firebase("https://popping-heat-218.firebaseio.com/messages");
    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });
    socket.on('broad',function(data){
        $('#future').append("<p><b>" + data.username + ":</b>" + data.content + "</p>");
    });

    $scope.submit = function() {

        var name = 'kris';
        var message = $('#chat_input').val();
        var chatObject = {content: message, username: name};
        $scope.data = $firebaseArray(ref);
        $scope.data.$add(chatObject);
        socket.emit('messages', chatObject);
    }
});
