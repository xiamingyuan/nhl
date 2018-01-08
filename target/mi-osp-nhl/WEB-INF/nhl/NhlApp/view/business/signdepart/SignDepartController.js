/**
 * Created by apple on 2017/4/12.
 */
Ext.define('NhlApp.view.business.signdepart.SignDepartController', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.business_signdepart',
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('delete')){
            me.delete(record.getId());
        }else if(ele.hasCls('edit')){
            me.editsigndepart(record.getId());
        }else if(ele.hasCls('detail')){
            me.showDetail(record.getId());
        }else if(ele.hasCls('disease')){
            me.showDisease(record.getId());
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    },
    editsigndepart:function (id) {
        Ext.History.add('signdepart/edit/?'+id);
    },
    addsigndepart:function () {
        Ext.History.add('signdepart/add/');
    },
    showDetail:function (id) {
        Ext.History.add('signdepart/detail/?'+id);
    },
    showDisease:function (id) {
        Ext.History.add('signdepart/disease/?'+id);
    },
    delete:function (id) {
        var me = this;
        Ext.MessageBox.confirm('提示', '确定删除该科室？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'delsigndepart',
                    method: 'GET',
                    params: {id:id},
                    success: function (response, options) {
                        var res = Ext.decode(response.responseText);
                        if(res.code==200){
                            me.filter();
                        }else{
                            Ext.MessageBox.alert('提示',res.msg);
                        }
                    }
                });
            }
        });
    }
});