/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.view.user.feedback.FeedBackListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedback_feedbacklist',
    requires: [

    ],
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        store.getProxy().extraParams = vm.data.searchModel;
        store.loadPage(1);
    }
});