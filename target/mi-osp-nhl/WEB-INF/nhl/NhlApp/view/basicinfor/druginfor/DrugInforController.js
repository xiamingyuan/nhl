/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.basicinfor.druginfor.DrugInforController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicinfor_druginfor',
    requires: [
        'NhlApp.view.basicinfor.druginfor.druginforedit.DrugInforEdit'
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
    edit:function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('druggridstore'),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '修改药品信息',
            resizable: false,
            modal: true,
            width: 380,
            layout: 'fit',
            items: {
                xtype: 'basicinfor_druginfor_edit',
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
        Ext.getCmp('drugInforEditForm').getForm().loadRecord(record);
    },
    delete:function (id) {
        var me = this,
            view = me.getView(),
            store = Ext.getCmp('drug').getStore();
        Ext.MessageBox.confirm('提示', '确定删除该数据？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'deletedruginfo',
                    params: {id: id },
                    method: 'GET',
                    success: function (response, options) {
                        store.reload();
                    }
                });
            }
        });
    },
    select:function (ele , record , eOpts) {
        var me = this;
        me.categaryid = record.getId();
        me.filter();
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = Ext.getCmp('drug').getStore();
        vm.getData().searchModel.categaryid = me.categaryid;
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    },
    filterAll:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = Ext.getCmp('drug').getStore();
        var sm = Ext.getCmp('drugclassification').getSelectionModel();
        sm.deselect(sm.getLastSelected());//取消选中药品分类
        vm.getData().searchModel.categaryid = '';
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    }
});