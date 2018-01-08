/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.store.basicinfor.sessionmanager.SessionManager', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_basicinfor_sessionmanager',
    model: 'NhlApp.model.basicinfor.sessionmanager.SessionManager',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.basicinfor.sessionmanager.SessionManager'
    ],
    proxy: {
        type: 'ajax',
        url: 'getsessionmanagerlist',
        method: 'GET',
        extraParams: {
            type: "",
            character: "",
            queryKey: ""
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