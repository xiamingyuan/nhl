/**
 * Created by apple on 2017/4/12.
 */
Ext.define('addhospitallist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'level', type: 'string'}
    ]
});
Ext.define('adddepartlist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',type: 'string'},
        {name: 'medicalDepartName',type: 'string'},
        {name: 'code',type: 'string'}
    ]
});
Ext.define('NhlApp.view.business.signdepart.signdepartadd.SignDepartAddController', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.business_signdepartadd',
    afterrender:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
    },
    addImage:function () {
        var me = this;
        Ext.getCmp("uploadImage").button.getEl().dom.childNodes[1].click();
    },
    imageChange:function (field, newValue, oldValue) {
        var me = this,
            vm = me.getViewModel();
        // if (Ext.isIE) {
        //     var image = Ext.get('imageBrowse').dom;
        //     image.src = Ext.BLANK_IMAGE_URL;// 覆盖原来的图片
        //     image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
        // }// 支持FF
        // else {
        //     Ext.get('imageBrowse').dom.src = Ext.get('file-idx').dom.files.item(0).getAsDataURL();
        // }
        if(newValue){
            var file = field.fileInputEl.dom.files.item(0);//不兼容IE
            var fileReader = new FileReader(newValue);
            fileReader.readAsDataURL(file);
            fileReader.onload=function(e){
                vm.setData({logo:e.target.result});
            };
            Ext.getCmp('iamgeCon').setValue(newValue);
        }

    },
    onSave:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            imageForm = Ext.getCmp('imageForm'),
            basicInforFrom = Ext.getCmp('basicInfor');
        if(basicInforFrom.isValid()){
            if(Ext.getCmp('iamgeCon').getValue()){
                imageForm.submit({
                    url: 'uploadhos',
                    method: 'POST',
                    headers: {'enctype':'multipart/form-data'},
                    success: function(response, options) {
                        console.log(response)
                    },
                    failure: function(response, options) {
                        var data = options.result;
                        if(data.code == 200){
                            var url = data.fileName;
                            vm.data.addsigndepart.url = url;
                            me.trueSave(vm.data.addsigndepart);
                        }
                    }
                });
            }else{
                me.trueSave(vm.data.addsigndepart);
            }
        }
    },
    trueSave:function (data) {
        var me = this;
        Ext.Ajax.request({
            url: 'signdepartadd',
            method: 'POST',
            jsonData:data,
            success: function (response, options) {
                var res = Ext.decode(response.responseText);
                if(res.code==200){
                    me.back();
                }else {
                    Ext.MessageBox.alert('提示',res.msg);
                }
            }
        });
    },
    /*addHos:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
            me.selectInfor = {};
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '新增医院科室',
            resizable: false,
            modal: true,
            width: 800,
            height: 500,
            layout: 'fit',
            id:'addHosWin',
            items:{
                xtype:'panel',
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                scrollable: 'y',
                tbar: {
                    xtype: 'toolbar',
                    padding: 5,
                    height:38,
                    width: '100%',
                    defaults: {
                        labelAlign: 'right',
                        margin: '0 10 0 0'
                    },
                    items: [{
                        labelWidth: 30,
                        width: 130,
                        id:'hosfield',
                        xtype: 'textfield',
                        fieldLabel: '名称',
                        enableKeyEvents:true
                    }, {
                        text: '查询',
                        listeners:{
                            click: function () {
                                var me = this,
                                    hosfield = Ext.getCmp('hosfield').getValue(),
                                    store = Ext.getCmp('hospitalgrid').getStore();
                                store.getProxy().extraParams.hospitalName = hosfield;
                                store.loadPage(1);
                            }
                        }
                    }]
                },
                items:[
                    {
                        xtype:'cisgrid',
                        id:'hospitalgrid',
                        margin:'0 10 0 0',
                        flex:1,
                        columnLines: true,
                        isPage:true,//需要分页
                        style: {
                            border:'1px solid #f6f6f6'
                        },
                        store: Ext.create('Ext.data.Store', {
                            model: 'addhospitallist',
                            remoteSort: true,
                            autoload: true,
                            proxy: {
                                type: 'ajax',
                                url: 'queryhospitallist',
                                method: 'GET',
                                extraParams: {
                                    code:'',
                                    hospitalName:'',
                                    level:'',
                                    province:'',
                                    city:'',
                                    district:''
                                },
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data.result.datas',//返回数据字段
                                    totalProperty : 'data.result.totalCount'
                                }
                            },
                            //排序
                            sorters: [{
                                property: 'default',
                                direction: 'default'
                            }]
                        }),
                        multiColumnSort:false,//禁止多列排序
                        columns : [
                            { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                            { text: '名称',width: 130, dataIndex: 'name'},
                            { text: '地址',flex:1, dataIndex: 'address', align: 'center'},
                            { text: '级别',sortable: false,width: 70, dataIndex: 'level', align: 'center',renderer:function (val) {
                                if(val=="4"){
                                    return "三甲";
                                }else if (val=="3"){
                                    return "三级";
                                }else if(val=="2"){
                                    return "二级";
                                }else if(val=="1"){
                                    return "一级";
                                }else if(val=="0"){
                                    return "其他";
                                }else if(val=="-2"){
                                    return "社区";
                                }else if(val=="-1"){
                                    return "一级以下";
                                }else {
                                    return "";
                                }
                            }}
                        ],
                        listeners: {
                            select:function (ele , record , eOpts) {
                                var selectHosId = filterId = record.getId(),
                                    selectHosName = record.data.name,
                                    store = Ext.getCmp('departGrid').getStore();
                                Ext.getCmp('selectHosName').setValue(selectHosName);
                                store.getProxy().extraParams.id = filterId;
                                store.loadPage(1);
                                me.selectInfor.selectHosId = selectHosId;
                                me.selectInfor.selectHosName = selectHosName;
                            }
                        }
                    },
                    {
                        xtype:'cisgrid',
                        id:'departGrid',
                        isPage:false,
                        columnLines: true,
                        width:300,
                        emptyText:'暂无数据',
                        style: {
                            border:'1px solid #f6f6f6'
                        },
                        store: Ext.create('Ext.data.Store', {
                            model: 'adddepartlist',
                            remoteSort: true,
                            autoload: true,
                            proxy: {
                                type: 'ajax',
                                url: 'queryhospitaldepartlist',
                                method: 'GET',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data.result'//返回数据字段
                                }
                            },
                            //排序
                            sorters: [{
                                property: 'default',
                                direction: 'default'
                            }]
                        }),
                        tbar: {
                            xtype: 'toolbar',
                            padding: 5,
                            height: 30,
                            width: '100%',
                            defaults: {
                                labelAlign: 'right',
                                margin: '0 10 0 0'
                            },
                            items: [{
                                xtype: 'displayfield',
                                id:'selectHosName',
                                bind:{
                                    value:'请选择医院'
                                }
                            }]
                        },
                        multiColumnSort:true,//禁止多列排序
                        columns : [
                            { text: '名称',sortable: false,flex:1, dataIndex: 'name', align: 'center',height:30},
                            { text: '专业科室',sortable: false,width:100, dataIndex: 'medicalDepartName', align: 'center' },
                            { text: '科室编码',sortable: false,width: 80, dataIndex: 'code', align: 'center' }
                        ],
                        listeners: {
                            select:function (ele , record , eOpts) {
                                console.log(record)
                                var selectDepId = record.getId(),
                                    selectDepName = record.data.name;
                                me.selectInfor.selectDepId = selectDepId;
                                me.selectInfor.selectDepName = selectDepName;
                            }
                        },
                        buttons: [
                            '->',
                            {
                                text: '保存',
                                handler: function () {
                                    var data = me.selectInfor,
                                        win = Ext.getCmp('addHosWin'),
                                        signdepartname = Ext.getCmp('signdepartname');

                                    Ext.getCmp('hospital').setValue(data.selectHosName);
                                    Ext.getCmp('hospitalId').setValue(data.selectHosId);
                                    Ext.getCmp('depart').setValue(data.selectDepName);
                                    Ext.getCmp('departId').setValue(data.selectDepId);
                                    if(!signdepartname.getValue()){
                                        signdepartname.setValue(data.selectDepName)
                                    }
                                    win.close();
                                }
                            },
                            {
                                text: '取消',
                                handler: function () {
                                    var win = Ext.getCmp('addHosWin');
                                    win.close();
                                }
                            }
                        ]
                    }
                ]
            },
            listeners:{
                afterrender:function () {
                    var me = this,
                        store = Ext.getCmp('hospitalgrid').getStore();
                    store.loadPage(1);
                }
            }
        }).show();
    },*/
    back:function () {
        Ext.History.back();
    }
});