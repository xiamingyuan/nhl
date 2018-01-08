/**
 * Created by zd on 17/3/28.
 */
Ext.define("NhlApp.view.user.online.OnlineList",{
    extend: "Nhl.base.Grid",
    alias: 'widget.onlinelist',
    requires: [
        'NhlApp.view.user.online.OnlineListController',
        'NhlApp.view.user.online.OnlineListModel'
    ],
    controller: 'online_onlinelist',
    viewModel:{
        type:'online_onlinelist'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 在线用户',
    multiColumnSort:false, //单个排序功能
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
            labelWidth: 45,
            width: 145,
            xtype: 'textfield',
            fieldLabel: '用户名',
            bind: '{searchModel.loginName}',
            enableKeyEvents:true
        },{
            id:"deviceName",
            labelWidth: 55,
            width: 155,
            xtype: 'textfield',
            fieldLabel: '设备类型',
            bind: '{searchModel.deviceName}',
            enableKeyEvents:true
        },{
            id:"appVersion",
            labelWidth: 55,
            width: 155,
            xtype: 'textfield',
            fieldLabel: 'APP版本',
            bind: '{searchModel.appVersion}',
            enableKeyEvents:true
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
        { text: '用户名',width: 100, dataIndex: 'loginName',align: 'center'},
        { text: '登录IP',width: 120, dataIndex: 'ipAddress', align: 'center' },
        { text: '设备类型',flex:1,minWidth:60, dataIndex: 'deviceName'},
        { text: '设备ID',width: 100,minWidth:'60', dataIndex: 'deviceId'},
        { text: 'OS',width: 100, dataIndex: 'os', align: 'center' },
        { text: 'APP版本',width: 100, dataIndex: 'appVersion', align: 'center' },
        { text: '登录时间',width: 140, dataIndex: 'loginTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')},
        { text: '登录时长',width: 120, dataIndex: 'onlineTime', align: 'center' },
        { text: '操作',sortable: false, menuDisabled:true, width: 100,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            if(permission.onlineuserRemove){
                return "<a href='javascript:void(0);' class='offline fa fa-share-square-o'>强制下线</a>";
            }else {
                return "";
            }
        }}

    ],
    listeners: {
        cellclick: 'cellclick'
    }
});