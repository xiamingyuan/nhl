/**
 * Created by apple on 2017/3/29.
 */
Ext.define('NhlApp.view.user.message.MessageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_message',
    requires: [

    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('cancle')){
            me.cancle(record.getId());
        }else if(ele.hasCls('edit')){
            me.edit(record.getId(),record.data.pubNum);
        }else if(ele.hasCls('detail')){
            me.detail(record.getId());
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
    messagePublic:function () {//添加消息发布
        Ext.History.add('message/messagepub');
    },
    detail:function (id) {
        Ext.History.add('message/detail/?'+id);
    },
    edit:function (id,num) {//编辑消息发布
        Ext.History.add('message/edit/?'+id+'?'+num);
    },
    cancle:function (id) {//取消发布消息
        var me = this,
            view = me.getView(),
            store = view.getStore();
        Ext.MessageBox.confirm('提示', '确定取消发布此条消息？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'cancelmsgplan',
                    params: {planId: id },
                    method: 'GET',
                    success: function (response, options) {
                        store.reload();
                    }
                });
            }
        });
    }
});