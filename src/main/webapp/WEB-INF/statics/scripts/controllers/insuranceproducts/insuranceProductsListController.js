/**
 * Created by xmy on 26/8/18.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('insuranceProductsListController', ['$scope', '$http', '$rootScope', '$timeout','insuranceproductService', 'strUtils', function ($scope, $http, $rootScope, $timeout,insuranceproductService, strUtils) {
        //获取保险公司列表
        $scope.getinsurancecompany=function(){
            insuranceproductService.GetInsuranceCompany().success(function(data){
                $scope.InsuranceCompanylist = data.data;
            });
        };
        $scope.getinsurancecompany();

        $scope.grid = {
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'corp', displayName: '保险公司',minWidth:200, headerCellClass: 'cell-center'},
                {name: 'name', displayName: '保险产品名称',minWidth:200, headerCellClass: 'cell-center'},
                {name: 'startDate', displayName: '产品有效期间', width: 200, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate:'<div class="ui-grid-cell-contents"><span ng-bind="row.entity.startDate|date:\'yyyy-MM-dd\'"></span> 至 <span ng-bind="row.entity.endDate|date:\'yyyy-MM-dd\'"></span></div>'},
                {name: 'code', displayName: '保险产品编码',width:140, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'orderNum', displayName: '排序号', width:100,headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'isAloneInsurance', displayName: '是否主险', width: 60, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'isEnable', displayName: '产品状态', width: 80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 170, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="row.entity.isEnable==\'停用\'&&grid.appScope.permission.insuranceEnable" ng-click="grid.appScope.begin(row.entity.id,row.entity.isEnable)">' +
                    '       <i class="icon-unlock"></i> 启用' +
                    '   </a>' +
                    '   <a ng-if="row.entity.isEnable==\'启用\'&&grid.appScope.permission.insuranceEnable" ng-click="grid.appScope.stop(row.entity.id,row.entity.isEnable)">' +
                    '       <i class="icon-lock"></i> 禁用' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.insuranceEdit" href="#insuranceproducts/edit/:{{row.entity.id}}" class="operate-a">' +
                    '      <i class="icon-edit"></i> 编辑' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.insuranceDelete" ng-click="grid.appScope.delete(row.entity.id)">'+
                    '      <i class="icon-trash-o"></i> 删除' +
                    '   </a>' +
                    '</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridOptions.sort('', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction,sortColumns[0].sort.displayName);
                        $rootScope.direction.getDirection(sortColumns[0].sort.direction);
                    }
                });
            }
        };

        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            //判断产品状态&是否主险的初始状态
            if ($scope.gridOptions.queryPrarms.isEnable == ''||$scope.gridOptions.queryPrarms.isEnable == undefined) {
                $scope.gridOptions.queryPrarms.isEnable = "-1";
            }
            if ($scope.gridOptions.queryPrarms.isAloneInsurance == ''||$scope.gridOptions.queryPrarms.isAloneInsurance == undefined) {
                $scope.gridOptions.queryPrarms.isAloneInsurance = "-1";
            }
            insuranceproductService.query($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.permission = data.permission;
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        bootbox.setLocale("zh_CN");
        //启用产品
        $scope.begin = function (id, isEnable) {
            bootbox.confirm("确定启用该产品？", function (result) {
                if (result) {
                    isEnable = '启用';
                    insuranceproductService.start({id: id}).success(function (data) {
                        if(data.code != 200) {
                            bootbox.alert(data.msg);
                        } else{
                            bootbox.alert(data.msg);
                            $scope.gridOptions.search();
                        }
                    });
                }
            });
        };
        //停用产品
        $scope.stop = function (id, isEnable) {
            bootbox.confirm("确定停用该产品？", function (result) {
                if (result) {
                    isEnable = '停用';
                    insuranceproductService.stop({id: id}).success(function (data) {
                        if(data.code != 200) {
                            bootbox.alert(data.msg);
                        } else{
                            bootbox.alert(data.msg);
                            $scope.gridOptions.search();
                        }
                    });
                }
            });
        };
        //删除产品
        $scope.delete = function (id) {
            bootbox.confirm("确定删除该产品？", function (result) {
                if (result) {
                    insuranceproductService.delete({id: id}).success(function (data) {
                        if(data.code != 200) {
                            bootbox.alert(data.msg);
                        } else{
                            bootbox.alert(data.msg);
                            $scope.gridOptions.search();
                        }
                    });
                }
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }])
});