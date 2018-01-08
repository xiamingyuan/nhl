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
    controllers.controller('subtractBillListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','accountService',function ($scope, $http, $rootScope,$timeout,strUtils,accountService) {
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
                {name: 'serialNumber', displayName: '账单编号',width: 140, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'itemName', displayName: '合作机构',minWidth: 140, headerCellClass: 'cell-center'},
                {name: 'bankName', displayName: '开户行(分理处或支付级别)',minWidth: 160, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'receiverAccountNO', displayName: '机构账号',minWidth: 140, cellFilter: 'BankAccountFourGroup', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'balance', displayName: '支付金额', minWidth: 100,cellFilter: 'getFloatDigit', headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'time', displayName: '生成日期',width: 140, cellFilter:'date:"yyyy-MM-dd"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'partnerAccountBillOperTime', displayName: '支付时间',minWidth: 140,cellFilter:'date:"yyyy-MM-dd"',  headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'status', displayName: '支付状态', width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'payTryCount', displayName: '重试次数', width: 80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'returnCode', displayName: '支付返回码', width: 150, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'payFaildReason', displayName: '失败原因',minWidth: 140,  cellFilter: 'GetAuditReason:row.entity.PartnerAccountBillReason', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width:180,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                        '<a ng-click="grid.appScope.PayPartner($event,row.entity)" ng-if="!(row.entity.status | IsShowRemittanceAccountBillStatus)&&grid.appScope.permission.knockbillmngDeal">' +
                        '   <i class="icon-dollar"></i> 支付成功' +
                        '</a>' +
                        '<a href="#reasonModal" data-toggle="modal" ng-if="!(row.entity.status | IsShowRemittanceAccountBillStatus)&&grid.appScope.permission.knockbillmngDeal">' +
                        '   <i class="icon-dollar"></i> 支付失败' +
                        '</a>' +
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
                        $scope.GetClaimSubmit(rowEntity.iD);
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
            accountService.GetPartnerBillList($scope.gridOptions.queryPrarms).success(function (data) {
                $scope.ClaimSubmit = "";
                if(data.code==200){
                    $scope.permission = data.permission;
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $timeout(function () {
                        $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                    }, 100);
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        $scope.GetClaimSubmit = function (id) {
            $scope.reason = "";
            $scope.partnerAccountBillStatus = $scope.claimItem.status;
            accountService.GetAllClaimSubmitInfoByAccountBillID({ accountBillID: id }).success(function (data, status) {
                $scope.ClaimSubmit = data.data;
            });
        };

        //支付
        $scope.ExtractOprateParam = {};
        $scope.PayPartner = function (e, item) {
            $scope.ExtractOprateParam = {
                id: item.iD || "",
                reason: "",
                type: 0
            };
            $scope.PayPartnerOprate();
        };

        $scope.cancelPay = function () {
            $scope.payReason="";
            $scope.pay.payReason.$setUntouched();
            $scope.pay.$setPristine();
            $('#reasonModal').modal('hide');
        };

        $scope.ExtractOprate = function (valid,type) {
            if(valid){
                $scope.ExtractOprateParam = {
                    id: $scope.claimItem.iD || "",
                    reason: $scope.Reason || "",
                    type: type
                };
                $scope.PayPartnerOprate();
            }
        };

        $scope.PayPartnerOprate = function () {
            accountService.PartnerAccountBill($scope.ExtractOprateParam).success(function (data, status) {
                if($scope.ExtractOprateParam.type=="1"){
                    $scope.cancelPay();
                }
                if(data.code==200){
                    bootbox.alert(data.msg);
                    $scope.gridOptions.search();
                }else{
                    bootbox.alert(data.msg);
                }
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);

    }]);
});