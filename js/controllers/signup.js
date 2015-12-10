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
          console.log(success_response.data)
          if (success_response.statusText == 'CREATED') {
            $state.go('access.signin');
          }
        },
        function (error_response){
          if (error_response.status == 500){
            $scope.addAlert('danger','Server Error');
          }else if (error_response.status == 400) {
            for (var key in error_response.data){
              for (var item in error_response.data[key]){
                $scope.addAlert('danger',error_response.data[key][item]);
              }
            }
          } else{
            $scope.addAlert('danger','Ooops! something went wrong. Please retry');
          };        
        });
    };
}]);