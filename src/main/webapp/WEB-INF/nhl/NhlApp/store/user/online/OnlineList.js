/**
 * Created by zd on 17/3/28.
 */
Ext.define('NhlApp.store.user.online.OnlineList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_online_onlinelist',
    model: 'NhlApp.model.user.online.OnlineList',
    requires: [
        'NhlApp.model.user.online.OnlineList'
    ],
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    proxy: {
        type: 'ajax',
        url: 'getonlinelist',
        method: 'GET',
        extraParams: {
            loginName: "",
            deviceName:"",
            appVersion:""
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