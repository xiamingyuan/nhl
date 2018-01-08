/**
 * Created by apple on 2017/4/12.
 */
Ext.define('NhlApp.view.business.signdepart.signdepartdisease.SignDepartDiseaseController', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.business_signdepartdisease',

    afterrender:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            token = Ext.History.getToken(),
            departId = token.split("?")[1];
            var dpt_diseasesStore = Ext.getCmp('dpt_diseases').getStore();
            var diseaselistStore = Ext.getCmp('diseases').getStore();
            dpt_diseasesStore.getProxy().extraParams.departId = departId;
            dpt_diseasesStore.load();
            diseaselistStore.load();

        Ext.Ajax.request({
            url: 'getmdepartmentdetail',
            params: {id: departId },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    vm.setData({departdetail:data.data.result});
                }
            }
        });
    },
    back:function () {
        Ext.History.back();
    },
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('remove')){
            Ext.MessageBox.confirm('提示', '确定从科室中删除该疾病？',function (btn) {
                if(btn =='yes'){
                    me.remove(record,function () {
                        td.innerHTML = "<div unselectable='on' class='x-grid-cell-inner ' style='text-align:center;'><a href='javascript:void(0);' class='add fa fa-plus-square'>添加</a></div>";
                    });
                }
            });
        }
        if(ele .hasCls('add')){
            me.add(record,function () {
                td.innerHTML = "<div unselectable='on' class='x-grid-cell-inner ' style='text-align:center;'><a href='javascript:void(0);' class='remove fa fa-trash-o'>移除</a></div>";
            });
        }
        if(ele .hasCls('addgroup')){
            me.addgroup(record);
        }
        if(ele .hasCls('removegroup')){
            Ext.MessageBox.confirm('提示', '确定从科室中删除该疾病组？',function (btn) {
                if(btn =='yes'){
                    me.removegroup(record);
                }
            });
        }
    },
    addgroup:function (record) {
        var diseaseGroupId = record.getId(),
            token = Ext.History.getToken(),
            departId = token.split("?")[1];
        var dpt_diseasesStore = Ext.getCmp('dpt_diseases').getStore();
        Ext.Ajax.request({
            url: 'adddepartmentdiseasesbygroup',
            params: {
                departId: departId ,
                diseaseGroupId:diseaseGroupId
            },
            method: 'POST',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code == 200){
                    dpt_diseasesStore.load();
                }else {
                    Ext.MessageBox.alert('提示',data.msg);
                }
            }
        });
    },
    removegroup:function (record) {
        var diseaseGroupId = record.getId(),
            token = Ext.History.getToken(),
            departId = token.split("?")[1];
        var dpt_diseasesStore = Ext.getCmp('dpt_diseases').getStore();
        Ext.Ajax.request({
            url: 'deletedepartmentdiseasesbygroup',
            params: {
                departId: departId ,
                diseaseGroupId:diseaseGroupId
            },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code == 200){
                    dpt_diseasesStore.load();
                }else {
                    Ext.MessageBox.alert('提示',data.msg);
                }
            }
        });
    },
    add:function (record,callback) {
        token = Ext.History.getToken(),
            departId = token.split("?")[1];
        Ext.Ajax.request({
            url: 'adddepartmentdisease',
            params: {departId: departId,diseaseId:record.data.id },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    var dpt_diseasesStore = Ext.getCmp('dpt_diseases').getStore();
                    dpt_diseasesStore.add(record);
                    if(callback){
                        callback();
                    }
                }
            }
        });
    },
    remove:function (record,callback) {
        token = Ext.History.getToken(),
            departId = token.split("?")[1];
        Ext.Ajax.request({
            url: 'removedepartmentdisease',
            params: {departId: departId,diseaseId:record.data.id },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    var dpt_diseasesStore = Ext.getCmp('dpt_diseases').getStore();
                    dpt_diseasesStore.remove(record);
                    if(callback){
                        callback();
                    }
                }
            }
        });
    }
});