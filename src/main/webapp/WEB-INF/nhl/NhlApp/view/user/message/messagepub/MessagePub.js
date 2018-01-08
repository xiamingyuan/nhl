/**
 * Created by apple on 2017/3/30.
 */
Ext.define('NhlApp.view.user.message.messagepub.MessagePub', {
    extend: 'Ext.form.Panel',
    alias: 'widget.user_messagepub',
    requires: [
        'NhlApp.view.user.message.messagepub.MessagePubController',
        'NhlApp.view.user.message.messagepub.MessagePubModel'
    ],
    controller: 'user_messagepub',
    viewModel: {
        type: 'user_messagepub'
    },
    bodyPadding: 10,
    width: '100%',
    iconCls:"fa fa-home",
    title: '当前位置：消息发布添加',
    modelValidation: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        margin:'10 0'
    },
    items: [
        {
            id:'title',
            width:500,
            xtype: 'textfield',
            fieldLabel: '消息标题',
            name:'title',
            msgTarget: 'under',
            allowBlank: false,
            blankText : "请输入消息标题！"

        },
        {
            id:'publishTime',
            width:230,
            xtype: 'datefield',
            fieldLabel: '发送时间:',
            format: 'Y-m-d',
            name:'publishTime'
        },
        {
            xtype: 'radiofield',
            name: 'isAllUser',
            value: '所有用户',
            fieldLabel: '发布范围',
            boxLabel: '所有用户',
            reference: 'isAllUser',
            listeners:{
                change:function ( ele , newValue , oldValue , eOpts) {
                    console.log(newValue)
                }
            }
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: '',
            layout: 'hbox',
            defaults: {
                margin: '0 5 0 0'
            },
            items: [
                {
                    xtype: 'radiofield',
                    name: 'isAllUser',
                    value: '指定用户',
                    fieldLabel: '',
                    labelSeparator: '',
                    hideEmptyLabel: false,
                    boxLabel: '指定用户'
                },
                {
                    xtype: 'button',
                    text:'选择',
                    handler: 'addUser',
                    bind:{
                        disabled:'{isAllUser.checked}'
                    }
                },
                {
                    xtype: 'displayfield',
                    bind:{
                        value:'共1人'
                    }
                }
            ]
        },
        {
            xtype: 'textareafield',
            fieldLabel: '消息内容',
            width:800,
            height: 200
        }
    ],
    buttons: [
        { text: '保存', handler: '' },
        '->',
        { text: '返回', handler: 'back' }
    ]
});