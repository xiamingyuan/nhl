/** attach controllers to this module 
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules 
 * which avails each controller of, for example, the `config` constants object.
 **/
define([
    //'./my-ctrl-1',
    './bodyCtrlController',          //最外层body控制器
    './homePageController', //默认页控制器
    './errorController'     //错误页控制器
], function () { });
