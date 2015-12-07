'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.alerts = [];

    $scope.addAlert = function(type,message) {
      $scope.alerts.push({type: type, msg: message});
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.signUp = function() {
      $http.post(baseUrl+'student/register', $scope.user).then(
        function (success_response){
          if (success_response.statusText == 'CREATED') {
            $state.go('access.signin');
            // $scope.addAlert('success','Account succesfully created, Sign in to get access');            
          }else{
            $scope.addAlert('danger','Error messages here');
          };
        },
        function (error_response){
          $scope.addAlert('danger','Server Error');

        });

    };
  }]);