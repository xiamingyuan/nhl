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
    controllers.controller('complaintInformationQueryListController', ['$scope','$rootScope','$timeout','complaintinformationService',function ($scope,$rootScope,$timeout,complaintinformationService) {
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
                {name:'loginName', displayName: '会员电话',width: 120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'realName', displayName: '申诉人',width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'gender', displayName: '药品名称',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'regulationCode', displayName: '监管码',width:180, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'specification', displayName: '规格', minWidth:80,headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'dosage', displayName: '剂型',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'manufactEnterprise', displayName: '生产厂家',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'createTime', displayName: '申诉时间',width:140,cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'status', displayName: '申诉状态',minWidth:80,cellFilter: 'complaintStatus', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'auditUserName', displayName: '审核人',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'auditTime', displayName: '审核时间',width:140,cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'auditReason', displayName: '审核意见',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'}
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
                    if(row.entity.filePath){
                        $scope.imgUrl = row.entity.filePath;
                        $scope.complaintlIt.load("downloadfile?dfsFile=" + row.entity.filePath+"&userid=");
                    }else{
                        $scope.imgUrl="";$scope.complaintlIt.load("image/nopic.gif");
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
            complaintinformationService.getcomplaintinformationlist($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    //默认第一条被选中，高亮显示
                    $timeout(function () {
                        if($scope.grid.data[0]){
                            $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                        }else{
                            $scope.imgUrl="";$scope.complaintlIt.load("image/nopic.gif");
                        }
                    }, 100);
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };
        // $scope.dateErrorInfo="";
        // $scope.getNow = function (){
        //     var now = new Date();
        //     var year = now.getFullYear();
        //     var month = now.getMonth()+1;
        //     var day = now.getDate();
        //     return year+"-"+(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day);
        // };
        // $scope.checkTime = function (){
        //     var returnValue = true;
        //     var now = $scope.getNow();
        //     $scope.dateErrorInfo="";
        //     var sdate = $("input[name='sdate']").val();var edate = $("input[name='edate']").val();
        //     if(sdate){
        //         if(sdate>now){
        //             $scope.dateErrorInfo="申诉开始时间不能超过当前时间！";
        //             returnValue=false;
        //         }
        //     }
        //     if(edate){
        //         if(edate>now){
        //             $scope.dateErrorInfo="申诉结束时间不能超过当前时间！";
        //             returnValue=false;
        //         }
        //     }
        //     if(sdate && edate){
        //         if(sdate>edate){
        //             $scope.dateErrorInfo="申诉起始时间不能超过结束时间！";
        //             returnValue=false;
        //         }
        //     }
        //     return returnValue;
        // };

        
        $timeout(function(){
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});