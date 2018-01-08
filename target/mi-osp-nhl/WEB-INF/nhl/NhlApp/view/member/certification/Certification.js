/**
 * Created by apple on 2017/4/1.
 */
Ext.define("NhlApp.view.member.certification.Certification", {
    extend: "Ext.tab.Panel",
    alias: 'widget.member_certification',
    requires: [
        'NhlApp.view.member.certification.CertificationController',
        'NhlApp.view.member.certification.CertificationModel'
    ],
    controller: 'member_certification',
    viewModel: {
        type: 'member_certification'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：实名认证',
    items: [
        {
            title: '待审核',
            xtype: 'panel',
            layout:'fit',
            items:[
                {
                    xtype:'cisgrid',
                    columnLines: true,
                    isPage:true,//是否需要分页,
                    multiColumnSort:false,
                    startRowGroupsCollapsed: false,
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
                            id:"sdate",
                            labelWidth: 60,
                            width: 170,
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
                            labelWidth: 80,
                            width: 190,
                            xtype: 'textfield',
                            fieldLabel: '用户名/姓名',
                            enableKeyEvents:true,
                            bind: '{searchModel.loginName}'
                        },{
                            text: '查询',
                            listeners:{
                                click: 'filter'
                            }
                        }]
                    },
                    columns : [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                        { text: '用户名',flex:1, dataIndex: 'loginName', align: 'center'},
                        { text: '姓名',flex:1, dataIndex: 'realName', align: 'center' },
                        { text: '性别',width: 100, dataIndex: 'gender', align: 'center' ,renderer:function (val) {//转换性别
                            if(val=='OTHER'){
                                return '未知';
                            }else if(val=='WOMEN'){
                                return '女';
                            }else{
                                return '男';
                            }
                        }},
                        { text: '出生日期',width: 140, dataIndex: 'birthday', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
                        { text: '身份证号',flex:1, dataIndex: 'idnumber', align: 'center' ,renderer:function (val) {
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
                        { text: '操作',sortable: false, width: 50,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                            return "<a  href='javascript:void(0);' class='news fa fa-comment-o'>审核</a>"
                        }}
                    ]
                }
            ]
        },
        {
            title: '已审核',
            xtype: 'panel',
            layout:'fit',
            items:[
                {
                    xtype:'cisgrid',
                    columnLines: true,
                    isPage:true,//是否需要分页,
                    multiColumnSort:false,
                    startRowGroupsCollapsed: false,
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
                            labelWidth: 60,
                            width: 170,
                            xtype: 'datefield',
                            bind: '{searchModel.startDate}',
                            format: 'Y-m-d',
                            fieldLabel: '申请时间'
                        }, '-',{
                            labelWidth: 0,
                            width: 110,
                            xtype: 'datefield',
                            bind: '{searchModel.endDate}',
                            format: 'Y-m-d'
                        },{
                            labelWidth: 80,
                            width: 190,
                            xtype: 'textfield',
                            fieldLabel: '用户名 / 姓名',
                            enableKeyEvents:true,
                            bind: '{searchModel.loginName}'
                        },{
                            text: '查询',
                            listeners:{
                                click: 'filter'
                            }
                        }]
                    },
                    columns : [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                        { text: '用户名',width: 100, dataIndex: 'loginName', align: 'center'},
                        { text: '姓名',width: 80, dataIndex: 'realName', align: 'center' },
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
                        { text: '身份证号',width: 140,dataIndex: 'idnumber', align: 'center' ,renderer:function (val) {
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
                        { text: '审核时间',width: 140, dataIndex: 'audittime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
                        { text: '审核人',width: 140, dataIndex: 'auditor', align: 'center' },
                        { text: '详情',flex:1,  dataIndex: 'reason' }
                    ]
                }
            ]
        }
    ]
});