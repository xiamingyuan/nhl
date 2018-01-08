Ext.define('NhlApp.view.basicinfor.sessionmanager.sessionmanageradd.SessionManagerAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sessionmanageradd',
    requires: [
        'NhlApp.view.basicinfor.sessionmanager.sessionmanageradd.SessionManagerAddController',
        'NhlApp.view.basicinfor.sessionmanager.sessionmanageradd.SessionManagerAddModel'
    ],
    controller: 'basicinfor_sessionmanageradd',
    viewModel: {
        type:'basicinfor_sessionmanageradd'
    },
    iconCls:'fa fa-home',
    title: '当前位置 : 话术添加',
    bodyPadding: 10,
    modelValidation: true,
    scrollable:'y',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        margin:'0 0 15',
        width:"50%"
    },
    id:'sessionFormAdd',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '标题',
            bind:'{formModel.caption}',
            allowBlank: false,
            blankText : "标题不允许为空！"
        },{
            xtype: 'textfield',
            fieldLabel: '服务方',
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
            xtype: 'numberfield',
            bind:'{formModel.orderNum}',
            fieldLabel: '显示顺序',
            regex: /^[0-9]{1,}$/,
            regexText:"显示顺序为正整数!",
            allowBlank: false,
            blankText : "显示顺序不允许为空！"
        },
        {
            xtype: 'fieldcontainer',
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