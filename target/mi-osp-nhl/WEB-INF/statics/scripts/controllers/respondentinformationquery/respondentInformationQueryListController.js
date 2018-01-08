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
    controllers.controller('respondentInformationQueryListController', ['$scope','$rootScope','$timeout','respondentinformationService',function ($scope, $rootScope,$timeout,respondentinformationService){
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
                {name:'respondentLoginName', displayName: '会员电话',width: 120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'respondentName', displayName: '被申诉人',width: 80, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'name', displayName: '药品名称',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'regulationCode', displayName: '监管码',width:180, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'specification', displayName: '规格',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'dosage', displayName: '剂型',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'manufactEnterprise', displayName: '生产厂家',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'reimbursementStatus', displayName: '报销状态',minWidth:80,cellFilter: 'ClaimSubmitStatus', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'filePath', displayName: '购药凭证',minWidth: 80, headerCellClass:'cell-center', cellClass: 'cell-center',
                  cellTemplate:
                     //原代码
                    // '<span style="line-height: 30px;display: inline-block;cursor: pointer;" ng-repeat="f in row.entity.filePath.split(\',\')" data-href="{{f}}" ng-click="grid.appScope.getPic($event)">'+
                  '<span style="line-height: 30px;display: inline-block;" ng-repeat="f in row.entity.filePath.split(\',\')">'+
                  '<i class=" glyphicon glyphicon-picture" ng-if="grid.appScope.isImageType(f)"></i>'+
                    '<i class="glyphicon glyphicon-ruble" ng-if="!grid.appScope.isImageType(f)"></i>'+
                    '</span>'
                },
                {name:'auditResult', displayName: '审核结果',minWidth: 80,cellFilter: 'respondentStatus', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'auditUserName', displayName: '审核人',width: 80, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'auditTime', displayName: '审核时间',width: 140,cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'auditReason', displayName: '审核意见',minWidth: 80, headerCellClass:'cell-center', cellClass: 'cell-left'}
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
                        var suffix = row.entity.filePath.substring(row.entity.filePath.lastIndexOf('.')).toLowerCase();
                        // target.parents("tr:first").addClass('auditItemClick').siblings().removeClass('auditItemClick');
                        if (suffix != ".jpg" && suffix != ".png") {
                            //如果文件是文件, 新开页打开文件
                            window.open("downloadfile?dfsFile="+ href+"&userid=");
                            return;
                        }
                        $scope.imgUrl = row.entity.filePath;
                        $scope.respondenIt.load("downloadfile?dfsFile=" + row.entity.filePath+"&userid=");
                    }else{
                        $scope.imgUrl="";$scope.respondenIt.load("image/nopic.gif");
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
            respondentinformationService.getrespondentinformationlist($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    //默认第一条被选中，高亮显示
                    $timeout(function () {
                        if($scope.grid.data[0]){
                            $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                        }else{
                            $scope.imgUrl="";$scope.respondenIt.load("image/nopic.gif");
                        }
                    }, 100);
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        $scope.isImageType = function (fileName) {
            var suffix = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
            if (suffix == ".jpg" || suffix == ".png")
                return true;
            return false;
        };
        //原代码
        // $scope.getPic = function (event) {
        //     var target = $(event.target);
        //     if (target.is('i')) {
        //         target = target.parent('span');
        //     }
        //
        //     var href = target.attr('data-href');
        //     if (href != null && href != "") {
        //         var suffix = href.substring(href.lastIndexOf('.')).toLowerCase();
        //         target.parents("tr:first").addClass('auditItemClick').siblings().removeClass('auditItemClick');
        //         if (suffix != ".jpg" && suffix != ".png") {
        //             //如果文件是文件, 新开页打开文件
        //             window.open("downloadfile?dfsFile="+ href+"&userid=");
        //             return;
        //         }
        //         $scope.FileName = $scope.PhotoUrl + href;
        //     } else {
        //         $scope.FileName = null;
        //     }
        // };
        
        
        $timeout(function(){
            $scope.gridOptions.search();
        }, 0, false);
    }])
});