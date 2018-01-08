/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.doctorgroup.DoctorGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_doctorgroup',
    requires: [

    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(ele.hasCls('edit')){
            me.edit(record.getId());
        }else if(ele.hasCls('detail')){
            me.showDetail(record.getId());
        }else if(ele.hasCls('delete')){
            me.delete(record.getId());
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.down('cisgrid').getStore();
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    },
    showDetail:function (id) {
        Ext.History.add('doctorgroup/detail/?'+id);
    }
});