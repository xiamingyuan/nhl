/**
 * Created by apple on 2017/4/1.
 */
Ext.define("NhlApp.view.member.membercard.MemberCard", {
    extend: "Nhl.base.Grid",
    alias: 'widget.membercard',
    requires: [
        'NhlApp.view.member.membercard.MemberCardController',
        'NhlApp.view.member.membercard.MemberCardModel'
    ],
    controller: 'member_membercard',
    viewModel: {
        type:'member_membercard'
    },
    width : '100%',
    height: '100%',
    iconCls:'fa fa-home',
    title: '当前位置 : 会员卡管理',
    multiColumnSort:false,
    startRowGroupsCollapsed: false,
    isPage:true,//是否需要分页,
    border:true,
    bind: {
        store: '{gridstore}',
        selection: '{focusApplication}'
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
            labelWidth: 130,
            width: 350,
            xtype: 'textfield',
            fieldLabel: '卡号/等级/持卡人/姓名',
            enableKeyEvents:true,
            bind: '{searchModel.queryKey}'
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
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50,height:30 },//创建序号
        { text: '卡号',minWidth: 200,flex:1, dataIndex: 'id',align: 'center',renderer:function (val) {
            if(permission.membercardDetail){
                return "<a href='javascript:void(0);' class='detail'>"+val+"</a> "
            }else {
                return val;
            }
        }},
        { text: '卡类型',minWidth: 150,flex:1, dataIndex: 'cardName', align: 'center' },
        { text: '状态',width: 150, dataIndex: 'status', align: 'center',renderer:function (val) {
            switch (val) {
                case "INACTIVE":
                    return "未激活";
                    break;
                case "NORMAL":
                    return "正常";
                    break;
                case "TRANSFER":
                    return "转让中";
                    break;
                case "DISABLED":
                    return "禁用";
                    break;
            }
        } },
        { text: '持卡人',width: 150, dataIndex: 'memberName', align: 'center' },
        { text: '持卡人姓名',width: 150, dataIndex: 'memberRealName', align: 'center' },
        { text: '操作',sortable: false, menuDisabled:true, width: 50,align:'left', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            if(permission.membercardDetail){
                return "<a href='javascript:void(0);' class='detail fa fa-file-text-o'>详情</a> ";
            }else {
                return "";
            }
        }}
    ],
    listeners: {
        cellclick: 'cellclick'
    }
});