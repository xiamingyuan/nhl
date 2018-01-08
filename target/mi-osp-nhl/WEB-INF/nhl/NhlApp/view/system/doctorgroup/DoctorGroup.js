/**
 * Created by apple on 2017/4/2.
 */
Ext.define("NhlApp.view.system.doctorgroup.DoctorGroup", {
    extend: "Ext.panel.Panel",
    alias: 'widget.system_doctorgroup',
    requires: [
        'NhlApp.view.system.doctorgroup.DoctorGroupController',
        'NhlApp.view.system.doctorgroup.DoctorGroupModel'
    ],
    controller: 'system_doctorgroup',
    viewModel: {
        type: 'system_doctorgroup'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：医生集团维护',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
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
            labelWidth: 35,
            width: 150,
            xtype: 'textfield',
            fieldLabel: '编码:',
            enableKeyEvents:true,
            bind: '{searchModel.code}',
            listeners: {
                change: 'filter'
            }
        },{
            labelWidth: 35,
            width: 150,
            xtype: 'textfield',
            fieldLabel: '名称',
            bind: '{searchModel.hospitalName}',
            enableKeyEvents:true,
            listeners: {
                change: 'filter'
            }
        }, {
            text: '查询',
            listeners:{
                click: 'filter'
            }
        }, {
            text: '添加医生集团',
            listeners:{
                click: 'filter'
            }
        }]
    },
    items:[
        {
            xtype:'cisgrid',
            margin:'0 10 0 0',
            flex:1,
            columnLines: true,
            isPage:true,//需要分页
            style: {
                border:'1px solid #f6f6f6'
            },
            bind: {
                store: '{gridstore}'
            },
            multiColumnSort:true,//禁止多列排序
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 50,height:30 },//创建序号
                { text: '名称',width: 100, dataIndex: 'userName'},
                { text: '编码',width: 100, dataIndex: 'name', align: 'center' },
                { text: '联系方式',width:100, dataIndex: 'isSucSend', align: 'center', },
                { text: '网址',width: 100, dataIndex: 'sendTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
                { text: '操作',sortable: false, width: 145,align:'left', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                    return "<a href='javascript:void(0);' class='detail fa fa-file-text-o'>详情</a> " +
                        "&nbsp|&nbsp"+
                        "<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>" +
                        "&nbsp|&nbsp"+
                        "<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>"
                }}
            ]
        },
        {
            xtype:'grid',
            width:476,
            tbar: {
                xtype: 'toolbar',
                padding: 5,
                height: 38,
                width: '100%',
                defaults: {
                    labelAlign: 'right',
                    margin: '0 10 0 0'
                },
                items: [{
                    xtype: 'displayfield',
                    value: 'name'
                }, '->', {
                    text: '添加医生',
                    listeners: {
                        click: 'filter'
                    }
                }]
            },
            style: {
                border:'1px solid #f6f6f6'
            },
            bind: {
                // store: '{gridstore}'
            },
            multiColumnSort:true,//禁止多列排序
            columns : [
                { text: '用户名',flex:1, dataIndex: 'userName'},
                { text: '姓名',width: 100, dataIndex: 'name', align: 'center' },
                { text: '医院',width:100, dataIndex: 'isSucSend', align: 'center', },
                { text: '科室',width: 100, dataIndex: 'read', align: 'center' },
                { text: '操作',sortable: false, width: 75,align:'left', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                    return "<a  href='javascript:void(0);' class='editDepartment fa fa-check'>编辑</a>" +
                        "&nbsp|&nbsp"+
                        "<a  href='javascript:void(0);' class='deleteDepartment fa fa-check'>删除</a>"
                }}
            ]
        }
    ]
});