'use strict';

/* Controllers */
  // signin controller
app.controller('studentAttendance', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.activeClass = false;
    $scope.httpStatus = false;
    $scope.alerts = [
      // { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
      // { type: 'info', msg: 'Heads up! This alert needs your attention, but it is not super important.' },
      // { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
      // { type: 'danger', msg: 'Danger! Best check yo self, you are bad.' }
    ];

    $scope.addAlert = function(type,message) {
      $scope.alerts.push({type: type, msg: message});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    // $scope.activeClass=true;
    
    $scope.loadActiveClass = function () {
      $http.get(baseUrl+'attendance/activeclass/').then(
        function (success_response){
          $scope.httpStatus = true;
          if (success_response.data){
            $scope.activeClass = true;
            $scope.courseCode = success_response.data;
            //call an api here to get course data
          }else {
            $scope.addAlert('warning', 'No currently active classes');
          }
        },
        function (error_response){
          $scope.httpStatus = true;
          $scope.addAlert('danger', 'Server Error');
        });

    };
    $scope.loadActiveClass();

    $scope.attend = function (){
        //call attend api for logged in student

    };

    $scope.userHistory = function (){
      // get student history on classes attended, just for better user interaction
    }



}]);