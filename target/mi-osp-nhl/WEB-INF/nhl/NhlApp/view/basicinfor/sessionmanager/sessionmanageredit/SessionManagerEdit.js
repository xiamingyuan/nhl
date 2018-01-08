/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.basicinfor.sessionmanager.sessionmanageredit.SessionManagerEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sessionmanageredit',
    requires: [
        'NhlApp.view.basicinfor.sessionmanager.sessionmanageredit.SessionManagerEditController',
        'NhlApp.view.basicinfor.sessionmanager.sessionmanageredit.SessionManagerEditModel'
    ],
    controller: 'basicinfor_sessionmanageredit',
    viewModel: {
        type:'basicinfor_sessionmanageredit'
    },
    iconCls:'fa fa-home',
    title: '当前位置 : 话术编辑',
    bodyPadding: 10,
    modelValidation: true,
    scrollable:'y',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        margin:'0 0 15',
        width:"50%"
    },
    id:'sessionFormEdit',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '标题',
            name:'caption',
            bind:'{formModel.caption}',
            allowBlank: false,
            blankText : "服务方不允许为空！"
        },{
            xtype: 'textfield',
            fieldLabel: '服务方',
            name:'serviceCompany',
            bind:'{formModel.serviceCompany}'
        },{
            xtype: 'textfield',
            bind:'{formModel.tags}',
            fieldLabel: '标记'
        },{
            xtype: 'textfield',
            bind:'{formModel.remark}',
            fieldLabel: '备注'
        },{
            xtype: 'fieldcontainer',
            margin:0,
            layout: 'column',
            defaults: {
                columnWidth: 0.25
            },
            items:[
                {
                    xtype: 'numberfield',
                    bind:'{formModel.orderNum}',
                    fieldLabel: '显示顺序',
                    regex: /^[0-9]{1,}$/,
                    regexText:"显示顺序为正整数!",
                    allowBlank: false,
                    blankText : "显示顺序不允许为空！"
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '创建时间',
                    bind:'{createTimeF}'
                }
            ]

        },
        {
            xtype: 'fieldcontainer',
            margin:0,
            layout: 'column',
            defaults: {
                columnWidth: 0.25
            },
            items: [{
                xtype: 'combobox',
                fieldLabel: '类别',
                emptyText: "--请选择--",
                editable:false,//不可编辑,
                allowBlank: false,
                blankText : "类别不允许为空！",
                bind:'{formModel.type_}',
                store:Ext.create('Ext.data.Store', {
                    fields: ['value', 'name'],
                    data : [
                        {"value":"0", "name":"产品咨询及变更"},
                        {"value":"1", "name":"就医环节"},
                        {"value":"2", "name":"报销环节"},
                        {"value":"3", "name":"疾病知识"},
                        {"value":"4", "name":"业务咨询"},
                        {"value":"5", "name":"使用说明"}
                    ]
                }),
                displayField: 'name',
                valueField: 'value'
            },
                {
                    xtype: 'combobox',
                    fieldLabel: '性质',
                    emptyText: "--请选择--",
                    editable:false,//不可编辑,
                    allowBlank: false,
                    blankText : "性质不允许为空！",
                    bind:'{formModel.character_}',
                    store:Ext.create('Ext.data.Store', {
                        fields: ['value', 'name'],
                        data : [
                            {"value":"0", "name":"咨询"},
                            {"value":"1", "name":"投诉"}
                        ]
                    }),
                    displayField: 'name',
                    valueField: 'value'
                }]
        },
        {
            xtype: 'textareafield',
            bind:'{formModel.content}',
            fieldLabel: '内容',
            allowBlank: false,
            blankText : "内容不允许为空！",
            height:80
        }
    ],
    buttons: [
        { text: '保存', handler: 'onSave' },
        '->',
        { text: '返回', handler: 'back' }
    ]
});