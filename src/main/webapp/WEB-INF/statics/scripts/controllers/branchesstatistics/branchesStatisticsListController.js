/**
 * Created by localadmin on 16/9/8.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('branchesStatisticsListController', ['$scope', '$rootScope','$timeout','$window','branchesstatisticsService',function ($scope, $rootScope,$timeout,$window,branchesstatisticsService) {
        $scope.idList = [];         //定义勾选集合,存储所有的勾选记录
        $scope.isAll = false;        //设置全选复选框的默认值
        $scope.isShow = true;//收缩显示表格

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
                {name: 'selectAll', displayName: '',
                    headerCellTemplate: '<input type="checkbox" id="isAll" ng-model="isAll" ng-click="grid.appScope.selectAll();" style="margin: 9px 5px 0px 6px;"/>',
                    width: 40,enableSorting: false,headerCellClass: 'cell-center',cellClass: 'cell-center',
                    cellTemplate: '<input type="checkbox" ng-click="grid.appScope.recordClick($event,row.entity)" value="{{row.entity.id}}" data-id="{{row.entity.id}}" data-name="{{row.entity.name}}" ng-model="row.entity.selected" name="seleArticle"/>'
                },
                {name:'name', displayName: '连锁药店公司',minWidth:120,headerCellClass:'cell-center', cellClass: 'cell-left'}
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
        $scope.gridOptions = $rootScope.getGridOptions();;
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;   //用于序号显示
            //引用hospitalServices中定义的http请求方式， 传入查询条件即可
            branchesstatisticsService.query($scope.gridOptions.queryPrarms,"get").success(function (data) {
                if(data.code==200){
                    $("#isAll").prop("checked",false);
                    $scope.isAll = false;
                    $scope.grid.data = data.data.datas;
                    $scope.gridOptions.totalCount = data.data.totalCount;
                }else{
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        
        //提取全选
        $scope.selectAll = function () {
            $scope.mapObj.clearMap();
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
            if($scope.idList.length!=0){//🈶️选中值才会去查询数据
                $scope.mapObj.bindCoordinate();//地图标记到地图
            }
        };
        //每次点击记录一次
        $scope.recordClick = function (e,entity) {
            $scope.mapObj.clearMap();
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
            if($scope.idList.length!=0){//🈶️选中值才会去查询数据
                $scope.mapObj.bindCoordinate();//地图标记到地图
            }
        };


        $scope.showGrid = function (){
            $(".hospital-grid-container").animate({width:"300px"});
            $(".resize-container-btn").animate({left:"300px"});
            $(".hospital-map-container").animate({left:"310px"});
            $scope.isShow = true;
        };
        $scope.hideGrid = function (){
            $(".hospital-grid-container").animate({width:"0"});
            $(".resize-container-btn").animate({left:"0"});
            $(".hospital-map-container").animate({left:"10px"});
            $scope.isShow = false;
        };
        
        
        //地图
        $scope.mapObj={
            map:null,
            //向地图中添加缩放控件
            ctrlNav:null,
            // //向地图中添加缩略图控件
            // ctrlOve:new window.BMap.OverviewMapControl({
            //     anchor: BMAP_ANCHOR_TOP_RIGHT,
            //     isOpen: 1
            // }),
            // ctrlSca: new window.BMap.ScaleControl({
            //     anchor: BMAP_ANCHOR_BOTTOM_LEFT
            // }),
            init:function (){
                this.map = new BMap.Map("hosMap",{minZoom:6});
                this.ctrlNav = new window.BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                    type: BMAP_NAVIGATION_CONTROL_LARGE
                });
                this.map.centerAndZoom("北京", 6);
                this.map.enableScrollWheelZoom();//启用滚轮放大缩小
                this.map.addControl(this.ctrlNav);
                // this.map.addControl(this.ctrlSca);
            },
            bindCoordinate:function (){
                var pharmacyName= $("input[name='pharmacyName']").val()?"":$("input[name='pharmacyName']").val();
                var me = this;
                branchesstatisticsService.getPharmacyCoordinate({checkedIds:$scope.idList.join(','),pharmacyName:$("input[name='pharmacyName']").val()}).success(function (data){
                    if(data.data){
                        $(data.data).each(function (index,value){
                            me.addMakerPoint(value);
                        });
                    }
                });
            },
            addMakerPoint:function (dataJson){
                var point = new BMap.Point(dataJson.longitude, dataJson.latitude);
                var marker = new BMap.Marker(point);
                var alertMessage = "<p style=’font-size:12px;lineheight:1.8em;’>" + dataJson.name;
                alertMessage += (dataJson.address == null || dataJson.address == "") ? "" : "</br>地址：" + dataJson.address;
                alertMessage += (dataJson.phone == null || dataJson.phone == "") ? "" : "</br> 电话：" + dataJson.phone;
                alertMessage += "</br></p>";
                var winContent = new BMap.InfoWindow(alertMessage);
                marker.addEventListener("mouseover", function () {
                    this.openInfoWindow(winContent);
                });
                this.map.addOverlay(marker);
            },
            clearMap:function (){
                this.map.clearOverlays();
            }
        };
        // $scope.mapObj.init();//加载地图

        
        $timeout(function(){
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});