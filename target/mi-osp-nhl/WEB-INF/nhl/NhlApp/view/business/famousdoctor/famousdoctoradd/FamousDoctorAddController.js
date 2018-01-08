/**
 * Created by apple on 2017/5/4.
 */
Ext.define('NhlApp.view.business.famousdoctor.famousdoctoradd.FamousDoctorAddController', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.business_famousdoctoradd',
    afterrender:function () {
        var me = this;
        me.diseaseId = '';
        me.doctorIds = '';
        me.selectDoctors = [];
        // me.AllSelectedRecords= [];
        // var diseaseStore = Ext.getCmp('diseaselist').getStore();
        // var memberStore = Ext.getCmp('memberlist').getStore();
        // diseaseStore.load();
        // memberStore.load();
    },
    select:function (ele , record , The , eOpts) {//选择疾病
        var me = this,
            vm = me.getViewModel();
        me.diseaseId = record.getId();
        vm.data.selectDiseaseRecord.push(record);
        vm.setData({selectDisease:record.get('icdname')})
    },
    deselect:function (ele , record , The , eOpts) {//取消选择疾病
        var me = this,
            vm = me.getViewModel();
        me.diseaseId = '';
        vm.data.selectDiseaseRecord = [];
        vm.setData({selectDisease:'未选择疾病'})
    },
    selectDoctor:function (ele , record , The , eOpts) {
        var me = this,
            vm = me.getViewModel();
        me.selectDoctors.push(record);
        vm.setData({AllSelectedRecords:me.selectDoctors});
        vm.setData({selectDoctor:me.selectDoctors.length+'位医生'});
    },
    deselectDoctor:function (ele , record , The , eOpts) {
        var me = this,
            vm = me.getViewModel(),
            doctorId = record.get('id');

        for(var i=0; i<me.selectDoctors.length; i++) {
            if(me.selectDoctors[i].data.id == doctorId) {
                me.selectDoctors.splice(i, 1);
                break;
            }
        }
        vm.setData({AllSelectedRecords:me.selectDoctors});
        if(me.selectDoctors.length>0){
            vm.setData({selectDoctor:me.selectDoctors.length+'位医生'});
        }else{
            vm.setData({selectDoctor:'未选择医生'});
        }
    },
    onSave:function () {
        var me = this,
            vm = me.getViewModel(),
            store = Ext.getCmp('famousdoctor').getStore(),
            doctorIds = "";
        if(me.diseaseId==""){
            vm.setData({errorInfor:'请选择疾病'});
            return;
        }
        if(me.selectDoctors.length==0){
            vm.setData({errorInfor:'请选择医生'});
            return;
        }else{
            for(var i=0;i<me.selectDoctors.length;i++){
                doctorIds+=me.selectDoctors[i].getId()+',';
            }
            doctorIds = doctorIds.substring(0,doctorIds.length-1);
        }
        Ext.Ajax.request({
            url: 'addfamousdoctor',
            params: {
                diseaseId:me.diseaseId,
                doctorIds:doctorIds
            },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code == 200){
                    store.load();
                    me.back();
                }else{
                    vm.setData({errorInfor:data.msg});
                }
            }
        });
    },
    back:function () {
        var me = this;
        me.getView().up('window').close();
    }
});