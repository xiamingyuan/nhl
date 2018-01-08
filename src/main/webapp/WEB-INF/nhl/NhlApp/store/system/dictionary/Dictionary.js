/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.store.system.dictionary.Dictionary', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_system_dictionary',
    model: 'NhlApp.model.system.dictionary.Dictionary',
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.system.dictionary.Dictionary'
    ],
    proxy: {
        type: 'ajax',
        url: 'getdictionarylist',
        method: 'GET',
        extraParams: {
            classID: "",
            className: "",
            itemName: ""
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