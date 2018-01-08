/**
 * Created by xietianyou on 2016/4/20.
 */

define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('certExtractController', ['$scope', '$http', '$rootScope', '$timeout', 'doctorauditService', '$routeParams', '$location', 'strUtils', function ($scope, $http, $rootScope, $timeout, doctorauditService, strUtils) {
        window.localStorage.bol = 'true';
        $scope.ageError = false;
        $scope.genderError = false;
        $scope.msgNotice = 1;
        $scope.idNumberError = false;
        $scope.dateError = false;

        //左侧列表
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
                    name: 'loginname',
                    width: 120,
                    displayName: '用户名',
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center'
                },
                {
                    name: 'doctor_RealName',
                    width: 80,
                    displayName: '姓名',
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center'
                },
                {
                    name: 'createTime',
                    displayName: '申请时间',
                    width: 140,
                    cellFilter: 'date:"yyyy-MM-dd HH:mm"',
                    headerCellClass: 'cell-center',
                    cellClass: 'cell-center'
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn({
                    name: 'rowHeader',
                    displayName: '　',
                    width: '30',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
                });
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length > 0) {
                        $scope.tableOrderName = sortColumns[0].name;
                        $scope.tableOrderSort = sortColumns[0].sort.direction;
                    }
                    $scope.query();
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var rowEntity = row.entity,
                        rowIsSelected = row.isSelected;
                    if (rowIsSelected) {
                        $scope.detailById(rowEntity.id);
                    }
                });
            }
        };
        //查询任务方法
        $scope.query = function () {
            var obj = {};
            // obj.hospitalName = $scope.strIsEmpty($scope.hospitalName);
            // obj.hospitalState = $scope.strIsEmpty($scope.hospitalState);
            // obj.hospitalLocation = $scope.strIsEmpty($scope.hospitalLocation);
            // obj.hospitalClass = $scope.strIsEmpty($scope.hospitalClass);
            // obj.tableOrderName = $scope.tableOrderName;
            // obj.tableOrderSort = $scope.tableOrderSort;
            doctorauditService.getextractedlist(obj, "get").success(function (data, status) {
                //返回的要渲染的数据
                $scope.grid.data = data.data;
                if ($scope.grid.data != null && $scope.grid.data != '') {
                    $scope.isShowPhoto = true;
                    // $scope.detailById(data.data[0].doctorId);
                    //默认第一条被选中，高亮显示
                    $timeout(function () {
                        $scope.gridApi.selection.selectRow($scope.grid.data[0]);
                    }, 10);
                } else {
                    //设置是否显示照片
                    $scope.isShowPhoto = false;
                }
            });
        };
        $scope.query();

        //获取当前任务数
        $scope.taskcount = function () {
            doctorauditService.gettaskcount().success(function (data) {
                $scope.tasknum = data.data;
            });
        };
        $scope.taskcount();

        //根据ID查询明细
        $scope.detailById = function (val) {
            if ($scope.items != null && val != $scope.items.id) {
                $scope.idNumber = '';
                $scope.practicecert_num = '';
                $scope.titlecert_num = '';
                $scope.cert.idNumber.$setUntouched();
                $scope.cert.practicecert_num.$setUntouched();
                $scope.cert.titlecert_num.$setUntouched();
                $scope.cert.$setPristine();
            }
            doctorauditService.getdutymetadata().success(function (data) {
                $scope.dutyMeta = data.data;
                doctorauditService.querybyid({id: val}).success(function (data) {
                    $scope.items = data.data;
                    if ($scope.items.idcard_img) {
                        $scope.it1.load("downloadfile?dfsFile=" + $scope.items.idcard_img + "&userid=");
                    } else {
                        $scope.it1.load("image/defaultIdnumberPic.png");
                    }
                    if ($scope.items.practiceCert) {
                        $scope.it2.load("downloadfile?dfsFile=" + $scope.items.practiceCert + "&userid=");
                    } else {
                        $scope.it2.load("image/defaultPracticePic.png");
                    }
                    if ($scope.items.practice_change_img) {
                        $scope.it3.load("downloadfile?dfsFile=" + $scope.items.practice_change_img + "&userid=");
                    } else {
                        $scope.it3.load("image/defaultPracticePic.png");
                    }
                    if ($scope.items.titlecert_img) {
                        $scope.it4.load("downloadfile?dfsFile=" + $scope.items.titlecert_img + "&userid=");
                    } else {
                        $scope.it4.load("image/defaultTitlePic.png");
                    }
                    if ($scope.items.work_img) {
                        $scope.workImgUrl = "downloadfile?dfsFile=" + $scope.items.work_img + "&userid=";
                    } else {
                        $scope.workImgUrl = "image/defaultHeadPic.png";
                    }
                });
            });
        };
        //显示大图
        $scope.showBigPic = function () {
            if ($scope.workImgUrl != "image/defaultHeadPic.png") {
                $("#picShowModal").modal();
            }
        };
        //放弃任务
        $scope.giveUpTask = function (val) {
            bootbox.confirm("确定放弃当前任务？", function (result) {
                if (result) {
                    doctorauditService.giveuptask({id: val}).success(function (data) {
                        if (data.code == 200) {
                            $scope.tasknum = $scope.tasknum - 1;
                            if ($scope.tasknum == 0) {
                                $scope.items = null;
                                $scope.authenMore = null;
                                $scope.membercount = null;
                                $scope.authencount = null;
                                $scope.comeback();//返回列表页
                            }
                            $scope.query();
                        }
                        else {
                            bootbox.alert(data.msg);
                        }
                    });
                }
            });
        };
        //放弃所有任务
        $scope.giveUpAllTask = function (val) {
            bootbox.confirm("确定放弃全部任务？", function (result) {
                if (result) {
                    doctorauditService.giveupalltask().success(function (data) {
                        // bootbox.alert(data.msg);
                        if (data.code == 200) {
                            $scope.tasknum = 0;
                            $scope.items = null;
                            $scope.authenMore = null;
                            $scope.membercount = null;
                            $scope.authencount = null;
                            $scope.comeback();//返回列表页
                        }
                    })
                }
            });
        };


        $scope.idNumberChange = function () {
            $scope.ageError = false;
            $scope.genderError = false;
            $scope.idNumberError = false;
            $scope.dateError = false;
            if ($scope.idNumber != null && $scope.idNumber.length == 18) {
                $scope.myDate = new Date();
                $scope.nowYear = $scope.myDate.getFullYear();
                $scope.yearStr = $scope.idNumber.substring(6, 10);
                $scope.monthStr = $scope.idNumber.substring(10, 12);
                $scope.dayStr = $scope.idNumber.substring(12, 14);
                $scope.genStr = $scope.idNumber.substring(16, 17);

                $scope.dateValid = $scope.checkDate($scope.yearStr + "-" + $scope.monthStr + "-" + $scope.dayStr);
                if ($scope.dateValid) {
                    $scope.dateError = false;
                } else {
                    $scope.dateError = true;
                    return;
                }
                if ($scope.myDate < new Date($scope.yearStr + "-" + $scope.monthStr + "-" + $scope.dayStr)) {
                    $scope.dateError = true;
                    return;
                }
                if (($scope.nowYear - $scope.yearStr) < 0 || ($scope.nowYear - $scope.yearStr) > 120) {
                    $scope.dateError = true;
                    return;
                }
                if ($scope.items.doctor_Gender != null && ($scope.genStr % 2) != ($scope.items.doctor_Gender % 2)) {
                    $scope.genderError = true;
                    return;
                }
                $scope.isIdNumberVaild = $scope.IdentityCodeValid($scope.idNumber);
                if ($scope.isIdNumberVaild) {
                    $scope.idNumberError = false;
                } else {
                    $scope.idNumberError = true;
                }
            }
        };

        //审核通过
        $scope.updateauthenstatusSucc = function (valid) {
            if (valid && !$scope.ageError && !$scope.genderError && !$scope.dateError && !$scope.idNumberError) {
                var itemval = {
                    id: $scope.items.id,
                    authenstatus: 2,
                    reason: $scope.reason,
                    note: $scope.note,
                    createtime: $scope.items.createTime,
                    doctor_IdNumber: $scope.idNumber,
                    doctor_Practicecert_Num: $scope.practicecert_num,
                    doctor_Titlecert_Num: $scope.titlecert_num,
                    msgNotice: $scope.msgNotice
                };
                bootbox.confirm("确定通过此申请？", function (result) {
                    if (result) {
                        doctorauditService.updateCertification(itemval).success(function (data) {
                            if (data.code == 200) {
                                $scope.tasknum = $scope.tasknum - 1;
                                $('#note').val("");
                                if ($scope.tasknum == 0) {
                                    $scope.items = null;
                                    $scope.authenMore = null;
                                    $scope.membercount = null;
                                    $scope.authencount = null;
                                    $scope.comeback();//返回列表页
                                }
                                else {
                                    $scope.idNumber = '';
                                    $scope.practicecert_num = '';
                                    $scope.titlecert_num = '';
                                    $scope.cert.idNumber.$setUntouched();
                                    $scope.cert.practicecert_num.$setUntouched();
                                    $scope.cert.titlecert_num.$setUntouched();
                                    $scope.cert.$setPristine();
                                    $scope.query();
                                }
                            } else {
                                bootbox.alert(data.msg);
                            }
                        });
                    }
                });
            }
        };

        //审核失败
        $scope.updateauthenstatusFail = function (valid) {
            if (valid) {
                var itemval = {
                    id: $scope.items.id,
                    authenstatus: 3,
                    reason: $scope.reason,
                    note: $scope.note,
                    createtime: $scope.items.createTime,
                    msgNotice: $scope.msgNotice
                };
                doctorauditService.updateCertification(itemval).success(function (data) {
                    if (data.code == 200) {
                        $scope.tasknum = $scope.tasknum - 1;
                        $('#note').val("");
                        $('#reason').val("");
                        $scope.cancel();    //关闭窗口
                        if ($scope.tasknum == 0) {
                            $scope.items = null;
                            $scope.authenMore = null;
                            $scope.membercount = null;
                            $scope.authencount = null;
                            $scope.comeback();//返回列表页
                        }
                        else {
                            $scope.query();
                        }
                    } else {
                        $scope.cancel();    //关闭窗口
                        bootbox.alert(data.msg);
                    }
                });
            }
        };

        //关闭模态窗口
        $scope.cancel = function (form) {
            $scope.reason = '';
            // form.$setPristine();
            // form.$setUntouched();
            $scope.scheduleextractForm.$setPristine();
            $scope.scheduleextractForm.$setUntouched();
            $('#myModal').modal('hide');
        };

        //返回
        $scope.comeback = function () {
            // window.location.href = "#doctoraudit";
            if (window.localStorage.length != 0) {
                window.location.href = "#doctoraudit";
            } else {
                window.location.href = "#";
            }
        };


        $scope.IdentityCodeValid = function (code) {
            var city = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外 "
            };
            var tip = "";
            var pass = true;

            // if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            //     tip = "身份证号格式错误";
            //     pass = false;
            // }

            if (!city[code.substr(0, 2)]) {
                tip = "地址编码错误";
                pass = false;
            }
            else {
                //18位身份证需要验证最后一位校验位
                if (code.length == 18) {
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                    //校验位
                    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++) {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if (parity[sum % 11] != code[17].toUpperCase()) {
                        tip = "校验位错误";
                        pass = false;
                    }
                }
            }
            // if(!pass) alert(tip);
            return pass;
        };

        $scope.checkDate = function (date) {
            return (new Date(date).getDate() == date.substring(date.length - 2));
        }
    }]);
});