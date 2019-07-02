// controller.js
angular.module('app')
    .constant('PacientetAPIPacientiServiceURL', 'http://localhost:5555/pacienti-service/v1/pacientet')
    .constant('SherbimetAPISherbimiServiceURL', 'http://localhost:5555/sherbimet-service/v1/sherbimet')
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
            $scope.successMessage = 'Pacienti u regjistru me sukses';
        }, function (errResponse) {

            $scope.errorMessage = errResponse.data.message;
            console.log("errorMessage: " + $scope.errorMessage);
            console.log('Gabim gjate regjistrimit: ' + errResponse);
        });
    }

    $scope.resetForm = function () {
        $scope.pacienti = null;
    }
})
.controller('regjistroSherbiminController', function ($scope, $http, $location, SherbimetAPISherbimiServiceURL) {

    $scope.submitSherbimiForm = function () {
        console.log("Sherbimi JSON: " + JSON.stringify($scope.sherbimi));
        $http({
            method: 'POST',
            url: SherbimetAPISherbimiServiceURL,
            data: $scope.sherbimi,
        }).then(function (response) {
            $location.path("sherbimet/listoSherbimet");
            console.log('Sherbimi u regjistrua')
        }, function (errResponse) {
            console.log('Gabim gjate regjistrimit: ' + errResponse);
        });
    }

    $scope.resetForm = function () {
        $scope.sherbimi = null;
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
.controller('listoSherbiminController', function ($scope, $http, $state , $location, SherbimetAPISherbimiServiceURL) {
    
    // kthe listen e sherbimeve nga REST API
    $http({
        method: 'GET',
        url : SherbimetAPISherbimiServiceURL
    }).then(function (response) {
        $scope.sherbimet = response.data;
    });

    $scope.perditesoSherbimin = function (sherbimiId) {
        // redirekto ne path
        $location.path("sherbimet/perditesoSherbimin/" + sherbimiId);
    };

    $scope.shikoSherbimin = function (sherbimiId) {
        $location.path("sherbimet/shikoSherbimin/" + sherbimiId);
    };

   
    $scope.deleteSherbimin = function (sherbimiId) {
        $http({
            method: 'DELETE',
            url : SherbimetAPISherbimiServiceURL + '/' + sherbimiId
        }).then(function (response) {
            $location.path("sherbimet/listoSherbimet");
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
            method: 'PUT',
            url: PacientetAPIPacientiServiceURL + '/' + $scope.pacientiId,
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
.controller('perditesoSherbiminController', function ($scope, $http, $location, SherbimetAPISherbimiServiceURL, $stateParams) {

    $scope.sherbimiId = $stateParams.sherbimiId;

    // populate form's input with sherbimi's data
    $http({
        method: 'GET',
        url : SherbimetAPISherbimiServiceURL + '/' + $scope.sherbimiId
    }).then(function (response) {
        $scope.sherbimi = response.data;
        console.log('GOT');
    });

    $scope.submitSherbimiForm = function () {
        console.log("Sherbimi JSON: " + JSON.stringify($scope.sherbimi));
        $http({
            method: 'POST',
            url: SherbimetAPISherbimiServiceURL,
            data: $scope.sherbimi,
        }).then(function (response) {
            $location.path("sherbimet/listoSherbimet");
            console.log('Sherbimi u perditesua')
        }, function (errResponse) {
            console.log('Gabim gjate perditesimit: ' + errResponse);
        });
    }

    $scope.resetForm = function () {
        $scope.sherbimi = null;
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

        $scope.terminetePacientitPage = function(pacientiId) {
            $location.path("pacientet/" + pacientiId + "/terminetPacientit");
            // $http({
            //     method: 'GET',
            //     url: PacientetAPIPacientiServiceURL + '/' + pacientiId + '/terminet'
            // }).then(function (response) {
            //     console.log(response.data);
            //     $location.path("pacientet/" + pacientiId + "/terminetPacientit");
            //     console.log('TerminetFetched!!!')
            // }, function (errResponse) {
            //     console.log('Gabim gjate kerkeses: ' + errResponse);
            // });
        };

        $scope.diagnozatPacientitPage = function(pacientiId) {
          $location.path("pacientet/" + pacientiId + "/diagnozat");
        };

        $scope.shtoDiagnozatPacientitPage = function(pacientiId) {
            $location.path("pacientet/" + pacientiId + "/diagnozat/shto");
        };

        $scope.resetForm = function () {
            $scope.pacienti = null;
        }
    })
    .controller('shikoSherbiminController', function ($scope, $http, $location, SherbimetAPISherbimiServiceURL, $stateParams) {

        $scope.sherbimiId = $stateParams.sherbimiId;

        // populate form's input with service's data
        $http({
            method: 'GET',
            url : SherbimetAPISherbimiServiceURL + '/' + $scope.sherbimiId
        }).then(function (response) {
            $scope.sherbimi = response.data;
            console.log('GOT');
        });

        $scope.submitSherbimiForm = function () {
            console.log("Sherbimi JSON: " + JSON.stringify($scope.sherbimi));
            $http({
                method: 'POST',
                url: SherbimetAPIPacientiServiceURL,
                data: $scope.sherbimi,
            }).then(function (response) {
                $location.path("sherbimet/listoSherbimet");
                console.log('Sherbimi u perditesua')
            }, function (errResponse) {
                console.log('Gabim gjate perditesimit: ' + errResponse);
            });
        };

        $scope.resetForm = function () {
            $scope.sherbimi = null;
        }
    })