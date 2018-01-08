/**
 * Created by localadmin on 17/4/12.
 */
Ext.define('NhlApp.view.system.schoolspecialty.schoolspecialtydetail.SchoolSpecialtyDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.schoolspecialty_schoolspecialtydetail',
    init:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            token = Ext.History.getToken(),
            id = token.split("?")[1];
        Ext.Ajax.request({
            url: 'queryschoolbyid',
            params: {id: id },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    vm.setData(data.data.result);
                }
            }
        });
    },
    afterrender:function() {
        var detailMajorListStore = Ext.getCmp('detailMajorList').getStore(),
            token = Ext.History.getToken(),
            detailMajorListId = token.split("?")[1];
        //意见反馈数据
        detailMajorListStore.getProxy().extraParams = {
            id: detailMajorListId
        };
        detailMajorListStore.load();
    },
    back: function () {
        Ext.History.back();
    }
});