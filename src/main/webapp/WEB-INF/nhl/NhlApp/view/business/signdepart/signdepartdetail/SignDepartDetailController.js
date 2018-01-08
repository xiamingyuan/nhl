/**
 * Created by apple on 2017/4/12.
 */
Ext.define('memberlist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName',type: 'string'},
        {name: 'realName', type: 'string'},
        {name: 'nickName', type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'birthday', type: 'date',dateFormat : 'time'},
        {name: 'registerTime',type: 'date',dateFormat : 'time'}
    ]
});
Ext.define('NhlApp.view.business.signdepart.signdepartdetail.SignDepartDetailController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'NhlApp.store.user.userlist.UserList'
    ],
    alias: 'controller.business_signdepartdetail',
    afterrender:function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            token = Ext.History.getToken(),
            departId = token.split("?")[1];
        var departmentDoctorStore = Ext.getCmp('departmentDoctor').getStore();
        var getpartnerlist = Ext.getCmp('getpartnerlist').getStore();
        departmentDoctorStore.getProxy().extraParams.id = departId;
        getpartnerlist.getProxy().extraParams.id = departId;
        departmentDoctorStore.load();
        getpartnerlist.load();
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
    beforerender:function () {
        var me = this;
            me.level = [];
        Ext.Ajax.request({//获取职称级别 用于titleRender
            url: 'leveltitle',
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    me.level = data.data;
                }
            }
        });
    },
    titleRender:function (val) {//转换职称
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
    },
    mastercellclick:function (ele , td , cellIndex , record , tr , rowIndex , e , eOpts) {
        var me = this,
            view = me.getView(),
            ele = Ext.get(e.getTarget());
        if(ele.hasCls('cancelMaster')){
            me.cancelMaster(record.getId());
        }else if(ele.hasCls('setMaster')){
            me.setMaster(record.getId());
        }
    },
    cancelMaster:function (id) {//取消管理
        var me = this,
            token = Ext.History.getToken(),
            departId = token.split("?")[1],
            departmentDoctorStore = Ext.getCmp('departmentDoctor').getStore();
        Ext.Ajax.request({
            url: 'cancelmdepartmentmaster',
            params: {
                doctorId:id,
                departmentId:departId
            },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    Ext.MessageBox.alert('提示',data.msg);
                    departmentDoctorStore.load();
                }
            }
        });
    },
    setMaster:function (id) {//指定管理
        var me = this,
            token = Ext.History.getToken(),
            departId = token.split("?")[1],
            departmentDoctorStore = Ext.getCmp('departmentDoctor').getStore();
        Ext.Ajax.request({
            url: 'setdoctormdepartmaster',
            params: {
                doctorId:id,
                departmentId:departId
            },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if(data.code==200){
                    Ext.MessageBox.alert('提示',data.msg);
                    departmentDoctorStore.load();
                }
            }
        });
    },
    newMember:function () {
        var me = this;
        me.idList = [];
        var AllSelectedRecords = [];
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '新增成员',
            resizable: false,
            modal: true,
            width: 800,
            height: 500,
            layout: 'fit',
            scrollable: 'y',
            items: {
                xtype:'cisgrid',
                id:'addMemberGrid',
                columnLines: true,
                isPage:true,//需要分页
                store: Ext.create('Ext.data.Store', {
                    model: 'memberlist',
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
                            //根据全局的选择，初始化选中的列
                            var selModel = Ext.getCmp('addMemberGrid').getSelectionModel();
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
                    checkOnly:true,//为true 选中行不打勾
                    listeners: {
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
                        id:'querykey',
                        xtype: 'textfield',
                        fieldLabel: '名称',
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
                    }]
                },
                columns : [
                    { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
                    { text: '用户名',width: 100, dataIndex: 'loginName',align:'center'},
                    { text: '姓名',width: 100, dataIndex: 'realName', align: 'center' },
                    { text: '昵称',flex:1,minWidth:60, dataIndex: 'nickName', align: 'center' },
                    { text: '性别',width: 50, dataIndex: 'gender', align: 'center' ,renderer:function (val) {//转换性别
                        if(val=='OTHER'){
                            return '';
                        }else if(val=='WOMEN'){
                            return '女';
                        }else{
                            return '男';
                        }
                    }},
                    { text: '出生日期',width: 100, dataIndex: 'birthday', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d') },
                    { text: '注册时间',width: 140, dataIndex: 'registerTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') }

                ],
                buttons: [
                    {
                        text: '保存',
                        formBind: true,
                        listeners: {
                            click:function () {
                                var ele = this,
                                    token = Ext.History.getToken(),
                                    departId = token.split("?")[1],
                                    departmentDoctorStore = Ext.getCmp('departmentDoctor').getStore(),
                                    ids;
                                if(me.idList.length>0){
                                    ids = me.idList.join(',');
                                    Ext.Ajax.request({
                                        url: 'adddepartmentdoctors/'+departId,
                                        params:{
                                            doctorIds:ids
                                        },
                                        method: 'GET',
                                        success: function (response, options) {
                                            var data = Ext.decode(response.responseText);
                                            if(data.code==200){
                                                Ext.MessageBox.alert('提示',data.msg);
                                                ele.up('window').close();
                                                departmentDoctorStore.load();
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
                ],
                listeners:{
                    afterrender:function () {
                        var me = this,
                            store = me.getStore();
                        store.loadPage(1);
                    }
                }
            }
        }).show();
    },
    addMember:function () {
        Ext.create('Ext.window.Window', {
            ghost:false,
            title: '添加成员',
            id:'addMemberWin',
            resizable: false,
            draggable:true,
            modal: true,
            bodyPadding:'20 30',
            width: 560,
            layout: 'fit',
            items: {
                xtype: 'form',
                id:'addMemberForm',
                defaults:{
                    labelWidth:60,
                    margin:'0 0 12',
                    anchor:'100%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '手机号',
                        name: 'loginName',
                        msgTarget: 'under',
                        blankText : "手机号不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '姓名',
                        name: 'realName',
                        msgTarget: 'under',
                        blankText : "姓名不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'radiogroup',
                        id:'gender',
                        columns: 6,
                        fieldLabel: '性别',
                        defaults: {
                            name: 'gender'
                        },
                        // bind: {
                        //     value: '{editUser.gender}'
                        // },
                        items: [
                            {boxLabel: '男', inputValue:1, checked:true},
                            {boxLabel: '女',  inputValue:2}
                        ]
                    },
                    {
                        width: 170,
                        xtype: 'datefield',
                        format: 'Y-m-d',
                        fieldLabel: '出生日期',
                        name: 'birthday',
                        msgTarget: 'under',
                        blankText : "出生日期不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',//默认填充 可修改
                        fieldLabel: '医院',
                        name: 'hospitalName',
                        msgTarget: 'under',
                        blankText : "医院不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '科室',
                        name: 'hospitalDepartName',
                        msgTarget: 'under',
                        blankText : "科室不能为空！",
                        allowBlank: false
                    },
                    {
                        xtype: 'combobox',
                        name:'title',
                        fieldLabel: '职称',
                        editable:false,//不可编辑
                        blankText : "职称不能为空！",
                        allowBlank: false,
                        emptyText: "--请选择--",
                        store:Ext.create('Ext.data.Store', {
                            fields: ['itemvalue', 'itemname'],
                            proxy: {
                                type: 'ajax',
                                method:'GET',
                                url: 'leveltitle',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data'
                                }
                            },
                            autoLoad: true
                        }),
                        displayField: 'itemname',
                        valueField: 'itemvalue'
                    },
                    {
                        xtype: 'textareafield',
                        fieldLabel: '简介',
                        name: 'introduction',
                        height: 80
                    },
                    {
                        xtype: 'textareafield',
                        fieldLabel: '擅长',
                        name: 'specialty',
                        height: 80
                    }
                ]
            },
            buttons: [
                {
                    text: '保存',
                    formBind: true,
                    listeners: {
                        click:function () {
                            var ele = this,
                                form = Ext.getCmp('addMemberForm').getForm(),
                                token = Ext.History.getToken(),
                                departId = token.split("?")[1],
                                departmentDoctorStore = Ext.getCmp('departmentDoctor').getStore();
                            if(form.isValid()){
                                var v = form.getValues();
                                Ext.Ajax.request({
                                    url: 'addmdepartmentdoctor/'+departId,
                                    jsonData:v,
                                    method: 'POST',
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if(data.code==200){
                                            Ext.MessageBox.alert('提示',data.msg);
                                            ele.up('window').close();
                                            departmentDoctorStore.load();
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
    back:function () {
        Ext.History.back();
    }
});