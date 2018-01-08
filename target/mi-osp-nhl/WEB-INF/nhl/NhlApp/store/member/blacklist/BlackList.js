/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.store.member.blacklist.BlackList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_member_blacklist',
    model: 'NhlApp.model.member.blacklist.BlackList',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.member.blacklist.BlackList'
    ],
    proxy: {
        type: 'ajax',
        url: 'getblacklist',
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