/**
 * Created by zd on 16/5/20.
 */
define(['./module'], function (directives) {
    'use strict';

    //供应商管理- 供应商类型多选框操作


    directives.directive("cisCheckselect", function () {
        return {
            restrict: 'A',
            link: function (scope) {

                var supplierType = scope.supplierType;
                var arr = [];
                //返回保存状态

                scope.checkSelectHandle = {
                    allSupplierType:[//由于scope.supplierType值会变化
                            { state: 0, name: "全部" },
                            { state: 1, name: "生产企业" },
                            { state: 2, name: "流通企业" },
                            { state: 3, name: "终端企业" },
                            { state: 4, name: "电商" },
                            { state: 5, name: "未设定" }
                    ],
                    init:function(){
                        if(window.localStorage.supplierType){
                            var stateArray=window.localStorage.supplierType.split(',');
                            for(var i=0;i<stateArray.length;++i){
                                scope.checkSelectHandle .addOptions(scope.checkSelectHandle.allSupplierType[stateArray[i]]);
                            }
                        }
                    },
                    //添加项
                    addOptions: function (type) {
                        //删除选择项
                        angular.forEach(supplierType.initType, function (data, index) {
                            if (data.state == type.state) {
                                supplierType.initType.splice(index, 1);
                            }
                        });

                        //添加选择项
                        if (type.state == 0) {
                            var len = supplierType.haveOptions.length;
                            arr = supplierType.haveOptions.splice(0, len);
                            //选项回收排序
                            scope.checkSelectHandle.recoveryOptions(arr);
                        } else {
                            if (supplierType.initType.length > 0) {
                                angular.forEach(supplierType.haveOptions, function (data, index) {
                                    if (data.state == 0) {
                                        arr = supplierType.haveOptions.splice(index, 1);
                                        scope.checkSelectHandle.recoveryOptions(arr);
                                    }
                                })
                            }
                        }
                        supplierType.haveOptions.push(type);
                    },
                    //移除项
                    deletOptions: function (haveType) {
                        angular.forEach(supplierType.haveOptions, function (data, index) {
                            if (data.state == haveType.state) {
                                arr = supplierType.haveOptions.splice(index, 1);
                                scope.checkSelectHandle.recoveryOptions(arr);
                            }

                        })
                    },
                    //移除项回收排序
                    recoveryOptions: function (arr) {
                        var orderArr = supplierType.initType.concat(arr);
                        var sortFn = function (a, b) {
                            if (a.state > b.state) {
                                return 1;
                            } else {
                                return -1
                            }
                        }
                        scope.supplierType.initType = orderArr.sort(sortFn);
                    }
                };
                scope.checkSelectHandle.init();
                scope.$watch('supplierType.haveOptions', function (a, b) {
                    supplierType.selectType = [];
                    angular.forEach(a, function (data, index) {
                        supplierType.selectType.push(data.state);
                    })
                }, true)
            }
        }
    })
});