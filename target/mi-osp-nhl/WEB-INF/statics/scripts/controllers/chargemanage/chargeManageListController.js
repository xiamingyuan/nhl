/**
 * Created by xmy on 2016/8/30.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('chargeManageListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','financeService',function ($scope, $http, $rootScope,$timeout,strUtils,financeService) {
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
                {name: 'claimSubmitId', displayName: '受理号',width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'realName', displayName: '会员',width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'mobilePhone', displayName: '会员电话',width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'p1GoodsDrugName', displayName: '药品通用名',minWidth: 120, headerCellClass: 'cell-center'},
                {name: 'manufactEnterprise', displayName: '生产厂家',minWidth: 120, headerCellClass: 'cell-center'},
                {name: 'specification', displayName: '规格', width: 120, headerCellClass: 'cell-center'},
                {name: 'claimAmount', displayName: '报销金额',width: 100, cellFilter: 'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'deductionStatus', displayName: '扣款状态',width: 100,cellFilter: 'GetDibitState:row.entity.deductionReason', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 80, enableSorting: false, enableColumnResizing: false,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    cellTemplate: "<div class='ui-grid-cell-contents  grid-oper-column'>" +
                    "<a ng-if='row.entity.deductionStatus!=\"1\"&&grid.appScope.permission.deductionsmngDeal' ng-click='grid.appScope.getItemId(row.entity.claimSubmitId)' > " +
                    "   <i class='icon-credit-card'></i> 扣款" +
                    "</a>" +
                    "</div>"
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
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            financeService.GetDebitClaimRequest($scope.gridOptions.queryPrarms).success(function (data) {
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

        //扣款原因grid
        $scope.reasonGrid = {
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'reason', displayName: '扣款原因', headerCellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if(rowIsSelected){
                        $scope.DeductionsMsg.selection = rowEntity.reason;
                    }
                });
            }
        };
        $scope.DeductionsMsg = {};//定义选择扣款的reason
        //弹窗隐藏后清空值
        $('#myModal').on('hidden.bs.modal', function (e) {
            $scope.DeductionsMsg.selection = '';
        });
        $scope.getItemId = function (id) {
            $('#myModal').modal('show');
            $scope.itemID = id;
            financeService.GetDeductionReason({}).success(function (data, status) {
                $scope.reasonGrid.data = data.data;
            });
        };

        //弹窗确定按钮扣款操作
        bootbox.setLocale("zh_CN");
        $scope.ChangePwd = function () {
            if ($scope.DeductionsMsg.selection == '' || $scope.DeductionsMsg.selection == null || $scope.DeductionsMsg.selection == undefined) {
                bootbox.alert('请选择扣款原因！');
                return false;
            }
            if ($scope.itemID == undefined || $scope.itemID == null) {
                return false;
            }
            bootbox.confirm("是否确认扣款？", function (result) {
                if (result) {
                    financeService.ClaimDeduction({ submitId: $scope.itemID, reason: $scope.DeductionsMsg.selection }).success(function (data, status) {
                        if(data.code == 200){
                            bootbox.alert(data.msg);
                            $scope.gridOptions.search();
                        }else
                            bootbox.alert(data.msg);
                    });
                }
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);

    }]);
});