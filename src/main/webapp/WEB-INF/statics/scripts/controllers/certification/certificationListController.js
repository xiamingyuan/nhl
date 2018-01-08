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
    controllers.controller('certificationListController', ['$scope', '$http', '$rootScope','$timeout','certificationService',function ($scope, $http, $rootScope,$timeout,certificationService) {
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
                {name:'loginname', displayName: '用户名',width: 120, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'realname', displayName: '姓名',width:100,headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'gender', displayName: '性别',width:50,cellFilter:'gender', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'birthday', displayName: '出生日期',width: 140,cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'idnumber', displayName: '身份证号',cellFilter:'certificate',minWidth:180, headerCellClass:'cell-center', cellClass: 'cell-center'},
                //{name:'cardtype', displayName: '证件类型', cellFilter:'authenstatus', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'createtime', displayName: '申请时间', width: 140,cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'edit', displayName: '操作', width:100,enableSorting: false, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div class="ui-grid-cell-contents grid-oper-column">' +
                    "<a href='#certifiCationListModal' data-toggle='modal' ng-click='grid.appScope.showModuleDialog(row.entity)' ng-if='grid.appScope.certificationDeal'> " +
                    "   <i class='icon-undo'></i> 审核" +
                    "</a>" +
                    '</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({name: 'rowHeader',displayName: '　',width: '30',cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.pageSize*(grid.appScope.pageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'} );
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
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
            certificationService.query($scope.gridOptions.queryPrarms).success(function (data, status) {
                if(data.code == 200){
                    $scope.gridOptions.totalCount = data.data.totalCount;   //返回的要渲染的数据
                    $scope.gridOne.data = data.data.datas;     //返回的要渲染的数据
                    //操作权限
                    $scope.certificationDeal = data.permission.certificationDeal;
                }else {
                    $scope.gridOne.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };


        //点击显示弹窗
        $scope.showModuleDialog = function (item) {
            $scope.moduleLoad = angular.copy(item);
            if($scope.moduleLoad.photo1 != null){
                $scope.moduleLoad.photo1 = "downloadfile?dfsFile=" + $scope.moduleLoad.photo1 + "&userid=";
            }
            if($scope.moduleLoad.photo2 != null){
                $scope.moduleLoad.photo2 = "downloadfile?dfsFile=" + $scope.moduleLoad.photo2 + "&userid=";
            }
        };
        //证件类型分类
        //$scope.IdCartType = ['未知', '居民身份证', '港澳居民身份证', '居民户口簿', '护照', '军官证', '文职干部证', '士兵证', '驾驶执照'];

        //清空弹层 其他原因信息
        $(document).on('hidden.bs.modal', '#MICardBindModal', function (e) {
            $scope.remark = '';
        });

        //身份证号验证规则
        $scope.IdCardNum = function () {
            var num = $scope.moduleLoad.IdNum.toUpperCase();
            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
            if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
                //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
                return false;
            }
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            //下面分别分析出生日期和校验位
            var len, re;
            len = num.length;
            if (len == 15) {
                re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                var arrSplit = num.match(re);

                //检查生日日期是否正确
                var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    //alert('输入的身份证号里出生日期不对！');
                    return false;
                }
                else {
                    //将15位身份证转成18位
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    num += arrCh[nTemp % 11];
                    return true;
                }
            }
            if (len == 18) {
                re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                var arrSplit = num.match(re);

                //检查生日日期是否正确
                var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    //alert('输入的身份证号里出生日期不对！');
                    return false;
                }
                else {
                    //检验18位身份证的校验码是否正确。
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                    var valnum;
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[nTemp % 11];
                    if (valnum != num.substr(17, 1)) {
                        //alert('18位身份证的校验码不正确！应该为：' + valnum);
                        return false;
                    }
                    return true;
                }
            }
            return false;
        }

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
                //证件号不能为空
                if ($scope.moduleLoad.idnumber == undefined || $scope.moduleLoad.idnumber == null || $scope.moduleLoad.idnumber.replace(/\s/g, '').length == 0) {
                    $scope.$emit('Error', "身份证号不能为空");
                    return;
                } else {
                    if ($scope.moduleLoad.CardType == 1) {
                        //验证身份证格式
                        if (!$scope.IdCardNum()) {
                            $scope.$emit('Error', "请输入正确的身份证号");
                            return;
                        }
                    }
                }
            }

            //上传数据参数
            $scope.auditObj = {
                member_id: $scope.moduleLoad.member_id,
                id: $scope.moduleLoad.id,
                realname: $scope.moduleLoad.realname == undefined || $scope.moduleLoad.realname == null ? "" : $scope.moduleLoad.realname,
                gender: $scope.moduleLoad.gender,
                reason:target.hasClass("btn-success") ? $scope.remark : target.val(),
                note:target.hasClass("btn-success") ? $scope.remark : target.val(),
                //cardNum: $scope.moduleLoad.idnumber == undefined || $scope.moduleLoad.idnumber == null ? "" : $scope.moduleLoad.idnumber,
                //cardType: $scope.moduleLoad.CardType,
                authenstatus:type   //状态 1-未认证,4-认证中,2-认证成功,3-认证失败
            };

            //执行提交审核方法（传参auditObj）
            $scope.auditFun($scope.auditObj);
        };


        //提交审核
        $scope.auditFun = function (obj) {
            certificationService.updateCertification(obj).success(function(data){
                if (data.code != 200) {
                    bootbox.alert(data.msg);
                } else {
                    bootbox.alert('审核成功');
                    //隐藏窗口
                    $('#certifiCationListModal').modal('hide');
                    $scope.gridOptions.search();
                }
            });
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
                {name:'loginname', displayName: '用户名',width:120, headerCellClass:'cell-center',cellClass: 'cell-center'},
                {name:'realname', displayName: '姓名',width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'gender', displayName: '性别',width:50,cellFilter:'gender', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'birthday', displayName: '出生日期',width: 140,cellFilter:'date:"yyyy-MM-dd HH:mm"', headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'idnumber', displayName: '身份证号',cellFilter:'certificate',width: 200, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'createtime', displayName: '申请时间',width: 140, cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'audittime', displayName: '审核时间',width: 140, cellFilter:'date:"yyyy-MM-dd HH:mm"',headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'auditor', displayName: '审核人', width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name: 'reason', displayName: '详情',minWidth:120,enableColumnResizing:false, headerCellClass:'cell-center'}
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
            certificationService.query($scope.gridCompleteOptions.queryPrarms).success(function (data, status) {
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
            $scope.gridOptions.search();
        };

        $scope.layoutLoadedRight=function(){
            var rightGrid = $(".grid-top-setting").eq(1);
            $(rightGrid).css("top",$(rightGrid).prev().css("height"));
            $scope.gridCompleteOptions.search();
        };

        //延时加载
        $timeout(function(){
            $scope.gridOptions.search();
            $scope.gridCompleteOptions.search();
        }, 0, false);
    }])
})