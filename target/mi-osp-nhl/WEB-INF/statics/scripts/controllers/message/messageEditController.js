/**
 * Created by xietianyou on 2016/4/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('messageEditController', ['$scope', '$http', '$rootScope', 'messageService', '$routeParams', '$timeout', '$location', 'strUtils', '$filter', function ($scope, $http, $rootScope, messageService, $routeParams, $timeout, $location, strUtils, $filter) {
        window.localStorage.bol = 'true';//返回状态保持标示
        $scope.id = $routeParams.id.substring(1);//记录id
        $scope.selCount = $routeParams.count.substring(1);
        $scope.idList = [];//定义临时勾选集合,存储所有的勾选记录
        $scope.idSave = [];//点击保存的id集合
        $scope.isReminder = false;//是否提示
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
                {name: 'loginName', displayName: '用户名', width: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
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
            messageService.queryUserByPlan({planId: $scope.id}).success(function (data) {
                $scope.idList = data.data;
                $scope.idSave = data.data;

                $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
                $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
                messageService.queryUser($scope.gridOptions.queryPrarms).success(function (data) {
                    //返回的要渲染的数据
                    $("#isAll").prop("checked",false);
                    $scope.isAll = false;
                    $scope.grid.data = data.data.userList;
                    $scope.grid.data.isAll = false;
                    $scope.gridOptions.totalCount = data.data.totalNum;

                    $scope.recover();           //恢复勾选
                    $scope.selectAllIsTrue();   //全选框是否选中
                });
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

        //全选框是否勾上(*点击全选时不调用该方法)
        $scope.selectAllIsTrue = function () {
            var isSelectAll = true;
            if ($scope.grid.data.length > 0) {
                $.each($scope.grid.data, function () {
                    if (!this.selected) {
                        isSelectAll = false;
                    }
                });
            } else {
                isSelectAll = false;
            }
            if (isSelectAll) {  //当前页已经全选,则全选框勾上
                $scope.isAll = true;
                $('#isAll').attr("checked", true);
            } else {
                $scope.isAll = false;
                $('#isAll').attr("checked", false);
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
        //为复选框打钩
        $scope.recover = function () {
            $.each($scope.grid.data, function () {
                if ($scope.idList != undefined) {
                    for (var i = 0; i < $scope.idList.length; i++) {
                        if ($scope.idList[i] == this.id) {
                            this.selected = true;
                        }
                    }
                }
            });
        };
        //获取页面选择结果,保存时执行
        $scope.getextract = function (val) {
            $scope.idSave = $scope.idList;
            if ($scope.idSave != null && $scope.idSave != undefined) {
                $scope.selCount = $scope.idSave.length;
            } else {
                $scope.selCount = 0;
            }
        };
        //返回或关闭
        $scope.cancel = function () {
            $scope.idList = [];
            for (var j = 0; j < $scope.idSave.length; j++) {
                $scope.idList.push($scope.idSave[j]);
            }
            $("#myModal").hide();
        };

        //选择指定用户时清除选择的数据
        $scope.clearSelCount = function () {
            $scope.selCount = 0;//所选人数重置为0
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
            if ($scope.publishTime <= $scope.currentDate) {//发送日期应
                $scope.isReminder = true; //提示校验
            } else {
                $scope.isReminder = false;//
            }
        };


        //查询明细  ---begin
        $scope.detailQuery = function () {
            messageService.queryById({
                planId: $scope.id,
                pageIndex: 1,
                pageSize: 1,
                tableOrderName: "",
                tableOrderSort: ""
            }).success(function (data) {
                $scope.msgPlan = data.data.messagePlan;
                $scope.publishTime = $filter('date')(new Date($scope.msgPlan.publishTime), 'yyyy-MM-dd HH:mm');
                $scope.assign = $scope.msgPlan.isAllUser;
            });
        };
        $scope.detailQuery();
        //查询明细  ---end


        //修改消息发布计划
        $scope.editMsg = function (valid) {
            $scope.dateChange();//如果时间未被触发，主动进行一次检查
            if (valid && !$scope.isReminder) {
                if ($scope.msgPlan.content == null || "" == $scope.msgPlan.content || $scope.msgPlan.content == undefined) {
                    bootbox.alert("请输入消息内容！");
                    return;
                }
                if ($scope.assign == '0' && ($scope.idSave == null || $scope.idSave == undefined || $scope.idSave.length == 0)) {
                    bootbox.alert("当前为指定用户发送，请选择用户！");
                    return;
                }
                bootbox.confirm("确定保存修改？", function (result) {
                    if (result) {
                        $scope.msgPlan.strPublishTime = $scope.publishTime.toString();
                        $scope.msgPlan.ids = $scope.idSave.join();
                        $scope.msgPlan.isAllUser = $scope.assign;
                        $scope.msgPlan.id = $scope.id;
                        $scope.msgPlan.planDetails=null;
                        messageService.edit($scope.msgPlan).success(function (data, status) {
                            if (data.code != 200) {
                                bootbox.alert(data.msg);
                            } else {
                                $scope.comeback();
                            }
                        })
                    }
                });
            }
        };


        $scope.comeback = function () {
            window.location.href = "#message";
        };
    }]);
});