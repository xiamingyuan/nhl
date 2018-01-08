/**
 * Created by apple on 2017/4/1.
 */
Ext.define("NhlApp.view.member.micardbind.MicardBind", {
    extend: "Nhl.base.Grid",
    alias: 'widget.micardbind',
    requires: [
        'NhlApp.view.member.micardbind.MicardBindController',
        'NhlApp.view.member.micardbind.MicardBindModel'
    ],
    controller: 'member_micardbind',
    viewModel: {
        type:'member_micardbind'
    },
    width : '100%',
    height: '100%',
    iconCls:'fa fa-home',
    title: '当前位置 : 医保绑定',
    selModel: 'checkboxmodel',//创建复选框
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
            labelWidth: 60,
            width: 178,
            xtype: 'datefield',
            bind: '{searchModel.sdate}',
            format: 'Y-m-d',
            fieldLabel: '申请时间'
        }, '-',{
            labelWidth: 0,
            width: 118,
            xtype: 'datefield',
            bind: '{searchModel.edate}',
            format: 'Y-m-d'
        },{
            labelWidth: 80,
            width: 200,
            xtype: 'textfield',
            fieldLabel: '用户名 / 姓名',
            enableKeyEvents:true,
            bind: '{searchModel.loginName}',
            listeners: {
                change: 'filter'
            }
        },{
            text: '查询',
            listeners:{
                click: 'filter'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50,height:30 },//创建序号
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
        { text: '出生日期',width: 140, dataIndex: 'birthday', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d') },
        { text: '身份证号',flex:1, minWidth: 180,dataIndex: 'idnumber', align: 'center' ,renderer:function (val) {
            if (val == null) return '';
            if (val.length > 7) {
                var ss = val.substring(3, val.length - 4);
                return val.substring(0, 3) + ss.replace(/\w/g, '*') + val.substring(3 + ss.length, val.length);
            }
            else if (val.length <= 7) {
                var ss = val.substring(3, val.length);
                return val.substring(0, 3) + ss.replace(/\w/g, '*');
            }
        }},
        { text: '申请时间',width: 140, dataIndex: 'createtime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '操作',sortable: false, menuDisabled:true, width: 50,align:'left', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            return "<a href='javascript:void(0);' class='detail fa fa-undo'>审核</a> "
        }}
    ],
    listeners: {
        cellclick: 'cellclick'
    }
});