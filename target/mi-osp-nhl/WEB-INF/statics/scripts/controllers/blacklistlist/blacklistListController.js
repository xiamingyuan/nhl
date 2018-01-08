/**
 * Created by xmy on 2016/11/21.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('blacklistListController', ['$scope', '$rootScope','$timeout','blacklistListService','userlistService', function ($scope, $rootScope,$timeout,blacklistListService,userlistService) {
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
                {name:'loginName', displayName: '用户名', width:120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'realName', displayName: '姓名', width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'gender', displayName: '性别', width:80,cellFilter:'gender', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'birthday', displayName: '出生日期', width:140,cellFilter:'date:"yyyy-MM-dd"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'authenStatus', displayName: '资格认证', width:80, cellFilter:'isauthen', headerCellClass:'cell-center', cellClass: 'cell-center'},
                // {name:'level', displayName: '等级', width:80, cellFilter:'level', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'registertime', displayName: '注册时间', width:140, cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'reason', displayName: '原因',minWidth:120, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'operator_name', displayName: '处理人', width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'createTime', displayName: '处理时间', width:140, cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width:100,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a  ng-click="grid.appScope.getId(row.entity)" >' +
                    // 'ng-if="grid.appScope.balcklistRemove"' +
                    '       <i class="icon-trash-o"></i> 移除' +
                    '</a>' +
                    '</div>'
                }
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
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            blacklistListService.QueryBlacklist($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        $scope.getId=function(val){
            $scope.user_id=val.doctor_id;
            userlistService.getuserinfobyid({id:$scope.user_id}).success(function(data){
                if(data.data.isBlack){
                    $scope.reason1='';
                    $scope.blacklist.reason1.$setUntouched();
                    $scope.blacklist.$setPristine();
                    $('#myModal').modal('show');
                }else{
                    $scope.gridOptions.getData();
                    bootbox.alert("当前记录已被处理！");
                }
            });
        };

        //为了解决关闭弹出框后在弹出错误提示不显示问题
        $scope.changeErrorFlag = function (){
            $scope.isShowBlackListError = true;
            $scope.serverErrorInfo = "";
        };

        //移出黑名单
        $scope.removeBlacklist=function(isValid,form){
            $scope.isShowBlackListError = true;
            if(isValid){
                userlistService.getuserinfobyid({id:$scope.user_id}).success(function(data) {
                    if(data.code==200){
                        if (data.data.isBlack) {
                            blacklistListService.removeBlacklist({user_id:$scope.user_id,reason:$scope.reason1}).success(function(data){
                                if(data.code==200){
                                    $scope.gridOptions.getData();
                                    $scope.reason1='';
                                    $scope.cancel(form);
                                }else{
                                    $scope.serverErrorInfo="移除黑名单异常！";
                                }
                            });
                        }else{
                            $scope.cancel(form);
                            $scope.gridOptions.getData();
                            bootbox.alert("当前记录已被处理！");
                        }
                    }else{
                        $scope.serverErrorInfo=data.msg;
                    }
                });
            }
        };

        //关闭模态窗口并清除数据
        $scope.cancel = function (form){
            $scope.isShowBlackListError=false;
            $scope.reason1 = "";
            form.$setPristine();
            form.$setUntouched();
            $('#myModal').modal('hide');
            $scope.serverErrorInfo="";
        };


        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});