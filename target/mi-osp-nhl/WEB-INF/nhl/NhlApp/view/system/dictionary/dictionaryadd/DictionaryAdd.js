/**
 * Created by zd on 2017/4/6.
 */
Ext.define('NhlApp.view.system.dictionary.dictionaryadd.DictionaryAdd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.system_dictionary_add',
    requires: [
        'NhlApp.view.system.dictionary.dictionaryadd.DictionaryAddController'
    ],
    controller: 'system_dictionary_add',
    bodyPadding: 10,
    id:'DictionaryAddForm',
    modelValidation: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 70,
        anchor: '100%',
        margin:'0 0 10 0'

    },
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '分类ID',
            name:'classid',
            blankText : "分类ID不能为空！",
            allowBlank: false
        },
        {
            xtype: 'textfield',
            fieldLabel: '分类名称',
            name:'classname',
            blankText : "分类名称不能为空！",
            allowBlank: false
        },
        {
            xtype: 'textfield',
            fieldLabel: '分类描述',
            name:'classdesc',
            blankText : "分类描述不能为空！",
            allowBlank: false
        },
        {
            xtype: 'textfield',
            fieldLabel: '代码值',
            name:'itemvalue',
            blankText : "代码值不能为空！",
            allowBlank: false
        },
        {
            xtype: 'textfield',
            fieldLabel: '代码值描述',
            name:'itemvaluedesc',
            blankText : "代码值描述不能为空！",
            allowBlank: false
        },
        {
            xtype: 'textfield',
            fieldLabel: '代码名称',
            name:'itemname',
            blankText : "代码名称不能为空！",
            allowBlank: false
        }
    ],
    buttons: [
        { text: '取  消', handler: 'onClose' },
        { text: '确  定', handler: 'onSave' }
    ]
});