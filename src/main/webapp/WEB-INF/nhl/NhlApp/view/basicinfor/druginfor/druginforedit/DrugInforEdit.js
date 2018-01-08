/**
 * Created by apple on 2017/4/6.
 */
Ext.define('NhlApp.view.basicinfor.druginfor.druginforedit.DrugInforEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.basicinfor_druginfor_edit',
    requires: [
        'NhlApp.view.basicinfor.druginfor.druginforedit.DrugInforEditController'
    ],
    controller: 'basicinfor_druginfor_edit',
    bodyPadding: 10,
    id:'drugInforEditForm',
    modelValidation: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        anchor: '100%',
        margin:'0 0 10 0'

    },
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '药品编号',
            name:'id'
        },
        {
            xtype: 'textfield',
            fieldLabel: '通用名',
            name:'name'
        },
        {
            xtype: 'textfield',
            fieldLabel: '药品别名',
            name:'similarName'
        },
        {
            xtype: 'textfield',
            fieldLabel: '剂型',
            name:'dosageforms'
        },
        {
            xtype: 'textfield',
            fieldLabel: '所属分类',
            name:'drugGroupName'
        },
        {
            xtype: 'textfield',
            fieldLabel: '标签',
            empytText:'标签(以逗号分隔)...',
            name:'tags'
        },
        {
            xtype: 'textfield',
            fieldLabel: '快捷名称',
            name:'abbSpell'
        }
    ],
    buttons: [
        { text: '取  消', handler: 'onClose' },
        { text: '确  定', formBind: true, handler: 'onSave' }
    ]
});