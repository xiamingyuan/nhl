/**
 * Created by zd on 17/3/30.
 */
Ext.define('NhlApp.store.member.memberlist.MemberList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_member_memberlist',
    model: 'NhlApp.model.member.memberlist.MemberList',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.member.memberlist.MemberList'
    ],
    proxy: {
        type: 'ajax',
        url: 'getmemberlist',
        method: 'GET',
        extraParams: {
            queryKey: "",
            sdate: "",
            edate: ""
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