/**
 * Created by xmy on 2016/11/10.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('doctorgroupListController', ['$scope', '$rootScope','$timeout','doctorgroupService',function ($scope, $rootScope,$timeout,doctorgroupService) {
        $scope.idList = [];//定义勾选集合,存储所有的勾选记录
        $scope.idSave = [];//点击保存的id集合
        $scope.isAll = false;//设置全选复选框的默认值

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
                {name: 'name', displayName: '名称',minWidth:100, headerCellClass: 'cell-center',
                    cellTemplate: '<div class=\'ui-grid-cell-contents\'><a ng-if="grid.appScope.permission.doctorgroupDetail" href="#doctorgroup/detail/:{{row.entity.id}}"><span ng-bind="row.entity.name"></span></a><span ng-if="!grid.appScope.permission.doctorgroupDetail" ng-bind="row.entity.name"></span></div>'
                },
                {name: 'code', displayName: '编码',minWidth:80, headerCellClass: 'cell-center'},
                {name: 'phone', displayName: '联系方式',minWidth:100, headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'url', displayName: '网址',minWidth:120, headerCellClass: 'cell-center', cellClass: 'cell-left'},

                {name: '_oper', displayName: '操作', width: 170, enableSorting: false, enableColumnResizing: false, headerCellClass: 'cell-center', cellClass: 'cell-center',
                    cellTemplate: '<div division-line class="ui-grid-cell-contents grid-oper-column">' +
                    '   <a ng-if="grid.appScope.permission.doctorgroupDetail" href="#doctorgroup/detail/:{{row.entity.id}}">' +
                    '       <i class="icon-file-text-o"></i> 详情' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.doctorgroupEdit" href="#doctorgroup/edit/:{{row.entity.id}}" class="operate-a">' +
                    '      <i class="icon-edit"></i> 编辑' +
                    '   </a>' +
                    '   <a ng-if="grid.appScope.permission.doctorgroupDelete" ng-click="grid.appScope.delhospital(row.entity.id)">' +
                    '      <i class="icon-trash-o"></i> 删除' +
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
                        $scope.gridOptions.sort('', '');
                    } else {
                        $scope.gridOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction,sortColumns[0].displayName);
                        $rootScope.direction.getDirection(sortColumns[0].sort.direction);
                    }
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    window.localStorage.selectRow = row.grid.renderContainers.body.visibleRowCache.indexOf(row);
                    if (rowIsSelected) {
                        $scope.hospitalDetail = rowEntity;
                        $scope.searchDepartment($scope.hospitalDetail.id);
                    }
                });
            }
        };

        $scope.gridOptions = $rootScope.getGridOptions();
        $scope.gridOptions.setQueryPrarms = function(){
            $scope.gridOptions.setQueryValues($scope.searchParams);      //查询条件搜索 类型转换方法
        };
        $scope.gridOptions.getData = function(){
            $scope.pageSize = $scope.gridOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.pageIndex = $scope.gridOptions.queryPrarms.pageIndex;     //用于序号显示
            doctorgroupService.QueryHospitalList($scope.gridOptions.queryPrarms).success(function (data) {
                if (data.code == 200) {
                    $scope.permission = data.permission;
                    $scope.grid.data = data.data.result.datas;
                    $scope.gridOptions.totalCount = data.data.result.totalCount;
                    if($scope.gridOptions.totalCount==0){
                        $scope.nodata = true;
                        $scope.flag = true;
                    }else{
                        $scope.nodata = false;
                        $scope.flag = false;
                    }
                    //默认第一条被选中，高亮显示
                    $timeout(function () {
                        if($scope.grid.data[0]){
                            $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                        }
                    }, 100);
                } else {
                    $scope.grid.data = [];
                    $scope.gridOptions.totalCount = 0;
                    bootbox.alert(data.msg);
                }
            });
        };

        //删除医生集团
        $scope.delhospital = function(id){
            bootbox.confirm("确定删除该医生集团？", function (result) {
                if (result) {
                    doctorgroupService.DelHospital({id:id}).success(function(data){
                        if(data.code==200){
                            $scope.gridOptions.search();
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            })
        };

        //获取搜索条件省份
        doctorgroupService.getarea({ parentId: "0"}).success(function (data) {
            $scope.provinceDatas = data.data;
            if($scope.searchParams){
                doctorgroupService.getarea({ parentId: $scope.searchParams.province }).success(function (data) {
                    $scope.cityDatas = data.data;
                });
                doctorgroupService.getarea({ parentId: $scope.searchParams.city }).success(function (data) {
                    $scope.districtDatas = data.data;
                });
            }
        });
        //搜索条件省份选择变化
        $scope.provinceSelectChange = function () {
            $scope.districtDatas=[];$scope.cityDatas=[];//清空市,区数据
            if($scope.searchParams.city){
                $scope.searchParams.city="";//清空绑定的市值
                $scope.searchParams.district="";//清空绑定的区值
            }
            var pid = $("select[name='province'] option:selected").val();
            if(pid!=""){
                doctorgroupService.getarea({ parentId: pid }).success(function (data) {
                    $scope.cityDatas = data.data;$scope.citySelectChange();
                });
            }
        };
        //搜索条件城市变化
        $scope.citySelectChange = function () {
            $scope.districtDatas=[];//清空区数据
            if($scope.searchParams.district){
                $scope.searchParams.district="";//清空绑定的区值
            }
            var cid = $("select[name='city'] option:selected").val();
            if(cid!=""){
                doctorgroupService.getarea({ parentId: cid }).success(function (data) {
                    $scope.districtDatas = data.data;
                });
            }
        };

        //医生
        $scope.searchDepartment = function(id){
            doctorgroupService.QueryDoctorgroupDoctorList({id:id}).success(function (data) {
                if(data.data.totalCount==0){
                    $scope.flag = true;
                }else{
                    $scope.flag = false;
                    $scope.departList = data.data.datas;
                }
            });
        };

        //获取专业科室列表
        doctorgroupService.QueryMedicalDepartTree().success(function(data){
            if(data.code==200){
                $scope.result = data.data.result;
                for(var i=0;i<$scope.result.length;i++){
                    $scope.result[i].newName = "";
                    var level = $scope.result[i].level_;
                    var string = "";
                    if(level>1){
                        for(var j=1;j<level;j++){
                            string+="&nbsp;&nbsp;&nbsp;";
                        }
                        $scope.result[i].newName=string+$scope.result[i].name;
                    }else{
                        $scope.result[i].newName=$scope.result[i].name;
                    }
                }
                $scope.prodepartmentList = $scope.result;
            }
        });

        $scope.showDepartment = function(){
            if($scope.nodata) {
                bootbox.alert("请选择医生集团！");
            }else{
                $scope.doctorOptions.search();
                $('#departmentModal').modal('show');
            }
        };

        //取消添加
        $scope.cancleAdddepart = function(){
            $('#departmentModal').modal('hide');
            $scope.idList = [];
            $scope.idSave = [];
        };

        //删除
        $scope.delDepart = function(id){
            bootbox.confirm("确定删除该医生？", function (result) {
                if (result) {
                    doctorgroupService.DelDoctorgroupDoctor({id:id}).success(function(data){
                        if(data.code==200){
                            $scope.searchDepartment($scope.hospitalDetail.id);
                        }else{
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };


        //用户列表弹窗grid
        $scope.gridDoctor = {
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
                {name: 'gender', displayName: '性别', width: 50, cellFilter: 'genderName', headerCellClass: 'cell-center', cellClass: 'cell-center'},
                {name: 'hospitalName', displayName: '医院', headerCellClass: 'cell-center', cellClass: 'cell-left'},
                {name: 'hospitalDepartName', displayName: '科室', headerCellClass: 'cell-center', cellClass: 'cell-left'},

            ],
            onRegisterApi: function (gridApi) {
                $scope.gridDoctorApi = gridApi;
                $scope.gridDoctorApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.doctorPageSize*(grid.appScope.doctorPageIndex-1)+grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridDoctorApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        $scope.doctorOptions.sort('', '');
                    } else {
                        $scope.doctorOptions.sort(sortColumns[0].name, sortColumns[0].sort.direction);
                    }
                    $scope.doctorOptions.search();
                });
            }
        };
        $scope.doctorOptions = $rootScope.getGridOptions();
        $scope.doctorOptions.setQueryPrarms = function () {
            $scope.doctorParams ={};
            $scope.doctorParams.groupId = $scope.hospitalDetail.id;
            $scope.doctorOptions.setQueryValues($scope.doctorParams);      //查询条件搜索 类型转换方法
        };
        $scope.doctorOptions.getData = function () {
            $scope.doctorPageSize = $scope.doctorOptions.queryPrarms.pageSize;     //用于序号显示
            $scope.doctorPageIndex = parseInt($scope.doctorOptions.queryPrarms.pageIndex);   //用于序号显示
            doctorgroupService.QueryDoctorSelList($scope.doctorOptions.queryPrarms).success(function (data) {
                //返回的要渲染的数据
                $("#isAll").prop("checked",false);
                $scope.isAll = false;
                $scope.gridDoctor.data = data.data.datas;
                $scope.gridDoctor.data.isAll = false;
                $scope.doctorOptions.totalCount = data.data.totalCount;
            });
        };

        $scope.saveDoctor =function () {
            //$scope.idList
            doctorgroupService.InsertDoctorgroupDoctor({
                doctorArray: $scope.idList.join(),
                groupId: $scope.hospitalDetail.id
            }).success(function (data) {
                if (data.code == 200) {
                    $scope.searchDepartment($scope.hospitalDetail.id);
                    $scope.idList = [];
                    $scope.idSave = [];
                } else {
                    bootbox.alert(data.msg);
                }
            })
        };

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

        $timeout(function () {
            $scope.gridOptions.search();
            $rootScope.direction.setDirection();
            window.localStorage.bol = 'false';
        }, 0, false);
    }]);
});
