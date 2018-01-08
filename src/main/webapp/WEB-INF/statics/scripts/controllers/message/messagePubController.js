/**
 * Created by xietianyou on 2016/4/19.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('messagePubController', ['$scope', '$http', '$rootScope', '$timeout', 'messageService', 'strUtils', '$filter', function ($scope, $http, $rootScope, $timeout, messageService, strUtils, $filter) {
        window.localStorage.bol = 'true';//返回状态保持标示
        $scope.isReminder = false;//是否提示
        $scope.idList = [];//定义勾选集合,存储所有的勾选记录
        $scope.idSave = [];//点击保存的id集合
        $scope.selCount = 0;//所选人数
        $scope.typeId = 'xtxx';//初始指向'系统消息'
        $scope.assign = '1';//初始指向'所有用户'
        $scope.storeMode = '0';
        $scope.isAll = false;//设置全选复选框的默认值

        //用户列表弹窗grid
        $scope.grid = {
            enableSorting: true,
            useExternalSorting: true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {
                    name: 'selectAll',
                    displayName: '全选',
                    headerCellTemplate: '<input type="checkbox" id="isAll" ng-model="isAll" ng-click="grid.appScope.selectAll();" style="margin: 9px 5px 0px 6px;"/>',
                    width: 60,
                    enableSorting: false,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    cellTemplate: '<input type="checkbox" name="sele" ng-model="row.entity.selected" ng-click="grid.appScope.recordClick($event,row.entity)">'
                },
                {name: 'loginName', displayName: '用户名', width: 120, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'realName', displayName: '姓名', width: 80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'nickName', displayName: '昵称', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'gender', displayName: '性别', width: 50, cellFilter: 'genderName', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'birthday', displayName: '出生日期', width: 100, cellFilter: 'date:"yyyy-MM-dd"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'authenStatus', displayName: '资格认证', width: 80, cellFilter: 'isauthen', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'registerTime', displayName: '注册时间', width: 140, cellFilter: 'date:"yyyy-MM-dd HH:mm"', enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center'}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridOptions.sort('', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.gridOptions.search();
                });
            }
        };
        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function () {
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function () {
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = parseInt($scope.gridOptions.queryPrarms.pageIndex);   //用于序号显示
            messageService.queryUser($scope.gridOptions.queryPrarms).success(function (data) {
                //返回的要渲染的数据
                $("#isAll").prop("checked",false);
                $scope.isAll = false;
                $scope.grid.data = data.data.userList;
                $scope.grid.data.isAll = false;
                $scope.gridOptions.totalCount = data.data.totalNum;
            });
        };
        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);

        //提取全选
        $scope.selectAll = function () {
            $scope.isAll =  !$scope.isAll;
            if($scope.isAll){
                $($scope.grid.data).each(function(){
                    this.selected = true;
                    if($scope.idList.indexOf(this.id)==-1){
                        $scope.idList.push(this.id);
                    }
                } );
            }else{
                $scope.idList=[];
                $($scope.grid.data).each(function(){
                    this.selected = false;
                } );
            }
        };

        //每次点击记录一次
        $scope.recordClick = function (e,entity) {
            var isSelected = $(e.target).prop("checked");
            if(isSelected){
                $scope.idList.push(entity.id);
            }else{
                $scope.idList.splice($scope.idList.indexOf(entity.id),1);
            }
            if($scope.idList.length==$scope.grid.data.length){
                $scope.isAll=true;
            }else{
                $scope.isAll=false;
            }
            $("#isAll").prop("checked",$scope.isAll);
        };
        //获取页面选择结果,点击保存时执行
        $scope.getextract = function (val) {
            $scope.idSave = [];
            for (var i = 0; i < $scope.idList.length; i++) {
                $scope.idSave.push($scope.idList[i]);
            }
            if ($scope.idSave != null && $scope.idSave != undefined) {
                $scope.selCount = $scope.idSave.length;
            } else {
                $scope.selCount = 0;
            }
        };
        //弹窗返回或关闭
        $scope.cancel = function () {
            $scope.idList = [];
            for (var j = 0; j < $scope.idSave.length; j++) {
                $scope.idList.push($scope.idSave[j]);
            }
        };

        //选择指定用户时清除选择的数据
        $scope.clearSelCount = function () {
            $scope.selCount = 0;//所选人数重置为0
            $scope.gridOptions.search();
        };
        //点击指定用户触发
        $scope.recoverSelCount = function () {
            if ($scope.idSave != undefined && $scope.idSave != null) {
                $scope.selCount = $scope.idSave.length;
            } else {
                $scope.selCount = 0;
            }
        };
        //页面点击选择时，将单选框指向'指定用户'
        $scope.assignUser = function () {
            $scope.assign = '0';
        };


        //时间变化触发
        $scope.dateChange = function () {
            var date = new Date();
            $scope.currentDate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
            if ($scope.publishTime <= $scope.currentDate) {
                $scope.isReminder = true; //提示校验
            } else {
                $scope.isReminder = false;//
            }
        };

        //新增消息发布计划
        $scope.addMsg = function (valid) {
            $scope.dateChange();//保存时再进行一次时间检查
            if (valid && !$scope.isReminder) {
                if ($scope.mp.content == null || "" == $scope.mp.content || $scope.mp.content == undefined) {
                    bootbox.alert("请输入消息内容！");
                    return;
                }
                if ($scope.assign == '0' && ($scope.idSave == null || $scope.idSave == undefined || $scope.idSave.length == 0)) {
                    bootbox.alert("当前为指定用户发送，请选择用户！");
                    return;
                }
                bootbox.confirm("确定发布此条消息？", function (result) {
                    if (result) {
                        $scope.mp.strPublishTime = $scope.publishTime.toString();
                        $scope.mp.ids = $scope.idList.join();
                        $scope.mp.type_Id = $scope.typeId;
                        $scope.mp.storeMode = $scope.storeMode;
                        $scope.mp.isAllUser = $scope.assign;
                        $scope.mp.planDetails = null;
                        messageService.create($scope.mp).success(function (data, status) {
                            if (data.code != 200) {
                                bootbox.alert(data.msg);
                            } else {
                                $scope.comeback();
                            }
                        });
                    }
                });
            }
        };


        //返回
        $scope.comeback = function () {
            window.location.href = "#message";
        };
    }]);
});