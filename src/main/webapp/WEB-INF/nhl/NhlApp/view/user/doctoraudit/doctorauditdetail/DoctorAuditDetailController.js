/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.user.doctoraudit.doctorauditdetail.DoctorAuditDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_doctorauditdetail',
    afterrender:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            token = Ext.History.getToken(),
            userId = token.split("?")[1];
        me.level = [];
        Ext.Ajax.request({//获取职称级别 用于titleRender
            url: 'leveltitle',
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.level = data.data;
                }
            }
        });
        Ext.Ajax.request({
            url: 'getauthenbyid',
            params: {id: userId },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    for(var i=0;i<me.level.length;i++){
                        if(data.data.doctor_Title==me.level[i].itemvalue){
                            data.data.doctor_Title = me.level[i].itemname;
                        }
                    }
                    vm.setData(data.data);
                }
            }
        });
    },
    back: function () {
        Ext.History.back();
    }
});