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
    controllers.controller('reimbursementChannelStatisticsListController', ['$scope', '$rootScope','$timeout','reimbursementchannelService',function ($scope,$rootScope,$timeout,reimbursementchannelService) {
        $scope.grid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: true,
            useExternalSorting: true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name:'productID', displayName: '产品ID',width:220, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'popularizeName', displayName: '通用名',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'name', displayName: '商品名',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'specification', displayName: '规格',width:150, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'dosage', displayName: '剂型',width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'unit', displayName: '单位',width:40, headerCellClass:'cell-center',cellClass: 'cell-center'},
                {name:'manufactEnterprise', displayName: '生产厂家',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'productionEnterprise', displayName: '生产企业',minWidth:80,headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'circulationEnterprise', displayName: '流通企业',minWidth:80,headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'terminalEnterprise', displayName: '终端企业',minWidth:80,headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'eCommerce', displayName: '电商',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-left'}
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
                    $scope.productDetailID=row.entity.id;
                    $scope.detailGridOptions.search();
                });
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
            $scope.setExportParams();//为导出表格设置参数
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            reimbursementchannelService.getreimbursementchannellist($scope.gridOptions.queryPrarms).success(function (data) {
                $scope.detailGrid.data = [];
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    //默认第一条被选中，高亮显示
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


        $scope.detailGrid = {
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
                {name:'name', displayName: '供应商',minWidth:60, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'type_', displayName: '供应商类型',minWidth:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'reimbursementRange', displayName: '报销范围',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'claimamount', displayName: '用户报销金额',width:140,cellFilter:'floatDigit', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'onLineDate', displayName: '报销有效期',width:180, headerCellClass:'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.detailGridApi = gridApi;
                $scope.detailGridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
                $scope.detailGridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.detailGridOptions.sort('', '');
                    } else {
                        $scope.detailGridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    // $scope.detailGridOptions.search();
                });
            }
        };
        $scope.detailGridOptions = $rootScope.getGridOptions();
        $scope.detailGridOptions.setQueryPrarms = function(){
            $scope.detailGridOptions.setQueryValues({productID:$scope.productDetailID});      //查询条件搜索 类型转换方法
        };
        $scope.detailGridOptions.getData = function(){
            reimbursementchannelService.getchanneldetail($scope.detailGridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $(data.data).each(function (index,value){
                        value.onLineDate =$scope.formatDate(value.onLineDate)+" 至 "+$scope.formatDate(value.offLineDate);
                    });
                    $scope.detailGrid.data = data.data;
                }else{
                    $scope.detailGrid.data = [];
                    bootbox.alert(data.msg);
                }
            });
        };

        //时间戳转有效时间
        $scope.formatDate=function(timeStamp){
            var time=new Date(timeStamp);
            var year=time.getFullYear();
            var month=time.getMonth()+1;
            if(month<10){
                month = "0"+month;
            }
            var date=time.getDate();
            if(date<10){
                date = "0"+date;
            }
            return year+"-"+month+"-"+date;
        };
        //设置导出参数
        $scope.setExportParams = function(){
            $("input[name='formProductID']").val($("input[name='productID']").val());$("input[name='formGenericName']").val($("input[name='genericName']").val());
            $("input[name='formCommodityName']").val($("input[name='commodityName']").val());$("input[name='formManufacturer']").val($("input[name='manufacturer']").val());
            $("input[name='pageIndex']").val(parseInt(window.localStorage.page));$("input[name='pageSize']").val(parseInt($scope.gridOptions.queryPrarms.pageSize));
            $("input[name='tableOrderName']").val(window.localStorage.name);$("input[name='tableOrderSort']").val(window.localStorage.direction);
        };
        //导出操作
        $scope.exportStatisticsData = function (){
            if ($scope.grid.data.length!=0) {
                bootbox.confirm("确定导出当前列表记录？", function (result) {
                    if (result) {
                        $("#exportStatisticsData").click();
                    }
                });
            } else {
                bootbox.alert("当前列表暂无数据无法导出！");
            }
        };

        $timeout(function(){
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});