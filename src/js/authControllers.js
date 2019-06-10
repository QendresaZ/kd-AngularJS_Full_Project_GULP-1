angular.module('app')
.controller('loginController', function ($scope, $location, $http, $rootScope) {
    console.log('LoginController ');

    $scope.credentials = {};

    $scope.resetForm = function () {
        $scope.credentials = null;
    };

    var authenticate = function (credentials, callback) {
        console.log('tried auth');
        var headers = $scope.credentials ? {
            authorization : 'Basic '
                            + btoa($scope.credentials.username = ":"
                                        + $scope.credentials.password)
        } : {};

        $http.post('http://localhost:8081/auth/oauth/token', {
           headers : headers
        }).then(function (response) {
            if(response.data.access_token) {
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
                $location.path('/auth/login');
                $scope.loginerror = true;
            }
        });
    };

    console.log("loginerror = " + $scope.loginerror);
    console.log("authenticated = " + $rootScope.authenticated);
});