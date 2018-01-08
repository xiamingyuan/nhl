/**
 * Created by apple on 2017/4/2.
 */
Ext.define('diseaseMajorModelList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'code',type: 'string'},
        {name: 'similarname', type: 'string'},
        {name: 'depts', type: 'string'}
    ]
});
Ext.define('NhlApp.view.system.diseasegroup.DiseaseGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_diseasegroup',
    requires: [

    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(ele.hasCls('edit')){
            me.edit(record.getId());
        }else if(ele.hasCls('delete')){
            me.delete(record.getId());
        }
    },
    cellclickMajor:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(ele.hasCls('deleteMajor')){
            me.deleteDepartment(record.getId());
        }
    },
    select:function (ele , record , eOpts) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        vm.setData({diseaseTitleName:record.data.name});
        me.diseaseid = record.getId();
        me.majorGridfilter();
    },
    majorGridfilter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = Ext.getCmp('diseaseMajorGrid').getStore();
        vm.getData().searchDisease.diseaseGroupId = me.diseaseid;
        store.getProxy().extraParams = vm.getData().searchDisease;
        store.loadPage(1);
    },
    filter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.down('cisgrid').getStore();
        store.getProxy().extraParams = vm.getData().searchModel;
        store.loadPage(1);
    },
    load:function (records, operation, success) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            grid = Ext.getCmp('diseaseGroupGrid');
        var majorGridStore = Ext.getCmp('diseaseMajorGrid').getStore();
        //加载数据完成,默认选中第一行数据
        //根据数据长度判断选中项,右侧是否展示信息
        if(records.getData().items.length>0){
            grid.getSelectionModel().select(records.getData().items[0]);//默认选中第一行
            vm.setData({'btnMajorF':false})
        } else {
            majorGridStore.getProxy().extraParams.diseaseGroupId = -1;
            vm.setData({diseaseTitleName:'暂无疾病'});
            majorGridStore.load();
            vm.setData({'btnMajorF':true})
        }
    },
    add:function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel();
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加疾病分组',
            id:'addWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 20',
            width: 400,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'addForm',
                defaults:{
                    labelWidth:60,
                    margin:'0 0 12',
                    anchor:'100%',
                    labelAlign: 'right'
                },
                items: [
                    {
                        xtype: 'textfield',
                        // bind:'{addDepartment.code}',
                        name:'name',
                        fieldLabel: '分组名称',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "疾病分组名称不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        height:80,
                        // bind:'{addDepartment.description}',
                        name:'description',
                        fieldLabel: '分组描述',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "疾病分组描述不能为空！",
                        allowBlank: false,
                        maxLength : 200,
                        maxLengthText : '分组描述长度不能超过200个字符'
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('addWin'),
                                form = Ext.getCmp('addForm').getForm(),
                                data = form.getValues(),
                                store = Ext.getCmp('diseaseGroupGrid').getStore();
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'adddiseasegroup',
                                    params: data,
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.code==200){
                                            window.close();
                                            store.reload();
                                        }else {
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
                            var window = Ext.getCmp('addWin');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    },
    edit:function (id) {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            record = vm.get('focusDisease');
            var data =record.getData();
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '编辑疾病分组',
            id:'editWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 20',
            width: 400,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'editForm',
                defaults:{
                    labelWidth:60,
                    margin:'0 0 12',
                    anchor:'100%',
                    labelAlign: 'right'
                },
                viewModel: {
                    data: {
                        editDisease: record
                    }
                },
                items: [
                    {
                        xtype: 'textfield',
                        bind:'{editDisease.name}',
                        name:'name',
                        fieldLabel: '分组名称',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "分组名称不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        height:80,
                        bind:'{editDisease.description}',
                        name:'description',
                        fieldLabel: '分组描述',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "分组描述不能为空！",
                        allowBlank: false,
                        maxLength : 200,
                        maxLengthText : '分组描述长度不能超过200个字符'
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('editWin'),
                                form = Ext.getCmp('editForm').getForm(),
                                store = Ext.getCmp('diseaseGroupGrid').getStore();
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'editdiseasegroup',
                                    params: record.data,
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.code==200){
                                            window.close();
                                            store.reload();
                                        }else {
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
                            var window = Ext.getCmp('editWin');
                                window.close();
                        }
                    }
                }
            ]
        }).show();
    },
    delete:function (id) {
        var me = this,
            store = Ext.getCmp('diseaseGroupGrid').getStore();
        Ext.MessageBox.confirm('提示', '确定删除该疾病分组？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'deletediseasegroup',
                    params: {diseaseGroupId:id},
                    method: 'GET',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if(data.code==200){
                            store.reload();
                        }else{
                            Ext.MessageBox.alert('提示', data.msg);
                        }
                    }
                });
            }
        });
    },
    addMajor:function () {
        var me = this;
        me.idList = [];
        var AllSelectedRecords = []; //保存选中状态
        var dpt_diseasesStore = Ext.getCmp('diseaseMajorGrid').getStore();
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '新增疾病',
            resizable: false,
            modal: true,
            maximizable: true,//窗口最大化
            width: 880,
            height: 500,
            layout: 'fit',
            scrollable: 'y',
            items: {
                xtype:'cisgrid',
                id:'addDiseaseGroupGrid',
                columnLines: true,
                isPage:true,//需要分页
                store: Ext.create('Ext.data.Store', {
                    model: 'diseaseMajorModelList',
                    remoteSort: true,//暂时没有排序
                    autoload:true,
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
                            //根据全局的选择，初始化选中的列
                            var selModel = Ext.getCmp('addDiseaseGroupGrid').getSelectionModel();
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
                    renderer:function (value , metaData , record , rowIndex , colIndex , store , view) {
                        if(dpt_diseasesStore.contains(record)){
                            return '';
                        }else{
                            return  '<div class="x-grid-row-checker">&#160;</div>';//显示checkbox
                        }
                    },
                    listeners: {
                        beforeselect :function( ele , record , index , eOpts ){
                            if(dpt_diseasesStore.contains(record)){
                                return false;
                            }
                        },
                        select:function (ele , record , The , eOpts) {//选中行
                            var id = record.get('id');
                            me.idList.push(id);
                            AllSelectedRecords.push(record);
                        },
                        deselect:function (ele , record , The , eOpts) {//取消选中行
                            var id = record.get('id');
                            for(var i=0; i<me.idList.length; i++) {
                                if(me.idList[i] == id) {
                                    me.idList.splice(i, 1);
                                    break;
                                }
                            }
                            AllSelectedRecords = Ext.Array.filter(AllSelectedRecords, function (item) {
                                return item.get("id") != record.get("id");
                            });
                        }
                    }
                },
                multiColumnSort:false,
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
                        id:'diseaseCode',
                        xtype: 'textfield',
                        fieldLabel: '编码',
                        bind: '{searchModel.diseaseCode}',
                        enableKeyEvents:true
                    },{
                        labelWidth: 30,
                        width: 130,
                        id:'diseaseIcdName',
                        xtype: 'textfield',
                        fieldLabel: '名称',
                        bind: '{searchModel.diseaseIcdName}',
                        enableKeyEvents:true
                    },{
                        text: '查询',
                        listeners:{
                            click: function () {
                                var me = this,
                                    grid = me.up('cisgrid'),
                                    store = grid.getStore();
                                var diseaseCode = Ext.getCmp("diseaseCode").getValue();
                                var diseaseIcdName = Ext.getCmp("diseaseIcdName").getValue();
                                store.getProxy().extraParams = {
                                    diseaseCode: diseaseCode,
                                    diseaseIcdName: diseaseIcdName
                                };
                                store.loadPage(1);
                            }
                        }
                    }]
                },
                columns : [
                    { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                    { text: '编码',width: 150, dataIndex: 'code', align: 'center'},
                    { text: '名称',flex:'1',minWidth: 100, dataIndex: 'similarname', align: 'left'},
                    { text: '科室',width: 180, dataIndex: 'depts', align: 'center'}
                ],
                listeners:{
                    afterrender:function () {
                        var me = this,
                            store = me.getStore();
                        store.loadPage(1);
                    }
                }
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var ele = this,
                                ids;
                            var store = Ext.getCmp('diseaseGroupGrid').getStore();
                            if(me.idList.length>0){
                                ids = me.idList.join(',');
                                Ext.Ajax.request({
                                    url: 'adddiseasestodiseasegroup',
                                    params:{
                                        diseaseIds:ids,
                                        diseaseGroupId:me.diseaseid
                                    },
                                    method: 'GET',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        console.log(data)
                                        if(data.code==200){
                                            Ext.getCmp('diseaseMajorGrid').getStore().reload();
                                            //添加数据更改字段
                                            var diseaseRecord = store.findRecord("id",me.diseaseid);
                                            diseaseRecord.set('diseasesCount', Number(diseaseRecord.get("diseasesCount"))+Number(data.data));
                                            ele.up('window').close();
                                        }else {
                                            Ext.MessageBox.alert('提示',data.msg);
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
                            var ele = this,
                                win = ele.up('window');
                            win.close();
                        }
                    }
                }
            ]
        }).show();
    },
    deleteDepartment:function (id) {
        var me = this,
        store = Ext.getCmp('diseaseGroupGrid').getStore(),
        storeMajor = Ext.getCmp('diseaseMajorGrid').getStore();
        console.log(store)
        Ext.MessageBox.confirm('提示', '确定删除该疾病？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'deletediseasegroupdisease',
                    params: {
                        diseaseId:id,
                        diseaseGroupId:me.diseaseid
                    },
                    method: 'GET',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if(data.code==200){
                            var diseaseRecordDelete = store.findRecord("id",me.diseaseid);
                            diseaseRecordDelete.set('diseasesCount', Number(diseaseRecordDelete.get("diseasesCount"))-Number(data.data));
                            // store.reload();
                            storeMajor.remove(storeMajor.findRecord("id",id));
                        }else {
                            Ext.MessageBox.alert('提示', data.msg);
                        }
                    }
                });
            }
        });
    }
});