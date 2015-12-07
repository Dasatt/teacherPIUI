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

    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post(baseUrl+'student/login', $scope.user).then(
        function (success_response){
          console.log(success_response)
          // $scope.addAlert('success', success_response)
          if (true){
            //add error messages
          }else{
            $state.go('student-dashboard');
          }
        },
        function (error_response){
          console.log(error_response)
          $scope.addAlert('danger', 'Server Error');
          // $scope.addAlert('warning', error_response)
        });      
    };
  }])
;