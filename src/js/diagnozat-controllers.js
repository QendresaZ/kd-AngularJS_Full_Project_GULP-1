angular.module("app")
    .constant('DiagnozatAPIPacientiServiceURL', 'http://localhost:5555/pacienti-service/v1/diagnozat')
.controller("ShikoDiagnozatPacientitController", function ($scope, $http, $location, $stateParams, DiagnozatAPIPacientiServiceURL) {

    $scope.pacientiId = $stateParams.pacientiId;

    // fetch info from rest api
    $http({
        method: 'GET',
        url: DiagnozatAPIPacientiServiceURL + "/pacienti/" + $scope.pacientiId
    }).then(function (response) {
        $scope.diagnozat = response.data;
        console.log($scope.diagnozat);
    });
})
.controller("ShtoDiagnozenPacientitController", ['$scope', '$http','$location', '$stateParams', 'DiagnozatAPIPacientiServiceURL',
    function ($scope, $http, $location, $stateParams, DiagnozatAPIPacientiServiceURL) {

    $scope.pacientiId = $stateParams.pacientiId;

    console.log("pacientId = " + $scope.pacientiId);

    $scope.submitDiagnozaForm = function () {
        $http({
            method: 'POST',
            url: DiagnozatAPIPacientiServiceURL + '/pacienti/' + $scope.pacientiId,
            data: $scope.diagnoza
        }).then(function (response) {
            $location.path("pacientet/" + $scope.pacientiId + "/diagnozat");
        }, function (errResponse) {
            $scope.errorMessage = errResponse.data.message;
            console.log('Gabim gjate regjistrimit te diagnozes: ' + errResponse);
        });
    };

}]);