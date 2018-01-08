/**
 * Created by apple on 2017/4/10.
 */
Ext.define('NhlApp.store.user.doctoraudit.DoctorAuditCheck', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_user_doctorauditcheck',
    model: 'NhlApp.model.user.doctoraudit.DoctorAuditCheck',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.user.doctoraudit.DoctorAuditCheck'
    ],
    proxy: {
        type: 'ajax',
        url: 'getextractedlist',
        method: 'GET',
        extraParams: {

        },
        reader: {
            type: 'json',
            rootProperty: 'data'//返回数据字段
        }
    },
    sorters: [{//排序
        property: 'default',
        direction: 'default'
    }],
    listeners:{
        load:function (records, operation, success) {
            var me = this,
                grid = Ext.getCmp('doctorauditcheck');
            grid.getSelectionModel().select(records.getData().items[0]);
        }
    }
});