/**
 * Created by localadmin on 17/4/7.
 */
Ext.define('NhlApp.view.system.dictionary.dictionaryadd.DictionaryAddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_dictionary_add',
    onSave: function () {
        var me = this,
            view = me.getView(),
            window = view.up('window'),
            store = Ext.getCmp('dictionary').getStore(),
            formValues = Ext.getCmp('DictionaryAddForm').getForm().getValues();
        var form = Ext.getCmp('DictionaryAddForm').getForm();
        if(form.isValid()) {
            Ext.Ajax.request({
                url: 'savedictionarydata',
                method: 'POST',
                params: formValues,
                success: function (res) {
                    var resText = Ext.util.JSON.decode(res.responseText);
                    if (resText.code == 200) {
                        setTimeout(function () {
                            store.reload();
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