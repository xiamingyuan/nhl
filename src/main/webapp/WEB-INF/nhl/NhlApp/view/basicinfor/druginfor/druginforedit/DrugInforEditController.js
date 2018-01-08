/**
 * Created by apple on 2017/4/6.
 */
Ext.define('NhlApp.view.basicinfor.druginfor.druginforedit.DrugInforEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicinfor_druginfor_edit',
    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            formValues = Ext.getCmp('drugInforEditForm').getForm().getValues();
        Ext.Ajax.request({
            url: 'updatedruginfo',
            method: 'GET',
            params: formValues,
            success: function (res) {
                var resText = Ext.util.JSON.decode(res.responseText);
                if (resText.code==200) {
                    Ext.MessageBox.alert('提示', '药品信息修改成功');
                    setTimeout(function(){
                        Ext.MessageBox.hide();
                        view.callback();
                        window.close();
                    }, 500);
                }
            }
        });
    },
    onClose: function () {
        this.getView().up('window').close();
    }
});