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
    controllers.controller('financeAuditListController', ['$scope', '$http', '$rootScope', '$timeout', 'strUtils','druglistService','claimsService', function ($scope, $http, $rootScope, $timeout, strUtils,druglistService,claimsService) {
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
                {name: 'goodsName', displayName: '商品名',minWidth: 100, headerCellClass: 'cell-center'},
                {name: 'providerName', displayName: '供应商',minWidth: 100, headerCellClass: 'cell-center'},
                {name: 'realName', displayName: '会员',minWidth: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'createdTime', displayName: '申请日期',width: 140,cellFilter:'date:"yyyy-MM-dd"',  headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'claimAmount', displayName: '报销金额', minWidth: 100,cellFilter:'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'rebateUnitAmount', displayName: '结算金额',minWidth: 100,  cellFilter:'getFloatDigit',headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'providerAuditStatus', displayName: '供应商审核', minWidth: 100, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'providerAuditOperTime', displayName: '供应商审核日期',width: 140, cellFilter:'date:"yyyy-MM-dd"',  headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'lastAuditStatus', displayName: '报销审核',minWidth: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'lastauditoperTime', displayName: '报销审核日期',width: 140, cellFilter:'date:"yyyy-MM-dd"',  headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'financialAuditStatus', displayName: '财务审核', width: 150, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'financialAuditOperTime', displayName: '财务审核日期',  width: 140,cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 80, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="grid.appScope.permission.financialauditDeal" ng-click="grid.appScope.getId(row.entity)">' +
                    '       <i class="icon-check"></i> 同意' +
                    '   </a>'
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
            $scope.gridOptions.setQueryValues($scope.searchParams,{providerID:$("#proInforId").val()});      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            //判断供应商审核&财务审核的初始状态
            if ($scope.gridOptions.queryPrarms.auditStatus == ''||$scope.gridOptions.queryPrarms.auditStatus == undefined) {
                $scope.gridOptions.queryPrarms.auditStatus = "-1";
            }
            if ($scope.gridOptions.queryPrarms.providerStatus == ''||$scope.gridOptions.queryPrarms.providerStatus == undefined) {
                $scope.gridOptions.queryPrarms.providerStatus = "-1";
            }
            claimsService.GetExpenseReviewAudits($scope.gridOptions.queryPrarms).success(function (data) {
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
                    cellTemplate: '<label style="height: 100%"><input type="radio" ng-checked="row.isSelected" name="sele"/></label>'
                },
                {name: 'name', displayName: '名称', headerCellClass: 'cell-center'},
                {name: 'address', displayName: '地址', headerCellClass: 'cell-center'},
                {name: 'phone', displayName: '电话', headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.proPageSize*(grid.appScope.proPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.proGridOptions.sort('', '');
                    } else {
                        $scope.proGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
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

        $scope.AllPassas = function (auditType) {
            bootbox.confirm("确定全部通过？", function (result) {
                if (result) {
                    claimsService.FinancialAuditAllpass($scope.gridOptions.queryPrarms).success(function (data) {
                        if(data.code==200){
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };

        $scope.getId = function (row) {
            $('#viewModal').modal('show');
            $scope.SelectedObj = {
                claimRequestID: row.id,
                businessReason: $scope.businessReason == undefined ? "" : $scope.businessReason
            }
        };

        $scope.cancel = function () {
            $('#viewModal').modal('hide');
            $scope.businessReason='';
        };

        $scope.financialAudit = function (type) {
            $scope.cancel();
            claimsService.FinancialAuditpass($scope.SelectedObj).success(function (data) {
                bootbox.alert(data.msg);
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
            $scope.proGridOptions.search();
        }, 0, false);
    }])
})