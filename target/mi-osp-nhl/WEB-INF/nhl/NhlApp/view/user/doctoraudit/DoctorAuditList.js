/**
 * Created by localadmin on 17/3/29.
 */
Ext.define("NhlApp.view.user.doctoraudit.DoctorAuditList", {
    extend: "Nhl.base.Grid",
    alias: 'widget.doctoraudit',
    requires: [
        'NhlApp.view.user.doctoraudit.DoctorAuditListController',
        'NhlApp.view.user.doctoraudit.DoctorAuditListModel'
    ],
    controller: 'user_doctoraudit',
    viewModel: {
        type:'user_doctoraudit'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 医生审核',
    selModel:{
        selType : 'checkboxmodel',
        injectCheckbox:1,//checkbox位于哪一列，默认值为0
        mode:'multi',//multi,simple,single；默认为多选multi
        checkOnly:true,//如果值为true，则只用点击checkbox列才能选中此条记录
        allowDeselect:true,//如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
        enableKeyNav:false,
        renderer:function (value , metaData , record , rowIndex , colIndex , store , view) {
            if(record.get('authenstatus')!=0){
                return '';
            }else{
                return  '<div class="x-grid-row-checker">&#160;</div>';//显示checkbox
            }
         },
        listeners: {
            beforeselect :function( ele , record , index , eOpts ){
                if(record.get('authenstatus')!=0){
                    return false;
                }
            },
            select:'select',
            deselect:'deselect'
        }
    },
    multiColumnSort:false,
    isPage:true,//是否需要分页,
    border:true,
    bind: {
        store: '{gridstore}'
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
            id:"loginName",
            labelWidth: 40,
            width: 140,
            xtype: 'textfield',
            fieldLabel: '手机号',
            bind: '{searchModel.loginname}',
            enableKeyEvents:true
        },{
            id:"realname",
            labelWidth: 30,
            width: 130,
            xtype: 'textfield',
            fieldLabel: '姓名',
            bind: '{searchModel.realname}',
            enableKeyEvents:true
        },{
            id:"hospital",
            labelWidth: 55,
            width: 155,
            xtype: 'textfield',
            fieldLabel: '所属医院',
            bind: '{searchModel.hospital}',
            enableKeyEvents:true
        },{
            xtype: 'combo',
            id:"authenstatus",
            name:"authenstatus",
            labelWidth: 55,
            fieldLabel: '审核状态',
            width: 155,
            editable:false,//不可编辑
            store:Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data : [
                    {"value":"", "name":"全部"},
                    {"value":"0", "name":"待审核"},
                    {"value":"1", "name":"审核中"},
                    {"value":"2", "name":"审核通过"},
                    {"value":"3", "name":"审核拒绝"}
                ]
            }),
            displayField: 'name',
            valueField: 'value',
            listeners: {
                afterRender: function(combo) {
                    combo.setValue('');//同时下拉框会将与name为firstValue值对应的 text显示
                }
            },
            bind: '{searchModel.authenstatus}'
        }, {
            text: '查询',
            listeners:{
                click: 'filter'
            }
        }, {
            xtype: 'displayfield',
            hidden:!permission.doctorauditDeal,
            hideLable:true,
            bind:"共有{unCertCount}人未审核，本次提取"
        }, {
            xtype: 'numberfield',
            hidden:!permission.doctorauditDeal,
            id : 'CertCount',
            hideLable:true,
            editable:false,//不可编辑
            width:40,
            // value: 5,
            bind:'{CertCount}',
            minValue: 0,
            maxValue: 10,
            listeners:{
                change:'CertCountChange'
            }
        }, {
            xtype:'button',
            hidden:!permission.doctorauditDeal,
            text: '提取',
            bind:{
                disabled:'{unCertCountF}'
            },
            listeners:{
                click:'getextract'
            }
        }, {
            xtype:'button',
            hidden:!permission.doctorauditDeal,
            id:'taskNum',
            bind:{
                text:"任务({taskNum})",
                disabled:'{taskNumF}'
            },
            listeners:{
                click:'jumphandle'
            }
        }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
        { text: '手机号',width: 100, dataIndex: 'loginname',align:'center',renderer:function (val) {
            return "<a href='javascript:void(0);' class='detail'>"+val+"</a> "
        }},
        { text: '姓名',width: 100, dataIndex: 'doctor_RealName', align: 'center' },
        { text: '性别',width: 50, dataIndex: 'doctor_Gender', align: 'center' ,renderer:function (val) {//转换性别
            if(val=='1'){
                return '男';
            }else if(val=='2'){
                return '女';
            }
        }},
        { text: '年龄',width: 50, dataIndex: 'doctor_Age', align: 'center' ,renderer:function (val,cellmeta,record) {//计算年龄
            var birthday = record.data.doctor_Birthday,
                year=new Date().getFullYear();
            if(birthday){
                var b = Number(new Date(birthday).toLocaleString().substring(0,4));
                return year-b;
            }else{
                return "";
            }
        }},
        { text: '医院',minWidth: 100,flex:1, dataIndex: 'doctor_Hospital_Name', align: 'center' },
        { text: '科室',width: 140, dataIndex: 'doctor_Depart_Name', align: 'center' },
        { text: '审核状态',width: 140, dataIndex: 'authenstatus', align: 'center',renderer:function (val) {
            if (val == "0") {
                return "待审核";
            } else if (val == "1") {
                return "审核中";
            } else if (val == "2") {
                return "审核通过";
            } else if (val == "3") {
                return "审核拒绝";
            } else {
                return "";
            }
        } },
        { text: '审核人',width: 80, dataIndex: 'auditor', align: 'center'},
        { text: '申请时间',width: 140, dataIndex: 'createTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
        { text: '操作',sortable: false, menuDisabled:true, width: 55,align:'center', renderer:function(val){
            if(permission.doctorauditDetail){
                return "<a href='javascript:void(0);' class='detail fa fa-file-text-o'>详情</a> "
            }else {
                return "";
            }
        }}
    ],
    listeners: {
        cellclick: 'cellclick',
        afterrender:'afterrender'
    }
});
