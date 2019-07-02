angular.module('app')
.controller('loginController', function ($scope, $location, $http, $rootScope, $httpParamSerializer) {
    console.log('LoginController ');

    $scope.credentials = {};

    $scope.resetForm = function () {
        $scope.credentials = null;
    };


    var authenticate = function (credentials, callback) {
        console.log('tried auth');
        // var headers = $scope.credentials ? {
        //     Authorization : 'Basic a2FydGVsYXBhY2llbnRpdDp0aGlzaXNzZWNyZXQ='
        //                     // + btoa($scope.credentials.username + ":"
        //                     //             + $scope.credentials.password)
        // } : {};

        // test
        $http.defaults.headers.common.Authorization = 'Basic a2FydGVsYXBhY2llbnRpdDp0aGlzaXNzZWNyZXQ=';
        $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            // data: {
        //                grant_type : "password",
        //                 scope : "webclient",
        //                 username : "admin",
        //                 password : "admin"
        //             }

        // http://localhost:8081/auth/oauth/token


        $http({
            method: 'POST',
            url: 'http://localhost:8081/auth/oauth/token',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            // params: $httpParamSerializer({
            //     grant_type : "password",
            //         scope : "webclient",
            //         username : "admin",
            //         password : "admin"
            // })
            params: {
                grant_type: "password",
                scope: "webclient",
                username : credentials.username,
                password: credentials.password
            }
            // data : {
            //     grant_type : "password",
            //     scope : "webclient",
            //     username : "admin",
            //     password : "admin"
            // }
        }).then(function (response) {
            if(response.data.access_token) {
                console.log(response.data);
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
                // $cookie.put("access_token", response.data.access_token);
                console.log(response.data.access_token);
                $rootScope.authenticated = true;
            } else {
                $rootScope.authenticated = false;
            }
            callback && callback();
        }, function () {
            $rootScope.authenticated = false;
            callback && callback();
        });


    }

    $scope.loginUser = function () {
        console.log('loginUser - clicked');
        authenticate($scope.credentials, function () {
            if ($rootScope.authenticated) {
                $location.path('/');
                $scope.loginerror = false;
            } else {
                $location.path('/login');
                $scope.loginerror = true;
            }
        });
    };

    console.log("loginerror = " + $scope.loginerror);
    console.log("authenticated = " + $rootScope.authenticated);
});