/**
 * Created by yangdongbo on 16/3/18.
 */
define(['../module'], function (controllers) {
    'use strict';

    /*
     *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
     *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
     *
     * */
    controllers.controller('medicalinSuranceStatisticsListController', ['$scope', '$rootScope','medicalinsurancestatisticsService',function ($scope,$rootScope,medicalinsurancestatisticsService) {
        $scope.gridHeaderArray = [''];//表格第一列标题
        $scope.qStatus = "1";//统计类型默认值
        $scope.errorType = ["monthErrorInfo","weekErrorInfo","dateErrorInfo"];//错误信息类型数据
        $scope.monthErrorInfo="";//按月统计错误信息
        $scope.dateErrorInfo="";//按周统计错误信息
        $scope.dateErrorInfo="";//按日统计错误信息

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
                {name:'0', displayName: '', headerCellClass:'cell-center'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.addRowHeaderColumn( { name: 'rowHeader', displayName: $scope.gridHeaderArray[0],headerCellClass:'cell-center',cellClass: 'cell-center', width:'65', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.gridHeaderArray[grid.renderContainers.body.visibleRowCache.indexOf(row)+1]}}</div>'} );
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
            medicalinsurancestatisticsService.query($scope.gridOptions.queryPrarms,"get").success(function (data, status) {
                if(data.code==200){
                    var gridTitleArray = [];//表格标题数据
                    $scope.gridHeaderArray=[]; //清空是为了显示返回的数据的第一个标题
                    var gridValueArray=[];//表格值数据
                    var highcharsTitleArray = [];//图表标题数据
                    $(data.data.titleInfo).each(function (index,value){
                        if(index==0){
                            $scope.gridHeaderArray.push(value);
                        }else{
                            gridTitleArray.push({name:''+index, displayName: value, headerCellClass:'cell-center', minWidth:80,cellClass: 'cell-center'});
                            highcharsTitleArray.push(value);
                        }
                    });
                    $scope.grid.columnDefs=gridTitleArray;
                    $(data.data.rowInfo).each(function (index,value){
                        var valueObj={};
                        $(value.celInfo).each(function (i,v){
                            if(i==0) {//获取到第一个数据为行标题
                                $scope.gridHeaderArray.push(v);
                            }else{
                                valueObj[i]=v;
                            }
                        });
                        gridValueArray.push(valueObj);
                    });
                    $scope.grid.data = gridValueArray;
                    $scope.bindHistogram(highcharsTitleArray, gridValueArray[gridValueArray.length-1]);
                }else{
                    $scope.grid.data = [];
                    $scope.bindHistogram([], []);
                    bootbox.alert(data.msg);
                }

            });
        };

        //改变统计类型值
        $scope.statisticsTypeChange = function () {
            if ($scope.qStatus == "1") {
                $('.dateMonthPickerGroup').show();$('.dateWeekPickerGroup').hide();$('.datePickerGroup').hide();
            } else if($scope.qStatus == "2") {
                $('.dateMonthPickerGroup').hide();$('.dateWeekPickerGroup').show();$('.datePickerGroup').hide();
            }else{
                $('.dateMonthPickerGroup').hide();$('.dateWeekPickerGroup').hide();$('.datePickerGroup').show();
            }
        };
        $scope.statisticsTypeChange();

        //验证统计范围是否符合要求
        $scope.checkTime = function (){
            var index = parseInt($scope.qStatus)-1;
            var startTime = $("input.datepicker-input",$(".form-datetime").eq(index*2)).val();var endTime = $("input.datepicker-input",$(".form-datetime").eq(index*2+1)).val();
            if(startTime && endTime){
                if(endTime<startTime){
                    $scope[$scope.errorType[index]] = "结束时间不能早于开始时间";
                    return false;
                }else{
                    $scope[$scope.errorType[index]] = "";$scope.setQueryValues(startTime,endTime);
                    return true;
                }
            }else{
                $scope[$scope.errorType[index]] = "统计范围不能为空";
                return false;
            }
        };

        //设置查询条件值
        $scope.setQueryValues = function (sdate,edate){
            $("input[name='qStatus']").val($scope.qStatus);$("input[name='sdate']").val(sdate);$("input[name='edate']").val(edate);
            $scope.searchParams={qStatus:$scope.qStatus,sdate:sdate,edate:edate};
        };


        //导出操作
        $scope.exportStatisticsData = function (){
            if ($scope.grid.data.length!=0) {
                bootbox.confirm("确定导出当前列表记录？", function (result) {
                    if (result) {
                        $("#exportStatisticsData").click();
                    }
                });
            } else {
                bootbox.alert("当前列表暂无数据无法导出！");
            }
        };


        //柱状图
        $scope.bindHistogram = function (titleData, jsdata) {
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
            for (var k in titleData) {
                if (k > -1) {
                    category = titleData[k];
                    arrX.push(category);
                }
            }
            var categories = arrX;
            var titleCount = titleData.length;

            var name = "null";
            var data = [];
            for (var j in jsdata) {
                if (j > 0)
                    data.push({ y: parseInt(jsdata[j]), color: '#50B432' });
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

            var chart = $('#medicalChart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                }, scrollbar: {
                    enabled: true
                },
                xAxis: {
                    categories: categories,
                    labels: {
                        rotation: 90,
                        step: 1,//这个可以设置X轴显示几个点。
                        staggerLines: 1
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    allowDecimals: false,
                    min:0
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: colors[0],
                            style: {
                                fontWeight: 'bold'
                            },
                            formatter: function () {
                                if (this.y == 0)
                                    return null;
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
            if (titleCount > 5) {
                chart.xAxis.push({
                    labels: {
                        rotation: 65,
                        step: 1,//这个可以设置X轴显示几个点。
                        staggerLines: 1
                    }
                });
            }
        }
    }]);
});