/**
 * Created by yangdongbo on 16/3/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('certListController', ['$scope', '$http', '$rootScope', '$timeout', 'doctorauditService', function ($scope, $http, $rootScope, $timeout, doctorauditService) {
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
                    displayName: '　',
                    headerCellTemplate: '<label style="padding-top: 2px;"><input id="selectAll" type="checkbox" ng-model="isAll" ng-click="grid.appScope.selectAll();" /></label>',
                    width: 40,
                    enableSorting: false,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    cellTemplate: '<label style="height: 100%"><input type="checkbox" name="sele" data-set="{{row.entity.id}}" ng-model="row.entity.selected" ng-if="row.entity.authenstatus == 0" ng-click="grid.appScope.recordClick(row.entity.id,row.entity.selected);grid.appScope.selectAllIsTrue()"></label>'
                },
                {name: 'loginname', displayName: '手机号', width:120, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a href="#doctoraudit/detail/:{{row.entity.id}}" ng-if="grid.appScope.doctorauditDetail">' +
                    '       <span ng-bind="row.entity.loginname"></span>' +
                    '   </a>' +
                    '<span ng-bind="row.entity.loginname" ng-if="!grid.appScope.doctorauditDetail"></span>' +
                    '</div>'},
                {name: 'doctor_RealName', displayName: '姓名', width:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'doctor_Gender', displayName: '性别', cellFilter: 'gender', width: 60, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'doctor_Age', displayName: '年龄', cellFilter:'ageFilter', width: 60, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'doctor_Hospital_Name', displayName: '医院', minWidth:80, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'doctor_Parent_Depart_Name', displayName: '科室', width: 140, cellFilter:'departNameFilter:row.entity.doctor_Depart_Name', headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'doctor_Duty', displayName: '职务', width: 100, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'authenstatus', displayName: '审核状态', cellFilter: 'authenstatuss', width:80, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'auditor', displayName: '审核人', width: 100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'createTime', displayName: '申请时间', width: 140, cellFilter: 'date:"yyyy-MM-dd HH:mm"', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {
                    name: 'edit',
                    displayName: '操作',
                    width: 100,
                    enableSorting: false,
                    enableColumnResizing: false,
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center',
                    cellTemplate: '<div class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a href="#doctoraudit/detail/:{{row.entity.id}}" ng-if="grid.appScope.doctorauditDetail">' +
                    '       <i class="icon-file-text-o"></i> 详情' +
                    '   </a>' +
                    '</div>'
                }
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
                        $scope.pagerOptions.sort('', '');
                    } else {
                        $scope.pagerOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.pagerOptions.search();
                });
            }
        };

        $scope.pagerOptions = $rootScope.getGridOptions();
        $scope.pagerOptions.setQueryPrarms = function () {
            $scope.pagerOptions.setQueryValues($scope.searchParams);
        };
        $scope.pagerOptions.getData = function () {
            $scope.pageSize = $scope.pagerOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = parseInt(window.localStorage.page);   //用于序号显示
            $scope.pagerOptions.queryPrarms.pageIndex = parseInt(window.localStorage.page);
            doctorauditService.getdutymetadata().success(function (data) {
                if(data.code == 200) {
                    $scope.dutyMeta = data.data;
                    doctorauditService.query($scope.pagerOptions.queryPrarms).success(function (data) {
                        if(data.code == 200) {
                            $scope.grid.data = data.data.datas;
                            $scope.recover();//恢复勾选
                            $scope.selectAllIsTrue();
                            $scope.pagerOptions.totalCount = data.data.totalCount;
                            $scope.doctorauditDetail = data.permission.doctorauditDetail;
                        } else {
                            $scope.grid.data = [];
                            $scope.pagerOptions.totalCount = 0;
                            bootbox.alert(data.msg);
                        }
                    });
                } else {
                    $scope.dutyMeta = [];
                    $scope.grid.data = [];
                    bootbox.alert(data.msg);
                }
            });
        };

        $timeout(function () {
            $scope.pagerOptions.sort(window.localStorage.name, window.localStorage.direction);
            $scope.pagerOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
        //查询列表 ---end

        $scope.idList = [];         //定义勾选集合,存储所有的勾选记录
        //获取未认证数
        $scope.getUnCertCount = function () {
            doctorauditService.getnotauthencount().success(function (data, status) {
                //返回的要渲染的数据
                $scope.unCertCount = data.data;
            });
        };
        $scope.getUnCertCount();
        //获取当前任务数
        $scope.taskcount = function () {
            doctorauditService.gettaskcount().success(function (data) {
                $scope.task = data.data;
            });
        };

        $scope.taskcount();
        //表格父layout加载完后对表格进行定位
        $scope.$on('ui.layout.loaded', function (evt, id) {
            var grid = $(".grid-top-setting").eq(0);
            var top = $(grid).prev().css("height");
            $(grid).css("top", top);
            //表格列的动作开关（colActionSwitch）， 值为false时，该页面表格col列自适应宽度启用。  值为true时，该页面表格col列自适应宽度禁用。
            window.colActionSwitch = false;
        });
        //设置全选复选框的默认值
        $scope.isAll = false;
        //提取全选
        $scope.selectAll = function () {
            if ($scope.isAll == false) {
                $scope.isAll = true;
            } else {
                $scope.isAll = false;
            }
            $.each($scope.grid.data, function () {
                if ($scope.isAll && this.authenstatus == 0) { //只显示的复选框
                    this.selected = true;
                }
                if (!$scope.isAll && this.authenstatus == 0) {
                    this.selected = false;
                }
                $scope.recordClick(this.id, this.selected);
            });
        };
        $scope.setnum = function () {
            $('#num').onblur(function () {
            });
        };
        //每次点击记录一次
        $scope.recordClick = function (id, isSelected) {
            if (isSelected) {  //选中
                var isExists = false;
                for (var i = 0; i < $scope.idList.length; i++) {
                    if ($scope.idList[i] == id) {
                        isExists = true;
                    }
                }
                if (!isExists) {
                    $scope.idList.push(id);
                }
            } else {              //取消
                for (var i = 0; i < $scope.idList.length; i++) {
                    if ($scope.idList[i] == id) {
                        $scope.idList.splice(i, 1);
                    }
                }
            }
        };
        //为复选框打钩
        $scope.recover = function () {
            $.each($scope.grid.data, function () {
                for (var i = 0; i < $scope.idList.length; i++) {
                    if ($scope.idList[i] == this.id) {
                        this.selected = true;
                    }
                }
            })
        };
        //全选框是否勾上(*点击全选时不调用该方法*)
        /**
         * 有复选框,并且都勾着则全选框勾上,否则都不勾
         */
        $scope.selectAllIsTrue = function () {
            var isSelectAll = true;
            var hasChecked = false;
            $.each($scope.grid.data, function () {
                if (this.authenstatus == 0) {  //有复选框
                    if (!this.selected) {
                        isSelectAll = false;    //存在没选的
                    }
                    hasChecked = true;          //有复选框
                }
            });
            if (isSelectAll && hasChecked) {  //当前页已经全选,则全选框勾上
                $scope.isAll = true;
                $('#selectAll').attr("checked", true);
            } else {
                $scope.isAll = false;
                $('#selectAll').attr("checked", false);
            }
        };
        $scope.extractnum = 10;
        $scope.getextract = function () {
            console.log(123);
            var ids;
            ids = $scope.idList.join();
            if ($scope.extractnum != 0) {
                $scope.count = $scope.extractnum;
            }
            if ($scope.idList.length != 0 && $scope.idList != undefined) {
                $scope.count = $scope.idList.length;
            }
            if ($scope.count == 0) {
                bootbox.alert('请勾选要提取的记录或者输入提取数量！');
                return;
            }
            if ($scope.idList == null || $scope.idList == undefined || $scope.idList.length == 0) {
                var re = new RegExp(/^\+?[1-9][0-9]*$/);
                if (!re.test($scope.extractnum)) {
                    bootbox.alert('提取任务数必须为正整数！');
                    return;
                }
            }
            var prarms = {};
            prarms.ids = ids;
            prarms.extractedNum = $scope.extractnum;
            prarms.loginName = $scope.pagerOptions.queryPrarms.loginname;
            prarms.realName = $scope.pagerOptions.queryPrarms.realname;
            prarms.hospital = $scope.pagerOptions.queryPrarms.hospital;
            prarms.tableOrderName = $scope.pagerOptions.queryPrarms.tableOrderName;
            prarms.tableOrderSort = $scope.pagerOptions.queryPrarms.tableOrderSort;

            bootbox.confirm("确定提取" + $scope.count + "个任务开始处理？", function (result) {
                if (result) {
                    if ($scope.idList.length > 0) {
                        doctorauditService.getcertishandledcount({id: ids}).success(function (data, status) {
                            if (data.code == 200) {
                                var isHandledCount = data.count;
                                if (isHandledCount > 0) {
                                    if (isHandledCount == $scope.idList.length) {
                                        bootbox.alert("所选记录已被另一用户提取！");
                                        $scope.isAll = false;
                                        $scope.idList = [];
                                        $scope.pagerOptions.search();
                                        return;
                                    } else {
                                        bootbox.alert(isHandledCount + "个任务已在处理中，提取" + ($scope.idList.length - isHandledCount) + "个任务");
                                    }
                                }
                                $scope.certextracted(prarms);
                            }
                        });
                    } else {
                        $scope.certextracted(prarms);
                    }
                }
            });
        };

        $scope.certextracted = function (prarms) {
            console.log(prarms);
            $http.post('extracted', prarms).success(function (data) {
                if (data.code == 200) {
                    window.location.href = "#doctoraudit/scheduleextract";
                } else {
                    bootbox.alert(data.msg);
                }
            });
        };

        $scope.jumphandle = function () {
            if ($scope.task > 0)
                window.location.href = '#doctoraudit/scheduleextract';
            else
                bootbox.alert("暂无待办任务！");
        };

        $scope.numFocus = function () {
            $(".searchButton").removeClass("enter-default");
            $(".numButton").addClass("enter-default");
            return;
        };

        $scope.numBlur = function () {
            $(".searchButton").addClass("enter-default");
            $(".numButton").removeClass("enter-default");
            return;
        };
    }]);
});