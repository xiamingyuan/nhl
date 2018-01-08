/**
 * Created by zd on 17/3/30.
 */
Ext.define("NhlApp.view.member.memberlist.MemberList", {
    extend: "Nhl.base.Grid",
    alias: 'widget.memberlist',
    requires: [
        'NhlApp.view.member.memberlist.MemberListController',
        'NhlApp.view.member.memberlist.MemberListModel'
    ],
    controller: 'member_memberlist',
    viewModel: 'member_memberlist',
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 用户列表',
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
            bind: '{searchModel.queryKey}',
            enableKeyEvents:true
        },{
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
            text: '查询',
            id:"userSearch",
            name: 'userSearch',
            listeners:{
                click: 'filter'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50,height:30 },//创建序号
        { text: '用户名',width: 100, dataIndex: 'loginName', align: 'center', renderer:function (val) {
            if(permission.memberDetail){
                return "<a href='javascript:void(0);' class='detail'>"+val+"</a> "
            }else {
                return val;
            }
        }},
        { text: '姓名',width: 80, dataIndex: 'realName', align: 'center' },
        { text: '性别',width: 50, dataIndex: 'gender', align: 'center' ,renderer:function (val) {//转换性别
            if(val=='2'){
                return '女';
            }else{
                return '男';
            }
        }},
        { text: '年龄',width: 50, minWidth:'50', dataIndex: 'age', align: 'center',renderer:function (val,cellmeta,record) {//计算年龄
            var birthday = record.data.birthday,
                year=new Date().getFullYear();
            if(birthday){
                var b = Number(new Date(birthday).toLocaleString().substring(0,4));
                return year-b;
            }else {
                return "";
            }
        }},
        { text: '归属地',width: 100, dataIndex: 'mobileArea'},
        // { text: '实名认证',width: 80, dataIndex: 'authenStatus', align: 'center',renderer:function (val) {
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
        // }},
        // { text: '医保绑定',width: 80, dataIndex: 'insuranceStatus', align: 'center',renderer:function (val) {
        //     if (val == "1") {
        //         return "已绑定";
        //     } else {
        //         return "未绑定";
        //     }
        // }},
        { text: '推荐人',width: 100, flex: 1, dataIndex: 'recommendName', align: 'left' },
        { text: '推荐人手机号',width: 120, dataIndex: 'recommendPhone', align: 'center' },
        { text: '注册时间',width: 140, dataIndex: 'registerTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '操作',sortable: false, menuDisabled:true, width: 100,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            var detail,news;
            if(permission.memberMsg){
                news = "<a  href='javascript:void(0);' class='news fa fa-comment-o'>消息</a>";
            }else {
                news = '';
            }
            if(permission.memberDetail){
                detail = "<a href='javascript:void(0);' class='detail fa fa-file-text-o'>详情</a>";
            }else {
                detail = '';
            }
            return news + "&nbsp|&nbsp"+ detail;
        }}

    ],
    listeners: {
        cellclick: 'cellclick'
    }
});