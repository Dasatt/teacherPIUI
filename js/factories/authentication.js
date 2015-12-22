app.factory('AuthenticationService', ['$http', '$cookieStore', '$rootScope', 
	function ($http, $cookieStore, $rootScope){
		var factory = {};
        
        factory.Login = function Login(username, password, success_callback, error_callback){
        	// $http.post('/api/authenticate', { username: username, password: password })
         //       .success(function (response) {
         //           callback(response);
         //       });
            $http.post(baseUrl+'student/login/', {'username': username, 'password':password})
            	.success(function (response){
            		success_callback(response);
            	})
            	.error(function (response){
            		error_callback(response);
            	});



        }

        factory.SetCredentials = function SetCredentials (username, token) {
        	// $rootScope.globals = {
         //        currentUser: {
         //            username: username,
         //            token: token
         //        }
         //    };
         //    $cookieStore.put('globals', $rootScope.globals);
            $http.defaults.headers.common['Authorization'] = 'Token ' + token;
            $http.get(baseUrl+'student/user_details/')
	            .success(function (response){
	            	var user_data = response[0]
	            	$rootScope.globals = {
		                currentUser: {
		                    username: username,
		                    token: token,
		                    id_no: user_data['matric_no'],
		                    first_name: user_data['first_name'],
		                    last_name: user_data['last_name'],
		                    is_staff: user_data['is_staff']
		                }
	            	};
                    $cookieStore.put('globals', $rootScope.globals);
	            });     
        }

        factory.ClearCredentials = function ClearCredentials () {
        	$rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }

        return factory;

}])