/**
 * Created by localadmin on 17/4/10.
 */
Ext.define('NhlApp.view.system.hospitaldepartment.hospitaldepartmentdetail.HospitalDepartmentDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hospitaldepartment_hospitaldepartmentdetail',
    init:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            token = Ext.History.getToken(),
            id = token.split("?")[1];
        Ext.Ajax.request({
            url: 'queryhospitalbyid',
            params: {id: id },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    vm.setData(data.data.result);
                }
            }
        });
        Ext.Ajax.request({
            url: 'queryhospitaldepartlist',
            params: {id:id},
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    var grid = Ext.getCmp('departList');
                    grid.setData(data.result);
                }
            }
        });
    },
    afterrender:function() {
        var departListStore = Ext.getCmp('departList').getStore(),
            token = Ext.History.getToken(),
            departListId = token.split("?")[1];
        //意见反馈数据
        departListStore.getProxy().extraParams = {
            id: departListId
        };
        departListStore.load();
    },
    back: function () {
        Ext.History.back();
    }
});