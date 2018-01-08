/**
 * Created by tangwenpei on 16/5/20.
 */
define(['./module'], function (directives) {
    'use strict';

    //新分页
    directives.directive('ngCisGridPager', function () {
        return {
            restrict: "EA",
            replace: true,
            transclude: true,
            scope: {
                options: '='
            },
            templateUrl: "./share/paging",
            link: function ($scope,element) {
                $scope.options.totalCount = 0;
                $scope.options.currentPage = 0;
                if($(element).attr('data-save-status')){
                    window.localStorage.pageSize=window.localStorage.pageSize==undefined?25:window.localStorage.pageSize;
                    window.localStorage.page=window.localStorage.page==undefined?1:window.localStorage.page;
                    window.localStorage.name = window.localStorage.name==undefined?'':window.localStorage.name;
                    window.localStorage.direction = window.localStorage.direction==undefined?'':window.localStorage.direction;
                    $scope.options.queryPrarms = {pageSize: parseInt(window.localStorage.pageSize), pageIndex: parseInt(window.localStorage.page),tableOrderName:window.localStorage.name,direction:window.localStorage.direction,isSave:true};
                }else{
                    $scope.options.queryPrarms = {pageSize: 25, pageIndex: 1,tableOrderName:'',direction:'',isSave:false};
                }
                $scope.options.getQueryPrarms = function () {
                    if(this.queryPrarms.isSave){
                        this.queryPrarms.pageSize=parseInt(window.localStorage.pageSize);
                        this.queryPrarms.pageIndex=parseInt(window.localStorage.page);
                        this.queryPrarms.tableOrderName=window.localStorage.name;
                        this.queryPrarms.tableOrderSort=window.localStorage.direction;
                    }else{
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
                    }
                };
                $scope.options.sort = function (colName, order,displayName) {
                    if(this.queryPrarms.isSave){
                        window.localStorage.name = colName;
                        window.localStorage.direction = order;
                        window.localStorage.displayName = displayName;
                    }
                    this.queryPrarms.tableOrderName = colName;
                    this.queryPrarms.tableOrderSort = order;
                    this.getData();
                };
                $scope.options.paging = function (pIndex, pSize) {
                    if(this.queryPrarms.isSave){
                        window.localStorage.pageSize = pSize;
                        window.localStorage.page= pIndex;
                    }
                    this.queryPrarms.pageIndex = pIndex;
                    this.queryPrarms.pageSize = pSize;
                    this.getData();
                };
                $scope.options.search = function () {
                    if(window.localStorage.bol == 'false' || window.localStorage.bol == undefined){
                        window.localStorage.page=1;
                    }
                    $scope.pageModule.pageIndex=1;//ycc加入,为了解决只要执行search方法就要重置分页为第一页
                    window.colActionSwitch = false;// 解决拖动grid之后 页面其他grid结构错乱问题
                    this.isSearch = true;
                    this.setQueryPrarms();
                    this.getQueryPrarms();
                    this.getData();
                };
                $scope.options.reload = function () {
                    this.isSearch = false;
                    this.setQueryPrarms();
                    this.getQueryPrarms();
                    this.getData();
                };

                var pageModule = $scope.pageModule = {
                    pageSize: 25,
                    arrPageSize: [10, 25, 50],
                    pageIndex: 1,
                    //分页按钮的最大数量
                    maxPageCount: 5,
                    pageStarIndex: 0,
                    pageEndInde: 0,
                    //gotoPage:$scope.gotoPage,
                    pages: [],
                    pageSet: 1,
                    TotalPages: 0,
                    TotalCount: 0,
                    getPages: function (TotalCount) {
                        this.pages = [];
                        this.TotalCount = TotalCount;
                        this.TotalPages = Math.ceil(TotalCount / this.pageSize);
                        var pageMathIndex = Math.floor(this.maxPageCount / 2);
                        if (this.TotalPages < this.maxPageCount) {
                            //如果分页总数个数小于要显示的分页按钮数量
                            this.pageStarIndex = 1;
                            this.pageEndInde = this.TotalPages;
                        } else {
                            //总数大于显示按钮数量
                            if (this.TotalPages - pageMathIndex < this.pageIndex) {
                                //当前页数大于
                                this.pageStarIndex = this.TotalPages - this.maxPageCount + 1;
                                this.pageEndInde = this.TotalPages;
                            }
                            else {
                                if (this.pageIndex - pageMathIndex < 1) {
                                    //当前页数小于
                                    this.pageStarIndex = 1;
                                    this.pageEndInde = this.maxPageCount;
                                } else {
                                    //当前页数大于分页按钮数量的中间数的时候，pages更改
                                    this.pages = [ this.pageIndex - 2, this.pageIndex - 1, this.pageIndex, parseInt(this.pageIndex) + 1, parseInt(this.pageIndex) + 2];
                                    return;
                                }
                            }
                        }
                        for (var i = this.pageStarIndex; i <= this.pageEndInde; i++) {
                            this.pages.push(i)
                        }

                    },
                    //条数
                    lgPageSelectChange: function (size) {
                        window.localStorage.page=1;
                        window.localStorage.pageSize=pageModule.pageSize;
                        $(".grid-scroll-top").scrollTop(0);//ycc,解决当前列表滚动条下拉修改每页条数滚动条置顶
                        $scope.options.pageIndex = $scope.pageModule.pageIndex = $scope.pageModule.pageSet = 1;
                        if (!!$scope.options.paging) {
                            $scope.options.paging(pageModule.pageIndex, pageModule.pageSize);

                            if ($scope.options.totalCount != undefined) {
                                pageModule.getPages($scope.options.totalCount);
                            }
                        } else {
                            console.error('paging is not defined');
                            return;
                        }
                    },
                    //分页
                    chanePageIndex: function (page) {
                        $(".grid-scroll-top").scrollTop(0);//ycc,解决当前列表滚动条下拉切换页滚动条置顶
                        if(window.localStorage.bol == 'false' || window.localStorage.bol == undefined){
                            window.localStorage.page = page;
                        }
                        window.localStorage.detail = 'false';
                        if (isNaN(page)) {
                            return;
                        }
                        if (page >= 1 && page <= pageModule.TotalPages) {
                            pageModule.pageSet = page;
                            pageModule.pageIndex = page;
                        } else if (page < 1) {
                            pageModule.pageSet = 1;
                            pageModule.pageIndex = 1;
                        } else if (page > pageModule.TotalPages) {
                            pageModule.pageSet = pageModule.TotalPages;
                            pageModule.pageIndex = pageModule.TotalPages;
                        }
                        if (!!$scope.options.paging) {
                            $scope.options.paging(pageModule.pageIndex, pageModule.pageSize);
                            pageModule.getPages($scope.options.totalCount);
                        } else {
                            console.error('paging is not defined');
                            return;
                        }
                    },
                    setPageIndex: function () {
                        pageModule.chanePageIndex(pageModule.pageSet);
                    },
                    pageModuleChage: function () {
                        if (isNaN(pageModule.pageSet)) {
                            pageModule.pageSet = pageModule.pageIndex;
                        }
                    },
                    goto: function () {//页码跳转按钮函数
                        //获取用户需要跳转的页码数$scope.pageModule.gotoPage
                        if (parseInt($scope.pageModule.gotoPage) && $scope.pageModule.gotoPage <= $scope.pageModule.TotalPages) {
                            //console.log(parseInt($scope.pageModule.gotoPage));
                            $scope.pageModule.chanePageIndex(parseInt($scope.pageModule.gotoPage));
                            $scope.pageModule.gotoPage = '';
                        }
                    }
                }

                //初次加载时，为控制器中和指令中的 pageIndex,pageSize同步值
                if ($scope.options.queryPrarms.pageSize == undefined || $scope.options.queryPrarms.pageIndex == undefined) {
                    $scope.options.queryPrarms.pageSize = $scope.pageModule.pageSize;
                    $scope.options.queryPrarms.pageIndex = $scope.pageModule.pageIndex;
                } else {
                    $scope.pageModule.pageSize = $scope.options.queryPrarms.pageSize;
                    $scope.pageModule.pageIndex = $scope.options.queryPrarms.pageIndex;
                }
                //监视数据总条数，渲染分页栏
                $scope.$watch('options.totalCount', function (a, b) {
                    if (a != undefined) {
                        $scope.pageModule.pageIndex = $scope.options.queryPrarms.pageIndex;
                        $scope.pageModule.pageSize = $scope.options.queryPrarms.pageSize;
                        pageModule.getPages($scope.options.totalCount);
                    }
                });
                //ycc引入,解决拖动grid之后 页面其他grid结构错乱问题
                $("a[data-toggle='modal']").click(function (){
                    if(window.colActionSwitch){
                        window.colActionSwitch = false;
                    }
                });
                //ycc注释,为解决一个页面多个grid时点击页数时其它grid的页数也发生变化
                //监视当前页数，同步控制器与指令中的 当前页数数据   渲染分页栏
                // $scope.$watch('options.queryPrarms.pageIndex', function (a, b) {
                //     if ($scope.options.totalCount != undefined) {
                //         $scope.pageModule.pageIndex = a;
                //         $scope.pageModule.pageSize = $scope.options.queryPrarms.pageSize;
                //         pageModule.getPages($scope.options.totalCount);
                //         //渲染当前页码为高亮
                //         var em = $('.pagination > ul > li');
                //         var len = em.length - 1;
                //         $(em).removeClass('active');
                //         setTimeout(function () {
                //             for (var i = 1; i < len; i++) {
                //                 if (parseInt($(em[i]).find('a').text()) == a) {
                //                     $(em[i]).addClass('active');
                //                 }
                //             }
                //         }, 14)
                //     }
                // })
            }
        }
    })
});