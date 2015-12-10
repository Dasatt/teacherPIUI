'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;

    $scope.alerts = [];

    $scope.addAlert = function(type,message) {
      $scope.alerts.push({type: type, msg: message});
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.login = function () {
      $http({
        method: 'POST',
        url: baseUrl+'student/login/',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
        },
        data: $scope.user
      }).then(
        function (success_response){
          if (success_response.data.success == false){
            $scope.addAlert('warning', success_response.data.message);
          }
          else{
            $scope.user_id = success_response.data.user;
            // $state.go('app.student.dashboard');
          }
        },
        function (error_response){
          $scope.addAlert('danger', 'Server Error');
        });
    };
  }]);