/**
 * Created by apple on 2017/5/4.
 */
Ext.define('diseaseList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'similarname', type: 'string'}
    ]
});
Ext.define('doctorlist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName',type: 'string'},
        {name: 'realName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'registerTime',type: 'date',dateFormat : 'time'}
    ]
});
Ext.define('NhlApp.view.business.famousdoctor.famousdoctoradd.FamousDoctorAdd', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.business_famousdoctor_add',
    requires: [
        'NhlApp.view.business.famousdoctor.famousdoctoradd.FamousDoctorAddController',
        'NhlApp.view.business.famousdoctor.famousdoctoradd.FamousDoctorAddModel'
    ],
    controller: 'business_famousdoctoradd',
    viewModel: {
        type:'business_famousdoctoradd'
    },
    id:'famousdoctoradd',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype:'cisgrid',
            id:'diseaselist',
            flex:1,
            margin:'0 5 0 0',
            columnLines: true,
            isPage:true,//需要分页
            store: Ext.create('Ext.data.Store', {
                model: 'diseaseList',
                autoload:true,
                remoteSort: true,//暂时没有排序
                proxy: {
                    type: 'ajax',
                    url: 'getdiseaselist',
                    method: 'GET',
                    extraParams: {
                        diseaseCode:"",
                        diseaseIcdName: ""
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data.datas',//返回数据字段
                        totalProperty : 'data.totalCount'
                    }
                },
                //排序
                sorters: [{
                    property: 'default',
                    direction: 'default'
                }],
                listeners:{
                    load:function(ele , records , successful , eOpts){
                        var me = this,
                            selectDiseaseRecord = Ext.getCmp('famousdoctoradd').getViewModel().data.selectDiseaseRecord;
                        //根据全局的选择，初始化选中的列
                        var selModel = Ext.getCmp('diseaselist').getSelectionModel();
                        Ext.Array.each(selectDiseaseRecord, function () {
                            for (var i = 0; i < records.length; i++) {
                                var record = records[i];
                                if (record.get("id") == this.get("id")) {
                                    selModel.select(record, true, true);    //选中record，并且保持现有的选择，不触发选中事件
                                }
                            }
                        });
                    }
                }
            }),
            selModel:{
                selType : 'checkboxmodel',
                injectCheckbox:1,//checkbox位于哪一列，默认值为0
                mode:'single',//multi,simple,single；默认为多选multi
                checkOnly:true,//如果值为true，则只用点击checkbox列才能选中此条记录
                allowDeselect:true,//如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
                enableKeyNav:false,
                listeners: {
                    select:'select',
                    deselect:'deselect'
                }
            },
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
                    id:'diseaseIcdName',
                    xtype: 'textfield',
                    fieldLabel: '名称',
                    enableKeyEvents:true
                },{
                    text: '查询',
                    listeners:{
                        click: function () {
                            var me = this,
                                grid = me.up('cisgrid'),
                                store = grid.getStore();
                            var diseaseIcdName = Ext.getCmp("diseaseIcdName").getValue();
                            store.getProxy().extraParams = {
                                diseaseCode: '',
                                diseaseIcdName: diseaseIcdName
                            };
                            store.loadPage(1);
                        }
                    }
                },{
                    xtype: 'displayfield',
                    labelWidth:40,
                    fieldLabel: '已选择',
                    bind:'{selectDisease}'
                }]
            },
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '名称',flex:'1',minWidth: 100, dataIndex: 'similarname', align: 'left'}
            ],
            listeners:{
                afterrender:function () {
                    var me = this,
                        store = me.getStore();
                    store.loadPage(1);
                }
            }
        },
        {
            xtype:'cisgrid',
            id:'doctorlist',
            flex:1,
            columnLines: true,
            isPage:true,//需要分页
            store: Ext.create('Ext.data.Store', {
                model: 'doctorlist',
                remoteSort: false,//暂时没有排序
                autoload:true,
                proxy: {
                    type: 'ajax',
                    url: 'querydoctorlistbyname',
                    method: 'GET',
                    extraParams: {
                        querykey:''
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data.datas',//返回数据字段
                        totalProperty : 'data.totalCount'
                    }
                },
                //排序
                sorters: [{
                    property: 'default',
                    direction: 'default'
                }],
                listeners:{
                    load:function(ele , records , successful , eOpts){
                        var me = this,
                            AllSelectedRecords = Ext.getCmp('famousdoctoradd').getViewModel().data.AllSelectedRecords;
                        //根据全局的选择，初始化选中的列
                        var selModel = Ext.getCmp('doctorlist').getSelectionModel();
                        Ext.Array.each(AllSelectedRecords, function () {
                            for (var i = 0; i < records.length; i++) {
                                var record = records[i];
                                if (record.get("id") == this.get("id")) {
                                    selModel.select(record, true, true);    //选中record，并且保持现有的选择，不触发选中事件
                                }
                            }
                        });
                    }
                }
            }),
            selModel:{
                selType : 'checkboxmodel',
                injectCheckbox:1,//checkbox位于哪一列，默认值为0
                mode:'multi',//multi,simple,single；默认为多选multi
                checkOnly:true,//如果值为true，则只用点击checkbox列才能选中此条记录
                allowDeselect:true,//如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
                enableKeyNav:false,
                listeners: {
                    select:'selectDoctor',
                    deselect:'deselectDoctor'
                }
            },
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
                    labelWidth: 40,
                    width: 140,
                    id:'querykey',
                    xtype: 'textfield',
                    fieldLabel: '用户名',
                    enableKeyEvents:true
                }, {
                    text: '查询',
                    listeners:{
                        click: function () {
                            var me = this,
                                grid = me.up('cisgrid'),
                                store = grid.getStore();
                            var querykey = Ext.getCmp('querykey').getValue();
                            store.getProxy().extraParams = {
                                querykey:querykey
                            };
                            store.loadPage(1);
                        }
                    }
                },{
                    xtype: 'displayfield',
                    labelWidth:40,
                    fieldLabel: '已选择',
                    bind:'{selectDoctor}'
                }]
            },
            columns : [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                { text: '用户名',width: 100, dataIndex: 'loginName',align:'center'},
                { text: '姓名',flex:1, dataIndex: 'realName', align: 'center' },
                { text: '性别',width: 50, dataIndex: 'gender', align: 'center' ,renderer:function (val) {//转换性别
                    if(val=='OTHER'){
                        return '';
                    }else if(val=='WOMEN'){
                        return '女';
                    }else{
                        return '男';
                    }
                }},
                { text: '注册时间',width: 140, dataIndex: 'registerTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') }
            ],
            listeners:{
                afterrender:function () {
                    var me = this,
                        store = me.getStore();
                    store.loadPage(1);
                }
            }
        }
    ],
    buttons: [
        {
            xtype: 'displayfield',
            id:'errorInfor',
            labelWidth:0,
            fieldLabel: '',
            bind:'{errorInfor}'
        },
        '->',
        { text: '保存', handler: 'onSave' },
        { text: '返回', handler: 'back' }
    ],
    listeners:{
        afterrender:'afterrender'
    }
});