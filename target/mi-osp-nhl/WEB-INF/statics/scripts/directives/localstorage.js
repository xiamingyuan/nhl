/**
 * Created by localadmin on 2016/6/27.
 */
define(['./module'], function (directives) {
    'use strict';

    directives.directive('localstorage', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope,$scope) {
                var storage = window.localStorage;
                function setStorage(){
                    var objArrayLength = $('.search-table input[name],.search-table select[name]').length;
                    for(var i= 0;i<objArrayLength;i++){
                        var obj = $('.search-table input[name],.search-table select[name]').eq(i);
                        var name = obj.attr("name");
                        if(name && obj.val()) {
                            storage[name] = obj.val();
                        }else{
                            if(storage[name]){
                                storage.removeItem(name);
                            }
                        }
                    }
                    setSupplierStorage();
                    storage.page=1;
                }
                function getStorage(){
                    scope.searchParams={};//查询条件对象
                    var objArrayLength = $('.search-table input[name],.search-table select[name]').length;
                    for(var i= 0;i<objArrayLength;i++){
                        var obj = $('.search-table input[name],.search-table select[name]').eq(i);
                        if(obj.attr("name") && storage[obj.attr("name")]){
                            scope.searchParams[obj.attr("name")]=$.trim(storage[obj.attr("name")]);
                        }
                    }
                }
                //供应商参数保存
                function setSupplierStorage(){
                    if(scope.supplierType){
                        var supplierTypeArray=[];
                        for(var i=0;i<scope.supplierType.haveOptions.length;++i){
                            supplierTypeArray.push(scope.supplierType.haveOptions[i].state);
                        }
                        storage["supplierType"]=supplierTypeArray.join();
                    }
                }
                function removeStorage(){
                    storage.clear();
                }
                if(storage.bol == 'true'){
                    getStorage();
                }else{
                    removeStorage();
                    setStorage();
                }

                $(".enter-default").on('click',function(){
                    // removeStorage();
                    setStorage();
                });
            }
        };
    }]);
});