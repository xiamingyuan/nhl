/**
 * Created by localadmin on 17/4/11.
 */
Ext.define('NhlApp.store.system.diseasegroup.DiseaseGroupMajor', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_system_diseasegroupmajor',
    model: 'NhlApp.model.system.diseasegroup.DiseaseGroupMajor',
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.system.diseasegroup.DiseaseGroupMajor'
    ],
    proxy: {
        type: 'ajax',
        url: 'querydiseasegroupdiseases',
        method: 'GET',
        extraParams: {
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