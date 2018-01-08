/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
//定义一个require的模块
define([
    'require',
    'angular',
    'angular-cookies',
    'angular-ui-bootstrap',
    'appForPhone',
    //'ui-bootstrap',
    'app',
    'routes'//以上为该文件依赖的文件，如果该名为定义的名字那么就去加载响应的文件，否则就直接加载其文件
], function (require, ng) {//angular的依赖注入，一般要是方法里面出传入两个参数，那么只能是方法的传递，如果需要传递一个对象的话那么就可用依赖注入方式
    'use strict';

    /*
     * place operations that need to initialize prior to app start here
     * using the `run` function on the top-level module
     */
    //require框架将ng的对象注入到所应用的文件下，表示当dom加载完了后去执行函数方法
    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);//bootstrap是angular的启动方法，去执行app的方法
    });
});
