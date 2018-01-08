/*
*@@2015年11月中旬首次完成
*@@yangdongbo
*@@功能为表格的表头拖放事件；
*@@2015年12月8日补充功能：表头与表体展示分离，表体溢出隐藏。
*/
; (function ($) {
    $.fn.extend({
        tableMoveFn: function (RWtableStyle, controllerName, Compile, SCOPE) {
            var thead = $(this);
            var table = thead.parents('table:first');
            var tableMove = {
                init: function () {
                    this.drugX = this.drguY = 0;
                    this.w = 0;
                    this.tableW = 0;
                    this.subdivMinW = 0;
                    this.thdivMinW = 0;
                    this.colName = null;
                    thead.find('span.moveBorder').on('mousedown', tableMove.Mousedown);
                    if (!thead.parent('table').hasClass('tableOut')) {
                        thead.parent('table').wrap('<div class="outerWarp" outerWarp><div class="tableOut"><div class="tableInnerOverflow" style="width:' + (window.parseInt(table.outerWidth()) + 1) + 'px"></div><div class="tAbfill"></div></div></div>');
                    }

                    //克隆thead；
                    var cloneTable = table.clone(true);
                    cloneTable.find('tbody,tfoot').remove();


                    //为克隆table置换标签，防止调用ng的$compile服务时造成指令死循环；
                    var tableMark = table.attr('ng-cis-grid');
                    cloneTable.removeAttr('ng-cis-grid');
                    cloneTable.attr('ng-cis-grid-copyHead', tableMark);

                    //cloneTable.find('thead>tr>th').each(function () {
                    //    var th = $(this);
                    //    if (!!th.attr('ng-click')) {
                    //        th.removeAttr('ng-click');
                    //    }
                    //})

                    //添加到DOM结构中
                    var tableHeadOverflow = $("<div  class='tableHeadOverflow'></div>");
                    table.parents('.tableOut:first').prepend(tableHeadOverflow);
                    thead.css({ "visibility": "hidden" });
                    //调用$compile服务
                    Compile(cloneTable)(SCOPE)
                    table.parents('.tableOut:first ').find('.tableHeadOverflow').prepend(cloneTable);
                },
                Mousedown: function (event) {
                    //记录当前th的标识值
                    thead.thCode = $(this).parent().attr('data-thCode');

                    //console.log('开始')
                    var ev = window.event || event;
                    var es = {};
                    es.target = ev.srcElement || ev.target;
                    es.pageX = (document.body.scrollLeft || document.documentElement.scrollLeft) + ev.clientX || ev.pageX;
                    es.pageY = (document.body.scrollTop || document.documentElement.scrollTop) + ev.clientY || ev.pageY;
                    es.preventDefault = function (ev) {//阻止事件的默认行为
                        if (ev.preventDefault) { //标准的
                            ev.preventDefault();
                        } else {
                            ev.returnValue = false;//IE的
                        }
                        return false;
                    }

                    //向dom添加移动的竖线
                    $(document.body).css('cursor', 'url(Image/moveBorder_icon.png) 8 0,default')
                    var table = $(this).parents('table:first');
                    var div = $('<div class="table-drugLine"></div>');
                    table.parents(".tableOut:first").append(div);

                    div.show().css('left', es.pageX - $(this).parents('table:first').parent().offset().left);
                    var w = parseInt($(this).parents('th:first').css('width'));
                    tableMove.drugX = es.pageX;
                    tableMove.drugY = es.pageY;
                    tableMove.w = w;
                    tableMove.tableW = parseInt($(this).parents('table:first').css('width'));

                    tableMove.subdivMinW = parseFloat($(this).parents('th:first').css('min-width'));
                    tableMove.colName = $(this).parents('th:first').attr('colname');

                    if (this.setCapture) {//ie和firefox
                        $(this).on("mousemove", tableMove.Mousemove);
                        $(this).on("mouseup", tableMove.Mouseup);
                        this.setCapture();
                    } else {// chrome
                        this.MOVE = tableMove.disguise(this, tableMove.Mousemove);
                        this.UP = tableMove.disguise(this, tableMove.Mouseup);
                        $(document).on("mousemove", this, this.MOVE);
                        $(document).on("mouseup", this, this.UP);
                    }
                    es.preventDefault(ev);
                },
                Mousemove: function (event) {
                    var ev = window.event || event;
                    var es = {};
                    es.target = ev.srcElement || ev.target;
                    es.pageX = (document.body.scrollLeft || document.documentElement.scrollLeft) + ev.clientX || ev.pageX;
                    es.pageY = (document.body.scrollTop || document.documentElement.scrollTop) + ev.clientY || ev.pageY;
                    $(".table-drugLine").css('left', es.pageX - $(this).parents('table:first').parent().offset().left);
                },
                Mouseup: function (event) {
                    if (this.setCapture) {//ie和firefox
                        $(this).off("mousemove", tableMove.Mousemove);
                        $(this).off("mouseup", tableMove.Mouseup);
                        this.releaseCapture();
                    } else {// chrome
                        $(document).off("mousemove", this.MOVE);
                        $(document).off("mouseup", this.UP);
                    }
                    $(".table-drugLine").remove();

                    $(document.body).css('cursor', 'auto')

                    var ev = window.event || event;
                    var es = {};
                    es.target = ev.srcElement || ev.target;
                    es.pageX = (document.body.scrollLeft || document.documentElement.scrollLeft) + ev.clientX || ev.pageX;
                    es.pageY = (document.body.scrollTop || document.documentElement.scrollTop) + ev.clientY || ev.pageY;
                    es.preventDefault = function (ev) {//阻止事件的默认行为
                        if (ev.preventDefault) { //标准的
                            ev.preventDefault();
                        } else {
                            ev.returnValue = false;//IE的
                        }
                        return false;
                    }

                    var tdWidth = null;
                    var subDWidth = null;
                    var tableWidth = null;
                    //向右
                    if (es.pageX - tableMove.drugX > 0) {
                        tableWidth = tableMove.tableW + (es.pageX - tableMove.drugX);
                        subDWidth = tdWidth = tableMove.w + (es.pageX - tableMove.drugX);
                    } else if (es.pageX - tableMove.drugX < 0) {//向左
                        //如果鼠标位置大于 当前th的到屏幕的左边距+div的最小距离
                        if (es.pageX > parseInt($(this).parent().offset().left) + tableMove.subdivMinW) {
                            tableWidth = tableMove.tableW + (es.pageX - tableMove.drugX);
                            subDWidth = tdWidth = tableMove.w + (es.pageX - tableMove.drugX);
                        } else {
                            tableWidth = tableMove.tableW - (tableMove.w - tableMove.subdivMinW);
                            tdWidth = subDWidth = tableMove.subdivMinW;
                        }
                    } else {
                        es.preventDefault(ev);
                        return;
                    }



                    $(this).parents('th:first').css('width', tdWidth);
                    $(this).parents('.tableHeadOverflow:first').next('.tableInnerOverflow').children('table').find('th[colname=' + tableMove.colName + ']').css('width', tdWidth);
                    $(this).parents('table:first').css('width', tableWidth);
                    $(this).parents('.tableHeadOverflow:first').next('.tableInnerOverflow').css('width', tableWidth).children('table').css('width', tableWidth);


                    var style = {};
                    var colname = '';
                    $(this).parents('thead').children('tr').children('th').each(function () {
                        colname = $(this).attr('colname');
                        style[colname] = parseInt($(this).css('width'))
                    });
                    var tableMark = $(this).parents('table:first').attr('ng-cis-grid');

                    RWtableStyle.add(controllerName + tableMark, style);

                    //console.log('释放')
                    es.preventDefault(ev);
                },
                //改变this指针
                disguise: function (obj, fn) {
                    return function (event) {
                        fn.call(obj, event);
                    }
                }
            }
            tableMove.init();
            function setTableHeight(){
                if($('#showDetail').length >= 1){
                    $('.outerWarp').css({'height':$(window).height() - $('#showDetail').height() - $('.footer').height() - $('.outerWarp').offset().top - 75 + 'px','border':'1px solid #ddd','background':'#fff' });
                }else{
                    $('.outerWarp').css({'height':$(window).height() - $('.footer').height() - $('.outerWarp').offset().top - 75 + 'px','border':'1px solid #ddd','background':'#fff' });
                }
            }
            setTableHeight();

            $(window).resize(function () {
                setTableHeight();
            });
            $('.tableInnerOverflow table tbody').click(function(ev){
                $(ev.target).parent().addClass('success').siblings().removeClass('success');
            });
        }
    })
})(jQuery)