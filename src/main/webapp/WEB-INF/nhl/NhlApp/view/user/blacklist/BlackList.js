/**
 * Created by apple on 2017/3/29.
 */
Ext.define("NhlApp.view.user.blacklist.BlackList", {
    extend: "Nhl.base.Grid",
    alias: 'widget.blacklist',
    requires: [
        'NhlApp.view.user.blacklist.BlackListController',
        'NhlApp.view.user.blacklist.BlackListModel'
    ],
    controller: 'user_blacklist',
    viewModel: {
        type:'user_blacklist'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 黑名单',
    multiColumnSort:false,
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
            id:"queryKey",
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '用户名',
            enableKeyEvents:true
        },{
            id:"reason",
            labelWidth: 30,
            width: 180,
            xtype: 'textfield',
            fieldLabel: '原因',
            enableKeyEvents:true
        }, {
            text: '查询',
            id:"blackListSearch",
            name: 'blackListSearch',
            listeners:{
                click: 'filter'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
        { text: '用户名',width: 100, dataIndex: 'loginName',align: 'center'},
        { text: '姓名',width: 100, dataIndex: 'realName', align: 'center' },
        { text: '性别',width: 50, dataIndex: 'gender', align: 'center' ,renderer:function (val) {//转换性别
            if(val=='OTHER'){
                return '未知';
            }else if(val=='WOMEN'){
                return '女';
            }else{
                return '男';
            }
        }},
        { text: '出生日期',width: 140, dataIndex: 'birthday', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '资格认证',width: 80, dataIndex: 'authenStatus', align: 'center',renderer:function (val) {
            if (val == "0") {
                return "未认证";
            } else if(val == "1"){
                return "认证中";
            } else if(val == "2"){
                return "已认证";
            } else {
                return "认证失败";
            }
        }},
        { text: '注册时间',width: 140, dataIndex: 'registertime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '原因',minWidth: 100,flex:1, dataIndex: 'reason', align: 'center' },
        { text: '处理人',width: 140, dataIndex: 'operator_name', align: 'center' },
        { text: '处理时间',width: 140, dataIndex: 'createTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '操作',sortable: false, menuDisabled:true, width: 50,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            if(permission.userblacklistRemove){
                return "<a href='javascript:void(0);' class='remove fa fa-share-square-o'>移除</a> ";
            }else {
                return "";
            }
        }}

    ],
    listeners: {
        cellclick: 'cellclick'
    }
});