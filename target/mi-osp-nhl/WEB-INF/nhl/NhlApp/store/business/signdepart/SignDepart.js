/**
 * Created by apple on 2017/4/12.
 */
Ext.define('NhlApp.store.business.signdepart.SignDepart', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_business_signdepart',
    model: 'NhlApp.model.business.signdepart.SignDepart',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.business.signdepart.SignDepart'
    ],
    proxy: {
        type: 'ajax',
        url: 'getsigndepartlist',
        method: 'GET',
        extraParams: {
            hospital:'',
            department:'',
            master: '',
            signdepart:''
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
});