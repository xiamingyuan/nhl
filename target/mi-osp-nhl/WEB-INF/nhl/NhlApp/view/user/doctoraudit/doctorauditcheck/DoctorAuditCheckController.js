/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.user.doctoraudit.doctorauditcheck.DoctorAuditCheckController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user_doctorauditcheck',
    afterrender:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        me.ageError = false;
        me.genderError = false;
        me.msgNotice = 1;
        me.idNumberError = false;
        me.dateError = false;
        me.tasknum = 0;
        me.level = [];
        Ext.Ajax.request({//获取职称级别 用于titleRender
            url: 'leveltitle',
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.level = data.data;
                }
            }
        });
        Ext.Ajax.request({
            url: 'gettaskcount',
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.tasknum = data.data;
                    vm.setData({tasknum:data.data});
                }
            }
        });

    },
    select:function (ele , record , eOpts) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            id = record.getId();
        me.id = id;
        Ext.Ajax.request({
            url: 'getauthenbyid',
            params: {id: id },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    for(var i=0;i<me.level.length;i++){
                        if(data.data.doctor_Title==me.level[i].itemvalue){
                            data.data.doctor_Title = me.level[i].itemname;
                        }
                    }
                    vm.setData(data.data);
                }
            }
        });

    },
    updateauthenstatusSucc:function () {//审核通过
        //此处身份证号有复杂判断 后续加上
        var me = this,
            view = me.getView(),
            vm = view.getViewModel();
            // msgNotice = Ext.getCmp('msgNotice').getValue()==true?1:0;//是否发送短信
        var itemval = {
            id: me.id,
            authenstatus: 2,
            reason: '',
            note: vm.data.note,
            createtime: vm.data.createTime,
            // doctor_IdNumber: vm.data.idNumber,
            // doctor_Practicecert_Num: vm.data.practicecert_num,
            // doctor_Titlecert_Num: vm.data.titlecert_num,
            // msgNotice: msgNotice
        };
        Ext.MessageBox.confirm('提示', '确定通过此申请？',function (btn) {
            if(btn =='yes'){
                Ext.Ajax.request({
                    url: 'updateauthenstatus',
                    params: itemval,
                    method: 'POST',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        // if(data.code==200){
                            me.tasknum--;
                            vm.setData({tasknum:me.tasknum,note:'',idNumber:'',practicecert_num:'',titlecert_num:''});
                            if(me.tasknum==0){
                                vm.setData('');
                                me.back();
                            }else{
                                var grid = Ext.getCmp('doctorauditcheck');
                                grid.store.reload()
                            }
                        // }else{
                        //     Ext.MessageBox.alert('提示', data.msg);
                        // }
                    }
                });
            }
        });
    },
    updateauthenstatusFail:function () {//审核失败
        var me = this,
            view = me.getView(),
            vm = view.getViewModel();
        Ext.create('Ext.window.Window', {
            ghost:false,//弹层背景透明默认true
            title: '拒绝原因',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'15 40',
            width: 500,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'failForm',
                defaults: {
                    hideLabel: 'true'
                },
                items: [{
                    xtype: 'textareafield',
                    id:'failReason',
                    width:415,
                    height:80,
                    fieldLabel: '拒绝原因',
                    msgTarget: 'under',
                    emptyText: '',
                    blankText : "请输入原因",
                    allowBlank: false
                }]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var ele = this,
                                reason = Ext.getCmp('failReason').getValue(),
                                form = Ext.getCmp('failForm').getForm();
                                // msgNotice = Ext.getCmp('msgNotice').getValue()==true?1:0;
                            if(form.isValid()){
                                var itemval = {
                                    id: me.id,
                                    authenstatus: 3,
                                    reason: reason,
                                    note: vm.data.note,
                                    createtime: vm.data.createTime
                                    // msgNotice: msgNotice
                                };
                                Ext.Ajax.request({
                                    url: 'updateauthenstatus',
                                    params: itemval,
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.code==200){
                                            me.tasknum--;
                                            vm.setData({tasknum:me.tasknum,note:''});
                                            ele.up('window').close();
                                            if(me.tasknum==0){
                                                vm.setData('');
                                                me.back();
                                            }else{
                                                var grid = Ext.getCmp('doctorauditcheck');
                                                grid.store.reload()
                                            }
                                        }else{
                                            Ext.MessageBox.alert('提示', data.msg);
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
                            var me = this,
                                window = me.up('window');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    },
    giveUpTask:function () {//放弃任务
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        Ext.MessageBox.confirm('提示', '确定放弃当前任务？',function (btn) {
            if(btn =='yes'){
                Ext.Ajax.request({
                    url: 'giveuptask',
                    params: {doctorId:'',id: me.id },
                    method: 'POST',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if(data.code==200){
                            me.tasknum--;
                            vm.setData({tasknum:me.tasknum});
                            if(me.tasknum==0){
                                vm.setData('');
                                me.back();
                            }else{
                                var grid = Ext.getCmp('doctorauditcheck');
                                grid.store.reload()
                            }
                        }
                    }
                });
            }
        });
    },
    giveUpAllTask:function () {
        var me = this;
        Ext.MessageBox.confirm('提示', '确定拒绝全部任务？',function (btn) {
            if(btn =='yes'){
                Ext.Ajax.request({
                    url: 'giveupalltask',
                    method: 'GET',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if(data.code==200){
                            me.back();
                        }
                    }
                });
            }
        });
    },
    back: function () {
        Ext.History.back();
    }
});