
//弹窗拖拽插件
(function ($) {
    $.fn.extend({
        drag: function () {
            //{
            //    //moveTarget: ".modal-header",
            //    //targetParents: ".modal-dialog",
            //    //moveEle: ".modal-dialog"
            //}
           
            if (arguments.length == 0) {
                var obj = {
                    moveTarget: ".modal-header",
                    moveEle: ".modal-dialog",
                    targetParents: "document.body"
                }
                arguments[0] = obj;
                
            } else {
                var obj = arguments[0];
                if (typeof (obj) !== "object") {
                    return false;
                }
            }
            
            if (isEmptyObject(obj) == false) {
                return false;
            } else {
                if (!obj.moveEle) {
                    return false;
                }
            }
          

            //判断对象是否为空
            function isEmptyObject(obj) {
                var name;
                for (name in obj) {
                    return true;
                }
                return false;
            }

            var $th = this;
            
            var $move = $(obj.moveEle);

            var nScrollT, nScrollL
            var o = {};
            $th.css({ "cursor": "move" });
            if ($th.length != 0) {
                $(document.body).on("mousedown", obj.moveTarget, down);
                //$(document.body).on('mousedown', $th, down)
                ////$th.on("mousedown", down);
            } else {
                if ($(obj.targetParents).length == 0) {
                    $(document.body).on("mousedown", obj.moveTarget, down);
                } else {
                    $(obj.targetParents).on("mousedown", obj.moveTarget, down);
                }
            }
           

            //改变指针
            function disguise(obj, fn) {
                return function (e) {
                    fn.call(obj, e);
                }
            }

            //开始点击
            function down(e) {
                $move = $(obj.moveEle);
                nScrollT = $(document).scrollTop();
                nScrollL = $(document).scrollLeft();
                if ($move.length != 0) {
                    if ($move.css("position") == "absolute") {
                        o.origin = $move.position();
                        $move.css({ "left": o.origin.left, "top": o.origin.top });
                    } else if ($move.css("position") == "relative" || $move.css("position") == "fixed") {
                      
                        //o.origin = $move.position();
                       
                        //console.log(o.origin)
                        //$move.parents('.modal:first').on('loaded.bs.modal', function (e) {
                        //   console.log(1)
                        //   console.log($move.position())
                        //    o.origin = $move.offset();
                        //})
                        
                        console.log($move)
                        //用ng创建的弹窗获取不到偏移量
                        o.origin = $move.offset()
                        
                        $move.css({ "margin-top": 0, "margin-left": 0, "left": parseInt(o.origin.left) - nScrollL - 180, "top": parseInt(o.origin.top) - nScrollT});
                    }
                } else {
                    o.origin = $th.offset();
                    $th.css({ "margin-top": 0, "margin-left": 0, "left": parseInt(o.origin.left) - nScrollL - 180, "top": parseInt(o.origin.top) - nScrollT});
                }


                o.x = e.pageX;
                o.y = e.pageY;

                if ($th.setCapture) {//ie和firefox
                    $th.setCapture();
                    $th.on("mousemove", move);
                    $th.on("mouseup", up);
                } else {// chrome
                    $th.MOVE = disguise($th, move);
                    $th.UP = disguise($th, up);
                    $(document).on("mousemove", $th.MOVE);
                    $(document).on("mouseup", $th.UP);
                }
                e.preventDefault();
            }

            //移动
            function move(e) {
               
                e = window.event || e;
                e.target = e.srcElement || e.target;
                e.stopPropagation = function () { e.cancelBubble = true };
                e.preventDefault = function () { e.returnValue = false };
                e.pageX = (document.body.scrollLeft || document.documentElement.scrollLeft) + e.clientX;
                e.pageY = (document.body.scrollTop || document.documentElement.scrollTop) + e.clientY;
                
                if ($move.css("position") == "absolute") {
                    $move.css({
                        "left": o.origin.left + (e.pageX - o.x) ,
                        "top": o.origin.top + (e.pageY - o.y) 
                    })
                }else if (o.origin.top + (e.pageY - o.y) >= 0) {
                    $move.css({
                        "left": o.origin.left + (e.pageX - o.x) - nScrollL,
                        "top": o.origin.top + (e.pageY - o.y) - nScrollT
                    })
                }
            }

            //鼠标抬起
            function up(e) {
                if ($th.relaseCapture) {//IE和firefox
                    $th.relaseCapture();
                    $th.off("mousemove", move);
                    $th.off("mouseup", up);
                } else {//chrom
                    $(document).off("mousemove", $th.MOVE);
                    $(document).off("mouseup", $th.UP);
                }
            }
        }
    })
})(jQuery)

$(function () {
    //重置弹窗位置
    //$('div.modal').on('show.bs.moda', function (e) {
    //   console.log(333)
    //})





    //$('[data-toggle="modal"]').click(function () {
    //    var target = $(this).attr("data-target");
    //    var oDragb = $("<div style='position:fixed;top:0;left:0;bottom:0;right:0;background-color:#ffffff; opacity:0;filter:alpha(opacity=0); -moz-opacity:0'></div>");
    //    $(target).find(".modal-dialog").removeAttr("style").before(oDragb);
    //})
        
        
        
    //    .each(function () {
    //    var target = $(this).attr("data-target");
    //    var oDragb = $("<div style='position:fixed;top:0;left:0;bottom:0;right:0;background-color:#ffffff; opacity:0;filter:alpha(opacity=0); -moz-opacity:0'></div>");
    //    $(this).
    //})



    //$('[data-toggle="modal"]').each(function () {
    //    var target = $(this).attr("data-target");
    //    var oDragb = $("<div style='position:fixed;top:0;left:0;bottom:0;right:0;background-color:#ffffff; opacity:0;filter:alpha(opacity=0); -moz-opacity:0'></div>");
    //    $(this).click(function () {
    //        $(target).find(".modal-dialog").removeAttr("style").before(oDragb);
    //    })
    //    console.log(44)
    //})
    //运行方法
    //$(".modal-header").each(function () {
    //    $(this).drag();
    //})
})
