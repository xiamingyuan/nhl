/*
 jQuery  1.8.2
 Bootstrap v3.3.1
 2015.3.3
 @@功能介绍：
 1.可实现弹窗整体拖拽
 2.实现，左，右，下，右下拖拽实现框体缩放
 3.点击背景弹窗不消失
 4.==> 拖拽功能添加相应结构后即可使用（暂没添加，如果有需求再添加）


 @@功能实现需要配合相应HTML结构和css样式
 @@css样式在  partialviews.css 中
 @@html结构样例（'--新增结构'）
 <div class="modal fade" id="myModalee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
 <div class="modal-dialog">
 <div class="modal-content">
 <div class="drag_rightDiv"></div>----新增结构--拖拽缩放
 <div class="drag_bottomDiv"></div>----新增结构--拖拽缩放
 <div class="drag_leftDiv"></div>----新增结构--拖拽缩放
 <div class="modal-header">
 <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
 <h4 class="modal-title">Modal title</h4>
 </div>
 <div class="modal-body">
 <div class='modal_body_flowCont'>----新增结构--拖拽缩放
 <p>内容区</p>
 </div>
 </div>
 <div class="modal-footer">
 <div class="se_resizeBox"></div>----新增结构--拖拽缩放
 <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
 <button type="button" class="btn btn-primary">Save changes</button>
 </div>
 </div><!-- /.modal-content -->
 </div><!-- /.modal-dialog -->
 </div><!-- /.modal -->
 */
/*
 * --------------因bootstrap各版本弹窗DOM结构及css实现方式不同，此版本拖放JS只针对于bootstrap 2-------------------------
 * */

