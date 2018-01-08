/**
 * Created by apple on 2017/3/20.
 */
Ext.define('NhlApp.view.sys.changepassword.ChangePassword', {
    extend: 'Ext.form.Panel',//继承frompanel
    requires: [
        'NhlApp.view.sys.changepassword.ChangePasswordController',
        'NhlApp.view.sys.changepassword.ChangePasswordModel'
    ],
    alias: 'widget.changepassword',
    controller: 'ChangePassword',
    viewModel: 'ChangePassword',
    id:'ChangePasswordForm',
    layout: 'absolute',
    defaultType: 'textfield',
    border: false,
    defaults: {
        labelAlign: 'right',
        fieldWidth: 80,
        msgTarget: 'under',
        inputType: 'password',
        allowBlank: false,
        blankText : "密码不能为空",
        maxLength : 20,
        maxLengthText : '密码长度不能超过20位',
        minLength : 5,
        minLengthText : '密码长度不能低于5位',
        labelWidth: 80
    },
    items: [{
        fieldLabel: '旧密码',
        id:'oldPass',
        // vtype: 'email',//验证格式 可以自定义
        x: 5,
        y: 20,
        name: 'oldPwd',
        anchor: '-20'  // anchor width by percentage
    }, {
        fieldLabel: '新密码',
        id:'newPass',
        x: 5,
        y: 65,
        name: 'newPwd',
        anchor: '-20'  // anchor width by percentage
    }, {
        fieldLabel: '新密码确认',
        vtype: 'repetition',  //指定repetition验证类型
        repetition: { targetCmpId: 'newPass' },
        x: 5,
        y: 110,
        name: 'newPwdRepeat',
        anchor: '-20'
    }],
    buttonAlign:'right',
    buttons : [{
        text : '取消',
        id: 'cancleChange',
        listeners: {
            // scope:this,
            click: 'cancleChange'
        }
    },{
        text : '确认',
        id: 'sureChange',
        listeners: {
            click: 'sureChange'
        }
    },{
        text : '重置',
        id: 'resetChange',
        listeners: {
            click: 'resetChange'
        }
    }]
});