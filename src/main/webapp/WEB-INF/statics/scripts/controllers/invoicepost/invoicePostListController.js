/**
 * Created by xmy on 2016/8/29.
 */
define(['../module'], function (controllers) {
    'use strict';
    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('invoicePostListController', ['$scope', '$http','$filter', '$rootScope', '$timeout', 'strUtils','accountService','druglistService', function ($scope, $http,$filter, $rootScope, $timeout, strUtils,accountService,druglistService) {
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
                {name: 'id', displayName: '账单号',width: 150, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'providerName', displayName: '药店/供应商',minWidth: 100, headerCellClass: 'cell-center'},
                {name: 'startDate', displayName: '账单期间', width: 240, headerCellClass: 'cell-center', cellClass: 'cell-center', cellTemplate:'<div class="ui-grid-cell-contents"><span ng-bind="row.entity.startDate|date:\'yyyy-MM-dd\'"></span> 至 <span ng-bind="row.entity.endDate|date:\'yyyy-MM-dd\'"></span></div>'},
                {name: 'totalAmount', displayName: '账单金额',minWidth: 100, cellFilter: 'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'invoiceState', displayName: '发票状态', width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'}
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
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.detail = rowEntity;
                        $scope.detail.expressTime=$filter('date')($scope.detail.expressTime,'yyyy-MM-dd');
                    }
                });
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            var obj = this.queryPrarms;
            $scope.gridOptions.setQueryValues($scope.searchParams,{providerID:$("#proInforId").val()});      //查询条件搜索 类型转换方法
            if (obj.invoiceState == ''||obj.invoiceState == null) {
                obj.invoiceState = "-1";
            }
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            accountService.GetInvoiceExpress($scope.gridOptions.queryPrarms).success(function (data, status) {
                $scope.grid.data = data.data.datas;
                $scope.gridOptions.totalCount = data.data.totalCount;
                $timeout(function () {
                    $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                }, 100);
            });
        };

        $scope.searchParams = {};
        //供应商grid
        $scope.progrid = {
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {
                    name: 'select',
                    displayName: '选择',
                    width: 60,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    enableSorting: false,
                    cellTemplate: '<label style="height: 100%"><input type="radio" ng-checked="row.isSelected"  name="sele"/></label>'
                },
                {name: 'name', displayName: '名称', headerCellClass: 'cell-center'},
                {name: 'address', displayName: '地址', headerCellClass: 'cell-center'},
                {name: 'phone', displayName: '电话', headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.proPageSize*(grid.appScope.proPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.proGridOptions.sort('', '');
                    } else {
                        $scope.proGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                });
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.proDetail = rowEntity;
                    }
                });
            }
        };
        $scope.proGridOptions = $rootScope.getGridOptions();
        $scope.proGridOptions.setQueryPrarms = function(){
            $scope.proGridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.proGridOptions.getData = function(){
            $scope.proPageSize = $scope.proGridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.proPageIndex = $scope.proGridOptions.queryPrarms.pageIndex;   //用于序号显示
            druglistService.GetProviders($scope.proGridOptions.queryPrarms).success(function (data) {
                $scope.progrid.data = data.data.datas;
                $scope.proGridOptions.totalCount = data.data.totalCount;
            });
        };

        //保存选择的供应商
        $scope.getPro = function () {
            $scope.proInfor = $scope.proDetail;
            $("#proInforId").val($scope.proInfor.orgID);
        };

        $scope.GetExpressCompany = function () {
            accountService.GetExpressCompany().success(function (data, status) {
                if(data.code == 200){
                    $scope.ExpressCompanylist = data.data.datas;
                }else{
                    console.log("快递公司列表加载失败!");
                }
            });
        };
        $scope.GetExpressCompany();

        $scope.saveInvoice = function () {
            var obj = $scope.detail;
            if ($scope.detail.expressNumber == undefined || $scope.detail.expressNumber == null || $scope.detail.expressNumber.replace(/\s/g, '').length == 0) {
                bootbox.alert("请输入快递单号");
                return;
            }
            accountService.ModifyInvoiceExpress(obj).success(function (data) {
                bootbox.alert("保存成功");
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
            $scope.proGridOptions.search();
        }, 0, false);
    }]);
});