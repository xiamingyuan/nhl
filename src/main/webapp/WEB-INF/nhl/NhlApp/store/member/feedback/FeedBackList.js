/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.store.member.feedback.FeedBackList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_member_feedback',
    model: 'NhlApp.model.member.feedback.FeedBackList',
    requires: [
        'NhlApp.model.member.feedback.FeedBackList'
    ],
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    proxy: {
        type: 'ajax',
        url: 'getfeedbacklist',
        method: 'GET',
        extraParams: {
            loginName: "",
            realName:"",
            content:"",
            sdate: "",
            edate: ""
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