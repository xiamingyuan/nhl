<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0"/>
    <title>详情</title>
    <link rel="stylesheet" href="../../../mi-osp/scripts/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="../../../mi-osp/css/shipei.css"/>
</head>
<body class="bw">
<div class="container bw">
    <header class="box">
        <h4 class="t-name">${title}</h4>
        <table width="100%">
            <tr>
                <td style="text-align: left" width="30%"><span class="text blue">${org}</span></td>
                <td style="text-align: center" width="40%"><span
                        class="glyphicon glyphicon-time text postop"></span><span class="text gray">${createtime}</span>
                </td>
                <td style="text-align: right" width="30%"><span class="text glyphicon glyphicon-eye-open postop"></span><span
                        class="text gray">${browseCount}</span></td>
            </tr>
        </table>
    </header>
    <hr style="margin-top: 0.1rem;margin-bottom: 0.2rem;border: none;height: 0px;border-bottom: 1px solid #ccc;">
    <div class="contentDetailText">
    ${content}
    </div>
</div>
</body>
<script>
//    适配移动端rem尺寸JS
    window.onresize = r;
    function r(resizeNum) {
        var winW = window.innerWidth;
        document.getElementsByTagName("html")[0].style.fontSize = winW * 0.15625 + "px";
        if (winW > window.screen.width && resizeNum <= 10) {
            setTimeout(function () {
                r(++resizeNum)
            }, 100);
        }
        else {
            document.getElementsByTagName("body")[0].style.opacity = 1;
        }
    }
    ;
    setTimeout(function () {
        r(0)
    }, 100);
</script>
</html>