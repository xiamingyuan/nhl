/**
 * Created by apple on 2017/4/2.
 */
Ext.define('NhlApp.view.system.specialtydepartment.SpecialtyDepartmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system_specialtydepartment',

    render:function () {
        var me = this,
            view = me.getView(),
            store = view.getStore();
        me.level = [];
        me.getViewModel().get('gridstore').load();
        me.getCount();
        Ext.Ajax.request({//获取专业科室级别 用于levelRender
            url: 'leveldepartment',
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.level = data.data;
                }
            }
        });
    },
    levelRender:function (val) {//转换科室级别 1 2 3 -->一级 二级 三级
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
    getCount:function () {//获取专业科室一级数目
        var me = this;
        Ext.Ajax.request({
            url: 'getChildListDepartmentCount',
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
    delete:function (record) {//删除专业科室
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
            url: 'deletedepartment',
            params: {id:id},
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.getCount();
                    me.getViewModel().get('gridstore').load();
                    Ext.MessageBox.alert('提示', data.msg);
                }else{
                    Ext.MessageBox.alert('提示', data.msg);
                }
            }
        });
    },
    edit:function (record) {//编辑专业科室
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            record = vm.get('focusApplication');
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加根专业科室',
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
                        fieldLabel: '专业科室编码',
                        bind:{
                            value:'{editFrom.code}'
                        },
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '专业科室名称',
                        bind:{
                            value:'{editFrom.name}'
                        },
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '专业科室描述',
                        bind:{
                            value:'{editFrom.description}'
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
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'editdepartment',
                                    params: record.data,
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.code==200){
                                            window.close();
                                            me.getViewModel().get('gridstore').load();
                                            Ext.MessageBox.alert('提示', data.msg);
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
    addChild:function () {//添加专业科室
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore(),
            record = view.getSelectionModel().getSelection();
        console.log(record[0])
        if(record.length==0){
            Ext.MessageBox.alert('提示','请选择父级科室');
        }else{
            Ext.create('Ext.window.Window', {
                ghost:false,
                title: '添加子科室',
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
                            name:'code',
                            fieldLabel: '专业科室编码',
                            value: '',
                            msgTarget: 'side',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            name:'name',
                            fieldLabel: '专业科室名称',
                            value: '',
                            msgTarget: 'side',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            name:'description',
                            fieldLabel: '专业科室描述',
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
                                formValues.level_ = String(parseInt(record[0].data.level_) + 1);
                                if(form.isValid()){
                                    Ext.Ajax.request({
                                        url: 'adddepartment',
                                        params: formValues,
                                        method: 'POST',
                                        success: function (response, options) {
                                            var data = Ext.decode(response.responseText);
                                            if(data.code==200){
                                                window.close();
                                                formValues.leaf = true;
                                                store.getNodeById(record[0].data.id).appendChild(formValues);
                                                store.sync();
                                                me.getViewModel().get('gridstore').load();
                                                store.getNodeById(record[0].data.id).expand(false, false);
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
            title: '添加根专业科室',
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
                        name:'code',
                        fieldLabel: '专业科室编码',
                        value: '',
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name:'name',
                        fieldLabel: '专业科室名称',
                        value: '',
                        msgTarget: 'side',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name:'description',
                        fieldLabel: '专业科室描述',
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
                            if(form.isValid()){
                                Ext.Ajax.request({
                                    url: 'adddepartment',
                                    params: formValues,
                                    method: 'POST',
                                    success: function (response, options) {
                                       var data = Ext.decode(response.responseText);
                                        if(data.code==200){
                                            window.close();
                                            me.getCount();
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
                            var me = this,
                                window = me.up('window');
                            window.close();
                        }
                    }
                }
            ]
        }).show();
    }
    // addRoot:function (rm , record , index , eOpts) {
    //     var me = this,
    //         view = me.getView(),
    //         treePanle = view.down('treepanel'),
    //         store = treePanle.getStore();
    //     console.log(treePanle.getSelectionModel().getSelection())
    //     var node = treePanle.getSelectionModel().getSelection()[0];
    //     var pNode = node.parentNode;
    //     node.remove();
    //     console.log(pNode);
    //     var l = pNode.childNodes.length;
    //     console.log(l);
    //     if (l == 0) {
    //         pNode.data.leaf = true;
    //     }
    //     // treePanle.getSelectionModel().getSelection()[0].appendChild({
    //     //     name: '1234',
    //     //     text: '1234',
    //     //     leaf : true,
    //     //    mtype : 'City',
    //     //     id:'123456'
    //     // });
    //     // treePanle.getSelectionModel().select(store.getNodeById('123456'));
    // }
});