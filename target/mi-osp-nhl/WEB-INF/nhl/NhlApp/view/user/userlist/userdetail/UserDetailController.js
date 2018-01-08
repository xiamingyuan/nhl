/**
 * Created by apple on 2017/3/28.
 */
Ext.define('NhlApp.view.user.userlist.userdetail.UserDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_userdetail',
    afterrender:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            token = Ext.History.getToken(),
            userId = token.split("?")[1],
            blackGridStore = Ext.getCmp('blackGrid').getStore(),
            suggestGridStore = Ext.getCmp('suggestGrid').getStore();
        blackGridStore.getProxy().extraParams.id = userId;
        suggestGridStore.getProxy().extraParams.id = userId;
        blackGridStore.load();
        suggestGridStore.load();
        me.isBlack='';
        Ext.Ajax.request({//获取用户详细信息
            url: 'getuserinfobyid',
            params: {id: userId },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.isBlack = data.data.isBlack;
                    vm.setData(data.data);
                }
            }
        });
    },
    resetPswd:function () {
        var me = this;
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '重置密码',
            id:'newPswdWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'30 40',
            width: 500,
            layout: 'fit',
            items: {
                modelValidation: true,
                xtype: 'form',
                id:'newPswdForm',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                items: [{
                    id:'newPswd',
                    name: 'newPswd',
                    fieldLabel: '新密码',
                    labelAlign:'right',
                    labelWidth: 50,
                    msgTarget: 'under',
                    flex: 2,
                    emptyText: '',
                    blankText : "密码不能为空",
                    allowBlank: false,
                    vtype: 'pwd'
                }, {
                    xtype:'button',
                    margin: '0 0 0 6',
                    text: '生成密码',
                    listeners: {
                        click:me.getPswd
                    }
                }]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:me.save
                    }
                },
                {
                    text: '取消',
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('newPswdWin');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    },
    getPswd:function () {
        var chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz012345678";
        var charLength = chars.length;
        var randomPswd = "";
        for(var i=0;i<6;++i){
            randomPswd+=chars.charAt(Math.floor(Math.random() * charLength));
        }
        Ext.getCmp('newPswd').setValue(randomPswd);
    },
    save:function () {
        var me = this,
            token = Ext.History.getToken(),
            userId = token.split("?")[1],
            newPswd = Ext.getCmp('newPswd').getValue(),
            window = Ext.getCmp('newPswdWin'),
            form = Ext.getCmp('newPswdForm').getForm();
        if(form.isValid()){
            Ext.Ajax.request({
                url: 'resetpswd',
                params: {id: userId,newPswd:newPswd},
                method: 'GET',
                success: function (response, options) {
                    if(response.status==200){
                        window.close();
                        Ext.MessageBox.alert('提示', '密码重置成功');
                    }
                }
            });
        }
    },
    addBlack:function () {
        var me = this,
            view = me.getView(),
            blackGrid = Ext.getCmp('blackGrid');
        var title = me.isBlack ==true?'移除黑名单原因':'加入黑名单原因';
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: title,
            id:'addBlackWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'15 40',
            width: 500,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'addBlackForm',
                defaults: {
                    hideLabel: 'true'
                },
                items: [{
                    xtype: 'textareafield',
                    id:'addBlack',
                    name: 'addBlack',
                    width:415,
                    height:80,
                    fieldLabel: '加入黑名单',
                    msgTarget: 'under',
                    emptyText: '',
                    blankText : "黑名单原因不能为空！",
                    allowBlank: false
                }]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var token = Ext.History.getToken(),
                                userId = token.split("?")[1],
                                reason = Ext.getCmp('addBlack').getValue(),
                                window = Ext.getCmp('addBlackWin'),
                                form = Ext.getCmp('addBlackForm').getForm();
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'updateblackstatus',
                                    params: {id: userId,blackFlag:me.isBlack},
                                    method: 'GET',
                                    success: function (response, options) {
                                        if(response.status==200){
                                            Ext.Ajax.request({
                                                url: 'insertblacklist',
                                                params: {id: userId,blackListReason:reason,blackFlag:me.isBlack},
                                                method: 'GET',
                                                success: function (response, options) {
                                                    if(response.status==200){
                                                        var store = Ext.getCmp('blackGrid').store;
                                                        me.afterrender();
                                                        window.close();
                                                        store.reload();
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                },
                {
                    text: '取消',
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('addBlackWin');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    },
    back: function () {
        Ext.History.back();
    }
});