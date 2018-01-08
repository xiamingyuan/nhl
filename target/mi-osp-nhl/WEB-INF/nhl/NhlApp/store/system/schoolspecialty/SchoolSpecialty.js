/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.store.system.schoolspecialty.SchoolSpecialty', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_system_schoolspecialty',
    model: 'NhlApp.model.system.schoolspecialty.SchoolSpecialty',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.system.schoolspecialty.SchoolSpecialty'
    ],
    proxy: {
        type: 'ajax',
        url: 'queryschoollist',
        method: 'GET',
        extraParams: {
            schoolName:'',
            province: '',
            city: '',
            district: ''
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