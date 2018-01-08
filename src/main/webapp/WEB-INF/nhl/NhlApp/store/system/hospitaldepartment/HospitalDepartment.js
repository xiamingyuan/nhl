/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.store.system.hospitaldepartment.HospitalDepartment', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_system_hospitaldepartment',
    model: 'NhlApp.model.system.hospitaldepartment.HospitalDepartment',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.system.hospitaldepartment.HospitalDepartment'
    ],
    proxy: {
        type: 'ajax',
        url: 'queryhospitallist',
        method: 'GET',
        extraParams: {
            code:'',
            hospitalName:'',
            level:'',
            province:'',
            city:'',
            district:''
        },
        reader: {
            type: 'json',
            rootProperty: 'data.result.datas',//返回数据字段
            totalProperty : 'data.result.totalCount'
        }
    },
    //排序
    sorters: [{
        property: 'default',
        direction: 'default'
    }]
    ,
    listeners:{
        //执行controller load方法
        load:'load'
    }
});