/**
 * Created by localadmin on 17/4/11.
 */
Ext.define('NhlApp.store.system.hospitaldepartment.DepartmentList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_system_departmentList',
    model: 'NhlApp.model.system.hospitaldepartment.DepartmentList',
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.system.hospitaldepartment.DepartmentList'
    ],
    proxy: {
        type: 'ajax',
        url: 'queryhospitaldepartlist',
        method: 'GET',
        extraParams: {
        },
        reader: {
            type: 'json',
            rootProperty: 'data.result',//返回数据字段
            totalProperty : 'data.totalCount'
        }
    },
    //排序
    sorters: [{
        property: 'default',
        direction: 'default'
    }]
});