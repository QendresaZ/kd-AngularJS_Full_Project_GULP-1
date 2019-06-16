angular.module('app')
    .constant('TerminetAPITerminiServiceURL', 'http://localhost:5555/termini-service/v1/terminet')
    .constant('PacientetAPIPacientiServiceURL', 'http://localhost:5555/pacienti-service/v1/pacientet')
.controller('shikoTerminetController', function ($scope, moment, calendarConfig, $http, TerminetAPITerminiServiceURL) {
    // $scope.calendarView = 'month';
    // $scope.viewDate = new Date();
    // $scope.events = [
    //     {
    //         title: 'My event title', // The title of the event
    //         startsAt: new Date(2019,5,19,1), // A javascript date object for when the event starts
    //         endsAt: new Date(2019,5,19,15), // Optional - a javascript date object for when the event ends
    //         color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
    //             primary: '#e3bc08', // the primary event color (should be darker than secondary)
    //             secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
    //         },
    //         actions: [{ // an array of actions that will be displayed next to the event title
    //             label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
    //             cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
    //             onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
    //                 console.log('Edit event', args.calendarEvent);
    //             }
    //         }],
    //         draggable: true, //Allow an event to be dragged and dropped
    //         resizable: true, //Allow an event to be resizable
    //         incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
    //         recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
    //         cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
    //         allDay: false // set to true to display the event as an all day event on the day view
    //     }
    // ];

    //

    $http({
        method: 'GET',
        url: TerminetAPITerminiServiceURL
    }).then(function (response) {
        $scope.terminetData = response.data;
        console.log("JSON Parse");
        console.log($scope.terminetData);

        $scope.terminetData.forEach(function (item) {
            var kohaFillimitSplit = item['kohaFillimit'].split(":");

            var kohaMbarimitSplit = item['kohaMbarimit'].split(":");

            var event = {
                title: item['shenime'],
                color: calendarConfig.colorTypes.warning,
                startsAt: moment().startOf('day').add(kohaFillimitSplit[0], 'hours').add(kohaFillimitSplit[1], 'minutes').toDate(),
                endsAt: moment().startOf('day').add(kohaMbarimitSplit[0], 'hours').add(kohaMbarimitSplit[1], 'minutes').toDate(),
                draggable: true,
                resizable: true
            };
            $scope.events.push(event);
        })
        // console.log(JSON.parse($scope.terminetData));
    });



    $scope.events = [
        {
            title: 'An all day event',
            color: calendarConfig.colorTypes.warning,
            // "21:53:11"
            startsAt: moment("123", "hmmss").toDate(),
            endsAt: moment("1234", "hmmss").toDate(),
            // startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            // endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            allDay: true
        }, {
            title: 'A non all day event',
            color: calendarConfig.colorTypes.important,
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(8, 'hours').toDate(),
            draggable: true,
            resizable: true
        }
    ];

    $scope.calendarView = 'day';
    $scope.viewDate = moment().toDate();
})
.controller('shtoTermininController', function ($scope, $http, $location, PacientetAPIPacientiServiceURL, TerminetAPITerminiServiceURL) {

    var self = this;

    $scope.shtoTermininCtrl = self;


    $scope.submitTerminiForm = function () {
        // process patient id
        var pacientiId = $scope.selected.value.id;
        $scope.termini.pacientiId = pacientiId;
        console.log("Termini JSON: " + JSON.stringify($scope.termini));
        $http({
            method: 'POST',
            url: TerminetAPITerminiServiceURL,
            data: $scope.termini,
        }).then(function (response) {
            $location.path("terminet/shtoTerminin");
            console.log('Termini u regjistrua')
            $scope.successMessage = 'Termini u regjistru me sukses';
        }, function (errResponse) {
            $scope.errorMessage = errResponse.data.message;
            console.log("errorMessage: " + $scope.errorMessage);
            console.log('Gabim gjate regjistrimit: ' + errResponse);
        });
    };

    $scope.resetForm = function () {
        $scope.termini = null;
    };

    $scope.itemArray = [
        {id: -1, name: 'not-selected'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
        {id: 4, name: 'fourth'},
        {id: 5, name: 'fifth'}
    ];

    // Listener for selected patient

    $scope.$watch('selected.value', function (pacienti) {
        console.log(pacienti.id);
        $scope.pacientId = pacienti.id;
    });

    $scope.selected = { value: $scope.itemArray[0] };

    $scope.kthePacientetMeStatus = function (statusi) {
        console.log("kthePacientetMeStatus ", statusi);
        $http({
            method: 'GET',
            url : PacientetAPIPacientiServiceURL + '/statusi?aktiv=' + statusi
        }).then(function (response) {
            $scope.listaPacienteve = response.data;
            console.log('GOT');
            var temp = [];
            temp = angular.fromJson($scope.listaPacienteve);

            $scope.listaPacienteveArray = temp;

            console.log($scope.listaPacienteveArray);
        });
    }



    $scope.kthePacientetMeStatus(true);

})
.controller('KitchenSinkCtrl', function ($scope, moment, calendarConfig, $http, PacientetAPIPacientiServiceURL) {
    var vm = this;

    moment.locale('sq');
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'year';
    vm.viewDate = new Date();
    var actions = [{
        label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
        onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
        }
    }, {
        label: '<i class=\'glyphicon glyphicon-remove\'></i>',
        onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
        }
    }];


        $http({
            method: 'GET',
            url: PacientetAPIPacientiServiceURL + '/' + 86 + '/terminet'
        }).then(function (response) {
            $scope.terminet = response.data;
            console.log(response.data);
            // $location.path("pacientet/listoPacientet");
            console.log('TerminetFetched!!!')
            $scope.terminet.forEach(addEventsFromResponse)

            function addEventsFromResponse(value, index, array) {
                console.log(value);
                var dataTerminit = value.dataTerminit;
                var kohaStart = moment(value.dataTerminit + " " + value.kohaFillimit).toDate();
                var kohaMbarim = moment(value.dataTerminit + " " + value.kohaMbarimit).toDate();
                var event = {
                  title: 'Termin - Pacienti: ' + value.pacientId,
                  startsAt:   kohaStart,
                    endsAt: kohaMbarim,
                    draggable: true,
                    resizable: true,
                };
                vm.events.push(event);
            }
        }, function (errResponse) {
            console.log('Gabim gjate kerkeses: ' + errResponse);
        });


    vm.events = [
        {
            title: 'An event',
            color: calendarConfig.colorTypes.warning,
            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        },{
            title: 'An event',
            color: calendarConfig.colorTypes.warning,
            startsAt: moment().startOf('week').subtract(8, 'days').add(8, 'hours').toDate(),
            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
            color: calendarConfig.colorTypes.info,
            startsAt: moment().subtract(1, 'day').toDate(),
            endsAt: moment().add(5, 'days').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: 'This is a really long event title that occurs on every year',
            color: calendarConfig.colorTypes.important,
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            recursOn: 'year',
            draggable: true,
            resizable: true,
            actions: actions
        }
    ];



    vm.cellIsOpen = true;

    vm.addEvent = function() {
        vm.events.push({
            title: 'New event',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            color: calendarConfig.colorTypes.important,
            draggable: true,
            resizable: true
        });
    };

    vm.eventClicked = function(event) {
        alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
        alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
        alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
        alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

        if (vm.calendarView === 'month') {
            if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        } else if (vm.calendarView === 'year') {
            if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        }

    };
});