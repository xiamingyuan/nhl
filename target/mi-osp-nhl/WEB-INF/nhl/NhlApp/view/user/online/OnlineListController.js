/**
 * Created by zd on 17/3/28.
 */
Ext.define('NhlApp.view.user.online.OnlineListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.online_onlinelist',
    requires: [

    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('offline')){
            me.offline(record.data.sessionId);
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        store.getProxy().extraParams = vm.data.searchModel;
        store.loadPage(1);
    },
    offline:function (id) {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        Ext.MessageBox.confirm('提示', '确定强制下线？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'kickonlineuser',
                    params: {sessionId: id },
                    method: 'GET',
                    success: function (response, options) {
                        store.reload();
                    }
                });
            }
        });
    }
});