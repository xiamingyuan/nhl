/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({
    paths: {
        //'jquery':'jquery/dist/jquery.min',
        //'boost': 'bootstrap/dist/js/bootstrap.min',
        //'bootstrap-datetimepicker': 'bootstrap/bootstrap-datepicker/bootstrap-datetimepicker.min',
        //'bootstrap-datetimepicker-zh-CN': 'bootstrap/bootstrap-datepicker/bootstrap-datetimepicker.zh-CN',
        'angular': 'angular/angular.min',
        'angular-route': 'angular-route/angular-route.min',
        'angular-cookies': 'angular/angular-cookies',
        'angular-ui-bootstrap': 'angular-ui-bootstrap/ui-bootstrap-tpls-0.12.0.min',
        'angular-ui-grid': 'angular-ui-grid/3.1.1/ui-grid',
        'angular-ui-layout':'angular-ui-layout/ui-layout',
        'bootbox':'angular-ui-bootbox/bootbox',
        'appForPhone':'shared/appForPhone',
        'domReady': 'requirejs-domready/domReady'
    },
    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {//定义js之间的依赖关系
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-cookies':{
            deps:['angular']
        },
        'angular-ui-bootstrap': {
            deps: ['angular']
        },
        'angular-ui-grid': {
            deps: ['angular']
        },
        'angular-ui-layout': {
            deps: ['angular']
        }
    },
    deps: [
        // kick start application... see bootstrap.js
        './osp'//告诉require要加载osp.js该文件
    ]
});
