/**
 * Created by localadmin on 17/3/29.
 */
Ext.define('NhlApp.store.user.doctoraudit.DoctorAuditList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_user_doctoraudit',
    model: 'NhlApp.model.user.doctoraudit.DoctorAuditList',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.user.doctoraudit.DoctorAuditList'
    ],
    proxy: {
        type: 'ajax',
        url: 'getauthenlist',
        method: 'GET',
        extraParams: {
            loginname:'',
            realname:'',
            hospital:'',
            authenstatus:''
        },
        reader: {
            type: 'json',
            rootProperty: 'data.datas',//返回数据字段
            totalProperty : 'data.totalCount'
        }
    },
    sorters: [{//排序
        property: 'default',
        direction: 'default'
    }]
});