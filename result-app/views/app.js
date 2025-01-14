var app = angular.module('catsvsdogs', []);
var socket = io.connect({transports:['polling']});

var bg1 = document.getElementById('background-stats-1');
var bg2 = document.getElementById('background-stats-2');

app.controller('statsCtrl', function($scope){
  var animateStats = function(a,b){
    if(a+b>0){
      var percentA = a/(a+b)*100;
      var percentB = 100-percentA;
      bg1.style.width= percentA+"%";
      bg2.style.width = percentB+"%";
    }
  };

  $scope.catPercent = 50;
  $scope.dogPercent = 50;

  var updateScores = function(){
    socket.on('scores', function (data) {
       data = JSON.parse(data);
       animateStats(data.cats, data.dogs);
       $scope.$apply(function() {
         if(data.cats + data.dogs > 0){
           $scope.catPercent = data.cats/(data.cats+data.dogs) * 100;
           $scope.dogPercent = data.dogs/(data.cats+data.dogs) * 100;
           $scope.total = data.cats + data.dogs;
         }
      });
    });
  };

  var init = function(){
    document.body.style.opacity=1;
    updateScores();
  };
  socket.on('message',function(data){
    init();
  });
});
