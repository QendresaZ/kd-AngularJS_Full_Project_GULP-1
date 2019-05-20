angular.module('app')
    .constant('PacientetAPIPacientiServiceURL', 'http://localhost:5555/pacienti-service/v1/pacientet')
.controller('shikoTerminetController', function ($scope, moment, calendarConfig) {
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

    $scope.events = [
        {
            title: 'An all day event',
            color: calendarConfig.colorTypes.warning,
            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            allDay: true
        }, {
            title: 'A non all day event',
            color: calendarConfig.colorTypes.important,
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            draggable: true,
            resizable: true
        }
    ];

    $scope.calendarView = 'day';
    $scope.viewDate = moment().toDate();
});