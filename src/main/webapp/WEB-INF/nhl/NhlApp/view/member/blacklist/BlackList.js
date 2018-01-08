/**
 * Created by apple on 2017/3/29.
 */
Ext.define("NhlApp.view.member.blacklist.BlackList", {
    extend: "Nhl.base.Grid",
    alias: 'widget.member_blacklist',
    requires: [
        'NhlApp.view.member.blacklist.BlackListController',
        'NhlApp.view.member.blacklist.BlackListModel'
    ],
    controller: 'member_blacklist',
    viewModel: {
        type:'member_blacklist'
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
            id:"sdate",
            labelWidth: 55,
            width: 165,
            xtype: 'datefield',
            bind: '{searchModel.sdate}',
            format: 'Y-m-d',
            fieldLabel: '申请时间'
        }, '-',{
            id:"edate",
            labelWidth: 0,
            width: 110,
            xtype: 'datefield',
            bind: '{searchModel.edate}',
            format: 'Y-m-d'
        },{
            id:"queryKey",
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '用户名',
            enableKeyEvents:true,
            bind: '{searchModel.queryKey}'
        },{
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
        { text: '用户名',width: 100, dataIndex: 'loginName',align:'center'},
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
        { text: '年龄',width: 50, dataIndex: 'ageOrder', align: 'center',renderer:function (val,cellmeta,record) {//计算年龄
            var birthday = record.data.birthday,
                year=new Date().getFullYear();
            if(birthday){
                var b = Number(new Date(birthday).toLocaleString().substring(0,4));
                return year-b;
            }else {
                return "";
            }
        }},
        // { text: '手机',width: 100, dataIndex: 'mobilePhone', align: 'center' },
        { text: '原因',minWidth: 100,flex:1, dataIndex: 'reason', align: 'center' },
        // { text: '实名认证',width: 100, dataIndex: 'iDNumStatus', align: 'center',renderer:function (val) {
        //     if (val == "1") {
        //         return "未认证";
        //     } else if (val == "2") {
        //         return "已认证";
        //     } else if (val == "3") {
        //         return "认证失败";
        //     } else if (val == "4") {
        //         return "认证中";
        //     } else {
        //         return "未认证";
        //     }
        // } },
        { text: '注册时间',width: 140, dataIndex: 'registerTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '操作',sortable: false, menuDisabled:true, width: 85,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            if(permission.memberblacklistRemove){
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