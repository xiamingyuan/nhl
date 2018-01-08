<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    input[readonly]{
        cursor:default;
    }
    ul,li{list-style: none;}
    .btn-group, .btn-group-vertical {
        position: relative;
        display: inline-block;
        vertical-align: middle;
    }
    .btn .caret {
        margin-left: 0;
        margin-top: 6px;
        border-top: 4px solid #6b747e;
    }
    .cisCheckSelect_btn {
        border-radius: 3px 0px 0px 3px;
        background-color: transparent;
        color: #6b747e;
        font-size: 12px;
        line-height: 16px;
        border: 1px solid #ccc;
        border-right: none;
    }
    .CIS-checkSelect_checkedWarp {
        display: inline-block;
        vertical-align: middle;
        width: 365px;
        height: 24px;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }

    .CIS-checkSelect_checkedWarp:hover {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    }

    .CIS-checkSelect_checkedOption_box li {
        float: left;
        margin: 2px 0 0 5px;
        padding: 2px 4px;
        line-height: 13px;
        color: #6b747e;
        cursor: default;
        border: 1px solid #aaaaaa;
        border-radius: 3px;
        -webkit-box-shadow: 0 0 2px #fff inset, 0 1px 0 rgba(0, 0, 0, 0.05);
        box-shadow: 0 0 2px #fff inset, 0 1px 0 rgba(0, 0, 0, 0.05);
        background-clip: padding-box;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: #e4e4e4;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#f4f4f4', GradientType=0);
        background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(20%, #f4f4f4), color-stop(50%, #f0f0f0), color-stop(52%, #e8e8e8), color-stop(100%, #eee));
        background-image: -webkit-linear-gradient(top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eee 100%);
        background-image: -moz-linear-gradient(top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eee 100%);
        background-image: linear-gradient(to top, #f4f4f4 20%, #f0f0f0 50%, #e8e8e8 52%, #eee 100%);
    }

    .CIS-checkSelect_checkedOption_box li span.CIS-checkSelect_checkedOption_closeBtn {
        cursor: pointer;
    }

    .CIS-checkSelect_checkedOption_box li p.CIS-checkSelect_checkedOption_textCont {
        margin-left: 4px;
    }
    .btn-default.active, .btn-default.focus, .btn-default:active, .btn-default:focus, .btn-default:hover, .open>.dropdown-toggle.btn-default {
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
    }
    .open>.dropdown-menu {
        display: block;
    }
    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        display: none;
        float: left;
        min-width: 160px;
        padding: 5px 0;
        margin: 2px 0 0;
        font-size: 14px;
        text-align: left;
        list-style: none;
        background-color: #fff;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        border: 1px solid #ccc;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: 4px;
        -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
        box-shadow: 0 6px 12px rgba(0,0,0,.175);
    }
    .dropdown-menu > li > a {
        font-weight: initial;
        font-size: 12px;
        padding: 3px 10px;
    }
    .dropdown-menu>li>a {
        display: block;
        font-size: 12px;
        padding: 3px 20px;
        clear: both;
        font-weight: 400;
        line-height: 1.42857143;
        color: #6b747e;
        white-space: nowrap;
    }
    .dropdown-menu>li>a:focus, .dropdown-menu>li>a:hover {
        color: #262626;
        text-decoration: none;
        background-color: #f5f5f5;}
</style>
<div ui-layout="{dividerSize:0}" class="layout-domain" layout-loaded-grid-position localstorage>
    <div ui-layout-container size="30px" >
        <span breadcrumb data-title="供应商管理"></span>
    </div>
    <div ui-layout-container="central" class="grid-container" ui-layout-loaded>
        <table class="search-table" enter-submit>
            <tr>
                <td class="search-options-td">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label">供应商名称：</label>
                            <input type="text" class="input-large" name="queryKey"  ng-model="queryList.queryKey"/>
                        </div>
                        <div class="form-group" cis-checkselect>
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-default cisCheckSelect_btn  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border-radius: 3px 0px 0px 3px;font-size: 12px;">
                                    供应商类型
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" style="z-index: 1001;">
                                    <li ng-repeat="type in supplierType.initType track by $index" ng-click="checkSelectHandle.addOptions(type)"><a href="javascript:;">{{type.name}}</a></li>
                                </ul>

                                <div class="CIS-checkSelect_checkedWarp">
                                    <ul class="CIS-checkSelect_checkedOption_box">
                                        <li ng-repeat="haveType in  supplierType.haveOptions track by $index"  class="" style="font-size: 12px;">
                                            <span ng-click="checkSelectHandle.deletOptions(haveType)"  class="CIS-checkSelect_checkedOption_closeBtn  pull-left">&times;</span>
                                            <p class="CIS-checkSelect_checkedOption_textCont  pull-left">{{haveType.name}}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="search-btns-td" valign="top" style="width:55px;">
                    <button type="button" class="btn blue enter-default"  ng-click="gridOptions.search()">查询</button>
                </td>
            </tr>
        </table>
        <div auto-grid-position class="grid-top-setting">
            <div ui-grid="grid" ui-grid-resize-columns ui-grid-selection ui-grid-auto-resize class="grid-size"></div>
        </div>
    </div>
    <div ui-layout-container size="34px" class="page-container">
        <span ng-cis-grid-pager="pager" data-save-status="true" options="gridOptions"></span>
    </div>
</div>