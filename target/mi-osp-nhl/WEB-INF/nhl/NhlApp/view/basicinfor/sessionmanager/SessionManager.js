/**
 * Created by apple on 2017/3/31.
 */
Ext.define("NhlApp.view.basicinfor.sessionmanager.SessionManager", {
    extend: "Nhl.base.Grid",
    alias: 'widget.sessionmanager',
    requires: [
        'NhlApp.view.basicinfor.sessionmanager.SessionManagerController',
        'NhlApp.view.basicinfor.sessionmanager.SessionManagerModel'
    ],
    controller: 'basicinfor_sessionmanager',
    viewModel: {
        type:'basicinfor_sessionmanager'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 话术管理',
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
        items: [
            {
                xtype: 'combo',
                id:"type",
                name:"type",
                labelWidth: 30,
                fieldLabel: '类别',
                width: 150,
                editable:false,//不可编辑
                bind: '{searchModel.type}',
                store:Ext.create('Ext.data.Store', {
                    fields: ['value', 'name'],
                    data : [
                        {"value":"", "name":"全部"},
                        {"value":"0", "name":"产品咨询及变更"},
                        {"value":"1", "name":"就医环节"},
                        {"value":"2", "name":"报销环节"},
                        {"value":"3", "name":"疾病知识"},
                        {"value":"4", "name":"业务咨询"},
                        {"value":"5", "name":"使用说明"}
                    ]
                }),
                displayField: 'name',
                valueField: 'value',
                listeners: {
                    afterRender: function(combo) {
                        combo.setValue('');//同时下拉框会将与name为firstValue值对应的 text显示
                    }
                }
            },
            {
                xtype: 'combo',
                id:"character",
                name:"character",
                labelWidth: 30,
                fieldLabel: '性质',
                width: 130,
                editable:false,//不可编辑
                bind: '{searchModel.character}',
                store:Ext.create('Ext.data.Store', {
                    fields: ['value', 'name'],
                    data : [
                        {"value":"", "name":"全部"},
                        {"value":"0", "name":"咨询"},
                        {"value":"1", "name":"投诉"}
                    ]
                }),
                displayField: 'name',
                valueField: 'value',
                listeners: {
                    afterRender: function(combo) {
                        combo.setValue('');//同时下拉框会将与name为firstValue值对应的 text显示
                    }
                }
            },
            {
                id:"queryKey",
                labelWidth: 45,
                width: 180,
                xtype: 'textfield',
                fieldLabel: '关键词',
                bind: '{searchModel.queryKey}',
                enableKeyEvents:true
            },
            {
                text: '查询',
                id:"userSearch",
                name: 'userSearch',
                listeners:{
                    click: 'filter'
                }
            },
            {
                xtype:'permissionbutton',
                permission:'sessionAdd',
                text: '添加',
                listeners:{
                    click: 'add'
                }
            }
        ]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
        { text: '标题',flex:1,minWidth:100, dataIndex: 'caption'},
        { text: '内容',width: 300, dataIndex: 'content' },
        { text: '服务方',width: 100, dataIndex: 'serviceCompany', align: 'center' },
        { text: '标记',width: 50, dataIndex: 'tags', align: 'center' },
        { text: '备注',width: 100, dataIndex: 'remark', align: 'center' },
        { text: '性质',width: 80, dataIndex: 'character_', align: 'center',renderer:function (val) {
            switch (val) {
                case 0:
                    return '咨询';
                    break;
                case 1:
                    return '投诉';
                    break;
                default:
                    return '--';
            }
        }},
        { text: '类别',width: 120, dataIndex: 'type_', align: 'center',renderer:function (val) {
            switch (val) {
                case 0:
                    return '产品咨询及变更';
                    break;
                case 1:
                    return '就医环节';
                    break;
                case 2:
                    return '报销环节';
                    break;
                case 3:
                    return '疾病知识';
                    break;
                case 4:
                    return '业务咨询';
                    break;
                case 5:
                    return '使用说明';
                    break;
                default:
                    return '--';
            }
        } },
        { text: '操作',sortable: false, menuDisabled:true, width: 100, renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            var edit,del;
            edit = permission.sessionEdit?"<a href='javascript:void(0);' class='edit fa fa-edit'>编辑</a> " + "&nbsp|&nbsp":"";
            del = permission.sessionDelete?"<a  href='javascript:void(0);' class='delete fa fa-trash-o fa-fw'>删除</a>":"";
            return edit+ del;
        }}
    ],
    listeners: {
        cellclick: 'cellclick'
    }
});