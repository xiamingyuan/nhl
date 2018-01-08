/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.basicinfor.sessionmanager.sessionmanageradd.SessionManagerAddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicinfor_sessionmanageradd',
    requires: [

    ],
    onSave:function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            data = vm.data.formModel;
        var form = Ext.getCmp('sessionFormAdd').getForm();
        Ext.MessageBox.confirm('提示', '确定添加该话术？', function (btn) {
            if(btn=='yes'){
                if(form.isValid()) {
                    Ext.Ajax.request({
                        url: 'addsessioninfo',
                        method: 'POST',
                        params: data,
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