/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.dictionary.DictionaryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_dictionary',
    requires: [
        'NhlApp.view.system.dictionary.dictionaryedit.DictionaryEdit',
        'NhlApp.view.system.dictionary.dictionaryadd.DictionaryAdd'
    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('edit')){
            me.edit(record.getId());
        }else if(ele.hasCls('delete')){
            me.delete(record.getId());
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        var classID = Ext.getCmp("classID").getValue();
        var className = Ext.getCmp("className").getValue();
        var itemName = Ext.getCmp("itemName").getValue();
        store.getProxy().extraParams = {
            classID: classID,
            className: className,
            itemName: itemName
        };
        store.loadPage(1);
    },
    add:function () {
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加字典数据',
            resizable: false,
            modal: true,
            width: 380,
            layout: 'fit',
            items: {
                xtype: 'system_dictionary_add'
            }
        }).show();
    },
    edit:function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '修改字典数据',
            resizable: false,
            modal: true,
            width: 380,
            layout: 'fit',
            items: {
                xtype: 'system_dictionary_edit',
                viewModel: {
                    data: {
                        editUser: record
                    }
                },
                callback: function () {
                    store.reload();
                }
            },
            listeners: {
                beforeclose: function () {
                    store.rejectChanges();
                }
            }
        }).show();
        Ext.getCmp('DictionaryEditForm').getForm().loadRecord(record);
    },
    delete:function (id) {
        var me = this,
            view = me.getView(),
            store = Ext.getCmp('dictionary').getStore();
        Ext.MessageBox.confirm('提示', '确定删除该数据？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'deldictionarybyid',
                    params: {id: id },
                    method: 'GET',
                    success: function (response, options) {
                        store.reload();
                    }
                });
            }
        });
    }
});