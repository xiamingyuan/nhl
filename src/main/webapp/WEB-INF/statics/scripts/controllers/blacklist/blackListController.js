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
    controllers.controller('blackListController', ['$scope', '$rootScope','$timeout','blacklistService','memberlistService',function ($scope,$rootScope,$timeout,blacklistService,memberlistService) {
        //表格渲染的数据
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
                {name:'loginName', displayName: '用户名',width:120,headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'realName', displayName: '姓名', width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'gender', displayName: '性别', width:50,cellFilter:'gender', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'ageOrder', displayName: '年龄', width:50, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'mobilePhone', displayName: '手机', width:120,  headerCellClass:'cell-center', cellClass: 'cell-center'},
                //{name:'email', displayName: '邮箱', width:80, headerCellClass:'cell-center', cellClass: 'cell-center'},
                //{name:'isEmailVerif', displayName: '邮箱认证', width:140, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'reason', displayName: '原因',minWidth:120, headerCellClass:'cell-center'},
                {name:'iDNumStatus', displayName: '实名认证', width:100, cellFilter:'authenstatusf', headerCellClass:'cell-center', cellClass: 'cell-center'},
                //{name:'insuranceStatus', displayName: '医保认证', width:80, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'registerTime', displayName: '注册时间',width:140,cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'edit', displayName: '操作', width:80,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div class="ui-grid-cell-contents grid-oper-column">' +
                    "<a ng-click='grid.appScope.delblacklist(row.entity.user_ID)'> " +
                    "    <i class='icon-trash-o'></i> 移除" +
                    "</a>" +
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
                    //$scope.gridOptions.search();
                });
            }
        };

        //搜索条件查询
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            blacklistService.query($scope.gridOptions.queryPrarms).success(function (data, status) {
                if(data.code == 200){
                    $scope.gridOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.grid.data = data.data.datas;     //返回的要渲染的数据
                }else {
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        $scope.delblacklist=function(val){
            $scope.user_id = val;
            $scope.reason1='';
            $scope.blacklist.reason1.$setUntouched();
            $scope.blacklist.$setPristine();
            $('#myModal').modal('show');
        };


        //删除黑名单
        $scope.removeBlacklist=function(isValid,form){
            $scope.isShowBlackListError = true;
            if(isValid){
                memberlistService.userDetailInfo({id:$scope.user_id}).success(function(data) {
                    if(data.code==200){
                        if (data.data.member.result.isBlack) {
                            blacklistService.delblacklist({user_id:$scope.user_id,reason:$scope.reason1}).success(function(data){
                                if(data.code==200){
                                    $scope.gridOptions.getData();
                                    $scope.reason1='';
                                    $scope.cancel(form); //关闭窗口
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

        //为了解决关闭弹出框后在弹出错误提示不显示问题
        $scope.changeErrorFlag = function (){
            $scope.isShowBlackListError = true;
            $scope.serverErrorInfo = "";
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

        //延时加载
        $timeout(function(){
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});