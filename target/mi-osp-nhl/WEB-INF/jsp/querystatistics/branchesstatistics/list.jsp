<%--
  Created by IntelliJ IDEA.
  User: localadmin
  Date: 16/9/8
  Time: 10:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .hospital-grid-container{
        overflow: hidden;
    }
    .resize-container-btn{
        position: absolute;
        top:0;left:0;right:0;bottom:0;
        background-color: #EBEBEB;
        border-radius: 1px;
    }
    .resize-container-btn i{
        cursor: pointer;
    }
    .hospital-map-container{
        right: 0;bottom: 0;width:auto !important;
    }
    #hosMap{
        position: absolute;top:0;left:0;bottom:0;right:0;border: 1px solid #E0E0E0;
    }
</style>
<div ng-controller="branchesStatisticsListController">
    <div ui-layout="{dividerSize:0}" class="layout-domain" localstorage layout-loaded-grid-position>
        <div ui-layout-container size="30px">
            <span breadcrumb data-title="网点分布统计"></span>
        </div>
        <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
            <table class="search-table" enter-submit>
                <tr>
                    <td class="search-options-td">
                        <div class="form-inline">
                            <div class="form-group">
                                <label class="control-label">连锁药店公司：</label>
                                <input type="text" class="input-large" name="pharmacyName"  ng-model="searchParams.pharmacyName"/>
                            </div>
                        </div>
                    </td>
                    <td class="search-btns-td" valign="top" style="width:55px;">
                        <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                    </td>
                </tr>
            </table>
            <div auto-grid-position class="grid-top-setting">
                <div ui-layout="{flow:'column',dividerSize:0}">
                    <div ui-layout-container size="300px" max-size="300px" class="hospital-grid-container">
                        <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
                    </div>
                    <div ui-layout-container size="10px" class="resize-container-btn">
                        <i class="{{isShow==true?'icon-chevron-left':'hide'}}" ng-click="hideGrid();"></i>
                        <i class="{{isShow==false?'icon-chevron-right':'hide'}}" ng-click="showGrid();"></i>
                    </div>
                    <div ui-layout-container="central" class="hospital-map-container">
                        <div id="hosMap"></div>
                    </div>
                </div>
            </div>
        </div>
        <div ui-layout-container size="34px" class="page-container">
            <span ng-cis-grid-pager="pager" options="gridOptions"></span>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function(){
        $("script[src*='http://api.map.baidu.com/getscript?']").remove();//避免多次进入该页面产生多个"http://api.map.baidu.com/getscript"的script标签
    });
    function initPharmacyMap(){
        var appElement = document.querySelector('[ng-controller=branchesStatisticsListController]');
        var $scope = angular.element(appElement).scope();
        $scope.mapObj.init();
    }
</script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.4&callback=initPharmacyMap"></script>