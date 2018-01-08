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
    controllers.controller('payManageListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','financeService',function ($scope, $http, $rootScope,$timeout,strUtils,financeService) {
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
                {name: 'serialNumber', displayName: '提现申请号',width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'realName', displayName: '会员',minWidth:100, headerCellClass: 'cell-center'},
                {name: 'gender', displayName: '性别',width:50,cellFilter:'gender', headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'mobilePhone', displayName: '手机号',width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'iDNumber', displayName: '身份证号',cellFilter:'certificate',width: 180, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'time', displayName: '申请时间', width: 140,cellFilter: 'date:"yyyy-MM-dd"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'bankName', displayName: '银行名称', width: 140, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'payBankCode', displayName: '银行代码', width: 140, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'receiverAccountNO', displayName: '银行卡号',width: 180, cellFilter: 'BankAccountFourGroup', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'balance', displayName: '支付金额',width: 100, cellFilter: 'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'remittanceAccountBillOperTime', displayName: '支付时间', width: 160,cellFilter: 'date:"yyyy-MM-dd HH:mm:ss"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'status', displayName: '支付状态',width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'payTryCount', displayName: '重试次数',width: 80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'returnCode', displayName: '支付返回码',width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'payFaildReason', displayName: '失败原因', minWidth: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 170, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="!(row.entity.status|IsShowRemittanceAccountBillStatus)&&grid.appScope.permission.cashwithdrawalDeal" ng-click="grid.appScope.ExtractOprate(0)">' +
                    '       <i class="icon-credit-card"></i> 打款成功' +
                    '   </a>' +
                    '   <a ng-if="!(row.entity.status|IsShowRemittanceAccountBillStatus)&&grid.appScope.permission.cashwithdrawalDeal" ng-click="grid.appScope.ExtractOprate(1)">' +
                    '       <i class="icon-credit-card"></i> 打款失败' +
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
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.claimItem = rowEntity;
                        $scope.RemittanceAccountBillStatus =rowEntity.status;
                        $scope.reason = "";
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
            financeService.GetP1AccountBillList($scope.gridOptions.queryPrarms).success(function (data) {
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

        $scope.ExtractOprate = function (type) {
            if (type == 1) {
                $scope.reason="";
                $scope.pay.reason.$setUntouched();
                $scope.pay.$setPristine();
                $('#reasonModal').modal('show');
            } else {
                $scope.payOprate(type);
            }
        };

        $scope.payOprate = function (type) {
            var obj = {
                id: $scope.claimItem.ID || "",
                reason: $scope.reason || "",
                type: type,
                bankName: $scope.claimItem.bankName || "",
                payBankCode: $scope.claimItem.payBankCode || ""
            };
            financeService.RemittanceAccountBill(obj).success(function (data) {
                if(data.code != 200) {
                    bootbox.alert(data.msg);
                } else{
                    bootbox.alert(data.msg);
                    $scope.gridOptions.search();
                }
            });
        };

        $scope.surePay = function (valid,type) {
            if(valid){
                $scope.payOprate(type);
            }
        };

        $scope.cancelPay = function () {
            $scope.reason="";
            $scope.pay.reason.$setUntouched();
            $scope.pay.$setPristine();
            $('#reasonModal').modal('hide');
        };

        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);

    }]);
});