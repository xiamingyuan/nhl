/**
 * Created by xmy on 2016/8/29.
 */
define(['../module'], function (controllers) {
    'use strict';
    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('dictionaryDataListController', ['$scope','$rootScope', '$timeout', 'dictionarydataService',function ($scope, $rootScope, $timeout,dictionarydataService) {
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
                {name: 'classid', displayName: '分类ID',minWidth:60, headerCellClass: 'cell-center',cellClass: 'cell-left'},
                {name: 'classname', displayName: '分类名称',minWidth:80, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'classdesc', displayName: '分类描述',minWidth:80, headerCellClass: 'cell-center',cellClass: 'cell-left'},
                {name: 'itemvalue', displayName: '代码值',minWidth:80, headerCellClass: 'cell-center',cellClass: 'cell-left'},
                {name: 'itemvaluedesc', displayName: '代码值描述',minWidth:100, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'itemname', displayName: '代码名称',minWidth:80, headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'edit', displayName: '操作',enableSorting: false,width:120, enableColumnResizing:false, headerCellClass:'cell-center', cellClass: 'cell-center',
                    cellTemplate:
                    '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '<a ng-click="grid.appScope.getDictionaryById(row.entity.id)" class="operate-a" ng-if="grid.appScope.dataEdit">' +
                    '   <i class="icon-edit"></i> 编辑' +
                    '</a>' +
                    '   <a ng-click="grid.appScope.delDictionaryById(row.entity.id)" class="operate-a" ng-if="grid.appScope.dataDelete">' +
                    '      <i class="icon-trash-o"></i> 删除' +
                    '   </a>' +
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
            dictionarydataService.getdictionarylist($scope.gridOptions.queryPrarms).success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                    $scope.dataEdit = data.permission.dataEdit;
                    $scope.dataDelete = data.permission.dataDelete;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };
        
        //新建点击
        $scope.addDictionaryData = function (){
            $scope.modalTitle="添加字典数据";$("#dictionaryInfoModal").modal();
        };
        //保存数据
        $scope.save = function (valid){
            //一下5个参数的引入为了解决表单错误时关闭弹层再弹出层时错误提示仍在的问题
            $scope.isShowClassIDError=true;$scope.isShowClassNameError=true;
            $scope.isShowClassDescError=true;$scope.isShowItemValueError=true;
            $scope.isShowItemNameError=true;$scope.isShowItemValueDescError=true;
            $scope.serverErrorInfo = "";
            $scope.isShowItemServerError=false;$scope.itemServerErrorInfo="";
            if(valid){
                dictionarydataService.savedictionarydata($scope.list).success(function (data) {
                    if(data.code==200){
                        $scope.cancel();
                        $scope.gridOptions.getData();
                    }else if(data.msg.indexOf("分类下已存在该代码值")!=-1){
                        $scope.isShowItemServerError=true;
                        $scope.itemServerErrorInfo=data.msg;
                    }else{
                        $scope.serverErrorInfo=data.msg;
                    }
                });
            }
        };
        //获取信息
        $scope.getDictionaryById = function (id){
            dictionarydataService.getdictionarybyid({id:id}).success(function (data) {
                if(data.code==200){
                    $scope.list = data.data;
                    $scope.modalTitle="修改字典数据";
                    $("#dictionaryInfoModal").modal();
                }else{
                    bootbox.alert(data.msg);
                }
            });
        };
        //删除信息
        $scope.delDictionaryById = function (id){
            bootbox.confirm("确定删除该数据？", function (result) {
                if (result) {
                    dictionarydataService.deldictionarybyid({id:id}).success(function (data) {
                        if(data.code==200){
                            if($scope.gridOptions.totalCount==($scope.pageIndex-1)*$scope.pageSize+1){
                                window.localStorage.page--;
                                window.localStorage.page=window.localStorage.page==0?1:window.localStorage.page
                            }
                            $scope.gridOptions.search();
                            window.localStorage.bol = 'false';
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };
        //验证输入值所占的字符个数
        // $scope.patternValue=function (valueName,valueValid,maxLength){
        //     $scope[valueValid]=false; $("input[name="+valueName+"]").removeClass("input-invalid-border");
        //     var valueLength=0;
        //     if($scope.list[valueName]){
        //         var content = $scope.list[valueName].toString();
        //         var pattern = /^[^\x00-\xff]{1}$/;
        //         for(var i=0;i<content.length;++i){
        //             if(pattern.exec(content.charAt(i))){
        //                 valueLength+=2;
        //             }else{
        //                 valueLength+=1;
        //             }
        //         }
        //         if(valueLength>maxLength){
        //             $scope[valueValid]=true;
        //             $("input[name="+valueName+"]").addClass("input-invalid-border");
        //         }
        //     }
        // };
        //隐藏弹出层
        $scope.cancel = function (){
            $("#dictionaryInfoModal").modal("hide");$scope.list=null;
            $scope.isShowClassIDError=false;$scope.isShowClassNameError=false;
            $scope.isShowClassDescError=false;$scope.isShowItemValueError=false;
            $scope.isShowItemNameError=false;$scope.isShowItemValueDescError=false;
            //代码值特殊
            $scope.isShowItemServerError=false;$scope.itemServerErrorInfo="";//分类代码指错误提示
            //由于输入文字进行手动验证字符数而设定的变量
            // $scope.classIdValid = false;$scope.classNameValid = false;$scope.classDescValid = false;
            // $scope.itemValueValid = false;$scope.itemNameValid = false;
            //错误input样式会有input-invalid-border
            $(".form-default .form-inline input[name]").removeClass("input-invalid-border");
            //两个服务返回错误变量数据清空
            $scope.serverErrorInfo="";
           
        };
        //弹出层input的focus事件
        $scope.inputFocus = function (isShow,inputName){
            $scope.serverErrorInfo = "";
            //判断是否是首次focus
            if(!$scope[isShow]){
                $scope[isShow]=true;$scope.formModal[inputName].$touched=false;
                $scope.formModal.$submitted=false;
            }
            if(inputName=="itemvalue"){
                $scope.isShowItemServerError=false;
                $scope.itemServerErrorInfo="";
            }
        };
        //代码值输入时候
        $scope.setItemErrorValue = function (){
            var e = event || window.event;
            var currKey=e.keyCode||e.which;
            if($scope.isShowItemServerError && currKey!=13){
                $scope.isShowItemServerError=false;
                $scope.itemServerErrorInfo="";
            }
        };

        $timeout(function () {
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});