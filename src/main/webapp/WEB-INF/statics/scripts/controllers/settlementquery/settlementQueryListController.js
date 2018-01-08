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
    controllers.controller('settlementQueryListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','accountService',function ($scope, $http, $rootScope,$timeout,strUtils,accountService) {
        //结算查询grid
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
                {name: 'bankName', displayName: '银行名称',minWidth: 160, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'payBankCode', displayName: '银行代码',minWidth: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'tradingType', displayName: '收付费类型',width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'businessType', displayName: '业务类型',width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'settlementWay', displayName: '结算方式', width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'balance', displayName: '收付费金额',  width: 100,cellFilter:'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'time', displayName: '业务申请日期', width: 140, cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'remittanceAccountBillOperTime', displayName: '结算日期', width: 140, cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'status', displayName: '支付状态', width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'realName', displayName: '收付款人', width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'}
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
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            accountService.SettlementList($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                }
            });
        };

        //导出日结单
        $scope.ExprotBill = function () {
            bootbox.confirm('确定导出日结单？',function (result) {
                if (result) {
                    $("#billExprot").click();
                }
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});