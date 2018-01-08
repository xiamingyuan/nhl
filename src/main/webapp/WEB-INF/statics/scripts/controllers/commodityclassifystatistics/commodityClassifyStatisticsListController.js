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
    controllers.controller('commodityClassifyStatisticsListController', ['$scope', '$rootScope','$timeout','commodityclassifystatisticsService',function ($scope,$rootScope,$timeout,commodityclassifystatisticsService) {
        $scope.searchParams={firstType:"1",secondType:""};//保存参数,初始化默认选中

        $scope.grid = {
            paginationPageSizes: [2, 50, 75],
            paginationPageSize: 2,
            enableSorting: false,
            useExternalSorting:true,
            enableColumnMenus: false,
            enableColumnResizing: true,
            noUnselect: true,
            multiSelect: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {name:'grandName', displayName: '药品大类', width:80, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'parentName', displayName: '药品中类',width:120, headerCellClass:'cell-center',cellClass: 'cell-center'},
                {name:'name', displayName: '药品小类',minWidth:80, headerCellClass:'cell-center', cellClass: 'cell-left'},
                {name:'count', displayName: '药品数量', width:100, headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'percentTwo', displayName: '占中类百分比',cellFilter:'twoDecimals', width:100,  headerCellClass:'cell-center', cellClass: 'cell-center'},
                {name:'percentOne', displayName: '占大类百分比',cellFilter:'twoDecimals',width:100, headerCellClass:'cell-center', cellClass: 'cell-center'}
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
            //引用hospitalServices中定义的http请求方式， 传入查询条件即可
            commodityclassifystatisticsService.getdruglist($scope.gridOptions.queryPrarms,"get").success(function (data) {
                if(data.code==200){
                    $scope.grid.data = data.data.datas;//返回的要渲染的数据
                    $scope.histogram(data.data.datas);//柱状图绑定数据
                }else{
                    $scope.grid.data = [];
                    $scope.histogram([]);//柱状图绑定数据
                    bootbox.alert(data.msg);
                }
            });
        };

        //药品大类选择
        $scope.drugFirstTypeChange = function () {
            var firstTypeValue = $("select[name='firstType'] option:selected").val();
            commodityclassifystatisticsService.gettypelist({id:"",name:"",grade: 2, parentid:firstTypeValue,pageIndex:1,pageSize:10000,tableOrderName:"",tableOrderSort:""},"get").success(function (data) {
                $scope.secondTypeList = data.data.datas;
            });
        };
        $scope.drugFirstTypeChange();


        //柱状图
        $scope.histogram = function(chartData) {
            Highcharts.theme = {
                //colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                chart: {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(240, 240, 255)']
                        ]
                    },
                    borderWidth: 0,
                    plotBackgroundColor: 'rgba(255, 255, 255, .9)',
                    plotShadow: true,
                    plotBorderWidth: 1
                },
                title: {
                    style: {
                        color: '#000',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                subtitle: {
                    style: {
                        color: '#666666',
                        font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                xAxis: {
                    gridLineWidth: 1,
                    lineColor: '#000',
                    tickColor: '#000',
                    labels: {
                        style: {
                            color: '#000',
                            font: '11px Trebuchet MS, Verdana, sans-serif'//,
                            //writingMode: 'tb-rl'
                        }
                    },
                    title: {
                        style: {
                            color: '#333',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                        }
                    }
                },
                yAxis: {
                    //minorTickInterval: 'auto',
                    //minTickInterval: "auto",
                    tickPixelInterval: "30",
                    lineColor: '#000',
                    lineWidth: 1,
                    tickWidth: 1,
                    tickColor: '#000',
                    labels: {
                        style: {
                            color: '#000',
                            font: '11px Trebuchet MS, Verdana, sans-serif'
                        }
                    },
                    title: {
                        style: {
                            color: '#333',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                        }
                    }
                },
                legend: {
                    itemStyle: {
                        font: '9pt Trebuchet MS, Verdana, sans-serif',
                        color: 'black'

                    },
                    itemHoverStyle: {
                        color: '#039'
                    },
                    itemHiddenStyle: {
                        color: 'gray'
                    }
                },
                labels: {
                    style: {
                        color: '#99b'
                    }
                },

                navigation: {
                    buttonOptions: {
                        theme: {
                            stroke: '#CCCCCC'
                        }
                    }
                }
            };

            // Apply the theme
            var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
            var colors = Highcharts.getOptions().colors;
            var arrX = [];
            var category = '';
            for (var k in chartData) {
                if(k<chartData.length-1){//去除最后一条合并数据
                    category = chartData[k].name;
                    arrX.push(category);
                }
            }

            var categories = arrX;

            var name = "null";

            var data = [];
            for (var j in chartData) {
                if(j<chartData.length-1){//去除最后一条合并数据
                    data.push({ y: parseInt(chartData[j].count), color: '#50B432' });
                }
            }


            function setChart(name, categories, data, color) {
                chart.xAxis[0].setCategories(categories, false);
                chart.series[0].remove(false);
                chart.addSeries({
                    name: name,
                    data: data,
                    color: color || 'white'
                }, false);
                chart.redraw();
            }

            var chart = $('#commodityClassifyChart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                scrollbar: {

                    enabled: true

                },

                xAxis: {
                    categories: categories//,
                    //labels: {
                    //    rotation: -70,
                    //    step: 1,//这个可以设置X轴显示几个点。
                    //    staggerLines: 1
                    //}
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    allowDecimals: false,
                    min: 0
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    //var drilldown = this.drilldown;
                                    //if (drilldown) { // drill down
                                    //    setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
                                    //} else { // restore
                                    //    setChart(name, categories, data);
                                    //}
                                }
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            color: colors[0],
                            style: {
                                fontWeight: 'bold'
                            },
                            formatter: function () {
                                return this.y;

                            }
                        }
                    }
                },
                tooltip: {
                    formatter: function () {
                        var point = this.point,
                            s = this.x + ':<b>' + this.y + '</b><br>';
                        return s;
                    }
                },
                series: [{
                    name: name,
                    data: data,
                    color: 'white'
                }],
                exporting: {
                    enabled: false
                }
            })
                .highcharts(); // return chart
            $(".highcharts-legend").remove();
        }


        $timeout(function(){
            $scope.gridOptions.search();
        }, 0, false);
    }]);
});