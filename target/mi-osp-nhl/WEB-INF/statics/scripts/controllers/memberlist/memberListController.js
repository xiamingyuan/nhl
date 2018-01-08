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
    controllers.controller('memberListController', ['$scope', '$rootScope','$timeout','memberlistService',function ($scope, $rootScope,$timeout,memberlistService) {
        //表格渲染的数据
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
                {name:'loginName', displayName: '用户名', width:120, headerCellClass:'cell-center', cellClass: 'cell-center',cellTemplate: '<div class=\'ui-grid-cell-contents\'><a href="#memberlist/detail/:{{row.entity.id}}" ng-if="grid.appScope.memberDetail">{{row.entity.loginName}}</a><span ng-if="!grid.appScope.memberDetail">{{row.entity.loginName}}</span></div>'},
                {name:'realName', displayName: '姓名', width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'gender', displayName: '性别', width:50,cellFilter:'gender', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'age', displayName: '年龄', width:50, headerCellClass:'cell-center', cellClass: 'cell-center', cellFilter:'memberAgeFilter:row.entity.authenStatus:row.entity.idNumber'},
                {name:'mobileArea', displayName: '归属地', width:120, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'authenStatus', displayName: '实名认证', width:100, cellFilter:'authenstatusf', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'insuranceStatus', displayName: '医保绑定', width:80, headerCellClass:'cell-center', cellClass: 'cell-center', cellFilter:'insuranceStatus'},
                {name:'recommendName', displayName: '推荐人', minWidth:100, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'recommendPhone', displayName: '推荐人手机号', width:120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'registerTime', displayName: '注册时间', width:140, cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'edit', displayName: '操作', width:120,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    "<div division-line class='ui-grid-cell-contents grid-oper-column'>" +
                    "<a href='#memberInfoModal' data-toggle='modal' ng-click='grid.appScope.getMessageClick(row.entity.id)' ng-if='grid.appScope.memberMsg'> " +
                    "   <i class='icon-comment-o'></i> 消息" +
                    "</a>" +
                    "<a href='#memberlist/detail/:{{row.entity.id}}' ng-if='grid.appScope.memberDetail'>" +
                    "   <i class='icon-file-text-o'></i> 详情" +
                    "</a>" +
                    "</div>"
                }
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridOptions.sort('', '','');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction,sortColumns[0].displayName);
                        $rootScope.direction.getDirection(sortColumns[0].sort.direction);
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
            memberlistService.query($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code == 200){
                    $scope.gridOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.grid.data = data.data.datas;     //返回的要渲染的数据
                    //操作权限
                    $scope.memberDetail = data.permission.memberDetail;
                    $scope.memberMsg = data.permission.memberMsg;
                }else {
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //表格渲染消息数据
        $scope.gridNews = {
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name:'content', displayName: '消息内容', headerCellClass:'cell-center',cellFilter:'contentTitle'},
                {name:'createTime', displayName: '发送时间', width:180,cellFilter:'date:"yyyy-MM-dd HH:mm"', enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center'},
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.newPageSize*(grid.appScope.newPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridNewsOptions.sort('', '','');
                    } else {
                        $scope.gridNewsOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction,sortColumns[0].displayName);
                    }
                    //$scope.gridNewsOptions.search();
                });
            }
        };

        //消息弹层表格搜索条件查询
        $scope.gridNewsOptions = $rootScope.getGridOptions();
        $scope.gridNewsOptions.setQueryPrarms = function(){};
        $scope.gridNewsOptions.getData = function(){
            $scope.newPageSize = $scope.gridNewsOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.newPageIndex = $scope.gridNewsOptions.queryPrarms.pageIndex;   //用于序号显示
            $scope.gridNewsOptions.queryPrarms.receiverId = $scope.memberId;
            $scope.gridNewsOptions.queryPrarms.receiverType = "1";
            $scope.gridNewsOptions.queryPrarms.topicID = "v3_"+$scope.memberId;
            $scope.gridNewsOptions.queryPrarms.readStatus = "";
            memberlistService.getMessage($scope.gridNewsOptions.queryPrarms).success(function (data) {
                if(data.code == 200){
                    $scope.gridNewsOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.gridNews.data = data.data.datas;     //返回的要渲染的数据
                }else {
                    $scope.gridNews.data = [];
                    $scope.gridNewsOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //点击消息事件
        $scope.getMessageClick = function (id){
            $scope.memberId = id;
            $scope.gridNewsOptions.queryPrarms.pageIndex=1;
            $scope.gridNewsOptions.getData();
        }


        //发送消息
        $scope.sendMessage = function(valid){
            if(valid){
                memberlistService.sendMessage({title:$scope.title, content:$scope.content, userId:$scope.memberId}).success(function (data){
                    if(data.code == 200){
                        $scope.title = "";
                        $scope.content = "";
                        $scope.message.txtMessageTitle.$setUntouched();
                        $scope.message.txtMessageContent.$setUntouched();
                        $scope.message.$setPristine();
                        $("#memberInfoModal").modal("hide");
                    }else {
                        bootbox.alert(data.msg);
                    }
                });
            }
        };


        //关闭弹层
        $scope.cancel = function (){
            $("#memberInfoModal").modal("hide");
            $scope.title = "";
            $scope.content = "";
            $scope.message.txtMessageTitle.$setUntouched();
            $scope.message.txtMessageContent.$setUntouched();
            $scope.message.$setPristine();
        }


        //延时加载
        $timeout(function(){
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }])
})