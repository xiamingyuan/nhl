/**
 * Created by apple on 2017/3/29.
 */
Ext.define('NhlApp.store.user.blacklist.BlackList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_user_blacklist',
    model: 'NhlApp.model.user.blacklist.BlackList',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.user.blacklist.BlackList'
    ],
    proxy: {
        type: 'ajax',
        url: 'queryblacklist',
        method: 'GET',
        extraParams: {
            sdate:'',
            edate:'',
            queryKey: '',
            reason: ''
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