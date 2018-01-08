<%@ page language="java" contentType="text/html;charset=UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>

<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>新健康-后台管理</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="image/favicon.ico" media="screen" />

    <link rel="stylesheet" type="text/css" href="NhlContent/css/resources/CisApp-all.min.css"/>
    <link rel="stylesheet" type="text/css" href="NhlContent/css/common/common.css"/>
    <link rel="stylesheet" type="text/css" href="NhlContent/css/FontAwesome/css/font-awesome.min.css"/>
    <link rel="stylesheet" type="text/css" href="NhlContent/lib/bootstrap/dist/css/bootstrap.font.min.css"/>

</head>
<body>
<input type="hidden" id="username" value="${sessionScope.UserName}" />
</body>
<script type="text/javascript" src="NhlContent/lib/extjs6/build/ext-all-debug.js"></script>
<script type="text/javascript" src="NhlContent/lib/extjs6/build/utilevent.js"></script>
<script type="text/javascript" src="NhlContent/lib/extjs6/build/theme-triton.js"></script>
<script type="text/javascript" src="NhlContent/lib/extjs6/build/locale-zh_CN.js"></script>
<script type="text/javascript" src="NhlContent/build/nhlview.js"></script>
<script type="text/javascript" src="NhlContent/build/nhllib.all.js"></script>
<script type="text/javascript" src="NhlApp/app.js"></script>
<script type="text/javascript">
    var permission = {};
    Ext.Ajax.request({//获取权限
        url: 'getpermission',
        method: 'GET',
        success: function (response, options) {
            var data = Ext.decode(response.responseText);
            permission = data;
            console.log(permission)
        }
    });
</script>
</html>
