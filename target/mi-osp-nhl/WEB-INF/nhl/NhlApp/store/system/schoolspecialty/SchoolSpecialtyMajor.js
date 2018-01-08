/**
 * Created by localadmin on 17/4/11.
 */
Ext.define('NhlApp.store.system.schoolspecialty.SchoolSpecialtyMajor', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_system_schoolspecialtymajor',
    model: 'NhlApp.model.system.schoolspecialty.SchoolSpecialtyMajor',
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.system.schoolspecialty.SchoolSpecialtyMajor'
    ],
    proxy: {
        type: 'ajax',
        url: 'queryschooldepartlist',
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