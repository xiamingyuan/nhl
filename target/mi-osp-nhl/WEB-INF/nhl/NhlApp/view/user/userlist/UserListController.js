/**
 * Created by apple on 2017/3/27.
 */
Ext.define('NhlApp.view.user.userlist.UserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_userlist',
    requires: [

    ],
    afterrender:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        vm.getData().searchModel = {//这样可以绑定页面的状态 但是搜索不了
            loginName: window.localStorage.loginName,
            idNumber: window.localStorage.idNumber,
            sdate: Ext.util.Format.date(window.localStorage.sdate, "Y-m-d"),
            edate: Ext.util.Format.date(window.localStorage.edate, "Y-m-d")
        };
    },
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('detail')){
            me.showDetail(record.getId());
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    },
    showDetail:function (id) {
        Ext.History.add('userlist/detail/?'+id);
    },
    storage:function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            store = view.getStore();
        var storage = window.localStorage;

        store.getSorters().each(function(sorter) {//获取排序信息
            storage.property = sorter.getProperty();
            storage.direction = sorter.getDirection();
        });
        storage.pageSize = store.getPageSize();//获取每页条数
        for (var key in store.getProxy().extraParams){//获取搜索参数
            storage[key] = store.getProxy().extraParams[key]==undefined?"":store.getProxy().extraParams[key];
        }
    }
});