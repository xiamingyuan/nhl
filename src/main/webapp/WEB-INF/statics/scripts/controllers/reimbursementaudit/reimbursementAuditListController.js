/**
 * Created by xmy on 2016/8/29.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('reimbursementAuditListController', ['$scope', '$http', '$rootScope','$timeout','strUtils','druglistService','claimsService',function ($scope, $http, $rootScope,$timeout,strUtils,druglistService,claimsService) {
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams,{providerID:$("#proInforId").val()});      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            claimsService.GetClaimReviewAudit($scope.gridOptions.queryPrarms).success(function (data, status) {
                if(data.code==200){
                    $scope.initSelectItems();
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $timeout(function () {
                        $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                    }, 100);
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                }
            });
        };

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
                {name: 'claimSubmitId', displayName: '受理号',width: 150, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'providerName', displayName: '供应商',minWidth:110, headerCellClass: 'cell-center'},
                {name: 'realName', displayName: '会员名',minWidth:110, headerCellClass: 'cell-center'},
                {name: 'createdTime', displayName: '时间',width: 180,cellFilter:'date:"yyyy-MM-dd"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
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
                        if ($scope.claimItem.photoUrl) {
                            $scope.it1.load("downloadfile?dfsFile=" + $scope.item.photoUrl);
                        } else {
                            $scope.it1.load("image/nopic.gif");
                        }
                        $scope.GetAuditResult(rowEntity);
                    }
                });
            }
        };

        $scope.searchParams={};
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
                if(data.code==200){
                    $scope.progrid.data = data.data.datas;
                    $scope.proGridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.progrid.data = [];
                    $scope.proGridOptions.totalCount = 0;
                }
            });
        };

        //保存选择的供应商
        $scope.getPro = function () {
            $scope.proInfor = $scope.proDetail;
            $("#proInforId").val($scope.proInfor.orgID);
        };

        //全部审核通过
        $scope.AllPassas = function (auditType) {
            bootbox.confirm('确定要全部通过？',function (result) {
                if (result) {
                    claimsService.LastAuditAllPass($scope.gridOptions.queryPrarms).success(function (data) {
                        if(data.code==200){
                            bootbox.alert(data.msg);
                            $scope.gridOptions.search();
                        }
                    });
                }
            });
        };

        //报销审核按钮
        $scope.AuditOpreate = function (auditType) {
            if ($scope.claimItem == undefined || $scope.claimItem == null) {
                bootbox.alert("请选择需要处理的记录！");
                return false;
            }
            if (auditType == "2") {
                if ($scope.auditOpinion == undefined || $scope.auditOpinion == null || $scope.auditOpinion == "") {
                    bootbox.alert("审批意见不允许为空！");
                    return false;
                }
            }
            bootbox.confirm('确定执行此操作？', function (result) {
                if (result) {
                    var obj = {
                        claimId: $scope.claimItem.id,
                        reason: $scope.auditOpinion,
                        businessReason: $scope.auditOpinion,
                        immediatelyPay: false,
                        auditType: auditType
                    };
                    claimsService.ClaimLastAudit(obj).error(function (data) {
                        bootbox.alert("服务器错误！");
                    }).success(function (data) {
                        if (data.code == 200) {
                            bootbox.alert(data.msg);
                            $scope.initSelectItems();
                            $scope.gridOptions.search();
                        }else {
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };

        $scope.initSelectItems = function () {
            $scope.claimItem = "";
            $scope.AuditResult = {};
            $scope.auditOpinion = "";
        };

        $scope.GetAuditResult = function (item) {
            if (item == undefined)
                return;
            var obj = {
                claimId: item.id,
                auditType: ""
            };
            claimsService.GetLastAuditDetail(obj).error(function (data) {
                bootbox.alert("服务器错误！");
            }).success(function (data) {
                if (data.code == 200) {
                    $scope.AuditResult = data.data;
                }
            });
        };

        $timeout(function () {
            $scope.gridOptions.search();
            $scope.proGridOptions.search();
        }, 0, false);
    }])
});