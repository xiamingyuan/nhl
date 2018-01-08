/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.hospitaldepartment.HospitalDepartmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_hospitaldepartment',
    requires: [
        'NhlApp.view.system.hospitaldepartment.hospitaldepartmentedit.HospitalDepartmentEdit',
        // 'NhlApp.view.system.hospitaldepartment.hospitaldepartmentadd.HospitalDepartmentAdd'
    ],
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(ele.hasCls('edit')){
            me.edit(record.getId());
        }else if(ele.hasCls('detail')){
            me.showDetail(record.getId());
        }else if(ele.hasCls('delete')){
            me.delete(record.getId());
        }
    },
    cellclickdepartment:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(ele.hasCls('editDepartment')){
            me.editDepartment(record.getId());
        }else if(ele.hasCls('deleteDepartment')){
            me.deleteDepartment(record.getId());
        }
    },
    select:function (ele , record , eOpts) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        vm.setData({hosName:record.data.name});
        me.hospitalid = record.getId();
        me.departmentfilter();
    },
    departmentfilter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = Ext.getCmp('department').getStore();
        vm.getData().searchDep.id = me.hospitalid;
        store.getProxy().extraParams = vm.getData().searchDep;
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
            grid = Ext.getCmp('hospitalGrid');
        var departmentStore = Ext.getCmp('department').getStore();
        //加载数据完成,默认选中第一行数据
        //根据数据长度判断选中项,右侧是否展示信息
        if(records.getData().items.length>0){
            grid.getSelectionModel().select(records.getData().items[0]);//默认选中第一行
            vm.setData({'btnDepartmentF':false})
        } else {
            departmentStore.getProxy().extraParams.id = null;
            // grid.getSelectionModel().clearSelections();//清除选中行
            vm.setData({hosName:'暂无医院'});
            departmentStore.load();
            vm.setData({'btnDepartmentF':true})
        }
    },
    showDetail:function (id) {
        Ext.History.add('hospitaldepartment/detail/?'+id);
    },
    add:function () {
        Ext.History.add('hospitaldepartment/add/');
    },
    edit:function (id) {
        Ext.History.add('hospitaldepartment/edit/?'+id);
    },
    delete:function (id) {
        var me = this,
            store = Ext.getCmp('hospitalGrid').getStore();
        Ext.MessageBox.confirm('提示', '确定删除该医院？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'delhospital',
                    params: {id:id},
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
    addDepartment:function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel();
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加科室',
            id:'addDepartmentWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'addDepartmentForm',
                defaults:{
                    labelWidth:60,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        // bind:'{addDepartment.name}',
                        name:'name',
                        fieldLabel: '科室名称',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "科室名称不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'combobox',
                        // bind:'{addDepartment.medicaldepart_id}',
                        name:'medicaldepart_id',
                        msgTarget: 'under',
                        blankText : "专业科室不能为空！",
                        allowBlank: false,
                        fieldLabel: '专业科室',
                        editable:false,//不可编辑
                        emptyText: "--请选择--",
                        store:Ext.create('Ext.data.Store', {
                            fields: ['id', 'name'],
                            proxy: {
                                type: 'ajax',
                                method:'GET',
                                url: 'querymedicaldeparttree',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data.result'
                                }
                            },
                            autoLoad: true
                        }),
                        displayField: 'name',
                        valueField: 'id'
                    },
                    {
                        xtype: 'textfield',
                        // bind:'{addDepartment.code}',
                        name:'code',
                        fieldLabel: '科室编码',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "科室编码不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        height:80,
                        // bind:'{addDepartment.description}',
                        name:'description',
                        fieldLabel: '描述',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "描述不能为空！",
                        allowBlank: false
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('addDepartmentWin'),
                                form = Ext.getCmp('addDepartmentForm').getForm(),
                                data = form.getValues(),
                                store = Ext.getCmp('department').getStore();
                            data.hospital_id = me.hospitalid;
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'insertdepart',
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
                            var window = Ext.getCmp('addDepartmentWin');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    },
    deleteDepartment:function (id) {
        var me = this,
            store = Ext.getCmp('department').getStore();
        Ext.MessageBox.confirm('提示', '确定删除该科室？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'delhosdepart',
                    params: {id:id},
                    method: 'GET',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if(data.code==200){
                            store.reload();
                        }else {
                            Ext.MessageBox.alert('提示', data.msg);
                        }
                    }
                });
            }
        });
    },
    editDepartment:function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,//弹层背景透明默认true
            title: '编辑科室',
            id:'editDepartment',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'editDepartmentForm',
                defaults:{
                    labelWidth:60,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                viewModel: {
                    data: {
                        editDepartment: record
                    }
                },
                items: [
                    {
                        xtype: 'textfield',
                        bind:'{editDepartment.name}',
                        // name:'name',
                        fieldLabel: '科室名称',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "科室名称不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'combobox',
                        bind:'{editDepartment.medicaldepart_id}',
                        // name:'medicaldepart_id',
                        msgTarget: 'under',
                        blankText : "专业科室不能为空！",
                        allowBlank: false,
                        fieldLabel: '专业科室',
                        editable:false,//不可编辑
                        emptyText: "--请选择--",
                        store:Ext.create('Ext.data.Store', {
                            fields: ['id', 'name'],
                            proxy: {
                                type: 'ajax',
                                method:'GET',
                                url: 'querymedicaldeparttree',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data.result'
                                }
                            },
                            autoLoad: true
                        }),
                        displayField: 'name',
                        valueField: 'id'
                    },
                    {
                        xtype: 'textfield',
                        bind:'{editDepartment.code}',
                        // name:'code',
                        fieldLabel: '科室编码',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "科室编码不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        height:80,
                        bind:'{editDepartment.description}',
                        // name:'description',
                        fieldLabel: '描述',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "描述不能为空！",
                        allowBlank: false
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var window = Ext.getCmp('editDepartment'),
                                form = Ext.getCmp('editDepartmentForm').getForm(),
                                store = Ext.getCmp('department').getStore();
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'updatehosdepart',
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
                            var window = Ext.getCmp('editDepartment'),
                                store = Ext.getCmp('department').getStore();
                            window.close();
                            store.reload();
                        }
                    }
                }
            ]
        }).show();
    }
});