/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.view.member.feedback.FeedBackListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.member_feedback',
    requires: [

    ],
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    }
});