/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.schoolspecialty.SchoolSpecialtyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_schoolspecialty',
    requires: [

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
    cellclickMajor:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget()),
            id = ele.getId();
        if(ele.hasCls('editMajor')){
            me.editMajor(record.getId());
        }else if(ele.hasCls('deleteMajor')){
            me.deleteDepartment(record.getId());
        }
    },
    select:function (ele , record , eOpts) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        vm.setData({schoolName:record.data.name});
        me.schoolid = record.getId();
        me.majorGridfilter();
    },
    majorGridfilter:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = Ext.getCmp('majorGrid').getStore();
        vm.getData().searchSchool.id = me.schoolid;
        store.getProxy().extraParams = vm.getData().searchSchool;
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
            grid = Ext.getCmp('schoolGrid');
        var majorGridStore = Ext.getCmp('majorGrid').getStore();
        //加载数据完成,默认选中第一行数据
        //根据数据长度判断选中项,右侧是否展示信息
        if(records.getData().items.length>0){
            grid.getSelectionModel().select(records.getData().items[0]);//默认选中第一行
            vm.setData({'btnMajorF':false})
        } else {
            majorGridStore.getProxy().extraParams.id = null;
            // grid.getSelectionModel().clearSelections();//清除选中行
            vm.setData({schoolName:'暂无专业'});
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
            title: '添加学校',
            id:'addWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 600,
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
                        xtype: 'fieldcontainer',
                        margin:'0 0 15',
                        layout: 'column',
                        defaults: {
                            columnWidth: 0.5,
                            labelWidth: 60,
                            labelAlign: 'right'
                        },
                        items:[
                            {
                                xtype: 'textfield',
                                // bind:'{addDepartment.name}',
                                name:'name',
                                fieldLabel: '学校名称',
                                msgTarget: 'under',
                                emptyText: '',
                                blankText : "学校名称不能为空！",
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                // bind:'{addDepartment.name}',
                                name:'phone',
                                fieldLabel: '学校电话',
                                msgTarget: 'under',
                                emptyText: '',
                                blankText : "学校电话不能为空！",
                                allowBlank: false
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        margin:'0 0 15',
                        layout: 'column',
                        defaults: {
                            columnWidth: 0.33333,
                            labelAlign: 'right'
                        },
                        items:[
                            {
                                xtype: 'combobox',
                                id:'provinceAdd',
                                labelWidth: 60,
                                fieldLabel: '省',
                                emptyText: "--请选择--",
                                editable:false,//不可编辑
                                allowBlank: false,
                                // bind: '{province_id}',
                                name:'province_id',
                                store:Ext.create('Ext.data.Store', {
                                    fields: ['id', 'name'],
                                    autoLoad: true,
                                    proxy: {
                                        type: 'ajax',
                                        url: 'getarea',
                                        method: 'GET',
                                        extraParams: {
                                            parentId:'0'
                                        },
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'data'//返回数据字段
                                        }
                                    }
                                }),
                                displayField: 'name',
                                valueField: 'id',
                                listeners: {
                                    select:function(combo,record,index){
                                        try{
                                            var city = Ext.getCmp('cityAdd');
                                            var district = Ext.getCmp('districtAdd');
                                            city.clearValue();
                                            district.clearValue();
                                            city.getStore().getProxy().extraParams.parentId = combo.getValue();
                                            city.getStore().load();
                                        }catch(ex){
                                            alert("数据加载失败！");
                                        }

                                    }
                                }
                            },
                            {
                                xtype: 'combobox',
                                id:'cityAdd',
                                labelWidth: 20,
                                fieldLabel: '市',
                                emptyText: "--请选择--",
                                editable:false,//不可编辑
                                allowBlank: false,
                                // bind: '{city_id}',
                                name:'city_id',
                                store:Ext.create('Ext.data.Store', {
                                    fields: ['id', 'name'],
                                    autoLoad:false,
                                    proxy: {
                                        type: 'ajax',
                                        url: 'getarea',
                                        method: 'GET',
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'data'//返回数据字段
                                        }
                                    }
                                }),
                                displayField: 'name',
                                valueField: 'id',
                                listeners: {
                                    select:function(combo,record,index){
                                        try{
                                            var district = Ext.getCmp('districtAdd');
                                            district.clearValue();
                                            district.getStore().getProxy().extraParams.parentId = combo.getValue();
                                            district.getStore().load();
                                        }catch(ex){
                                            alert("数据加载失败！");
                                        }

                                    }
                                }
                            },
                            {
                                xtype: 'combobox',
                                id:'districtAdd',
                                name:'district_id',
                                labelWidth: 20,
                                fieldLabel: '区',
                                emptyText: "--请选择--",
                                editable:false,//不可编辑
                                allowBlank: false,
                                // bind: '{district_id}',
                                store:Ext.create('Ext.data.Store', {
                                    fields: ['id', 'name'],
                                    autoLoad:false,
                                    proxy: {
                                        type: 'ajax',
                                        url: 'getarea',
                                        method: 'GET',
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'data'//返回数据字段
                                        }
                                    }
                                }),
                                displayField: 'name',
                                valueField: 'id'
                            }
                        ]
                    }
                    ,
                    {
                        xtype: 'textfield',
                        // bind:'{addDepartment.code}',
                        name:'address',
                        fieldLabel: '地址',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "地址不能为空！",
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
                            var window = Ext.getCmp('addWin'),
                                form = Ext.getCmp('addForm').getForm(),
                                data = form.getValues(),
                                store = Ext.getCmp('schoolGrid').getStore();
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'insertschool',
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
    edit:function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            record = vm.get('focusSchool');
            var data =record.getData();

        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '编辑学校',
            id:'editWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 600,
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
                        editSchool: record
                    }
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        margin:'0 0 15',
                        layout: 'column',
                        defaults: {
                            columnWidth: 0.5,
                            labelWidth: 60,
                            labelAlign: 'right'
                        },
                        items:[
                            {
                                xtype: 'textfield',
                                bind:'{editSchool.name}',
                                name:'.name',
                                fieldLabel: '学校名称',
                                msgTarget: 'under',
                                emptyText: '',
                                blankText : "学校名称不能为空！",
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                bind:'{editSchool.phone}',
                                name:'phone',
                                fieldLabel: '学校电话',
                                msgTarget: 'under',
                                emptyText: '',
                                blankText : "学校电话不能为空！",
                                allowBlank: false
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        margin:'0 0 15',
                        layout: 'column',
                        defaults: {
                            columnWidth: 0.33333,
                            labelAlign: 'right'
                        },
                        items:[
                            {
                                xtype: 'combobox',
                                id:'provinceEdit',
                                labelWidth: 60,
                                fieldLabel: '省',
                                selecOnFocus:true,
                                forceSelection:true,
                                triggerAction : 'all',
                                emptyText: "--请选择--",
                                editable:false,//不可编辑
                                allowBlank: false,
                                bind: '{editSchool.province_id}',
                                name:'province_id',
                                store:Ext.create('Ext.data.Store', {
                                    fields: ['id', 'name'],
                                    autoLoad: true,
                                    proxy: {
                                        type: 'ajax',
                                        url: 'getarea',
                                        method: 'GET',
                                        extraParams: {
                                            parentId:'0'
                                        },
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'data'//返回数据字段
                                        }
                                    }
                                }),
                                displayField: 'name',
                                valueField: 'id',
                                listeners: {
                                    select:function(combo,record,index){
                                        try{
                                            var city = Ext.getCmp('cityEdit');
                                            var district = Ext.getCmp('districtEdit');
                                            city.clearValue();
                                            district.clearValue();
                                            city.getStore().getProxy().extraParams.parentId = combo.getValue();
                                            city.getStore().load();
                                        }catch(ex){
                                            alert("数据加载失败！");
                                        }

                                    }
                                }
                            },
                            {
                                xtype: 'combobox',
                                id:'cityEdit',
                                labelWidth: 20,
                                fieldLabel: '市',
                                selecOnFocus:true,
                                forceSelection:true,
                                triggerAction : 'all',
                                emptyText: "--请选择--",
                                editable:false,//不可编辑
                                allowBlank: false,
                                bind: '{editSchool.city_id}',
                                name:'city_id',
                                store:Ext.create('Ext.data.Store', {
                                    fields: ['id', 'name'],
                                    autoLoad:false,
                                    proxy: {
                                        type: 'ajax',
                                        url: 'getarea',
                                        method: 'GET',
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'data'//返回数据字段
                                        }
                                    }
                                }),
                                displayField: 'name',
                                valueField: 'id',
                                listeners: {
                                    select:function(combo,record,index){
                                        try{
                                            var district = Ext.getCmp('districtEdit');
                                            district.clearValue();
                                            district.getStore().getProxy().extraParams.parentId = combo.getValue();
                                            district.getStore().load()
                                        }catch(ex){
                                            alert("数据加载失败！");
                                        }

                                    }
                                }
                            },
                            {
                                xtype: 'combobox',
                                id:'districtEdit',
                                labelWidth: 20,
                                fieldLabel: '区',
                                selecOnFocus:true,
                                forceSelection:true,
                                triggerAction : 'all',
                                emptyText: "--请选择--",
                                editable:false,//不可编辑
                                allowBlank: false,
                                bind: '{editSchool.district_id}',
                                name:'district_id',
                                store:Ext.create('Ext.data.Store', {
                                    fields: ['id', 'name'],
                                    autoLoad:false,
                                    proxy: {
                                        type: 'ajax',
                                        url: 'getarea',
                                        method: 'GET',
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'data'//返回数据字段
                                        }
                                    }
                                }),
                                displayField: 'name',
                                valueField: 'id'
                            }
                        ]
                    }
                    ,
                    {
                        xtype: 'textfield',
                        bind:'{editSchool.address}',
                        name:'.address',
                        fieldLabel: '地址',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "地址不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        height:80,
                        bind:'{editSchool.description}',
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
                            var window = Ext.getCmp('editWin'),
                                form = Ext.getCmp('editForm').getForm(),
                                store = Ext.getCmp('schoolGrid').getStore();
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'updateschool',
                                    jsonData: record.data,
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
                            var window = Ext.getCmp('editWin'),
                                store = Ext.getCmp('schoolGrid').getStore();
                            window.close();
                            store.reload();
                        }
                    }
                }
            ],
            listeners:{
                afterrender:function () {
                    var provincecode = data.province_id;
                    var citycode = data.city_id;
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
                }
            }
        }).show();
    },
    showDetail:function (id) {
        Ext.History.add('schoolspecialty/detail/?'+id);
    },
    delete:function (id) {
        var me = this,
            store = Ext.getCmp('schoolGrid').getStore();
        Ext.MessageBox.confirm('提示', '确定删除该学校？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'delschool',
                    params: {id:id},
                    method: 'GET',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if(data.code==200){
                            store.reload();
                            Ext.MessageBox.alert('提示', data.msg);
                        }else{
                            Ext.MessageBox.alert('提示', data.msg);
                        }
                    }
                });
            }
        });
    },
    addMajor:function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel();
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加专业',
            id:'addMajorWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 360,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'addMajorForm',
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
                        fieldLabel: '专业名称',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "专业名称不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        // bind:'{addDepartment.code}',
                        name:'code',
                        fieldLabel: '专业编码',
                        msgTarget: 'under',
                        emptyText: '',
                        blankText : "专业编码不能为空！",
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
                            var window = Ext.getCmp('addMajorWin'),
                                form = Ext.getCmp('addMajorForm').getForm(),
                                data = form.getValues(),
                                store = Ext.getCmp('majorGrid').getStore();
                            data.school_id = me.schoolid;
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'insertschooldepart',
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
                            var window = Ext.getCmp('addMajorWin');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    },
    editMajor:function () {
    var me = this,
        view = me.getView(),
        vm = view.getViewModel(),
        record = vm.get('focusApplication');
    Ext.create('Ext.window.Window', {
        ghost:false,
        title: '编辑专业',
        id:'editMajorWin',
        resizable: false,
        draggable:true,
        modal: true,
        bodyPadding:'20 30',
        width: 600,
        layout: 'fit',
        items: {
            xtype: 'form',
            id:'editMajorForm',
            defaults:{
                labelWidth:60,
                margin:'0 0 12',
                anchor:'100%',
                labelAlign: 'right'
            },
            viewModel: {
                data: {
                    editSchoolMahor: record
                }
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    margin:'0 0 15',
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.5,
                        labelWidth: 60,
                        labelAlign: 'right'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            bind:'{editSchoolMahor.name}',
                            name:'.name',
                            fieldLabel: '专业名称',
                            msgTarget: 'under',
                            emptyText: '',
                            blankText : "专业名称不能为空！",
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            bind:'{editSchoolMahor.code}',
                            name:'phone',
                            fieldLabel: '专业编码',
                            msgTarget: 'under',
                            emptyText: '',
                            blankText : "专业编码不能为空！",
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    height:80,
                    bind:'{editSchoolMahor.description}',
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
                        var window = Ext.getCmp('editMajorWin'),
                            form = Ext.getCmp('editMajorForm').getForm(),
                            store = Ext.getCmp('majorGrid').getStore();
                        if(form.isValid()){
                            Ext.Ajax.request({
                                url: 'updateschooldepart',
                                jsonData: record.data,
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
                        var window = Ext.getCmp('editMajorWin'),
                            store = Ext.getCmp('majorGrid').getStore();
                        window.close();
                        store.reload();
                    }
                }
            }
        ]
    }).show();
},
    deleteDepartment:function (id) {
        var me = this,
        store = Ext.getCmp('majorGrid').getStore();
        Ext.MessageBox.confirm('提示', '确定删除该专业？', function (btn) {
            if(btn=='yes'){
                Ext.Ajax.request({
                    url: 'deldepart',
                    params: {id:id},
                    method: 'GET',
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if(data.code==200){
                            store.reload();
                            Ext.MessageBox.alert('提示', data.msg);
                        }
                    }
                });
            }
        });
    }
});