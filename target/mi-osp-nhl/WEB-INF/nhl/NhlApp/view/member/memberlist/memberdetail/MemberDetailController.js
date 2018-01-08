/**
 * Created by localadmin on 17/3/30.
 */
Ext.define('NhlApp.view.member.memberlist.memberdetail.MemberDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.member_memberdetail',
    init:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            token = Ext.History.getToken(),
            memberId = token.split("?")[1];
            me.isBlack='';
        Ext.Ajax.request({
            url: 'getuserdetailinfo',
            params: {id: memberId },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code == 200){
                    vm.setData(data.data.member.result);
                    Ext.getCmp('clientBindsList').getStore().loadData(data.data.clientBinds,true);//绑定信息,通过ID绑定store赋值数据loadData方法
                    // Ext.getCmp('auditCards').setData(data.auditCards);//医保绑定没有数据
                    me.isBlack = data.data.member.result.isBlack;
                }else {
                    Ext.MessageBox.alert('提示',data.msg);
                }
            }
        });
    },
    afterrender:function() {
        var suggestlistStore = Ext.getCmp('suggestlistId').getStore(),
            blackGrIdStore = Ext.getCmp('blackGrId').getStore(),
            token = Ext.History.getToken(),
            suggestId = token.split("?")[1],
            blackGrId = token.split("?")[1];
        //意见反馈数据
        suggestlistStore.getProxy().extraParams = {
            id: suggestId
        };
        suggestlistStore.load();
        //黑名单记录
        blackGrIdStore.getProxy().extraParams = {
            id: blackGrId
        };
        blackGrIdStore.load();
    },
    resetPswd:function () {
        var me = this;
        Ext.create('Ext.window.Window', {
            ghost:false,//弹层背景透明默认true
            title: '重置密码',
            id:'newPwdWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'30 40',
            width: 500,
            layout: 'fit',
            items: {
                modelValidation: true,
                xtype: 'form',
                id:'newPwdForm',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                items: [{
                    id:'newPwd',
                    name: 'newPwd',
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
                            var window = Ext.getCmp('newPwdWin');
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
        Ext.getCmp('newPwd').setValue(randomPswd);
    },
    save:function () {
        var me = this,
            token = Ext.History.getToken(),
            userId = token.split("?")[1],
            newPwd = Ext.getCmp('newPwd').getValue(),
            window = Ext.getCmp('newPwdWin'),
            form = Ext.getCmp('newPwdForm').getForm();
        if(form.isValid()){
            Ext.Ajax.request({
                url: 'resetpassword',
                params: {id: userId,newPwd:newPwd},
                method: 'GET',
                success: function (response, options) {
                    var res = Ext.decode(response.responseText);
                    if(res.code==200){
                        window.close();
                    }else{
                        Ext.MessageBox.alert('提示',res.msg);
                    }
                }
            });
        }
    },
    addBlack:function () {
        var me = this,
            view = me.getView(),
            blackGrid = Ext.getCmp('blackGrId');
        var title = me.isBlack ==true?'移除黑名单原因':'加入黑名单原因';
        Ext.create('Ext.window.Window', {
            ghost:false,//弹层背景透明默认true
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
                                    url: 'updateblackstatusmember',
                                    params: {id: userId,blackFlag:me.isBlack},
                                    method: 'GET',
                                    success: function (response, options) {
                                        var res = Ext.decode(response.responseText);
                                        if(res.code==200){
                                            Ext.Ajax.request({
                                                url: 'getblacklistmember',
                                                params: {id: userId,reason:reason,blackFlag:me.isBlack},
                                                method: 'GET',
                                                success: function (response, options) {
                                                    var data = Ext.decode(response.responseText);
                                                    if(data.code==200){
                                                        var store = Ext.getCmp('blackGrId').store;
                                                        me.init();
                                                        window.close();
                                                        store.reload();
                                                    }
                                                }
                                            });
                                        }else{
                                            Ext.MessageBox.alert('提示',res.msg);
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