/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.city.CityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_city',
    render:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        me.getViewModel().get('gridstore').load();
        me.getCount();
        Ext.Ajax.request({//获取地区级别列表 用于levelRender
            url: 'levelarea',
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.level = data.data;
                }
            }
        });
    },
    levelRender:function (val) {//转换系统级别 1 2 3 -->一级 二级 三级
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
        return val;
    },
    getCount:function () {//获取城市一级数目
        var me = this;
        Ext.Ajax.request({
            url: 'getchildarealistcount',
            params: {node:null},
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.getViewModel().setData({count:data.count})
                }
            }
        });
    },
    cellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('edit')){
            me.edit(record);
        }else if(ele.hasCls('delete')){
            me.delete(record);
        }
    },
    delete:function (record) {//删除城市
        var me = this,
            id = record.getId();
        if(record.data.leaf==false){
            Ext.MessageBox.confirm('提示', '含有子集目录，确定删除？',function (btn) {
                if(btn =='yes'){
                    me.deleteFun(id);
                }
            });
        }else{
            Ext.MessageBox.confirm('提示', '确定删除该数据？',function (btn) {
                if(btn =='yes'){
                    me.deleteFun(id);
                }
            });
        }
    },
    deleteFun:function (id) {
        var me = this;
        Ext.Ajax.request({
            url: 'deletearea',
            params: {id:id},
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.getCount();
                    me.getViewModel().get('gridstore').load();
                }else{
                    Ext.MessageBox.alert('提示', data.msg);
                }
            }
        });
    },
    edit:function (record) {//编辑城市
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '编辑城市',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 500,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'editFrom',
                viewModel: {
                    data: {
                        editFrom: record
                    }
                },
                defaults: {
                    // hideLabel: 'true'
                    labelWidth:80,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name:'id',
                        fieldLabel: '城市编码',
                        bind:{
                            value:'{editFrom.id}'
                        },
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name:'name',
                        fieldLabel: '城市名称',
                        bind:{
                            value:'{editFrom.name}'
                        },
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'key_city',
                        checked : '{editFrom.key_city}',
                        bind:{
                            value:'{editFrom.key_city}'
                        },
                        fieldLabel: '是否主要城市'
                    },
                    {
                        xtype: 'textfield',
                        name:'baidu_name',
                        fieldLabel: '百度编码',
                        bind:{
                            value:'{editFrom.baidu_name}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name:'c_order',
                        fieldLabel: '序号',
                        bind:{
                            value:'{editFrom.c_order}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name:'shortname',
                        fieldLabel: '城市简称',
                        bind:{
                            value:'{editFrom.shortname}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name:'spell',
                        fieldLabel: '城市全拼',
                        bind:{
                            value:'{editFrom.spell}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        name:'jianpin',
                        fieldLabel: '城市简拼',
                        bind:{
                            value:'{editFrom.jianpin}'
                        }
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners:{
                        click:function () {
                            var ele = this,
                                window = ele.up('window'),
                                form = Ext.getCmp('editFrom').getForm();
                            console.log(record)
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'editarea',
                                    jsonData: record.data,
                                    headers: {'Content-Type':'application/json'},
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.code==200){
                                            window.close();
                                            me.getViewModel().get('gridstore').load();
                                        }else{
                                            window.close();
                                            me.getViewModel().get('gridstore').load();
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
                            var ele = this,
                                window = ele.up('window');
                            window.close();
                            me.getViewModel().get('gridstore').load();
                        }
                    }
                }
            ]
        }).show();

    },
    addChild:function () {//添加城市
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore(),
            record = view.getSelectionModel().getSelection();
        if(record.length==0){
            Ext.MessageBox.alert('提示','请选择父级城市');
        }else{
            Ext.create('Ext.window.Window', {
                ghost:false,
                title: '添加子城市',
                resizable: false,
                draggable:true,
                modal: true,
                bodyPadding:'20 30',
                width: 500,
                layout: 'fit',
                items: {
                    xtype: 'form',
                    id:'addChildFrom',
                    defaults: {
                        // hideLabel: 'true'
                        labelWidth:80,
                        margin:'0 0 12',
                        anchor:'100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name:'id',
                            fieldLabel: '城市编码',
                            value: '',
                            msgTarget: 'side',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            name:'name',
                            fieldLabel: '城市名称',
                            value: '',
                            msgTarget: 'side',
                            allowBlank: false
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'key_city',
                            checked : false,
                            fieldLabel: '是否主要城市'
                        },
                        {
                            xtype: 'textfield',
                            name:'baidu_name',
                            fieldLabel: '百度编码'
                        },
                        {
                            xtype: 'textfield',
                            name:'c_order',
                            fieldLabel: '序号'
                        },
                        {
                            xtype: 'textfield',
                            name:'shortname',
                            fieldLabel: '城市简称',
                            value: ''
                        },
                        {
                            xtype: 'textfield',
                            name:'spell',
                            fieldLabel: '城市全拼',
                            value: ''
                        },
                        {
                            xtype: 'textfield',
                            name:'jianpin',
                            fieldLabel: '城市简拼',
                            value: ''
                        }
                    ]
                },
                buttons: [
                    {
                        text: '保存',
                        formBind: true,
                        listeners:{
                            click:function () {
                                var ele = this,
                                    window = ele.up('window'),
                                    form = Ext.getCmp('addChildFrom').getForm(),
                                    formValues = form.getValues();
                                formValues.parent_id = record[0].data.id;
                                formValues.parent_code = record[0].data.code;
                                formValues.level_ = record[0].data.level_;
                                formValues.key_city = formValues.key_city=='on'?true:false;
                                if(form.isValid()){
                                    Ext.Ajax.request({
                                        url: 'addarea',
                                        jsonData: formValues,
                                        headers: {'Content-Type':'application/json'},
                                        method: 'POST',
                                        success: function (response, options) {
                                            var data = Ext.decode(response.responseText);
                                            if(data.code==200){
                                                window.close();
                                                me.getViewModel().get('gridstore').load();
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
                                var me = this,
                                    window = me.up('window');
                                window.close();
                            }
                        }
                    }
                ]
            }).show();
        }

    },
    addRoot:function () {//添加根目录
        var me = this,
            view = me.getView();
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加根城市',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 500,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'addRoot',
                defaults: {
                    // hideLabel: 'true'
                    labelWidth:80,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name:'id',
                        fieldLabel: '城市编码',
                        value: '',
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name:'name',
                        fieldLabel: '城市名称',
                        value: '',
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'key_city',
                        checked : false,
                        fieldLabel: '是否主要城市'
                    },
                    {
                        xtype: 'textfield',
                        name:'baidu_name',
                        fieldLabel: '百度编码'
                    },
                    {
                        xtype: 'textfield',
                        name:'c_order',
                        fieldLabel: '序号'
                    },
                    {
                        xtype: 'textfield',
                        name:'shortname',
                        fieldLabel: '城市简称',
                        value: ''
                    },
                    {
                        xtype: 'textfield',
                        name:'spell',
                        fieldLabel: '城市全拼',
                        value: ''
                    },
                    {
                        xtype: 'textfield',
                        name:'jianpin',
                        fieldLabel: '城市简拼',
                        value: ''
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners:{
                        click:function () {
                            var ele = this,
                                window = ele.up('window'),
                                form = Ext.getCmp('addRoot').getForm(),
                                formValues = form.getValues();
                            formValues.parent_id = null;
                            formValues.level_ = '1';
                            formValues.key_city = formValues.key_city=='on'?true:false;
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'addarea',
                                    headers: {'Content-Type':'application/json'},
                                    jsonData: formValues,
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.code==200){
                                            window.close();
                                            me.getCount();
                                            me.getViewModel().get('gridstore').load();
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
                            var me = this,
                                window = me.up('window');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    }
});