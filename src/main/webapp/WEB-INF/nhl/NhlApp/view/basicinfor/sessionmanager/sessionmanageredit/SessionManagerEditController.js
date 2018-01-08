/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.basicinfor.sessionmanager.sessionmanageredit.SessionManagerEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicinfor_sessionmanageredit',
    requires: [],
    init: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            id = Ext.History.getToken().split("?")[1];
        Ext.Ajax.request({
            url: 'getsessioninfo',
            method: 'GET',
            params: {id: id},
            success: function (res) {
                var resText = Ext.util.JSON.decode(res.responseText);
                vm.setData({formModel: resText.data});
            }
        });

    },
    onSave: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            data = vm.data.formModel;
        var form = Ext.getCmp('sessionFormEdit').getForm();
        Ext.MessageBox.confirm('提示', '确定保存修改？', function (btn) {
            if (btn == 'yes') {
                if(form.isValid()) {
                    Ext.Ajax.request({
                        url: 'updatesessioninfo',
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        jsonData: data,
                        success: function (response, options) {
                            var data = Ext.decode(response.responseText);
                            if (data.code == 200) {
                                me.back();
                            }else {
                                Ext.MessageBox.alert('提示', data.msg);
                            }
                        }
                    });
                }
            }
        });
    },
    back: function () {
        Ext.History.back();
    }
});