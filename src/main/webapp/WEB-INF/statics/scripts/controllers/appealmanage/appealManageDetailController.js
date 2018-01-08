/**
 * Created by xmy on 2016/8/29.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('appealManageDetailController', ['$scope', '$http', '$rootScope','$routeParams','$timeout','accountService',function ($scope, $http, $rootScope,$routeParams,$timeout,accountService) {
        window.localStorage.bol = 'true';//返回状态保持标示
        $scope.id = $routeParams.id.substring(1);
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
                {name: 'respondentLoginName', displayName: '会员电话',width: 150, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'respondentName', displayName: '姓名',minWidth: 120, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'specification', displayName: '购药凭证',minWidth: 120, headerCellClass: 'cell-center',cellClass: 'cell-center',
                    cellTemplate:
                    '<div style="line-height: 30px;" ng-if="row.entity.complatintFilePath==null||row.entity.complatintFilePath==\'\'">'+
                        '<span ng-repeat="f in row.entity.filePath.split(\',\')" data-href="{{f}}" ng-click="grid.appScope.getPic($event)">'+
                            '<i class=" glyphicon glyphicon-picture" ng-if="grid.appScope.isImageType(f)"></i>'+
                            '<i class="glyphicon glyphicon-ruble" ng-if="!grid.appScope.isImageType(f)"></i>'+
                        '</span>'+
                    '</div>'+
                    '<div style="line-height: 30px;" ng-if="row.entity.complatintFilePath!=null&&row.entity.complatintFilePath!=\'\'">' +
                        '<span data-href="{{row.entity.complatintFilePath}}" ng-click="grid.appScope.getPic($event)">' +
                            '<i class=" glyphicon glyphicon-picture" ></i>' +
                        '</span>' +
                    '</div>'
                },
                {name: 'auditResult', displayName: '被申诉状态',minWidth: 120,cellFilter: 'respondentStatus:row.entity.auditReason:row.entity.complatintid', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'reimbursementStatus', displayName: '报销状态', width: 120,cellFilter: 'ClaimSubmitStatus', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'claimSubmitTime', displayName: '报销时间', width: 120,cellFilter: 'date:"yyyy-MM-dd "',headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', width: 500, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div ng-if="(row.entity.complatintid==null||row.entity.complatintid==\'\')&&row.entity.reimbursementStatus!=\'1\'&&(row.entity.auditResult==\'\'||row.entity.auditResult==null)">' +
                    '   <a ng-click="grid.appScope.respondentNomalClaim(row.entity.id)" ng-if="row.entity.filePath!=\'\'&&row.entity.filePath!=null&&row.entity.filePath!=undefined">' +
                    '       <i class="icon-file-text"></i> 合规报销' +
                    '   </a>' +
                    '   <a href="#myModal" data-toggle="modal" ng-click="grid.appScope.refuseHandle.complaintBtn(row.entity.id,row.entity.memberID,2)" >' +
                    '       <i class="icon-file-text"></i> 虚假报销' +
                    '   </a>' +
                    '   <span class="input-group" style="margin-left:5px;">' +
                    '       <input type="text" disabled="disabled" style="width: 200px !important; height: 22px; margin-top: 4px;vertical-align: middle;" value="" id="path" />' +
                    '       <a ng-click="grid.appScope.SelectFile()" >' +
                    '           <i class="icon-file-text"></i> 选择凭证' +
                    '       </a>' +
                    '   </span>' +
                    '   <a ng-click="grid.appScope.Import(row.entity.memberID,row.entity.filePath)" >' +
                    '       <i class="icon-file-text"></i> 上传凭证' +
                    '   </a>' +
                    '</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                // $scope.gridApi = gridApi;
                gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.pagerOptions.sort('', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.gridOptions.search();
                });
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.thegridOptions.search();
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.item = rowEntity;
                        if ($scope.item.filePath!= null&& $scope.item.filePath != "") {
                            if($scope.item.filePath.indexOf(",") > 0){
                                $scope.files =$scope.item.filePath.split(",");
                                for(var i=0;i<$scope.files.length;i++){
                                    if($scope.files[i].indexOf(".jpg")> 0||$scope.files[i].indexOf(".png")> 0){
                                        $scope.FileName = $scope.files[i];
                                        $scope.it1.load("downloadfile?dfsFile=" + $scope.FileName+"&userid=");
                                        return;
                                    }else{
                                        $scope.FileName = null;
                                        $scope.it1.load("image/nopic.gif");
                                    }
                                }
                            }else{
                                $scope.FileName = $scope.item.filePath;
                                $scope.it1.load("downloadfile?dfsFile=" + $scope.FileName+"&userid=");
                            }
                        } else {
                            $scope.FileName = null;
                            $scope.it1.load("image/nopic.gif");
                        }
                    }
                });
            }
        };

        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams,{regulateCode:$scope.id});      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            accountService.GetComplaintByCode($scope.gridOptions.queryPrarms).success(function (data, status) {
                $scope.grid.data = data.data;
            });
        };


        $scope.thegrid = {
            enableSorting: true,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name: 'loginName', displayName: '会员电话',minWidth: 120, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'realName', displayName: '姓名',minWidth: 120, headerCellClass: 'cell-center',cellClass: 'cell-center'},
                {name: 'status', displayName: '申诉状态',minWidth: 120,cellFilter: 'complaintStatus:row.entity.reason', headerCellClass: 'cell-center',cellClass: 'cell-center',},
                {name: 'createTime', displayName: '申诉时间',minWidth: 120,cellFilter: 'date:"yyyy-MM-dd "', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: '_oper', displayName: '操作', minWidth: 100, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div style="line-height: 30px;" ng-if="row.entity.status==0">' +
                    '   <a ng-click="grid.appScope.complaintAuditPass(row.entity.id)">' +
                    '       <i class="icon-file-text"></i> 申诉通过' +
                    '   </a>' +
                    '   <a href="#myModal" data-toggle="modal" ng-click="grid.appScope.refuseHandle.complaintBtn(row.entity.id,\'\',1)" >' +
                    '       <i class="icon-file-text"></i> 申诉拒绝' +
                    '   </a>' +
                    '</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                // $scope.gridApi = gridApi;
                gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.thegridOptions.sort('', '');
                    } else {
                        $scope.thegridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.thegridOptions.search();
                });
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.gridOptions.search();
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.item = rowEntity;
                        if ($scope.item.filePath!= null&& $scope.item.filePath != "") {
                            if($scope.item.filePath.indexOf(",") > 0){
                                $scope.files =$scope.item.filePath.split(",");
                                for(var i=0;i<$scope.files.length;i++){
                                    if($scope.files[i].indexOf(".jpg")> 0||$scope.files[i].indexOf(".png")> 0){
                                        $scope.FileName = $scope.files[i];
                                        $scope.it1.load("downloadfile?dfsFile=" + $scope.FileName+"&userid=");
                                        return;
                                    }else{
                                        $scope.FileName = null;
                                        $scope.it1.load("image/nopic.gif");
                                    }
                                }
                            }else{
                                $scope.FileName = $scope.item.filePath;
                                $scope.it1.load("downloadfile?dfsFile=" + $scope.FileName+"&userid=");
                            }
                        } else {
                            $scope.FileName = null;
                            $scope.it1.load("image/nopic.gif");
                        }
                    }
                });
            }
        };
        $scope.thegridOptions = $rootScope.getGridOptions();
        $scope.thegridOptions.setQueryPrarms = function(){
            $scope.thegridOptions.setQueryValues($scope.searchParams,{regulateCode:$scope.id});      //查询条件搜索 类型转换方法
        };
        $scope.thegridOptions.getData = function(){
            accountService.GetTheComplaintByCode($scope.thegridOptions.queryPrarms).success(function (data) {
                $scope.thegrid.data = data.data;
            });
        };

        $scope.isImageType = function (fileName) {
            var suffix = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
            if (suffix == ".jpg" || suffix == ".png")
                return true;
            return false;
        };

        $scope.getPic = function (event) {
            var target = $(event.target);
            if (target.is('i')) {
                target = target.parent('span');
            }
            var href = target.attr('data-href');
            if (href != null && href != "") {
                var suffix = href.substring(href.lastIndexOf('.')).toLowerCase();
                if (suffix != ".jpg" && suffix != ".png") {
                    //如果文件是文件, 新开页打开文件
                    window.open("downloadfile?dfsFile=" + href+"&userid=");
                    return;
                }
                $scope.FileName = href;
                $scope.it1.load("downloadfile?dfsFile=" + $scope.FileName+"&userid=");
            } else {
                $scope.FileName = null;
                $scope.it1.load("image/nopic.gif");
            }
        };

        //申诉成功
        $scope.complaintAuditPass = function (id) {
            bootbox.confirm("是否确定此操作？",function (result) {
                if (result) {
                    accountService.ComplaintAuditPass({ id: id }).success(function (data) {
                        if(data.code==200){
                            bootbox.alert(data.msg);
                            $scope.gridOptions.search();
                            $scope.thegridOptions.search();
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };

        //合规报销
        $scope.respondentNomalClaim = function (id) {
            bootbox.confirm("是否确定此操作？",function (result) {
                if (result) {
                    accountService.RespondentNomalClaim({ id: id }).success(function (data) {
                        if(data.code==200){
                            bootbox.alert(data.msg);
                            $scope.gridOptions.search();
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };
        //申诉拒绝相关操作
        $scope.refuseHandle = {
            //拒绝原因
            refuseToReason: $scope.refuseToReason,
            itemID: '',
            itemType: '',//1--申诉拒绝，2--虚假报销
            itemMemberID:'',
            //打开弹窗
            complaintBtn: function (id,memberID, type) {
                this.itemID = id;
                this.itemType = type;
                this.itemMemberID = memberID;
                $scope.refuseToReason = '';//清空拒绝原因
            },
            //弹窗点击确定
            ChangePwd: function () {
                if (this.refuseToReason == '' || this.refuseToReason == undefined || this.refuseToReason.replace(/^\s+|\s+$/g, "").length == 0) {
                    bootbox.alert("原因不能为空!");
                    return false;
                }
                if (this.itemID == '' || this.itemID == undefined || this.itemID == null) {
                    return false;
                }
                var complaintId = this.itemID;
                var complaintReason = this.refuseToReason;
                // bootbox.confirm("是否确定此操作?",function (result) {
                //     if (result) {
                        if (this.itemType == 1) {
                            accountService.ComplaintAuditRefused({id: complaintId, reason: complaintReason}).success(function (data) {
                                $("#myModal").modal("hide");
                                if(data.code==200){
                                    bootbox.alert(data.msg);
                                    $scope.thegridOptions.search();
                                }else{
                                    bootbox.alert(data.msg);
                                }
                            });
                        }
                        if (this.itemType == 2) {
                            accountService.RespondentAffectationClaim({memberID: this.itemMemberID, regulateCode: $scope.id, reason: this.refuseToReason }).success(function (data) {
                                $("#myModal").modal("hide");
                                if(data.code==200){
                                    bootbox.alert(data.msg);
                                    $scope.gridOptions.search();
                                }else{
                                    bootbox.alert(data.msg);
                                }
                            });
                        }
                //     }
                // });
            }
        };

        //弹窗关闭后清空一次拒绝原因；
        $scope.cancel = function () {
            $scope.refuseHandle.refuseToReason = '';
        };

        //上传文件
        $scope.SelectFile = function () {
            $("#file").click();
        };
        $scope.Import = function (memberID, respondentFilePath) {
            var filepath = document.getElementById('path').value;
            if (filepath == null || filepath == '') {
                bootbox.alert("请先选择文件再点击上传!");
                return;
            }
            $("#upload").click();
            $scope.memberID = memberID;
            $scope.respondentFilePath = respondentFilePath;
        };

        $scope.saveComplaintFile = function () {
            if ($scope.memberID != '' && $scope.memberID != null && $scope.memberID != undefined) {
                accountService.UpLoadRespondentFiles({ memberID: $scope.memberID, regulateCode: $scope.id, files: $scope.respondentFilePath,complaintFileName:$("#listfile").val() }).success(function (data) {
                    if (data.code==200) {
                        bootbox.alert(data.msg);
                        $scope.gridOptions.search();
                    }
                    else {
                        bootbox.alert("操作错误!");
                    }
                });
            } else {
                bootbox.alert("操作错误，请重试!");
            }
            document.getElementById('path').value = "";
        };

        //返回
        $scope.back = function(){
            window.location.href = "#appealmanage";
        };

        $timeout(function () {
            $scope.gridOptions.search();
            $scope.thegridOptions.search();
        }, 0, false);
    }]);
});