angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
        $stateProvider
            .state('app.icons', {
                url: "/icons",
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: 'Icons'
                }
            })
            .state('app.icons.flags', {
                url: '/flags',
                templateUrl: 'views/icons/flags.html',
                ncyBreadcrumb: {
                    label: 'Flags'
                }
            })
            .state('app.icons.fontawesome', {
                url: '/font-awesome',
                templateUrl: 'views/icons/font-awesome.html',
                ncyBreadcrumb: {
                    label: 'Font Awesome'
                }
            })
            .state('app.icons.simplelineicons', {
                url: '/simple-line-icons',
                templateUrl: 'views/icons/simple-line-icons.html',
                ncyBreadcrumb: {
                    label: 'Simple Line Icons'
                }
            })
            .state('app.components', {
                url: "/components",
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: 'Components'
                }
            })
                // Login and Auth
            .state('app.auth', {
                url : "/auth",
                abstract: true,
                template: '<ui-view></ui-view>'
            })
            .state('app.auth.login', {
                url: '/login',
                templateUrl: 'views/auth/login.html',
                controller: 'loginController'
            })
            //Pacientet Pages
            .state('app.pacientet', {
                url: "/pacientet",
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: 'Pacientët'
                }
            })
            .state('app.pacientet.shto', {
                url: '/shtoPacientin',
                templateUrl: 'views/pacientet/shto.html',
                controller: 'regjistroPacientinController',
                ncyBreadcrumb: {
                    label: 'Shto Pacientin'
                }
            })
            .state('app.pacientet.listo', {
                url: '/listoPacientet',
                templateUrl: 'views/pacientet/listo.html',
                controller: 'listoPacientetController',
                ncyBreadcrumb: {
                    label: 'Listo Pacientët'
                }
            })
            .state('app.pacientet.perditeso', {
                url: '/perditesoPacientin/:pacientiId',
                templateUrl: 'views/pacientet/perditeso.html',
                controller: 'perditesoPacientinController',
                ncyBreadcrumb: {
                    label: 'Perditeso Pacientin'
                }
            })
            .state('app.pacientet.shiko', {
                url: '/shikoPacientin/:pacientiId',
                templateUrl: 'views/pacientet/shiko.html',
                controller: 'shikoPacientinController',
                ncyBreadcrumb: {
                    label: 'Shiko Pacientin'
                }
            })
            .state('app.pacientet.shikoTerminet', {
                url: '/:pacientiId/terminetPacientit',
                templateUrl: 'views/pacientet/terminet.html',
                controller: 'KitchenSinkCtrl as vm'
            })
            .state('app.pacientet.shikoDiagnozat', {
                url: '/:pacientiId/diagnozat',
                templateUrl: 'views/pacientet/diagnozat/shiko.html',
                controller: 'ShikoDiagnozatPacientitController',
                ncyBreadcrumb: {
                    label: 'Diagnozat'
                }
            })
            .state('app.pacientet.shtoDiagnozen', {
                url: '/:pacientiId/diagnozat/shto',
                templateUrl: 'views/pacientet/diagnozat/shto.html',
                controller: 'ShtoDiagnozenPacientitController',
                ncyBreadcrumb: {
                    label: 'Shto Diagnozën'
                }
            })
            // Terminet Pages
            .state('app.terminet', {
                url: "/terminet",
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: 'Terminet'
                }
            })
            .state('app.terminet.shiko', {
                url: '/shikoTerminet',
                templateUrl: 'views/terminet/shiko.html',
                controller: 'shikoTerminetController',
                ncyBreadcrumb: {
                    label: 'Shiko Terminet'
                }
            })
            .state('app.terminet.shto', {
                url: '/shtoTerminin',
                templateUrl: 'views/terminet/shto.html',
                controller: 'shtoTermininController',
                ncyBreadcrumb: {
                    label: 'Shto Terminin'
                }
            })
             //Sherbimet Pages
             .state('app.sherbimet', {
                url: "/sherbimet",
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: 'Sherbimet'
                }
            })
            .state('app.sherbimet.shto', {
                url: '/shtoSherbimin',
                templateUrl: 'views/sherbimet/shto.html',
                controller: 'regjistroSherbiminController',
                ncyBreadcrumb: {
                    label: 'Shto Sherbimin'
                }
            })
            .state('app.sherbimet.listo', {
                url: '/listoSherbimet',
                templateUrl: 'views/sherbimet/listo.html',
                controller: 'listoSherbiminController',
                ncyBreadcrumb: {
                    label: 'Listo Sherbimet'
                }
            })
            .state('app.sherbimet.perditeso', {
                url: '/perditesoSherbimin/:sherbimiId',
                templateUrl: 'views/sherbimet/perditeso.html',
                controller: 'perditesoSherbiminController',
                ncyBreadcrumb: {
                    label: 'Perditeso Sherbimin'
                }
            })
            .state('app.sherbimet.shiko', {
                url: '/shikoSherbimin/:sherbimiId',
                templateUrl: 'views/sherbimet/shiko.html',
                controller: 'shikoSherbiminController',
                ncyBreadcrumb: {
                    label: 'Shiko Sherbimin'
                }
             })
            .state('app.components.buttons', {
                url: '/buttons',
                templateUrl: 'views/components/buttons.html',
                ncyBreadcrumb: {
                    label: 'Buttons'
                }
            })
            .state('app.components.social-buttons', {
                url: '/social-buttons',
                templateUrl: 'views/components/social-buttons.html',
                ncyBreadcrumb: {
                    label: 'Social Buttons'
                }
            })
            .state('app.components.cards', {
                url: '/cards',
                templateUrl: 'views/components/cards.html',
                ncyBreadcrumb: {
                    label: 'Cards'
                }
            })
            .state('app.components.forms', {
                url: '/forms',
                templateUrl: 'views/components/forms.html',
                ncyBreadcrumb: {
                    label: 'Forms'
                }
            })
            .state('app.components.switches', {
                url: '/switches',
                templateUrl: 'views/components/switches.html',
                ncyBreadcrumb: {
                    label: 'Switches'
                }
            })
            .state('app.components.tables', {
                url: '/tables',
                templateUrl: 'views/components/tables.html',
                ncyBreadcrumb: {
                    label: 'Tables'
                }
            })
            .state('app.widgets', {
                url: '/widgets',
                templateUrl: 'views/widgets.html',
                ncyBreadcrumb: {
                    label: 'Widgets'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/widgets.js']
                        });
                    }]
                }
            })
            .state('app.charts', {
                url: '/charts',
                templateUrl: 'views/charts.html',
                ncyBreadcrumb: {
                    label: 'Charts'
                },
                resolve: {
                    // Plugins loaded before
                    // loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
                    //     return $ocLazyLoad.load([
                    //         {
                    //             serial: true,
                    //             files: ['js/libs/Chart.min.js', 'js/libs/angular-chart.min.js']
                    //         }
                    //     ]);
                    // }],
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/charts.js']
                        });
                    }]
                }
            })
    }]);
