/**
 * Created by apple on 2017/5/4.
 */
Ext.define("NhlApp.view.business.famousdoctor.FamousDoctor", {
    extend: "Nhl.base.Grid",
    alias: 'widget.famousdoctor',
    requires: [
        'NhlApp.view.business.famousdoctor.FamousDoctorController',
        'NhlApp.view.business.famousdoctor.FamousDoctorModel'
    ],
    controller: 'business_famousdoctor',
    viewModel: {
        type:'business_famousdoctor'
    },
    width : '100%',
    id:'famousdoctor',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 名医管理',
    multiColumnSort:false,
    isPage:true,//是否需要分页,
    style: {
        border:'1px solid #f6f6f6'
    },
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
            margin: '0 10 0 0',
            labelWidth: 30,
            width: 180,
            xtype: 'textfield'
        },
        items: [
            {
                fieldLabel: '疾病',
                bind: '{searchModel.disease}'
            },{
                fieldLabel: '医生',
                width: 130,
                bind: '{searchModel.doctor}'
            },{
                fieldLabel: '医院',
                bind: '{searchModel.hospital}'
            }, {
                xtype: 'button',
                width: 45,
                text: '查询',
                listeners:{
                    click: 'filter'
                }
            }, {
                xtype:'button',
                width: 45,
                text: '添加',
                listeners:{
                    click: 'addfamousdoctor'
                }
            }]
    },
    columns : [
        { text: '序号', xtype: 'rownumberer', align: 'center', width: 40,height:30 },//创建序号
        { text: '疾病',sortable: false,width: 200, dataIndex: 'disease_name'},
        { text: '医生',sortable: false,width: 160,align: 'center', dataIndex: 'doctor_name'},
        { text: '职称',sortable: false,width: 160,align: 'center', dataIndex: 'doctor_title',renderer:'titleRender'},
        { text: '医院',sortable: false,flex:1, dataIndex: 'doctor_hospital'},
        { text: '操作',sortable: false,menuDisabled:true, width: 140,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            var del = "<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>";
            var up = "<a  href='javascript:void(0);' class='up fa fa-arrow-up'>上移</a>";
            var down = "<a  href='javascript:void(0);' class='down fa fa-arrow-down'>下移</a>";
            return del+ "&nbsp|&nbsp"+up+ "&nbsp|&nbsp"+down;
        }}
    ],
    listeners: {
        cellclick:'cellclick',
        beforerender:'beforerender',
        afterrender:'afterrender'
    }
});