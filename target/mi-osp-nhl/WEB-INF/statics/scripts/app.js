/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-route',
    'angular-ui-bootstrap',
    'angular-ui-grid',
    'angular-ui-layout',
    'bootbox',
    //'./imgHandler/index',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (angular) {
    'use strict';
    return angular.module('app', [
        'app.controllers',
        'app.directives',
        'app.filters',
        'app.services',
        'ngCookies',
        'ngRoute',
        'ui.bootstrap',
        'ui.grid',
        'ui.layout',
        'ui.grid.resizeColumns',
        'ui.grid.selection',
        'ui.grid.autoResize',
        'ui.grid.pagination'
        //'ui.layout'
    ]);
});
