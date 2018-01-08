/**
 * Created by yangdongbo on 15/6/11.
 */

define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('bodyCtrlController', ['$scope', '$rootScope', '$http', 'cisHttp', '$cookieStore', '$modal', "$location", "$timeout", "Layout","strUtils", function ($scope, $rootScope, $http, cisHttp, $cookieStore, $modal, $location, $timeout, Layout,strUtils) {

        //----------------------------表格模块基类函数  beign-------
        $rootScope.baseGrid = function () {
            //
            this.isSearch = true;
            //定义： 查询条件
            this.queryPrarms = {values:""};
            //刷新当前页码回传的pageIndex;
            this.curpage = 1;
            //this.items = [];
            //定义： 表格排序方法
            this.sort = function (colName, order) {
                this.queryPrarms.tableOrderName = colName;
                this.queryPrarms.tableOrderSort = order;
                this.getData();
            };
            //定义 ：分页点击查询方法
            this.paging = function (pIndex, pSize) {
                this.queryPrarms.pageIndex = pIndex;
                this.queryPrarms.pageSize = pSize;
                this.getData();
            }
            //定义：获取当前页码号及最大显示数
            this.getQueryPrarms = function () {
                if (this.queryPrarms.tableOrderName == undefined) {
                    this.queryPrarms.tableOrderName = '';
                }
                if (this.queryPrarms.tableOrderSort == undefined) {
                    this.queryPrarms.tableOrderSort = '';
                }
                if (this.isSearch == true) {
                    this.queryPrarms.pageIndex = 1;
                } else {
                    this.queryPrarms.pageIndex = this.curpage;
                }
                if (this.queryPrarms.pageSize == undefined) {
                    this.queryPrarms.pageSize = 10;
                }
            };
            //定义：查询触发方法
            this.search = function () {
                window.colActionSwitch = false;
                this.isSearch = true;
                this.setQueryPrarms();
                this.getQueryPrarms();
                this.getData();
            };
            //定义: 当前页刷新方法
            this.upLoad = function () {
                this.isSearch = false;
                this.setQueryPrarms();
                this.getQueryPrarms();
                this.getData();
            };

            /*
             * 控制器中需要定义的方法：
             * getData:function(){}         //定义： 查询发送http请求方法体
             *setQueryPrarms：function(){}  //定义：获取当次查询所有查询条件
             * queryPrarms.pageSize         //在当前queryPrams对象上属性重置： 可设定当前页初次加载时最大获取数据数量
             * */

        }
        //----------------------------表格模块基类函数  end---------


        //----------------------------公用方法定义  begin-----------
        $rootScope.baseCommonFn = {
            //字符串值，值为：undefined，null,或空字符串时，返回空串，否则返回该数据
            strIsEmpty: function (str) {
                if ((str == undefined || str == null) && (typeof (str) != 'string' || str.replace(/\s+/g, '').length == 0)) {
                    return '';
                } else {
                    return str;
                }
            },
            toBoolean: function (value) {

                if (typeof value === 'function') {
                    value = true;
                } else if (value && value.length !== 0) {
                    var v = this.lowercase("" + value);
                    value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
                } else {
                    value = false;
                }
                return value;
            },
            isString: function (value) { return typeof value === 'string'; },
            lowercase: function (string) { return this.isString(string) ? string.toLowerCase() : string; },
            isEmptyArr: function (value) {
                return value != undefined && value.length == 0 ? true : false;
            }
        }
        //----------------------------公用方法定义  end-------------

        //获取列表
        $scope.gateMenu = function () {
            $http.get('/home/GetMenuList', {}).success(function (data) {
                $scope.menus = data.data;
            })
        }
        //$scope.gateMenu();

        //重启bootstarp的tooltip提示
        $scope.tips = function () {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        }




        ////心跳
        //$scope.sessionMove = function () {
        //    $http.post('/home/HeartBeat', {}).success(function (data) {
        //        if ($scope.checkReqCode(data)) {
        //        } else {
        //            location.href = '/home/login';
        //        }
        //    })
        //}
        //心跳
        //setInterval(function () {
        //    $scope.sessionMove();
        //}, 6000);

        //搜索条件存储
        $scope.queryService = {
            //数据对象
            query: {},
            //新增
            queryAdd: function (key, val) {
                var url = $location.url().replace('/', '');

                if (url.indexOf('?') >= 0) {
                    url = url.slice(0, url.indexOf('?'));
                }
                if (!this.query[url]) {
                    this.query[url] = {};
                }
                this.query[url][key] = val;
                localStorage.setItem('queryModel', JSON.stringify(this.query));
            },
            //读取 广播
            queryRead: function (key, SCOPE) {
                var local = JSON.parse(localStorage.getItem('queryModel'))
                if (local == null || local == undefined) return false;
                this.query = local;
                var url = $location.url().replace('/', '');
                if (url.indexOf('?') >= 0) {
                    url = url.slice(0, url.indexOf('?'));
                }
                if (!this.query[url]) {
                    return false;
                };

                var value = this.query[url][key];
                if (value == null || value == undefined) return false;

                for (var k in value) {
                    SCOPE[k] = value[k];
                };
                return true;
            }
        };



        //弹窗拖拽，ng创建的弹窗获取不到偏移量， 正常使用的弹窗正常，为统一， 暂不开放此功能。
        //$scope.dragModel = function () {
        //    $(".modal-header").drag();
        //}
        //$scope.dragModel();

        //--------------------改变整个UI框架色调-----------------
        $scope.changeModalStyle={
            panel:$("#colorPanel"),
            change: function () {
                var closeBtn=this.panel.find('.closeBtn');
                var colorList=this.panel.find('.color-mode');
                if(closeBtn.is(":visible")){
                    closeBtn.hide();
                    colorList.hide();
                }else{
                    closeBtn.show();
                    colorList.show();
                }
            },
            setColor:function (event) {
                var target=$(event.target);
                var color=target.attr('data-style');
                target.addClass('current').siblings().removeClass('current');
                $('#style_color').attr("href", "../../mi-osp-nhl/css/common/" + color + ".css");
                window.localStorage.setItem('style_color', color);
            }
        }


        //--------------------刷新页面根据cookie初始化菜单状态-------------------------
        $scope.initialMenu = function () {
            var flag=false;
            var locationHref= $location.path().replace('\/','');
            $('.page-sidebar-menu>li a').each(function (n,ele) {
                var ele=$(ele);
                var parent=ele.parent().parent();
                if(flag==false){
                    if(ele.attr('href').replace('#','')==locationHref && ele.attr('href').replace('#','')!=''){
                        if(parent.is('.sub-menu')){
                            ele.parent().addClass('active');
                            parent.show().parent().addClass('active').siblings().removeClass('active');
                        }else{
                            ele.parent().addClass('active').siblings().removeClass('active');
                        }
                        flag=true;
                    }
                }else{
                    return false;
                }
            })
        }

        $scope.initialMenu();







        //菜单折叠和展开

        //菜单样式调整
        /*  $scope.setMenuH = function () {
         var menu = $("ul.menu");
         $(".submenu").css({
         "height": menu.height() - (menu.children('li').length * 28)
         });
         return $(".submenu");
         }*/

        $scope.initialMenu = function () {
            var menu = $("ul.menu");
            var th = null;
            $scope.menuCookie = $cookieStore.get('menu');
            if (!!$scope.menuCookie) {
                $scope.setMenuH().hide();
                for (var i = 0, len = $scope.menuCookie.menuList.length; i < len; i++) {
                    if ($scope.menuCookie.menuList[i] == 'true') {
                        $(".menu>li").eq(i).children('.submenu').show();
                    }
                }
            } else {
                $scope.setMenuH();
                var arr = [];
                var li=$(".menu>li");
                for (var n = 0; n < li.length; n++) {
                    if (li.eq(n).find('.submenu').is(':visible')) {
                        arr[n] = 'true';
                    } else {
                        arr[n] = 'false';
                    }
                }
                $cookieStore.put('menu', {
                    'menuList': arr
                });
            }
        }
        $scope.isFinish = function () {
            $scope.initialMenu();
        }
        $scope.isLeveFinish = function () {
            $scope.navSelect();
        }



        //面包屑
        $scope.breadcrumbObj = {}


        //启动年月控件,右下显示
        $scope.setmonthdate = function () {
            $('.datemonthpicker').datetimepicker('remove');
            $('.datemonthpicker').datetimepicker({
                language: "zh-CN",
                format: "yyyy-mm",
                Boolean: true,
                todayBtn: true,
                autoclose: true,
                startView:3,
                minView:3
            });
        };
        //启动年月控件,右上显示
        $scope.setmonthdatetop = function () {
            $('.datemonthpickertop').datetimepicker('remove');
            $('.datemonthpickertop').datetimepicker({
                language: "zh-CN",
                format: "yyyy-mm",
                Boolean: true,
                todayBtn: true,
                autoclose: true,
                startView:3,
                minView:3,
                pickerPosition:'top-right'
            });
        };
        //启动年月日控件,右下显示控件
        $scope.setdate = function () {
            $('.datepicker').datetimepicker('remove');
            $('div.datetimepicker.dropdown-menu').remove();

            $('.datepicker').datetimepicker({
                language: "zh-CN",
                format: "yyyy-mm-dd",
                Boolean: true,
                todayBtn: true,
                autoclose: true,
                minView: 2
            });
        };
        //启动年月日控件,右上显示控件
        $scope.setdatetop = function () {
            $('.datepickertop').datetimepicker('remove');
            $('div.datetimepicker.dropdown-menu').remove();


            $('.datepickertop').datetimepicker({
                language: "zh-CN",
                format: "yyyy-mm-dd",
                Boolean: true,
                todayBtn: true,
                autoclose: true,
                minView: 2,
                pickerPosition:'top-right'
            });
        };
        //启动年月日时分的日期控件,右下显示
        $scope.setdatetime = function(){
            $(".datetimepicker").datetimepicker({
                maxView:1,
                format : 'yyyy-mm-dd hh:ii',
                minuteStep:1,
                changeYear : true,
                autoclose:true,
                language:'zh-CN',
                todayBtn:true
            });
        };
        //启动年月日时分的日期控件,右上显示
        $scope.setdatetimetop = function(){
            $(".datetimepickertop").datetimepicker({
                maxView:1,
                format : 'yyyy-mm-dd hh:ii',
                minuteStep:1,
                changeYear : true,
                autoclose:true,
                language:'zh-CN',
                todayBtn:true,
                pickerPosition:'top-right'
            });
        };



        ////校验服务端返回
        //$rootScope.checkReqCode = $scope.checkReqCode = function (data) {
        //    if (!!data && data.code != undefined && data.msg != undefined && (data.data != undefined || data.data == null)) {
        //        switch (parseInt(data.code)) {
        //            case 201:
        //                $scope.$emit("Error", data.msg)
        //                //alert(data.msg);
        //                return false;
        //                //location.href=''
        //                //break;
        //            case 403:
        //                location.href = '/home/login';
        //                break;
        //                //case 300:break;
        //                //case 400:break;
        //            case 405:
        //            case 500:
        //                location.href = '/home/error?code=' + data.code + '&msg=' + data.msg;
        //                break;
        //        }
        //        return true;
        //    }
        //    else {
        //        return false;
        //    }
        //}



        $scope.angularPost = function (url, obj, cb) {
            $http.post(url, obj).success(function (data) {
                cb = data;
            });
        }

        $scope.angularGet = function (url, obj, cb) {
            $http.post(url, obj).success(function (data) {
                cb = data;
            });
        }




        $scope.AllPassas = function (auditType) {
            console.log(auditType);
            //$scope.loading.show();
            //$http.post("/P1ClaimAudit/GetFirstAuditDetail", { auditType: auditType }).error(function (data) {
            //}).success(function (data) {
            //    console.log(data);
            //    $scope.loading.hide();
            //    $scope.LoadingPolicyInfo(data);         //指令p1 的方法
            //})
        }


        $scope.errorTimer = null;
        //错误提示信息
        $scope.$on('Error', function (e, data) {
            window.clearTimeout($scope.errorTimer);
            $("#allErrorMsg").show();
            $("#allTipsMsg").show();
            $scope.Error = data;
            //if (a == '') { return;}
            $scope.Tips = '';
            $scope.errorTimer = window.setTimeout(function () {
                $("#allErrorMsg").fadeOut('0', function () {
                    $scope.Error = ''
                    //scope.$apply()
                });
            }, 5000)
        })
        $scope.$on('Tips', function (e, data) {
            window.clearTimeout($scope.errorTimer);
            $scope.Tips = data;
            $("#allErrorMsg").show();
            $("#allTipsMsg").show();
            //if (a == '') { return; }
            $scope.Error = '';
            $scope.errorTimer = window.setTimeout(function () {
                $("#allTipsMsg").fadeOut('0', function () {
                    //$scope.$apply()
                    $scope.Tips = '';
                });
            }, 5000)
        })


        //页面刷新后菜单选中状态
        $scope.navSelect = function () {
            var url = $location.url();
            var markPosition = url.indexOf("?");
            if (markPosition > 0) {
                url = url.substring(0, markPosition);
            }
            var href = null;
            $(".submenu>li>a").each(function () {
                href = $(this).attr('href');
                if (href.replace('#', '') == url.replace('/', '')) {
                    $(this).parent('li').addClass('active').parent('ul').show().parent('li').addClass('selected');
                }
            })
        };


        $scope.ChangePwd = function () {
            if ($scope.OldPwd == undefined || $scope.OldPwd == null || $scope.OldPwd == "") {
                $scope.errorMsg = "原密码不能为空";
                return false;
            }
            if ($scope.NewPwd == undefined || $scope.NewPwd == null || $scope.NewPwd == "") {
                $scope.errorMsg = "新密码不能为空";
                return false;
            }
            if ($scope.ReapteNewPwd == undefined || $scope.ReapteNewPwd == null || $scope.ReapteNewPwd == "") {
                $scope.errorMsg = "确认新密码不能为空";
                return false;
            }

            if ($scope.NewPwd != $scope.ReapteNewPwd) {
                $scope.errorMsg = "两次输入的新密码不一致";
                return false;
            }

            if ($scope.NewPwd == $scope.OldPwd) {
                $scope.errorMsg = "新旧密码一致，请更换新密码";
                return false;
            }


            $scope.errorMsg = "";

            $http.post("changepwd", { oldPwd: $scope.OldPwd, newPwd: $scope.NewPwd }).error(function (data) {
                bootbox.alert("服务器错误");
            }).success(function (data) {
                if (data.code == "200") {
                    $('#changePwModal').modal('hide');
                    bootbox.alert("密码修改成功");
                    $scope.cancel();
                } else {
                    $scope.errorMsg = data.msg;
                }
            });
        };
        //清空密码数据
        $scope.cancel = function (){
            $("input[name='userOldPswd']","#changePwModal").val("");$("input[name='userNewPswd']","#changePwModal").val("");
            $("input[name='repeatNewPswd']","#changePwModal").val("");$scope.errorMsg = "";
        };
        $scope.menuContainerSize = 195;
        $scope.test = function() {
            $scope.menuContainerSize+=10;


            //$timeout(function(){
            //    $scope.updateDisplay();
            //});

            console.log($scope.menuContainerSize);

            $timeout(function() {
                //$scope.updateDisplay();
                Layout.updateDisplay();
            }, 10);
        }

        $scope.resizeMenu = function(size) {
            //alert('xxxx');
            $scope.menuContainerSize = size;
            //
            //
            // console.log($scope.menuContainerSize);
            //
            $timeout(function() {
                Layout.updateDisplay();
            }, 10);
        }

        //ycc,为解决收缩菜单右侧表格遮挡住搜索条件问题
        $scope.autoSetGridPosition = function (){
            $timeout(function() {
                $(".grid-top-setting").each(function (){
                    var top = $(this).prev().css("height");
                    $(this).css("top",top);
                });
            }, 10);
        };

        //if (!$scope.sizeA) {
        //    $scope.sizeA = 30;
        //}
        //
        //if (!$scope.sizeB) {
        //    $scope.sizeB = 70;
        //}
        //
        //$scope.setSize = function() {
        //    $scope.sizeA++;
        //    $scope.sizeB--;
        //
        //    setTimeout(function() {
        //        console.info($scope.sizeA + " " + $scope.sizeB);
        //        $scope.updateDisplay();
        //    }, 10);
        //
        //}

        //公用的分页方法在子Controller里面调用
        $rootScope.getGridOptions = function(){
            return {
                queryPrarms : function (){
                    if ($scope.queryPrarms == undefined) {
                        return {pageSize: 25, pageIndex: 1};
                    }else{
                        return $scope.queryPrarms;
                    }
                },
                //查询条件搜索 类型转换方法
                setQueryValues : function (){
                    var obj = this.queryPrarms;
                    for(var areumentKey in arguments){
                        var queryValue = arguments[areumentKey];
                        for (var queryKey in queryValue) {
                            obj[queryKey] = strUtils.queryValueTransformation(queryValue[queryKey]);
                        }
                    }
                },
                getQueryPrarms : function () {
                    if (this.queryPrarms.tableOrderName == undefined) {
                        this.queryPrarms.tableOrderName = '';
                    }
                    if (this.queryPrarms.tableOrderSort == undefined) {
                        this.queryPrarms.tableOrderSort = '';
                    }
                    if (this.isSearch == true) {
                        this.queryPrarms.pageIndex = 1;
                    } else {
                        this.queryPrarms.pageIndex = this.curpage;
                    }
                    if (this.queryPrarms.pageSize == undefined) {
                        this.queryPrarms.pageSize = 25;
                    }
                },
                sort : function (colName, order) {
                    this.queryPrarms.tableOrderName = colName;
                    this.queryPrarms.tableOrderSort = order;
                    this.getData();
                },
                search : function () {
                    this.isSearch = true;
                    this.setQueryPrarms();
                    this.getQueryPrarms();
                    this.getData();
                }
            };
        };

        //$rootScope.pagerOptions = {
        //        queryPrarms : function (){
        //            if ($scope.queryPrarms == undefined) {
        //                return {pageSize: 25, pageIndex: 1};
        //            }else{
        //                return $scope.queryPrarms;
        //            }
        //        },
        //        //查询条件搜索 类型转换方法
        //        setQueryValues : function (){
        //            var obj = this.queryPrarms;
        //            for(var areumentKey in arguments){
        //                var queryValue = arguments[areumentKey];
        //                for (var queryKey in queryValue) {
        //                    obj[queryKey] = strUtils.queryValueTransformation(queryValue[queryKey]);
        //                }
        //            }
        //        },
        //        getQueryPrarms : function () {
        //            if (this.queryPrarms.tableOrderName == undefined) {
        //                this.queryPrarms.tableOrderName = '';
        //            }
        //            if (this.queryPrarms.tableOrderSort == undefined) {
        //                this.queryPrarms.tableOrderSort = '';
        //            }
        //            if (this.isSearch == true) {
        //                this.queryPrarms.pageIndex = 1;
        //            } else {
        //                this.queryPrarms.pageIndex = this.curpage;
        //            }
        //            if (this.queryPrarms.pageSize == undefined) {
        //                this.queryPrarms.pageSize = 25;
        //            }
        //        },
        //        sort : function (colName, order) {
        //            this.queryPrarms.tableOrderName = colName;
        //            this.queryPrarms.tableOrderSort = order;
        //            this.getData();
        //        },
        //        search : function () {
        //            this.isSearch = true;
        //            this.setQueryPrarms();
        //            this.getQueryPrarms();
        //            this.getData();
        //        }
        //};

        //set back displayName direction
        $rootScope.direction = {
            //removeDirection remove the target parent and child's className or attr
            removeDirection:function(){
                if($scope.spanObj){
                    $($scope.spanObj).next().attr("aria-label","Sort None").removeClass().addClass("ui-grid-invisible").children("i").removeClass().addClass("ui-grid-icon-blank");
                    $($scope.spanObj).parent().parent().attr("aria-sort","none");
                }
            },
            //get tag
            getDirection:function(direction){
                switch(direction)
                {
                    case "asc"://Forward Sorting
                        window.localStorage.spanAria="Sort Ascending";window.localStorage.spanClass="";window.localStorage.iCLass="ui-grid-icon-up-dir";window.localStorage.divSort="ascending";
                        break;
                    case "desc"://Reverse Sorting
                        window.localStorage.spanAria="Sort Descending";window.localStorage.spanClass="";window.localStorage.iCLass="ui-grid-icon-down-dir";window.localStorage.divSort="descending";
                        break;
                    default:// no Sorting
                        window.localStorage.spanAria="Sort None";window.localStorage.spanClass="ui-grid-invisible";window.localStorage.iCLass="ui-grid-icon-blank";window.localStorage.divSort="none";
                }
            },
            //Set the direction of the sort ,add the target parent and child's className or attr
            setDirection:function(){
                if(window.localStorage.name)
                {
                    var spanObj = '';
                    var oSpan = $('.ui-grid-header-cell-label');
                    for (var i=0;i<oSpan.length-1;i++){
                        if (oSpan.eq(i).text()==window.localStorage.displayName){
                            $scope.spanObj = oSpan[i];
                        }
                    }
                    $($scope.spanObj).next().attr("aria-label",window.localStorage.spanAria).removeClass().addClass(window.localStorage.spanClass).children("i").removeClass().addClass(window.localStorage.iCLass);
                    $($scope.spanObj).parent().parent().attr("aria-sort",window.localStorage.divSort);
                }
            }
        };


        //汉化提示框
        bootbox.setLocale("zh_CN");
    }])
});

