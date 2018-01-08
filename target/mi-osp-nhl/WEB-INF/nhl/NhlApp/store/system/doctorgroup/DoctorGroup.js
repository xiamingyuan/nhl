/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.store.system.doctorgroup.DoctorGroup', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_system_doctorgroup',
    model: 'NhlApp.model.system.doctorgroup.DoctorGroup',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.system.doctorgroup.DoctorGroup'
    ],
    proxy: {
        type: 'ajax',
        url: 'querydoctorgrouplist',
        method: 'GET',
        extraParams: {
            code:'',
            queryKey: ''
        },
        reader: {
            type: 'json',
            rootProperty: 'data.datas',//返回数据字段
            totalProperty : 'data.totalCount'
        }
    },
    //排序
    sorters: [{
        property: 'default',
        direction: 'default'
    }]
});