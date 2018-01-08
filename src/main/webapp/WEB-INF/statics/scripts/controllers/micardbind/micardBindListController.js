/**
 * Created by zd on 16/8/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('micardBindListController', ['$scope', '$http', '$rootScope','$timeout','micardbindService',function ($scope, $http, $rootScope,$timeout,micardbindService) {
        //表格渲染的数据(待审核)
        $scope.gridOne = {
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
                {name:'loginname', displayName: '用户名',width:120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'realname', displayName: '姓名', width:100,headerCellClass:'cell-center',cellClass: 'cell-center'},
                {name:'gender', displayName: '性别',width:50,cellFilter:'gender', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'birthday', displayName: '出生日期',width: 140,cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'idnumber', displayName: '身份证号',cellFilter:'certificate',minWidth: 180, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'createtime', displayName: '申请时间',width: 140, cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'edit', displayName: '操作', width:100,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div class="ui-grid-cell-contents grid-oper-column">' +
                    "<a href='#MICardBindModal' data-toggle='modal' ng-click='grid.appScope.showModuleDialog(row.entity)' ng-if='grid.appScope.insuranceboundDeal'> " +
                    "   <i class='icon-undo'></i> 审核" +
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
            micardbindService.query($scope.gridOptions.queryPrarms).success(function (data, status) {
                if(data.code == 200){
                    $scope.gridOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.gridOne.data = data.data.datas;     //返回的要渲染的数据
                    //操作权限
                    $scope.insuranceboundDeal = data.permission.insuranceboundDeal;
                }else {
                    $scope.gridOne.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //清空弹层 其他原因信息
        $(document).on('hidden.bs.modal', '#MICardBindModal', function (e) {
            $scope.remark = '';
        });

        //获取医保地区列表
        $scope.showModuleDialog=function(item){
            $scope.moduleLoad = angular.copy(item);
            if($scope.moduleLoad.photo1 != null){
                $scope.moduleLoad.photo1 = "downloadfile?dfsFile=" + $scope.moduleLoad.photo1 + "&userid=";
            }
            if($scope.moduleLoad.photo2 != null){
                $scope.moduleLoad.photo2 = "downloadfile?dfsFile=" + $scope.moduleLoad.photo2 + "&userid=";
            }
            micardbindService.getInsuranceAreaList().success(function(data){
                console.log(data);
                $scope.MICardregion = data.data;
                $scope.moduleLoad.InsuranceAreaId = $scope.MICardregion[0].id;
            });
        };


        $scope.MICardType = '01';
        $scope.MICardTypeList = ['社会基本医疗保', '商业医疗保险', '大病统筹', '新型农村合作医疗', '城镇居民基本医疗保险', '公费医疗']

        //提交保存
        $scope.auditSave = function (e,type) {
            var target = $(e.target);
            //其他原因
            if (target.attr("flag") && target.attr("flag") == "other") {
                if ($scope.remark == undefined || $scope.remark == null || $scope.remark.replace(/\s/g, '').length == 0) {
                    $scope.$emit("Error", "请输入其他原因的备注");
                    angular.element("#moudelRemark").focus();
                    return;
                }
            }

            //认证通过
            if (target.attr("flag") && target.attr("flag") == "pass") {
                //姓名不能为空
                if ($scope.moduleLoad.realname == undefined || $scope.moduleLoad.realname == null || $scope.moduleLoad.realname.replace(/\s/g, '').length == 0) {
                    $scope.$emit("Error", "姓名不能为空!");
                    return;
                }
                //医保账号不能为空
                if ($scope.moduleLoad.insuranceNo == undefined || $scope.moduleLoad.insuranceNo == null || $scope.moduleLoad.insuranceNo.replace(/\s/g, '').length == 0) {
                    $scope.$emit('Error', '医保账号不能为空！');
                    return;
                }
            }

            //上传数据参数
            $scope.auditObj = {
                member_id: $scope.moduleLoad.member_id,
                id: $scope.moduleLoad.id,
                insuranceNo: $scope.moduleLoad.insuranceNo,
                reason:target.hasClass("btn-success") ? $scope.remark : target.val(),
                note:target.hasClass("btn-success") ? $scope.remark : target.val(),
                insuranceAreaName:$('#InsuranceAreaName').get(0).options[$('#InsuranceAreaName').get(0).selectedIndex].text,
                insuranceAreaID: $scope.moduleLoad.InsuranceAreaId == null ? $scope.MICardregion[0].id : $scope.moduleLoad.InsuranceAreaId,
                tnsuranceType: $scope.MICardType,
                authenstatus:type   //状态 1-未认证,4-认证中,2-认证成功,3-认证失败
            };

            //执行提交审核方法（传参auditObj）
            $scope.auditFun($scope.auditObj);
        }

        //提交审核
        $scope.auditFun = function (obj) {
            var re = /^[A-Za-z0-9]+$/;
            obj.insuranceNo == undefined || obj.insuranceNo == null ? '' : obj.insuranceNo.replace(/(^\s*)|(\s*$)/g, "");
            if (!re.test(obj.insuranceNo)) {
                $scope.$emit('Error', '医保账号不正确！');
                return;
            } else {
                micardbindService.updateAuditInsurance(obj).success(function(data){
                    //$scope.$emit('Tips', '审核成功!');
                    if (data.code != 200) {
                        bootbox.alert(data.msg);
                    } else {
                        bootbox.alert('审核成功');
                        //隐藏窗口
                        $('#MICardBindModal').modal('hide');
                        $scope.gridOptions.search();
                    }
                });
            }
        };


        //表格渲染的数据(已审核)
        $scope.gridComplete = {
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
                {name:'loginname', displayName: '用户名',width: 120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'realname', displayName: '姓名',width: 100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'gender', displayName: '性别',width:50,cellFilter:'gender', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'birthday', displayName: '出生日期',width: 140,cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'idnumber', displayName: '身份证号',cellFilter:'certificate',width: 180, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'insuranceAreaName', displayName: '医保地区',width: 80, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'insuranceNo', displayName: '医保卡号',width:200, headerCellClass:'cell-center',  cellClass: 'cell-center'},
                {name:'createtime', displayName: '申请时间', width: 140,cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'audittime', displayName: '审核时间',width: 140, cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'auditor', displayName: '审核人', width:120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'reason', displayName: '详情',minWidth:120, enableColumnResizing:false, headerCellClass:'cell-center'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: '　', width:'30', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.completePageSize*(grid.appScope.completePageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.gridCompleteOptions.sort('', '');
                    } else {
                        $scope.gridCompleteOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    //$scope.gridCompleteOptions.search();
                });
            }
        };

        //搜索条件查询
        $scope.searchParamsAudit ={};
        $scope.gridCompleteOptions = $rootScope.getGridOptions();
        $scope.gridCompleteOptions.setQueryPrarms = function(){
            $scope.searchParamsAudit.isAudit = true;
            $scope.gridCompleteOptions.setQueryValues($scope.searchParamsAudit);      //查询条件搜索 类型转换方法
        };
        $scope.gridCompleteOptions.getData = function(){
            $scope.completePageSize = $scope.gridCompleteOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.completePageIndex = $scope.gridCompleteOptions.queryPrarms.pageIndex;   //用于序号显示
            micardbindService.query($scope.gridCompleteOptions.queryPrarms).success(function (data, status) {
                if(data.code == 200){
                    $scope.gridCompleteOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.gridComplete.data = data.data.datas;     //返回的要渲染的数据
                }else {
                    $scope.gridComplete.data = [];
                    $scope.gridCompleteOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //点击切换按钮 搜索列表清空
        $scope.layoutLoadedLeft=function(){
            var leftGrid = $(".grid-top-setting").eq(0);
            $(leftGrid).css("top",$(leftGrid).prev().css("height"));
        };
        $scope.layoutLoadedRight=function(){
            var rightGrid = $(".grid-top-setting").eq(1);
            $(rightGrid).css("top",$(rightGrid).prev().css("height"));
        };

        $timeout(function(){
            $scope.gridOptions.search();
            $scope.gridCompleteOptions.search();
        }, 0, false);
    }])
})