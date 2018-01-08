/**
 * Created by apple on 2017/3/30.
 */
Ext.define('NhlApp.view.user.message.messagedetail.MessageDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_messagedetail',
    init:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            token = Ext.History.getToken(),
            userId = token.split("?")[1];
        Ext.Ajax.request({
            url: 'getuserinfobyid',
            params: {id: userId },
            method: 'GET',
            success: function (response, options) {
                if(response.status==200){
                    vm.setData(JSON.parse(response.responseText).data);
                }
            }
        });
    },
    back: function () {
        Ext.History.back();
    }
});