<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="clearfix cisPager"  style="overflow: hidden;">
    <div class="pull-left" style="margin-left: 5px;">
        每页&nbsp;<select ng-change="pageModule.lgPageSelectChange()" ng-options="a for a  in pageModule.arrPageSize" ng-model="pageModule.pageSize" size="1" name="pageSize" style="width:50px; display:inline-block;margin:-1px 0 0 0;"></select>&nbsp;条，<!--当前第<span ng-bind="pageModule.pageIndex"></span>页，-->共<span ng-bind=pageModule.TotalCount ng-bind="pageModule.TotalPages"></span>条记录，共有<span ng-bind="pageModule.TotalPages"></span>页
    </div>
    <div class="pull-right" style="margin-left: 5px; margin-right:10px ;" enter-submit>
        <input type="text" class="span2 page-num-input" ng-model="pageModule.gotoPage" value="{{pageModule.gotoPage}}">
        <button type="button"  class="btn blue btn-go enter-default" ng-click="pageModule.gotoPage != pageModule.pageIndex && pageModule.goto()" >跳转</button>
    </div>
    <div class="lgPageListBox pull-right" style="margin-left: 5px;">
        <div class="pagination page-index">
            <ul>
                <li class="{{1==pageModule.pageIndex?'disabled':''}}" ng-click="pageModule.pageIndex != 1 && pageModule.chanePageIndex(1)"><a class="page-link page-first-last" href="javascript:;">&laquo;</a></li>
                <li class="{{1>=pageModule.pageIndex?'disabled':''}}" ng-click="pageModule.pageIndex > 1 && pageModule.chanePageIndex(pageModule.pageIndex - 1)"><a class="page-link" href="javascript:;">&lt;</a></li>
                <%--循环出所有的页码--%>
                <li class="{{pageModule.pageIndex==item?'active':''}}"  ng-repeat="item in pageModule.pages" ng-click="pageModule.pageIndex!=item && pageModule.chanePageIndex(item)"><a class="page-link" href="javascript:;" ng-bind="item">1</a></li>
                <%--下一页--%>
                <li class="{{pageModule.TotalPages<=pageModule.pageIndex?'disabled':''}}" ng-click="pageModule.pageIndex < pageModule.TotalPages && pageModule.chanePageIndex(pageModule.pageIndex + 1)"><a class="page-link" href="javascript:;">&gt;</a></li>
                <li class="{{pageModule.TotalPages<=pageModule.pageIndex?'disabled':''}}" ng-click="pageModule.pageIndex != pageModule.TotalPages && pageModule.chanePageIndex(pageModule.TotalPages)"><a class="page-link page-first-last" href="javascript:;">&raquo;</a></li>
            </ul>
        </div>
        <!--<ul class="pageList" style="display:inline-block;">
            <li class='{{1>=pageModule.pageIndex?"disabled":""}} first' ng-click="pageModule.chanePageIndex(1)">
                <a class="glyphicon glyphicon-step-backward" href="javascript:;"></a>
            </li>
            <li class='{{1>=pageModule.pageIndex?"disabled":""}} prev' ng-click="pageModule.chanePageIndex(pageModule.pageIndex-1)">
                <a class="glyphicon glyphicon-triangle-left" href="javascript:;"></a>
            </li>
            <li>
                &nbsp;&nbsp;<span>第&nbsp;</span><input type="text" value="" class="form-control input-sm text-center" style="width:30px;height:19px;border-radius:0; display:inline-block; margin: 0;padding: 0;" ng-model="pageModule.pageSet" ng-keyup="pageModule.pageModuleChage()" /><span>&nbsp;页&nbsp;&nbsp;共 <b ng-bind="pageModule.TotalPages"></b> 页</span>&nbsp;&nbsp;
            </li>
            <li class='{{pageModule.TotalPages<=pageModule.pageIndex?"disabled":""}} next' ng-click="pageModule.chanePageIndex(pageModule.pageIndex+1)">
                <a class="glyphicon glyphicon-triangle-right" href="javascript:;"></a>
            </li>
            <li class='{{pageModule.TotalPages<=pageModule.pageIndex?"disabled":""}} last' ng-click="pageModule.chanePageIndex(pageModule.TotalPages)">
                <a class="glyphicon glyphicon-step-forward" href="javascript:;"></a>
            </li>
            <li class='' ng-click="pageModule.setPageIndex(pageModule.pageSet)">
                <a class="glyphicon glyphicon-search" href="javascript:;"></a>
            </li>
            <li class='' ng-click="pageModule.chanePageIndex(pageModule.pageIndex)">
                <a class="glyphicon glyphicon-refresh" href="javascript:;"></a>
            </li>
        </ul>-->
    </div>
</div>


