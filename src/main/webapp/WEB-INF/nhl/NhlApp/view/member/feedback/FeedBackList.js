/**
 * Created by zd on 17/3/29.
 */
Ext.define("NhlApp.view.member.feedback.FeedBackList",{
    extend: "Nhl.base.Grid",
    alias: 'widget.member_feedbacklist',
    requires: [
        'NhlApp.view.member.feedback.FeedBackListController',
        'NhlApp.view.member.feedback.FeedBackListModel'
    ],
    controller: 'member_feedback',
    viewModel:{
        type:'member_feedback'
    },
    width : '100%',
    height: '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 意见反馈',
    multiColumnSort:false, //单个排序功能
    startRowGroupsCollapsed: false,
    isPage:true,//是否需要分页,
    border:true,
    bind: {
        store: '{gridstore}'
    },
    tbar: {
        xtype: 'toolbar',
        padding: 5,
        height:38,
        width: '100%',
        defaults: {
            labelAlign: 'right',
            margin: '0 10 0 0'
        },
        items: [{
            id:"loginName",
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '用户名',
            enableKeyEvents:true,
            bind: '{searchModel.loginName}',
        },{
            id:"realName",
            labelWidth: 30,
            width: 130,
            xtype: 'textfield',
            fieldLabel: '姓名',
            enableKeyEvents:true,
            bind: '{searchModel.realName}',
        },{
            id:"content",
            labelWidth: 30,
            width: 130,
            xtype: 'textfield',
            fieldLabel: '内容',
            enableKeyEvents:true,
            bind: '{searchModel.content}',
        },{
            id:"sdate",
            labelWidth: 55,
            width: 165,
            xtype: 'datefield',
            bind: '{searchModel.sdate}',
            format: 'Y-m-d',
            fieldLabel: '提交时间'
        }, '-',{
            id:"edate",
            labelWidth: 0,
            width: 110,
            xtype: 'datefield',
            bind: '{searchModel.edate}',
            format: 'Y-m-d'
        },{
            text: '查询',
            id:"onlineSearch",
            name: 'onlineSearch',
            listeners:{
                click: 'filter'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
        { text: '内容',flex:1, dataIndex: 'content'},
        { text: '用户名',width: 100, dataIndex: 'loginName', align: 'center' },
        { text: '姓名',width: 100, dataIndex: 'realName', align: 'center' },
        { text: '提交时间',width: 140, dataIndex: 'createTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')}
    ],
    listeners: {
    }
});
