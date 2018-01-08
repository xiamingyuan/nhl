/**
 * Created by tangwenpei on 16/5/20.
 */
define(['./module'], function (directives) {
    'use strict';
    //表格功能模块
    directives.directive('ngCisGrid', function ($route, $compile) {
        return {
            restrict: "A",
            scope: true,
            compile: function (ele, attr) {
                //compile函数在link函数执行前对DOM进行改造，这个时候获取不到scope对象,此方法return的函数即为link函数
                var tableModule = {
                    //未设置表格宽度时的默认宽度值
                    defaultWidth: '150',
                    //th的html
                    thHtml: '',
                    //table宽度
                    nTableWidth: 0,
                    //设置的表格列宽度
                    colwidth: '',
                    //设置的表格列标识
                    colName: '',
                    //是否允许调整表格列宽度
                    allowresize: '',
                    //是否嵌套溢出隐藏dom
                    allowwrap: '',
                    //是否排序
                    allowsort: '',
                    //克隆table
                    cloneTable: null,
                    //获取当前url,
                    getUrl: function () {
                        var url = location.hash.replace("#/", '');
                        if (url.indexOf('?') >= 0) {
                            url = url.slice(0, url.indexOf('?'));
                        } else {
                            if (url.indexOf('/') >= 0) {
                                url = url.replace('/', '');
                            }
                        }
                        return url;
                    },
                    //判断值 是否为 空 ，undefined, null,
                    //只能判断1个值，空字符串，空对象，空数组，undefined，null，function无返回值或返回值为null时都为true
                    isEmpty: function (o) {
                        var flag = true;
                        switch (typeof (o)) {
                            case 'string':
                                if (o.replace(/\s/g, '').length > 0) {
                                    flag = false;
                                }
                                break;
                            case 'object':
                                if ((o instanceof Object) == true) {
                                    if ((o instanceof Array) == true) {
                                        //数组
                                        if (o.length != 0) {
                                            flag = false;
                                        }
                                    } else {
                                        //{}对象
                                        for (var k in o) {
                                            flag = false;
                                        }
                                    }
                                }
                                break;
                            case 'number':
                                flag = false;
                                break;
                            case 'function':
                                if (o() != undefined || o() != null) {
                                    flag = false;
                                }
                                break;
                            case 'undefined':
                                break;
                            default:
                                break;
                        }
                        return flag;
                    },
                    //向表格th,td及subdiv赋值
                    setThWidth: function (th, storeInfo_code) {
                        ////==============如果列宽度等信息未存储过，则读取表格上的设置， 如果存储过，则读取存储信息，并赋值===========================
                        this.colwidth = th.attr('colwidth');
                        //如果未储存过信息
                        if (storeInfo_code == false) {
                            //colwidth 已定义 且 为纯数字 且 数值不为0；
                            if (this.colwidth != undefined && isNaN(this.colwidth) == false && Number(this.colwidth) != 0) {
                                th.css('width', this.colwidth);
                                if (th.children('div.subdiv').length > 0) {
                                    th.children('.subdiv').css('width', Number(this.colwidth) - 5);
                                }
                                tableModule.nTableWidth += parseInt(this.colwidth)
                            } else {
                                //否则设置默认值
                                th.css('width', this.defaultWidth);
                                if (th.children('div.subdiv').length > 0) {
                                    th.children('.subdiv').css('width', Number(this.defaultWidth - 5));
                                }
                                tableModule.nTableWidth += parseInt(this.defaultWidth)
                            }
                        } else {
                            th.css('width', storeInfo_code);
                            if (th.children('div.subdiv').length > 0) {
                                th.children('.subdiv').css('width', Number(storeInfo_code) - 5);
                            }
                            tableModule.nTableWidth += parseInt(storeInfo_code)
                        }
                    },
                    //为table添加样式及计算初始宽度
                    setInitTable: function () {
                        ele.css({
                            "table-layout": "fixed",
                            "width": tableModule.nTableWidth,
                            "max-width": "auto"
                        });
                    },
                    //向th添加dom并设置初始宽度
                    setTh: function () {
                        var thDom = '';
                        var tableMark = ele.attr('ng-cis-grid');

                        if (!!$route.current) {
                            var controllerName = $route.current.controller;
                        } else {
                            var controllerName = 'cis';
                        }

                        var tableIdentify = controllerName + tableMark;
                        //读取存储的表格宽度信息
                        var storeInfo = tableModule.RWtableStyle.read(tableIdentify);
                        var storeInfo_code = '';

                        ele.children("thead").children('tr').children('th').each(function () {
                            tableModule.thHtml = $(this).html();
                            //判断是否允许排序，添加dom
                            tableModule.colName = $(this).attr('colname');
                            if (tableModule.colName == null || tableModule.colName == undefined) {
                                console.error('Colname is not defined');
                            } else if (tableModule.colName.replace(/\s/g, '').length == 0) {
                                console.error("Colname's value can't be empty");
                            }

                            tableModule.allowsort = $(this).attr('allowsort');
                            if (tableModule.isEmpty(tableModule.allowsort)) {
                                $(this).attr({
                                    "ng-click": "tableSort.toggle($event)"
                                });
                                thDom = tableModule.thHtml +
                                    '<i class="tableSortIcon glyphicon {{ ' + tableMark + '.sortCode.' + tableModule.colName + '.sortOrder| orderClass}}"></i>';
                            } else {
                                thDom = tableModule.thHtml;
                                $(this).addClass('noSortCursor')
                            }
                            //判断是否可拖拽,添加dom
                            tableModule.allowresize = $(this).attr('allowresize');
                            if (tableModule.allowresize == 'true' || tableModule.allowresize == undefined) {
                                thDom += '<span class="moveBorder"></span>';
                            }
                            //获取表格宽度并赋值
                            $(this).addClass('subdiv').html(thDom);

                            //给表格宽度赋值
                            if (storeInfo == false) {
                                storeInfo_code = false;
                            } else {
                                storeInfo_code = storeInfo[tableModule.colName];
                            }
                            tableModule.setThWidth($(this), storeInfo_code);
                        });


                        //设置table宽度
                        tableModule.setInitTable();
                    },
                    //向td添加dom并设置初始宽度
                    setTd: function () {
                        ele.find('tbody>tr>td').each(function () {
                            $(this).addClass('subdiv');
                        })
                    },
                    //存储表格列宽度
                    RWtableStyle: {
                        tableStyle: {},
                        add: function (key, val) {
                            var local = JSON.parse(sessionStorage.getItem('RWtableStyle'));
                            if (local) {
                                this.tableStyle = local;
                            }
                            var url = tableModule.getUrl();


                            if (!!$route.current) {
                                var controllerName = $route.current.controller;
                            } else {
                                var controllerName = 'cis';
                            }
                            if (!this.tableStyle[url]) {
                                this.tableStyle[url] = {};
                            }
                            //key = controllerName + '-' + key;
                            this.tableStyle[url][key] = val;
                            sessionStorage.setItem('RWtableStyle', JSON.stringify(this.tableStyle));
                        },
                        read: function (key) {
                            var local = JSON.parse(sessionStorage.getItem('RWtableStyle'));
                            if (local == null || local == undefined) return false;
                            var url = tableModule.getUrl();


                            if (!!$route.current) {
                                var controllerName = $route.current.controller;
                            } else {
                                var controllerName = 'cis';
                            }
                            if (!local[url]) {
                                return false;
                            }
                            ;
                            //key = controllerName + '-' + key;
                            var value = local[url][key];
                            if (value == null || value == undefined) return false;
                            return value;
                        }
                    },
                    ///表格排序存储
                    tableSortService: {
                        //数据对象
                        sortCode: {},
                        //新增
                        add: function (key, val) {
                            var local = JSON.parse(localStorage.getItem('tableSortModel'));
                            if (local) {
                                this.sortCode = local;
                            }
                            var url = tableModule.getUrl();

                            if (!!$route.current) {
                                var controllerName = $route.current.controller;
                            } else {
                                var controllerName = 'cis';
                            }

                            if (!this.sortCode[url]) {
                                this.sortCode[url] = {};
                            }

                            //key = controllerName + '-' + key;
                            this.sortCode[url][key] = val;
                            localStorage.setItem('tableSortModel', JSON.stringify(this.sortCode));
                        },
                        read: function (key) {
                            var local = JSON.parse(localStorage.getItem('tableSortModel'))
                            if (local == null || local == undefined) return false;
                            if (!!$route.current) {
                                var controllerName = $route.current.controller;
                            } else {
                                var controllerName = 'cis';
                            }

                            var url = tableModule.getUrl();
                            if (!local[url]) {
                                return false;
                            }
                            ;
                            var value = local[url][key];
                            if (value == null || value == undefined) return false;
                            return value;
                        }
                    }
                }
                //初始化各项系数
                tableModule.setTh();
                tableModule.setTd();


                ///link函数
                return {
                    pre: function (scope, element, controller) {
                        //获取控制器名称
                        if (!!$route.current) {
                            var controllerName = $route.current.controller;
                        } else {
                            var controllerName = 'cis';
                        }


                        //通过ng-repeat方式遍历出来的th,不绑定拖放事件及表头固定
                        if (element.find('thead>tr>th').length == 0) {
                            return;
                        }

                        //向table的span.moveBorder绑定拖放事件
                        element.find('thead').tableMoveFn(tableModule.RWtableStyle, controllerName, $compile, scope);
                    },
                    post: function (scope, element, controller) {
                        ////创建读取排序记录的对象
                        //表格排序
                        var tableSort = scope.tableSort = {
                            //判断第一次点击的时候表格项是否为默认排序
                            flag: '',
                            //同一th的点击次数
                            nClick: 0,
                            toggle: function (ev) {

                                //获取th
                                var target = $(ev.target);
                                if (target.is('div.subdiv') || target.is('i.tableSortIcon')) {
                                    target = target.parents("th:first");
                                }

                                //记录同一th的点击次数
                                this.nClick++;
                                //获取th标识和控制器名称
                                var colName = target.attr('colname');
                                var tableMark = target.parents('table:first').attr('ng-cis-grid-copyHead');

                                if (!!$route.current) {
                                    var controllerName = $route.current.controller;
                                } else {
                                    var controllerName = 'cis';
                                }

                                var tableIdentify = controllerName + tableMark;
                                //删除除点击之外的th记录,只保持记录一条排序项
                                for (var k in this.sortCode[tableIdentify]) {
                                    if (k != colName) {
                                        delete this.sortCode[tableIdentify][k];
                                    }
                                }
                                //如果该th未被点击过，则记录点击项和排序顺序

                                if (this.sortCode[tableIdentify][colName] == null || this.sortCode[tableIdentify][colName] == undefined) {
                                    this.sortCode[tableIdentify][colName] = {
                                        colName: colName,
                                        sortOrder: ''
                                    }
                                }
                                var sortOrder = this.sortCode[tableIdentify][colName].sortOrder;
                                if ((tableIdentify + '-' + colName) != this.prevOth) {
                                    this.nClick = 1;
                                }
                                if (sortOrder == 0) {
                                    this.flag = true;
                                }

                                //判断点击次数，改变排列顺序
                                //sortOrder:  ''默认顺序，asc正序，desc倒序
                                switch (this.nClick) {
                                    case 1:
                                        if (sortOrder == '') {
                                            this.sortCode[tableIdentify][colName].sortOrder = 'desc';
                                        } else if (sortOrder == 'desc') {
                                            this.sortCode[tableIdentify][colName].sortOrder = 'asc';
                                        } else if (sortOrder == 'desc') {
                                            this.sortCode[tableIdentify][colName].sortOrder = 'desc';
                                        }
                                        break;
                                    case 2:
                                        if (this.flag == true) {
                                            this.sortCode[tableIdentify][colName].sortOrder = 'asc';
                                        } else {
                                            if (sortOrder == 'desc') {
                                                this.sortCode[tableIdentify][colName].sortOrder = '';
                                                delete this.sortCode[tableIdentify][colName];
                                            } else if (sortOrder == 'asc') {
                                                this.sortCode[tableIdentify][colName].sortOrder = '';
                                                delete this.sortCode[tableIdentify][colName];
                                            }
                                        }
                                        break;
                                    case 3:
                                        if (this.flag == true) {
                                            this.sortCode[tableIdentify][colName].sortOrder = '';
                                            delete this.sortCode[tableIdentify][colName];
                                            this.flag = false;
                                        } else {
                                            this.sortCode[tableIdentify][colName].sortOrder = 'desc';
                                        }
                                        this.nClick = 0;
                                        break;
                                }


                                //记录上次点击的th
                                this.prevOth = tableIdentify + '-' + colName;

                                //存储排序项
                                //tableModule.tableSortService.add(tableIdentify, this.sortCode[tableIdentify]);

                                //记录在未加载数据前的排序情况
                                if (!!this.sortCode[tableIdentify][colName]) {
                                    scope[tableMark].queryPrarms.tableOrderName = this.sortCode[tableIdentify][colName].colName;
                                    scope[tableMark].queryPrarms.tableOrderSort = this.sortCode[tableIdentify][colName].sortOrder;
                                } else {
                                    scope[tableMark].queryPrarms.tableOrderName = '';
                                    scope[tableMark].queryPrarms.tableOrderSort = '';
                                }
                                //回调函数，执行控制器中的获取数据的方法
                                if (scope[tableMark].items != undefined && scope[tableMark].items != null && scope[tableMark].items.length != 0) {
                                    if (!!scope[tableMark].sort) {
                                        if (!!this.sortCode[tableIdentify][colName]) {
                                            scope[tableMark].sort(this.sortCode[tableIdentify][colName].colName, this.sortCode[tableIdentify][colName].sortOrder);
                                        } else {
                                            scope[tableMark].sort('', '');
                                        }
                                    } else {
                                        console.error('$scope.' + tableMark + '.sort is not defined');
                                    }
                                }

                            },
                            //上次点击的th
                            prevOth: '',
                            //排序的字段和顺序
                            sortCode: {}
                        };

                        //获取控制器名称
                        if (!!$route.current) {
                            var controllerName = $route.current.controller;
                        } else {
                            var controllerName = 'cis';
                        }
                        var tableMark = element.attr('ng-cis-grid');
                        var tableIdentify = controllerName + tableMark;
                        //读取存储的排序值
                        var o = tableModule.tableSortService.read(tableIdentify);
                        if (!!scope[tableMark]) {
                            //储存排序
                            //if (o != null && o != undefined && o != false) {
                            //    tableSort.sortCode[tableIdentify] = scope[tableMark].sortCode = o;
                            //    for (var k in tableSort.sortCode[tableIdentify]) {
                            //        scope[tableMark].queryPrarms.tableOrderName = tableSort.sortCode[tableIdentify][k].colName;
                            //        scope[tableMark].queryPrarms.tableOrderSort = tableSort.sortCode[tableIdentify][k].sortOrder;
                            //    }

                            //} else {
                            //    tableSort.sortCode[tableIdentify] = {};
                            //}

                            //不存储排序
                            tableSort.sortCode[tableIdentify] = scope[tableMark].sortCode = {};
                        } else {
                            console.error('$scope.' + tableMark + ' is not defined');
                        }

                    }

                }
            }
        }
    })
});
