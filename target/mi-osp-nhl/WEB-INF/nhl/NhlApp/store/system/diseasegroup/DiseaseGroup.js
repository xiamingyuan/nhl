/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.store.system.diseasegroup.DiseaseGroup', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_system_diseasegroup',
    model: 'NhlApp.model.system.diseasegroup.DiseaseGroup',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.system.diseasegroup.DiseaseGroup'
    ],
    proxy: {
        type: 'ajax',
        url: 'querydiseasegroups',
        method: 'GET',
        extraParams: {
            name:'',
            description:''
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
    }],
    listeners:{
        //执行controller load方法
        load:'load'
    }
});