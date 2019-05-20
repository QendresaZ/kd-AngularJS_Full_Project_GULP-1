// controller.js
angular.module('app')
    .constant('PacientetAPIPacientiServiceURL', 'http://localhost:5555/pacienti-service/v1/pacientet')
.controller('regjistroPacientinController', function ($scope, $http, $location, PacientetAPIPacientiServiceURL) {

    $scope.submitPacientiForm = function () {
        console.log("Pacienti JSON: " + JSON.stringify($scope.pacienti));
        $http({
            method: 'POST',
            url: PacientetAPIPacientiServiceURL,
            data: $scope.pacienti,
        }).then(function (response) {
            $location.path("pacientet/listoPacientet");
            console.log('Pacienti u regjistrua')
        }, function (errResponse) {
            console.log('Gabim gjate regjistrimit: ' + errResponse);
        });
    }

    $scope.resetForm = function () {
        $scope.pacienti = null;
    }
})
.controller('listoPacientetController', function ($scope, $http, $state , $location, PacientetAPIPacientiServiceURL) {
    // kthe listen e pacienteve nga REST API

    // gjendja fillestare e statusit te pacienteve ne tabel
    $scope.statusiPacientit = true;

    $scope.$watch('statusiPacientit', function (statusi) {
        $scope.kthePacientetMeStatus(statusi);
    });

    // $http({
    //     method: 'GET',
    //     url : PacientetAPIPacientiServiceURL
    // }).then(function (response) {
    //     $scope.pacientet = response.data;
    // });

    $scope.kthePacientetMeStatus = function (statusi) {
        console.log("kthePacientetMeStatus ", statusi);
        $http({
            method: 'GET',
            url : PacientetAPIPacientiServiceURL + '/statusi?aktiv=' + statusi
        }).then(function (response) {
            $scope.pacientet = response.data;
            console.log('GOT');
        });
    }


    $scope.perditesoPacientin = function (pacientiId) {
        $location.path("pacientet/perditesoPacientin/" + pacientiId);
    };

    $scope.shikoPacientin = function (pacientiId) {
        $location.path("pacientet/shikoPacientin/" + pacientiId);
    };

    // Needs to be fully implemented
    $scope.deletePacientin = function (pacientiId) {
        $http({
            method: 'DELETE',
            url : PacientetAPIPacientiServiceURL + '/' + pacientiId
        }).then(function (response) {
            $location.path("pacientet/listoPacientet");
            $state.reload();
        })
    }
})
.controller('perditesoPacientinController', function ($scope, $http, $location, PacientetAPIPacientiServiceURL, $stateParams) {

    $scope.pacientiId = $stateParams.pacientiId;

    // populate form's input with pacienti's data
    $http({
        method: 'GET',
        url : PacientetAPIPacientiServiceURL + '/' + $scope.pacientiId
    }).then(function (response) {
        $scope.pacienti = response.data;
        console.log('GOT');
    });

    $scope.submitPacientiForm = function () {
        console.log("Pacienti JSON: " + JSON.stringify($scope.pacienti));
        $http({
            method: 'POST',
            url: PacientetAPIPacientiServiceURL,
            data: $scope.pacienti,
        }).then(function (response) {
            $location.path("pacientet/listoPacientet");
            console.log('Pacienti u perditesua')
        }, function (errResponse) {
            console.log('Gabim gjate perditesimit: ' + errResponse);
        });
    }

    $scope.resetForm = function () {
        $scope.pacienti = null;
    }
})
    .controller('shikoPacientinController', function ($scope, $http, $location, PacientetAPIPacientiServiceURL, $stateParams) {

        $scope.pacientiId = $stateParams.pacientiId;

        // populate form's input with pacienti's data
        $http({
            method: 'GET',
            url : PacientetAPIPacientiServiceURL + '/' + $scope.pacientiId
        }).then(function (response) {
            $scope.pacienti = response.data;
            console.log('GOT');
        });

        $scope.submitPacientiForm = function () {
            console.log("Pacienti JSON: " + JSON.stringify($scope.pacienti));
            $http({
                method: 'POST',
                url: PacientetAPIPacientiServiceURL,
                data: $scope.pacienti,
            }).then(function (response) {
                $location.path("pacientet/listoPacientet");
                console.log('Pacienti u perditesua')
            }, function (errResponse) {
                console.log('Gabim gjate perditesimit: ' + errResponse);
            });
        }

        $scope.resetForm = function () {
            $scope.pacienti = null;
        }
    })