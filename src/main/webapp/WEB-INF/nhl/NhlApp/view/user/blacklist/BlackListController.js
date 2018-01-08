/**
 * Created by apple on 2017/3/29.
 */
Ext.define('NhlApp.view.user.blacklist.BlackListController', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.user_blacklist',
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('remove')){
            me.remove(record.data.doctor_id);
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        var queryKey = Ext.getCmp("queryKey").getValue();
        var reason = Ext.getCmp("reason").getValue();
        store.getProxy().extraParams = {
            sdate: '',
            edate: '',
            queryKey: queryKey,
            reason: reason
        };
        store.loadPage(1);
    },
    remove:function (id) {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        Ext.Ajax.request({
            url: 'getuserinfobyid',
            params: {id: id },
            method: 'GET',
            success: function (response, options) {
                if(response.status==200){
                    var data = JSON.parse(response.responseText).data;
                    if(data.isBlack){
                        Ext.create('Ext.window.Window', {
                            ghost:false,
                            title: '移除黑名单原因',
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
                                    fieldLabel: '移除黑名单',
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
                                            var reason = Ext.getCmp('addBlack').getValue(),
                                                window = Ext.getCmp('addBlackWin'),
                                                form = Ext.getCmp('addBlackForm').getForm();
                                            if(form.isValid()){
                                                Ext.Ajax.request({
                                                    url: 'removefromblacklist',
                                                    params: {user_id: id,reason:reason},
                                                    method: 'GET',
                                                    success: function (response, options) {
                                                        if(response.status==200){
                                                            window.close();
                                                            store.reload();
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
                    }else{
                        store.reload();
                        Ext.MessageBox.alert('提示', '当前记录已被处理！');
                    }
                }
            }
        });

    }
});