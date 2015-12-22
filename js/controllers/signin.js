'use strict';

// /* Controllers */
//   // signin controller
// app.controller('SigninFormController', ['$scope', '$http', '$state', '$cookieStore', function($scope, $http, $state, $cookieStore) {
//     $scope.user = {};
//     $scope.authError = null;

//     $scope.alerts = [];

//     $scope.addAlert = function(type,message) {
//       $scope.alerts.push({type: type, msg: message});
//     };
//     $scope.closeAlert = function(index) {
//       $scope.alerts.splice(index, 1);
//     };

//     $scope.login = function () {
//       $http({
//         method: 'POST',
//         url: baseUrl+'student/login/',
//         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//         transformRequest: function(obj) {
//           var str = [];
//         for(var p in obj)
//           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//         return str.join("&");
//         },
//         data: $scope.user
//       }).then(
//         function (success_response){
//             $cookieStore.put('teacherpi',{'user_token':success_response.data["token"]})
//             // $httpProvider.defaults.headers.get = {"Authorization" : "Token "+user_token}
//             $state.go('app.student.dashboard');
//         },
//         function (error_response){
//           for (var i = $scope.alerts.length - 1; i >= 0; i--) {
//             $scope.closeAlert(i)
//           };
//           if (error_response.data){
//               $scope.addAlert('danger','Invalid username or password');
//           }
//           else{
//             $scope.addAlert('danger', 'Server Error');
//           }
//         });
//     };
//   }]);

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'AuthenticationService',
 function ($scope, $http, $state, AuthenticationService) {
    $scope.user = {};
    $scope.authError = null;

    $scope.alerts = [];

    $scope.addAlert = function(type,message) {
      $scope.alerts.push({type: type, msg: message});
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    (function initController () {
      AuthenticationService.ClearCredentials();
    })();
    $scope.login = function(){
      AuthenticationService.Login($scope.user['username'], $scope.user['password'], 
        function(success_response){
          var token = success_response.token
          AuthenticationService.SetCredentials($scope.user['username'], token);
          $state.go('app.student.dashboard');
        },
        function(error_response){
           for (var i = $scope.alerts.length - 1; i >= 0; i--) {
            $scope.closeAlert(i)
          };
          if (error_response){
              $scope.addAlert('danger','Invalid username or password');
          }
          else{
            $scope.addAlert('danger', 'Server Error');
          }

        }
        );

    };



  }]);