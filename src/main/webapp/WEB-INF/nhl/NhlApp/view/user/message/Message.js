/**
 * Created by apple on 2017/3/29.
 */
Ext.define("NhlApp.view.user.message.Message", {
    extend: "Nhl.base.Grid",
    alias: 'widget.message',
    requires: [
        'NhlApp.view.user.message.MessageController',
        'NhlApp.view.user.message.MessageModel'
    ],
    controller: 'user_message',
    viewModel: {
        type:'user_message'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 消息发布',
    multiColumnSort:false,//只能单个排序
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
            id:"title",
            labelWidth: 55,
            width: 155,
            xtype: 'textfield',
            fieldLabel: '消息标题',
            bind: '{searchModel.title}',
            enableKeyEvents:true
        },{
            id:"sendBeginDate",
            labelWidth: 55,
            width: 165,
            xtype: 'datefield',
            bind: '{searchModel.sendBeginDate}',
            format: 'Y-m-d',
            fieldLabel: '发送时间'
        }, '-',{
            id:"sendEndDate",
            labelWidth: 0,
            width: 110,
            xtype: 'datefield',
            bind: '{searchModel.sendEndDate}',
            format: 'Y-m-d'
        }, {
            id:"beginDate",
            labelWidth: 55,
            width: 165,
            xtype: 'datefield',
            bind: '{searchModel.beginDate}',
            format: 'Y-m-d',
            fieldLabel: '发布时间'
        }, '-',{
            id:"endDate",
            labelWidth: 0,
            width: 110,
            xtype: 'datefield',
            bind: '{searchModel.endDate}',
            format: 'Y-m-d'
        },{
            id:"creatorName",
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '发布人',
            bind: '{searchModel.creatorName}',
            enableKeyEvents:true
        }, {
            id:"receivePerson",
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '接收人',
            bind: '{searchModel.receivePerson}',
            enableKeyEvents:true
        }, {
            text: '查询',
            id:"userSearch",
            name: 'userSearch',
            listeners:{
                click: 'filter'
            }
        }, {
            text: '发布',
            id:"messagePublic",
            name: 'messagePublic',
            listeners:{
                click: 'messagePublic'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
        { text: '消息标题',minWidth: 100,flex:1, dataIndex: 'title',renderer:function (val) {
            return "<a href='javascript:void(0);' class='detail'>"+val+"</a> "
        }},
        { text: '接收人',width: 80, dataIndex: 'isAllUser', align: 'center' ,renderer:function (val) {
            if (val == "0") {
                return "指定用户";
            } else if (val == "1") {
                return "所有用户";
            }
        }},
        { text: '发布人',width: 80, dataIndex: 'creatorName', align: 'center' },
        { text: '发送时间',width: 140, dataIndex: 'publishTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '发布时间',width: 140, dataIndex: 'createTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '发送状态',width: 80, dataIndex: 'status', align: 'center',renderer:function (val) {
            if (val == "0") {
                return "待发送";
            } else if (val == "1") {
                return "发送中";
            } else if (val == "2") {
                return "发送完毕";
            } else if (val == "3") {
                return "已取消";
            }
        } },
        { text: '发送人数',width: 80, dataIndex: 'sucPubNum', align: 'center',renderer:function (val,cellmeta,record,rowIndex,columnIndex,store) {
            if(record.data.status==1||record.data.status==2){
                return '<span style="color: #97CF87">'+record.data.sucPubNum+'</span>' +
                    '<span>/</span>' +
                    '<span style="color: red">'+record.data.failPubNum+'</span>' +
                    '<span>/'+record.data.pubNum+'</span>' +
                    '</span>'
            }else if(record.data.status==0||record.data.status==3){
                return '<span style="color: #97CF87">'+record.data.sucPubNum+'</span>' +
                    '<span>/</span>' +
                    '<span style="color: red">0</span>' +
                    '<span>/'+record.data.pubNum+'</span>' +
                    '</span>'
            }
        } },
        { text: '阅读数',width: 60, dataIndex: 'read', align: 'center'},
        { text: '操作',sortable: false, menuDisabled:true, width: 100,align:'left', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            if(record.data.status==0){
                return "<a href='javascript:void(0);' class='cancle fa fa-ban'>取消</a> " +
                    "&nbsp|&nbsp"+
                    "<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>"
            }else{
                return "";
            }
        }}
    ],
    listeners: {
        cellclick: 'cellclick'
    }
});