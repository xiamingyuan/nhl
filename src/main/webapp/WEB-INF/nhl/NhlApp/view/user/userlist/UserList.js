/**
 * Created by apple on 2017/3/27.
 */
Ext.define("NhlApp.view.user.userlist.UserList", {
    extend: "Nhl.base.Grid",
    alias: 'widget.userlist',
    requires: [
        'NhlApp.view.user.userlist.UserListController',
        'NhlApp.view.user.userlist.UserListModel',
        'Nhl.ux.button.PermissionButton'
    ],
    controller: 'user_userlist',
    viewModel: {type:'user_userlist'},
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 用户列表',
    multiColumnSort:false,
    isPage:true,//是否需要分页,
    border:true,
    bind: {
        store: '{gridstore}',
        selection: '{focusApplication}'
    },
    tbar: {
        xtype: 'toolbar',
        id:'searchForm',
        padding: 5,
        height:38,
        width: '100%',
        defaults: {
            labelAlign: 'right',
            margin: '0 10 0 0'
        },
        items: [{
            id:"loginName",
            name:"loginName",
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '用户名',
            enableKeyEvents:true,
            bind: '{searchModel.loginName}'
        },{
            id:"sdate",
            name:"sdate",
            labelWidth: 55,
            width: 170,
            xtype: 'datefield',
            bind: '{searchModel.sdate}',
            format: 'Y-m-d',
            fieldLabel: '注册时间'
        }, '-',{
            id:"edate",
            name:"edate",
            labelWidth: 0,
            width: 110,
            xtype: 'datefield',
            bind: '{searchModel.edate}',
            format: 'Y-m-d'
        }, {
            text: '查询',
            id:"userSearch",
            name: 'userSearch',
            listeners:{
                click: 'filter'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
        { text: '用户名',width: 100, dataIndex: 'loginName',align: 'center',renderer:function (val) {
            if(permission.userDetail){
                return "<a href='javascript:void(0);' class='detail'>"+val+"</a> "
            }else {
                return val;
            }
        }},
        { text: '姓名',width: 100, dataIndex: 'realName', align: 'center' },
        { text: '昵称',flex:1,minWidth:60, dataIndex: 'nickName', align: 'center' },
        { text: '性别',width: 50, dataIndex: 'gender', align: 'center' ,renderer:function (val) {//转换性别
            if(val=='MAN'){
                return '男';
            }else if(val=='WOMEN'){
                return '女';
            }else{
                return '';
            }
        }},
        { text: '出生日期',width: 100, dataIndex: 'birthday', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d') },
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
        { text: '注册时间',width: 140, dataIndex: 'registerTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '上次登录时间',width: 140, dataIndex: 'lastLoginTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '操作',sortable: false, menuDisabled:true, width: 50,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            if(permission.userDetail){
                return "<a href='javascript:void(0);' class='detail fa fa-file-text-o'>详情</a> "
            }else {
                return "";
            }
        }}

    ],
    listeners: {
        cellclick: 'cellclick',
        afterrender:'afterrender'
    }
});