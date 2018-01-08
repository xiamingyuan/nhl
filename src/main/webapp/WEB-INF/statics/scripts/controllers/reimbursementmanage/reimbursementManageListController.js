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
    controllers.controller('reimbursementManageListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','claimsService',function ($scope, $http, $rootScope,$timeout,strUtils,claimsService) {
        //报销管理grid
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
                {name: 'id', displayName: '受理号',width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'userName', displayName: '会员',minWidth:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'mobilePhone', displayName: '会员电话',width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'regulateCode', displayName: '监管码',minWidth: 180, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'goodsName',  displayName: '商品名称', minWidth: 140, headerCellClass: 'cell-center'},
                {name: 'claimAmount', displayName: '报销金额', cellFilter:'getFloatDigit', width: 100,  headerCellClass: 'cell-center', cellClass: 'cell-right'},
                {name: 'submitStatus', displayName: '报销进度', cellFilter:'ReimManageStatus:row.entity.acceptStatus:row.entity.auditStep:row.entity.status:row.entity.businessConfirmStatus:row.entity.providerConfirmStatus:row.entity.financeConfirmStatus', width: 150, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'idNumber',  displayName: '身份证号', cellFilter:'certificate',width: 180, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'createdTime', displayName: '申请日期', cellFilter:'date:"yyyy-MM-dd HH:mm"', width: 140, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width:160,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '<a ng-if="row.entity.acceptStatus=='+0+'&&grid.appScope.permission.reimbursementDeal" ng-click="grid.appScope.Promptly($event,row.entity)">' +
                    '       <i class="icon-calculator"></i> 立即报销' +
                    '</a>' +
                    '<a ng-if="row.entity.auditStep | ShowRefuseBtn:row.entity.financeConfirmStatus&&grid.appScope.permission.reimbursementDeal" ng-click="grid.appScope.getId(row.entity)">' +
                    '       <i class="icon-calculator"></i> 拒绝报销' +
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
                    if(rowIsSelected){
                        var item = rowEntity;
                        var billInfo = item.accountBillInfo;
                        if (billInfo != null) {
                            if (billInfo.BusinessOperID == null)
                                $scope.BusinessConfirm = [];
                            else
                                $scope.BusinessConfirm = [{ OperNode: "业务账单确认", Status: item.businessConfirmStatus, OperName: billInfo.businessOperName, OperTime: billInfo.businessOperTime }];

                            if (billInfo.ProviderOperID == null)
                                $scope.ProviderConfirm = [];
                            else
                                $scope.ProviderConfirm = [{ OperNode: "供应商账单确认", Status: item.providerConfirmStatus, OperName: billInfo.providerOperName, OperTime: billInfo.providerOperTime }];

                            if (billInfo.FinancialOperID == null)
                                $scope.FinancialConfirm = [];
                            else
                                $scope.FinancialConfirm = [{ OperNode: "财务账单确认", Status: item.financeConfirmStatus, OperName: billInfo.financialOperName, OperTime: billInfo.financialOperTime }];
                        }
                        else {
                            $scope.BusinessConfirm = [];
                            $scope.ProviderConfirm = [];
                            $scope.FinancialConfirm = [];
                        }

                        $scope.AuditResults = item.auditResults;
                        $scope.Acceptance = [{ OperNode: "报销受理", Status: item.acceptStatus, OperName: item.acceptStatus == "1" ? ((item.subOperName == "" || item.subOperName == null) ? "system" : item.subOperName) : item.subOperName, OperTime:item.acceptStatus == "1" ?( ((item.subOperTime == null || item.subOperTime == "") ? item.createdTime : item.subOperTime)):"", Reason: item.businessReason, AuditStep: item.auditStep, CreatedTime: item.createdTime }];
                    }
                });
            }
        };

        //报销管理查询
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            claimsService.GetReimbursementManage($scope.gridOptions.queryPrarms).success(function (data) {
                $scope.initSelectItems();
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

        $scope.getId=function(val){
            $scope.submitID=val.id;
            $scope.reason1='';
            $scope.reimburse.reason1.$setUntouched();
            $scope.reimburse.$setPristine();
            $('#myModal').modal('show');
        };

        $scope.initSelectItems = function () {
            $scope.BusinessConfirm = [];
            $scope.ProviderConfirm = [];
            $scope.FinancialConfirm = [];
            $scope.AuditResults = [];
            $scope.Acceptance = [];
        };

        //立即报销
        $scope.Promptly = function (e,item) {
            claimsService.AcceptClaimSubmit({submitID:item.id}).success(function(data){
                if(data.code==200){
                    $scope.gridOptions.search();
                    bootbox.alert(data.msg);
                }else{
                    bootbox.alert(data.msg);
                }
            });
        };

        //拒绝报销
        $scope.refuseHandle=function(isValid,form){
            if(isValid){
                claimsService.RejectClaimSubmit({submitID:$scope.submitID,reason:$scope.reason1}).success(function(data){
                    $scope.gridOptions.search();
                    $scope.reason1='';
                    $scope.cancel(form);   //关闭窗口
                    bootbox.alert(data.msg);
                });
            }
        };

        //关闭模态窗口并清除数据
        $scope.cancel = function (form){
            $scope.reason1='';
            form.$setPristine();
            form.$setUntouched();
            $('#myModal').modal('hide');
        };

        //搜索药品目录
        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);
    }])
})