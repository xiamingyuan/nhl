/**
 * Created by apple on 2017/3/29.
 */
Ext.define('NhlApp.store.user.message.Message', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_user_message',
    model: 'NhlApp.model.user.message.Message',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.user.message.Message'
    ],
    proxy: {
        type: 'ajax',
        url: 'getmsgplan',
        method: 'GET',
        extraParams: {
            beginDate:'',
            creatorName:'',
            endDate:'',
            receivePerson:'',
            sendBeginDate:'',
            sendEndDate:'',
            title:''
        },
        reader: {
            type: 'json',
            rootProperty: 'data.datas',//返回数据字段
            totalProperty : 'data.totalCount'
        }
    },
    sorters: [{//排序
        property: 'default',
        direction: 'default'
    }]
});