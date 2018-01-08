/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.store.member.membercard.MemberCard', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_member_membercard',
    model: 'NhlApp.model.member.membercard.MemberCard',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.member.membercard.MemberCard'
    ],
    proxy: {
        type: 'ajax',
        url: 'getmembercardlist',
        method: 'GET',
        extraParams: {
            queryKey: ""
        },
        reader: {
            type: 'json',
            rootProperty: 'data.datas',//返回数据字段
            totalProperty : 'data.totalCount'
        }
    },
    // 排序
    sorters: [{
        property: 'default',
        direction: 'default'
    }]
});