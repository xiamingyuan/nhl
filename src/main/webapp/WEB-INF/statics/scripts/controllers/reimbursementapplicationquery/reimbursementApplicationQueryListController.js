/**
 * Created by zd on 16/3/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('reimbursementApplicationQueryListController', ['$scope','$rootScope','$timeout','reimbursementapplicationService',function ($scope, $rootScope,$timeout,reimbursementapplicationService) {
        $scope.grid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name:'id', displayName: '受理号',width: 150, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'userName', displayName: '会员',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'mobilePhone', displayName: '会员电话',width: 120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'regulateCode', displayName: '监管码',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'goodsName', displayName: '商品名称',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'claimAmount', displayName: '报销金额',width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'submitStatus', displayName: '报销进度',width:120,enableSorting: false, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'abbReviation', displayName: '供应商',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'providerBillID', displayName: '账单号',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'createdTime', displayName: '申请日期',width: 150,cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridOptions.sort('', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    // $scope.gridOptions.search();
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.getDetailData(row.entity);
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
            reimbursementapplicationService.getreimbursementlist($scope.gridOptions.queryPrarms).success(function (data) {
                $scope.detailGrid.data=[];//清空详情表格
                if(data.code==200){
                    //列表报销进度值转换
                    $(data.data.datas).each(function (index,value){
                        value.submitStatus = $scope.reimManageStatus(value.acceptStatus, value.auditStep, value.status, value.businessConfirmStatus, value.providerConfirmStatus, value.financeConfirmStatus);
                    });
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $timeout(function () {
                        if(data.data.totalCount>0){
                            $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                        }
                    }, 100);
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };
        //列表报销进度值转换
        $scope.reimManageStatus =function(acceptStatus, auditStep, status, businessConfirmStatus, providerConfirmStatus, financeConfirmStatus){
            if (acceptStatus == "0")
                return "待受理";
            else {
                switch (auditStep) {
                    case null:
                        return "受理拒绝";
                    case "0":
                        if (status == "0" && acceptStatus =="1")
                            return "待供应商审核";
                    case "10":
                        if (financeConfirmStatus == "3")
                            return "财务账单已确认";
                        else if (businessConfirmStatus == "1" && providerConfirmStatus == "2")
                            return "待财务确认账单";
                        else if (businessConfirmStatus == "1" && providerConfirmStatus == "0")
                            return "待供应商确认账单";
                        else if (businessConfirmStatus == "0")
                            return "待业务确认账单";
                        return "待报销审核";
                    case "30":
                        if (status == "1" && businessConfirmStatus == null)
                            return "报销审核拒绝";
                        if (status == "1" && businessConfirmStatus == null)
                            return "待财务审核";
                        if (financeConfirmStatus == "3")
                            return "财务账单已确认";
                        else if (businessConfirmStatus == "1" && providerConfirmStatus == "2")
                            return "待财务确认账单";
                        else if (businessConfirmStatus == "1" && providerConfirmStatus == "0")
                            return "待供应商确认账单";
                        else if (businessConfirmStatus == "0")
                            return "待业务确认账单";
                        return "待财务审核";
                    case "31":
                        if (financeConfirmStatus == "3")
                            return "财务账单已确认";
                        else if (businessConfirmStatus == "1" && providerConfirmStatus == "2")
                            return "待财务确认账单";
                        else if (businessConfirmStatus == "1" && providerConfirmStatus == "0")
                            return "待供应商确认账单";
                        else if (businessConfirmStatus == "0")
                            return "待业务确认账单";
                        return "报销审核退回";
                    case "40":
                        if (financeConfirmStatus == "3")
                            return "财务账单已确认";
                        else if (businessConfirmStatus == "1" && providerConfirmStatus == "2")
                            return "待财务确认账单";
                        else if (businessConfirmStatus == "1" && providerConfirmStatus == "0")
                            return "待供应商确认账单";
                        else if (businessConfirmStatus == "0")
                            return "待业务确认账单";
                        return "财务已审核";
                    case "41":
                        return "财务审核退回";
                }
            }
            return "";
        };

        $scope.detailGrid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: false,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name:'operName', displayName: '审批人', width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'operNode', displayName: '审核节点',width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'status', displayName: '审核状态',width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'reason', displayName: '审核意见', headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'operTime', displayName: '审核时间',width:180, cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass:'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.detailGridApi = gridApi;
                $scope.detailGridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
            }
        };
        $scope.getDetailData = function (item){
            if(item){
                var billInfo = item.accountBillInfo;
                var dataArray = [];

                if (billInfo != null) {
                    if (billInfo.businessOperID != null){
                        dataArray.push({ operNode: "业务账单确认", status: item.businessConfirmStatus, operName: billInfo.businessOperName, operTime: billInfo.businessOperTime });
                    }
                    if (billInfo.providerOperID != null){
                        dataArray.push({ operNode: "供应商账单确认", status: item.providerConfirmStatus, operName: billInfo.providerOperName, operTime: billInfo.providerOperTime });
                    }
                    if (billInfo.financialOperID != null){
                        dataArray.push({ operNode: "财务账单确认", status: item.financeConfirmStatus, operName: billInfo.financialOperName, operTime: billInfo.financialOperTime });
                    }
                }
                if(item.auditResults.length!=0){
                    $(item.auditResults).each(function (index,value){
                        value.operNode = $scope.getAuditNode(value.auditType);
                        value.status = $scope.getAuditNodeStatus(value.auditStatus);
                        dataArray.push(value);
                    });
                }
                dataArray.push({ operNode: "报销受理", status:$scope.getAcceptStatus(item.acceptStatus,item.auditStep), operName: item.acceptStatus == "1" ? ((item.subOperName == "" || item.subOperName == null) ? "system" : item.subOperName) : item.subOperName, operTime: item.acceptStatus == "1" ? (((item.subOperTime == null || item.subOperTime == "") ? item.createdTime : item.subOperTime)) : "", reason: item.businessReason, auditStep: item.auditStep });
                $scope.detailGrid.data=dataArray;
            }
        };
        //报销详情列表系统审核节点值转换
        $scope.getAuditNode = function (status) {
            switch (status) {
                case "0":
                    return "供应商审核";
                case "2":
                    return "报销审核";
                case "3":
                    return "财务审核";
            }
        };
        //报销详情列表系统审核状态值转换
        $scope.getAuditNodeStatus = function(status){
            switch (status) {
                case "0":
                    return "待审核";
                case "1":
                    return "审核通过";
                case "2":
                    return "审核拒绝";
                case "3":
                    return "退回";
            }
        };
        //用户审批人审核状态
        $scope.getAcceptStatus = function (status, auditStep) {
            if (status == "0")
                return "待受理";
            if (auditStep == null)
                return "受理拒绝";
            if (status == null || status == "1")
                return "已受理";
        };
        
        
        $timeout(function(){
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});