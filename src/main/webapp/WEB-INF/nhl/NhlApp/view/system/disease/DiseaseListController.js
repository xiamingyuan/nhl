/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.view.system.disease.DiseaseListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.disease_diseaselist',
    requires: [

    ],
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore();
        var diseaseCode = Ext.getCmp("diseaseCode").getValue();
        var diseaseIcdName = Ext.getCmp("diseaseIcdName").getValue();
        store.getProxy().extraParams = {
            diseaseCode: diseaseCode,
            diseaseIcdName: diseaseIcdName
        };
        store.loadPage(1);
    }
});