/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.store.system.disease.DiseaseList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_disease_diseaselist',
    model: 'NhlApp.model.system.disease.DiseaseList',
    requires: [
        'NhlApp.model.system.disease.DiseaseList'
    ],
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    proxy: {
        type: 'ajax',
        url: 'getdiseaselist',
        method: 'GET',
        extraParams: {
            diseaseCode:"",
            diseaseIcdName: ""
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
        load:function (ele , records , successful , eOpts) {
            // console.log(eOpts)
        }
    }
});