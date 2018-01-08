/**
 * Created by apple on 2017/3/31.
 */
Ext.define('NhlApp.view.system.hospitaldepartment.hospitaldepartmentedit.HospitalDepartmentEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_hospitaldepartmentedit',
    init:function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            id = Ext.History.getToken().split("?")[1];
        Ext.Ajax.request({
            url: 'queryhospitalbyid',
            method: 'GET',
            params: {id:id},
            success: function (res) {
                var resText = Ext.decode(res.responseText);
                if(resText.code==200){
                    var provincecode = resText.data.result.provincecode;
                    var citycode = resText.data.result.citycode;
                    var cityStore = Ext.getCmp('cityEdit').getStore();
                    var districtStore = Ext.getCmp('districtEdit').getStore();
                    cityStore.getProxy().extraParams = {
                        parentId:provincecode
                    };
                    cityStore.load();
                    districtStore.getProxy().extraParams = {
                        parentId:citycode
                    };
                    districtStore.load();

                    // var editHosImgLogo = resText.data.result.logo;
                    // console.log(editHosImgLogo);
                    vm.setData({formModel:resText.data.result});
                }else{
                    Ext.messagebox.alert('提示',resText.msg)
                }
            }
        });

    },
    editImage:function () {
        var me = this;
        Ext.getCmp("uploadImage").button.getEl().dom.childNodes[1].click();
    },
    imageChange:function (field, newValue, oldValue) {
        var me = this,
            vm = me.getViewModel();
        if(newValue){
            var file = field.fileInputEl.dom.files.item(0);//不兼容IE
            var fileReader = new FileReader(newValue);
            fileReader.readAsDataURL(file);
            fileReader.onload=function(e){
                vm.setData({logoF:e.target.result});
            };
            Ext.getCmp('imageCon').setValue(newValue);
        }
    },
    onSave:function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            data = vm.data.formModel,
            imageForm = Ext.getCmp('imageForm');
        var hosForm = Ext.getCmp('edithosForm').getForm();
        Ext.MessageBox.confirm('提示', '确定添加医院？', function (btn) {
            if(btn=='yes'){
                if(hosForm.isValid()){
                    if(Ext.getCmp('imageCon').getValue()){//上传图片
                        imageForm.submit({
                            url: 'uploadhos',
                            method: 'POST',
                            headers: {'enctype':'multipart/form-data'},
                            success: function(response, options) {

                            },
                            failure: function(response, options) {
                                var result = options.result;
                                if(result.code == 200){
                                    var logo = result.fileName;
                                    vm.data.formModel.logo = logo;
                                    me.onSaveHos(data);

                                }
                            }
                        });
                    }else{
                        me.onSaveHos(data);
                    }
                }
            }
        });
    },
    onSaveHos:function (data) {
        var me = this;
        Ext.Ajax.request({
            url: 'updatehospital',
            method: 'POST',
            jsonData:data,
            success: function (response, options) {
                if(response.status==200){
                    // Ext.MessageBox.alert('提示', '添加成功');
                    me.back();
                }
            }
        });
    },
    back: function () {
        Ext.History.back();
    }
});