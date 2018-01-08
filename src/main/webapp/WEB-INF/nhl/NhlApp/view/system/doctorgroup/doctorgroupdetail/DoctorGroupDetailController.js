/**
 * Created by localadmin on 17/4/10.
 */
Ext.define('NhlApp.view.system.doctorgroup.doctorgroupdetail.DoctorGroupDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.doctorgroup_doctorgroupdetail',
    init:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            token = Ext.History.getToken(),
            id = token.split("?")[1];
        me.isBlack='';
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
    }
});