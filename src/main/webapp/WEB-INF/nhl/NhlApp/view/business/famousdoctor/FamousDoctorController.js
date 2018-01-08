/**
 * Created by apple on 2017/5/4.
 */
Ext.define('NhlApp.view.business.famousdoctor.FamousDoctorController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'NhlApp.view.business.famousdoctor.famousdoctoradd.FamousDoctorAdd'
    ],
    alias: 'controller.business_famousdoctor',
    afterrender:function(){
        var me = this;
        me.moveFlag = true;
    },
    beforerender:function () {
        var me = this;
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
    },
    titleRender:function (val) {//转换职称
        var me = this,
            arr = me.level;

        if (val == "" || val == null || val == undefined) {
            return "";
        }
        for (var i = 0; i < arr.length; i++) {
            if (val == arr[i].itemvalue) {
                return arr[i].itemname;
            }
        }
    },
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('delete')){
            me.delete(record.getId());
        }else if(ele.hasCls('up')){
            if(me.moveFlag){
                me.move(record.getId(),record.get('diseaseId'),record.get('ordernum'),rowIndex,'up');
            }else{
                Ext.MessageBox.alert('提示','请去除医生、医院搜索条件后移动');
            }
        }else if(ele.hasCls('down')){
            if(me.moveFlag){
                me.move(record.getId(),record.get('diseaseId'),record.get('ordernum'),rowIndex,'down');
            }else{
                Ext.MessageBox.alert('提示','请去除医生、医院搜索条件后移动');
            }
        }
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore(),
            s = vm.getData().searchModel;
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
        if(Ext.util.Format.trim(s.doctor)||Ext.util.Format.trim(s.hospital)){
            me.moveFlag = false;
        }else{
            me.moveFlag = true;
        }
    },
    addfamousdoctor:function () {//添加名医
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '新增名医',
            resizable: false,
            modal: true,
            maximizable: true,//窗口最大化
            width: 880,
            height: 500,
            layout: 'fit',
            scrollable: 'y',
            items:{
                xtype: 'business_famousdoctor_add'
            }
        }).show();
    },
    delete:function (id) {
        var me = this;
        Ext.MessageBox.confirm('提示', '确定删除该名医？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'deletefamousdoctor',
                    method: 'GET',
                    params: {famousDoctorId:id},
                    success: function (response, options) {
                        var res = Ext.decode(response.responseText);
                        if(res.code==200){
                            me.filter();
                        }else{
                            Ext.MessageBox.alert('提示',res.msg);
                        }
                    }
                });
            }
        });
    },
    move:function (diseaseDocotorId,diseaseId,ordernum,rowIndex,direction) {
        var me = this,
            view = me.getView(),
            store = view.getStore(),
            targetRecord;
        me.max = 1;
        me.min = 1;
        Ext.Ajax.request({
            url: 'querydiseasedoctororderscope',
            method: 'GET',
            params: {diseaseId:diseaseId},
            success: function (response, options) {
                var res = Ext.decode(response.responseText);
                if(res.code == 200){
                    me.max = res.data.max;
                    me.min = res.data.min;
                    if(direction=="up"){
                        targetRecord = me.getView().getStore().getAt(rowIndex-1);
                        if(Number(ordernum)<=me.min){
                            Ext.MessageBox.alert('提示','不能上移');
                            return;
                        }
                    }else if(direction=="down"){
                        targetRecord = me.getView().getStore().getAt(rowIndex+1);
                        if(Number(ordernum)>=me.max){
                            Ext.MessageBox.alert('提示','不能下移');
                            return;
                        }
                    }

                    if(targetRecord){
                        if(targetRecord.get('diseaseId')!=diseaseId){
                            Ext.MessageBox.alert('提示','不同疾病之间不能移动');
                            return;
                        }
                        Ext.Ajax.request({
                            url: 'famousdoctormove',
                            method: 'GET',
                            params: {
                                diseaseDocotorId:diseaseDocotorId,
                                index:targetRecord.get('ordernum')
                            },
                            success: function (response, options) {
                                var res = Ext.decode(response.responseText);
                                if(res.code==200){
                                    store.load();
                                }else{
                                    Ext.MessageBox.alert('提示',res.msg);
                                }
                            }
                        });
                    }else{
                        Ext.MessageBox.alert('提示','不能移动');
                    }
                }
            }
        });
    }
});