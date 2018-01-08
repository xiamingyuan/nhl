<%@ page language="java" contentType="text/html;charset=UTF-8" isELIgnored="false" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>错误提示 </title>
    <style type="text/css">
        body {
            font: 12px/150% "微软雅黑";
        }

        html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, input, button, textarea, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summargy, time, margk, audio, video {
            margin: 0;
            padding: 0;
        }

        body {
            background-color: #f4f4f4;
        }

        .clearfix:before, .clearfix:after {
            content: ".";
            display: block;
            height: 0;
            visibility: hidden;
        }

        .clearfix:after, .clear {
            clear: both;
        }

        .errorGroup {
            width: 500px;
            margin: 200px auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
        }

        .pull_left {
            float: left;
        }

        p {
            font-size: 15px;
            text-align: center;
        }

        p.title {
            color: #3b3b3b;
            font-family: \5FAE\8F6F\96C5\9ED1,\9ED1\4F53,Arial, Helvetica, sans-serif;
            text-align: center;
            margin-bottom: 30px;
        }

        p.title_style1,
        p.title_style3 {
            font-size: 30px;
            line-height: 45px;
        }

        p.title_style2 {
            font-size: 25px;
            line-height: 27px;
        }

        a {
            padding: 5px;
            margin: 0 5px;
            color: #4DB856;
            text-decoration: none;
            transition: all 0.2s ease-in;
            -webkit-transition: all 0.2s ease-in;
            -moz-transition: all 0.2s ease-in;
            -o-transition: all 0.2s ease-in;
        }

        a:hover {
            color: #FF7400;
            text-decoration: underline;
            cursor: pointer;
        }
    </style>
    <script src="../app/Scripts/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript">
        $(function () {
            (function ($) {
                $.getUrlParam = function (name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return decodeURIComponent(r[2]); return null;
                }
            })(jQuery);
            ErrorOpre();
        });

        function ErrorOpre() {
            var code = $.getUrlParam('code');
            var msg = $.getUrlParam('msg');
            var emsg = $("#msg");
            switch (parseInt(code)) {
                case 405:
                    emsg.text(msg);
                    break;
                case 500:
                    emsg.text(msg);
                    $("#opreate").append("或<a href='Javascript:history.go(-1)'>返回前一页</a>")
                    break;
            }
        }
    </script>
</head>
<body>
<div class="errorGroup">
    <div class="errorBox clearfix">
        <div class="pull_left">
            <img src="../app/image/error/icon_Error.jpg" width="130" height="116" alt="错误提示">
        </div>
        <div>
            <p id="msg" class="title  title_style3">服务器错误</p>
            <p id="opreate">您可以:<a href="/Cis.ZJHealthyLife/app/login.html">返回登录页</a></p>
        </div>
    </div>
</div>
</body>
</html>
