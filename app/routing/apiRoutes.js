var bodyParser = require('body-parser');
var path = require('path');


var friendsList = require('../data/friends.js');

var friendsData = require('../data/friends.js');
module.exports = function (app) {


    app.get('/api/friends', function (request, result) {
        result.json(friendsData);
    });

    app.post("/api/friends", function (request, result) {
        var input = request.body;
        
        var friend = -1;
        var newFriendScore = 100;
        var recentFriendScore = 0;

        for (i = 0; i < friendsList.length; i++) {
            console.log(friendsList.length[i])

            for (j = 0; j < input.scores.length; j++) {

                recentFriendScore = recentFriendScore + Math.abs(friendsList[i].scores[j] - input.scores[j]);
                console.log(recentFriendScore + Math.abs(friendsList[i].scores[j] - input.scores[j]));
            }
            if (recentFriendScore <= newFriendScore) {
                friend = i;
                newFriendScore = recentFriendScore;
            }
            recentFriendScore = 0;

        }
        friendsList.push(input);
        newFriendDetails = friendsList[friend];
        result.json(newFriendDetails);

    });
};