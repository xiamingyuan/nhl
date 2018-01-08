/**
 * Created by localadmin on 17/4/7.
 */
Ext.define('NhlApp.view.system.dictionary.dictionaryedit.DictionaryEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_dictionary_edit',
    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            formValues = Ext.getCmp('DictionaryEditForm').getForm().getValues();
        var form = Ext.getCmp('DictionaryEditForm').getForm();
        if(form.isValid()) {
            Ext.Ajax.request({
                url: 'savedictionarydata',
                method: 'POST',
                params: formValues,
                success: function (res) {
                    var resText = Ext.util.JSON.decode(res.responseText);
                    if (resText.code == 200) {
                        setTimeout(function () {
                            view.callback();
                            window.close();
                        }, 500);
                    }else {
                        Ext.MessageBox.alert('提示', resText.msg);
                    }
                }
            });
        }

    },
    onClose: function () {
        this.getView().up('window').close();
    }
});