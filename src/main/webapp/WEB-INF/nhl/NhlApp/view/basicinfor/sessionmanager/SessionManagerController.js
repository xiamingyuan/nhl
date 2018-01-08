/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.basicinfor.sessionmanager.SessionManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicinfor_sessionmanager',
    requires: [
        'NhlApp.view.basicinfor.sessionmanager.sessionmanageredit.SessionManagerEdit'
    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('delete')){
            me.delete(record.getId());
        }else if(ele.hasCls('edit')){
            me.edit(record.getId());
        }
    },
    delete:function (id) {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        Ext.MessageBox.confirm('提示', '确定删除？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'deletesessioninfo',
                    params: {id: id },
                    method: 'GET',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if (data.code == 200) {
                            store.reload();
                        }else {
                            Ext.MessageBox.alert('提示', data.msg);
                        }
                    }
                });
            }
        });
    },
    add:function () {
        Ext.History.add('sessionmanager/add/');
    },
    edit:function (id) {
        Ext.History.add('sessionmanager/edit/?'+id);
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    }
});