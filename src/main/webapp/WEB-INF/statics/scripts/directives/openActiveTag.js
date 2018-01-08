/**
 * Created by localadmin on 16/11/25.
 */
define(['./module'], function (directives) {
    'use strict';

    directives.directive('openActiveTag', ['$location', function($location) {
        return {
            restrict: 'A',
            scope: {
                offset:'@'
            },
            link: function (scope, element, attr) {
                function setActiveTag(){
                    var currentTag = $location.$$path!="" && $location.$$path!="/"?$location.$$path.split('\/')[1]:""; //首次登陆$location.$$path为空,再刷新值为'/'
                    $(".page-sidebar-menu >li").removeClass("open").children("ul").css("display","none").children("li").removeClass("active");
                    if(currentTag){
                        $(element).children("li").each(function (){
                            var liObj = this;
                            $("ul li a",$(this)).each(function (){
                                if($(this).prop("href").indexOf("#"+currentTag)!=-1){
                                    var parent = $(this).parent();
                                    parent.addClass("active");$(liObj).removeClass("active").addClass("open").children("ul").css("display","block");
                                    return;
                                }
                            });
                        });
                    }
                }
                setActiveTag();
            }
        };
    }]);
});