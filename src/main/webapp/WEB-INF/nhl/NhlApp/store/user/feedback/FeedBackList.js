/**
 * Created by zd on 17/3/29.
 */
Ext.define('NhlApp.store.user.feedback.FeedBackList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_feedback_feedbacklist',
    model: 'NhlApp.model.user.feedback.FeedBackList',
    requires: [
        'NhlApp.model.user.feedback.FeedBackList'
    ],
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    proxy: {
        type: 'ajax',
        url: 'querysuggestlist',
        method: 'GET',
        extraParams: {
            sdate: "",
            edate: "",
            loginName: "",
            realName:"",
            content:""
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