;
(function ($) {
    $.fn.extend({
        drag: function (options) {
            return ttt = new $.dragHandler(options);
        }
    });
    $.dragHandler = function (options) {
        this.settings = $.extend(true, {}, $.dragHandler.defaults, options);
        this.init();
        this.getScroll();
    };
    $.extend($.dragHandler, {
        defaults: {
            dragEle: ".modal",//整体拖拽的元素
            dragHele: ".modal-body",
            dragTarget: ".modal-header,.modal-header>h4",//拖拽时拽的目标
            setLeft: ".drag_leftDiv",//左边
            setRight: ".drag_rightDiv",//右边
            setBottom: ".drag_bottomDiv",//下边
            setSE: ".se_resizeBox",//右下
            flowCont: ".modal_body_flowCont",//用来获取modalbody里的文档高度
            showModalBtn: '[data-toggle="modal"]',//点击显示弹窗按钮
            closeRenew: true,//是否关闭弹窗后恢复原始状态
            clickBgHide: false,//点击背景色是否关闭弹窗
            originalPlace: {},//点击时鼠标的原始位置
            originalOffset: {},//点击时整体的偏移量
            eleWidth: 0, //点击时获取整体的宽度
            eleHeight: 0,//点击时获取整体的高度
            scroll: {},//滚动条位置
            oDragb: "<div class='oDragb' style='position:fixed;top:0;left:0;bottom:0;right:0;z-index:10050;background-color:#ffffff; opacity:0;filter:alpha(opacity=0); -moz-opacity:0'></div>"//背景防点击遮罩层
        },

        prototype: {
            init: function () {
                var draghandler = this;

                var settings = draghandler.settings;
                var dragDown = draghandler.dragDown;
                var scroll = settings.scroll;

                var targetModal = null,
                    dragEle = null;
                //$(document).on("click", settings.showModalBtn, function () {
                //    targetModal = $(this).attr("data-target");
                //    dragEle = $(targetModal).find(settings.dragEle);
                //    if (settings.clickBgHide == false) {
                //        //添加透明背景，防治点击背景弹窗隐藏
                //        if ($(targetModal).find(".oDragb").length == 0) {
                //            dragEle.before($(settings.oDragb));
                //        }
                //    }

                //    //再次打开弹窗时是否为初始状态
                //    if (settings.closeRenew == true) {
                //        draghandler.closeModal(draghandler, dragEle);
                //    }
                //    //设置元素最大范围和最小范围
                //    dragEle.css({
                //        "min-width": dragEle.outerWidth(),
                //        "min-height": dragEle.outerHeight()
                //    }).find(settings.dragHele).css({
                //        "min-height": $(targetModal).find(settings.flowCont).outerHeight()
                //    });
                //})

                function bin(event) {
                    var target = $(event.target);
                    dragDown(event, target, draghandler, dragEle);
                    event.stopPropagation();
                }


                //弹窗显示后，将位置改为定位left和top
                $(document).on("shown.bs.modal", $('.modal'), function (e) {
                    if ($(e.target).hasClass('bootbox') || $(e.target).attr("data-toggle")=="tab") {
                        return;
                    }

                    dragEle = $(e.target);
                    //为元素绑定mousedown事件
                    $(document).on("mousedown", dragEle, bin);

                    //if (settings.closeRenew == true) {
                    //    draghandler.closeModal(draghandler, dragEle);
                    //}

                    if ($(".oDragb").length == 0) {
                      $('body').append($(settings.oDragb));
                    }
                    //改变元素定位方式
                    dragEle.css({
                        "margin-top": 0,
                        "margin-left": 0,
                        //(用浏览器可视区域的width减去自身的width)/2
                        "left": parseInt(($(window).width() - dragEle.width())/2),
                        //(用浏览器可视区域的height减去自身的height)/2
                        "top": parseInt(($(window).height() - dragEle.height())/2)
                    })
                })

                //弹窗关闭后，给弹窗解除绑定的mousedown事件,并恢复原始位置
                $(document).on('hide.bs.modal', $('.modal'), function (e) {
                    if ($(e.target).hasClass('bootbox')) {
                        return;
                    }

                    //删除底色遮罩
                    $('.oDragb').remove();
                    //移除style
                    $(e.target).removeAttr('style');
                    //解除绑定事件
                    $(document).off('mousedown', bin);
                })


                //为动态创建的弹窗绑定mousedown事件,凡是用modal.open()服务打开的弹窗，都要在弹窗内部模板根元素上添加
                //'id=templateModal'
                $(document).on("mousedown", "#templateModal", function (event) {
                    var target = $(event.target);
                    var mo = $("#templateModal").parents('.modal:first').find(settings.dragEle);
                    dragDown(event, target, draghandler, mo);
                    event.stopPropagation();
                })
            },
            //this转换
            disguise: function (obj, fn) {
                return function (e) {
                    fn.call(obj, e);
                }
            },
            // 鼠标点击落下时
            dragDown: function (e, target, handler, that) {

                var settings = handler.settings;
                var originalPlace = settings.originalPlace;
                var scroll = settings.scroll;

                if (!target.is(settings.dragTarget) || target.parents('.modal').hasClass('bootbox')) {
                    return;
                }
                that = $(that);
                if (that.find('#templateModal').length > 0) {
                    that.css({
                        "margin-top": 0,
                        "margin-left": 0,
                        "left": parseInt(that.offset().left) - parseInt(scroll.nScrollL),
                        "top": parseInt(that.offset().top) - parseInt(scroll.nScrollT)
                    })
                }

                originalPlace.x = e.pageX;
                originalPlace.y = e.pageY;
                settings.originalOffset = that.offset();

                var originalOffset = settings.originalOffset;

                settings.eleWidth = that.outerWidth();
                settings.eleHeight = that.find(settings.dragHele).outerHeight(true);


                if (target.setCapture) {//ie和firefox
                    target.setCapture();
                    target.on("mousemove", function (event) {
                        handler.dragMove(event, target, handler, that)
                    });
                    target.on("mouseup", function (event) {
                        handler.dragOff(event, target, handler, that)
                    });
                } else {// chrome
                    target.MOVE = handler.disguise(target, function (event) {
                        handler.dragMove(event, target, handler, that)
                    });
                    target.UP = handler.disguise(target, function (event) {
                        handler.dragOff(event, target, handler, that)
                    });

                    $(document).on("mousemove", target.MOVE);
                    $(document).on("mouseup", target.UP);
                }
                e.stopPropagation();
            },
            // 鼠标移动时
            dragMove: function (e, target, handler, that) {
                var settings = handler.settings;
                var originalPlace = settings.originalPlace;
                var originalOffset = settings.originalOffset;

                if (target.is(settings.dragTarget)) {
                    //拖拽标题
                    target.parents('.modal:first').css({
                        "left": originalOffset.left + (e.pageX - originalPlace.x) - settings.scroll.nScrollL,
                        "top": originalOffset.top + (e.pageY - originalPlace.y) - settings.scroll.nScrollT
                    })
                } else if (target.is(settings.setRight)) {
                    //向右放大

                    handler.dragSetRight(e, target, handler, that);
                    return;
                } else if (target.is(settings.setLeft)) {
                    //向左方大
                    handler.dragSetLeft(e, target, handler, that);
                    return;
                } else if (target.is(settings.setBottom)) {
                    //向下放大
                    handler.dragSetBottom(e, target, handler, that);
                    return;
                } else if (target.is(settings.setSE)) {
                    //向右下
                    handler.dragsSetSN(e, target, handler, that);
                }

                e.stopPropagation();
            },
            // 鼠标放开时
            dragOff: function (e, target, handler) {
                var settings = handler.settings;
                var originalPlace = settings.originalPlace;
                if (target.relaseCapture) {//IE和firefox
                    target[0].relaseCapture();
                    target.off("mousemove", function () {
                        handler.dragMove(event, target, handler)
                    });
                    target.off("mouseup", function () {
                        handler.dragOff(event, target, handler)
                    });
                } else {//chrom
                    $(document).off("mousemove", target.MOVE);
                    $(document).off("mouseup", target.UP);
                }
                e.stopPropagation();
            },
            // 获取浏览器滚动条位置
            getScroll: function () {
                this.settings.scroll.nScrollT = $(document).scrollTop();
                this.settings.scroll.nScrollL = $(document).scrollLeft();
            }
        }
    })
    $.drag = $.fn.drag;
})(jQuery)


//执行插件方法
$(function () {
    $.drag();
})

