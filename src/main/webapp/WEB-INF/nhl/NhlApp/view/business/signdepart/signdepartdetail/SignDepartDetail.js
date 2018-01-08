/**
 * Created by apple on 2017/4/12.
 */
Ext.define('getpartnerlist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'hospName', type: 'string'},
        {name: 'deptName',  type: 'string'},
        {name: 'master', type: 'string'},
        {name: 'fromDctName', type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'},
        {name: 'approverName'},
        {name: 'approveTime',type: 'date',dateFormat : 'time'},
        {name: 'partnerApproverName'},
        {name: 'partnerApproveTime',type: 'date',dateFormat : 'time'},
        {name: 'status',type: 'string'}
    ]
});
Ext.define('departmentdoctor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'loginName', type: 'string'},
        {name: 'realName',  type: 'string'},
        {name: 'gender', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'createTime',type: 'date',dateFormat : 'time'},
        {name: 'master', type: 'bool'}
    ]
});
Ext.define("NhlApp.view.business.signdepart.signdepartdetail.SignDepartDetail", {
    extend: "Ext.panel.Panel",
    alias: 'widget.signdepartdetail',
    requires: [
        'NhlApp.view.business.signdepart.signdepartdetail.SignDepartDetailController',
        'NhlApp.view.business.signdepart.signdepartdetail.SignDepartDetailModel'
    ],
    controller: 'business_signdepartdetail',
    viewModel: {
        type: 'business_signdepartdetail'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：签约科室详情',
    bodyPadding: 10,
    scrollable: 'y',
    items: [
        {
            title: '基本信息',
            iconCls:'fa fa-table',
            xtype: 'form',
            cls:'detailsForm',
            margin: '0 0 10 0',
            layout: {
                type: 'table',
                columns: 8,
                tableAttrs: {　　//在这儿控制table标签中的Attrs属性
                    border: 0,
                    cellspacing: 1,
                    width: '100%',
                    align: 'center',
                    style: "border-collapse:collapse;margin:0 auto;"
                }
            },
            defaults: {
                xtype: 'label'
            },
            items: [{
                text: '科室：'
            }, {
                bind: '{departdetail.name}',
                colspan:2
            }, {
                text: '医院：'
            }, {
                bind: '{departdetail.base_hospital_name}',
                colspan: 2
            }, {
                text: 'logo：',
                rowspan: 2
            }, {
                xtype:'image',
                width: 40,
                height: 40,
                bind:{
                    src: '{logoF}'
                },
                rowspan: 2
            },{
                text: '管理员：'
            }, {
                bind: '{mastersF}',
                colspan: 2
            }, {
                text: '成立时间：'
            }, {
                bind: '{create_timeF}',
                colspan: 2
            },{
                text: '简介：'
            }, {
                bind: '{departdetail.description}',
                style: {
                    'max-height':'100px',
                    overflow: 'scroll',
                    display:'block'
                },
                colspan: 7
            }]
        },
        {
            title: '合作科室',
            id:'getpartnerlist',
            iconCls: 'fa fa-table',
            margin: '0 0 10 0',
            xtype:'grid',
            columnLines: true,
            style:{
                border:'1px solid #f6f6f6'
            },
            emptyText:'暂无数据',
            columns: [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },//创建序号
                { text: '医院', sortable: false, dataIndex: 'hospName', align: 'center', width:120 },
                { text: '科室名称', sortable: false, dataIndex: 'deptName', align: 'center', width:80 },
                { text: '管理员', sortable: false, dataIndex: 'master', align: 'center', flex: 1 },
                { text: '发起人', sortable: false, dataIndex: 'fromDctName', align: 'center', width:80 },
                { text: '发起时间', sortable: false, dataIndex: 'createTime',width:100, align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d')},
                { text: '本科室审批人', sortable: false, dataIndex: 'approverName', align: 'center', width:80,renderer:function (val) {
                    if(val){
                        return val.realName;
                    }else{
                        return '';
                    }
                } },
                { text: '本科室审批时间', sortable: false, dataIndex: 'approveTime',width:100, align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d') },
                { text: '合作科室审批人', sortable: false, dataIndex: 'partnerApproverName', align: 'center',width:80,renderer:function (val) {
                    if(val){
                        return val.realName;
                    }else{
                        return '';
                    }
                } },
                { text: '合作科室审批时间', sortable: false, dataIndex: 'partnerApproveTime',width:100, align: 'center', renderer:Ext.util.Format.dateRenderer('Y-m-d')},
                { text: '状态', sortable: false, dataIndex: 'status', align: 'center', flex: 1}
            ],
            store: Ext.create('Ext.data.Store', {
                model: 'getpartnerlist',
                proxy: {
                    type: 'ajax',
                    method:'GET',
                    extraParams: {
                        id: ''
                    },
                    url: 'getpartnerlist',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),
            // buttons:[
            //     '->',
            //     {
            //         text: '新增科室'
            //     }
            // ]
        },
        {
            title: '科室成员',
            iconCls: 'fa fa-table',
            margin: '0 0 10 0',
            xtype:'grid',
            id:'departmentDoctor',
            columnLines: true,
            style:{
                border:'1px solid #f6f6f6'
            },
            emptyText:'暂无数据',
            columns: [
                { text: '序号', xtype: 'rownumberer', align: 'center', width: 40 },//创建序号
                { text: '用户名', sortable: false, dataIndex: 'loginName', align: 'center', flex: 1 },
                { text: '姓名', sortable: false, dataIndex: 'realName', align: 'center', flex: 1 },
                { text: '性别', sortable: false, dataIndex: 'gender', align: 'center', width:50 ,renderer:function (val) {
                    if(val=='OTHER'){
                        return '';
                    }else if(val=='WOMEN'){
                        return '女';
                    }else{
                        return '男';
                    }
                }},
                { text: '职称', sortable: false, dataIndex: 'title', align: 'center', flex: 1,renderer:'titleRender'},
                { text: '时间', sortable: false, dataIndex: 'createTime', align: 'center', flex: 1 ,renderer:Ext.util.Format.dateRenderer('Y-m-d H:i')},
                { text: '是否管理员', sortable: false, dataIndex: 'master',align: 'center', flex: 1 ,renderer:function (val) {
                    if(val==true){
                        return "<a  href='javascript:void(0);' class='fa fa-check-square-o'>&nbsp</a>"
                    }else{
                        return ""
                    }
                }},
                { text: '操作',sortable: false, width: 80,align:'center', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
                    if(record.data.master==true){
                        return "<a href='javascript:void(0);' class='cancelMaster fa fa-hand-o-right'>取消管理</a> "
                    }else{
                        return "<a href='javascript:void(0);' class='setMaster fa fa-hand-o-right'>指定管理</a> "
                    }
                }}
            ],
            store: Ext.create('Ext.data.Store', {
                model: 'departmentdoctor',
                proxy: {
                    type: 'ajax',
                    method:'GET',
                    extraParams: {
                        id: ''
                    },
                    url: 'querydepartmenthasdoctorinfo',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),
            buttons:[
                '->',
                {
                    text: '新增成员',
                    handler: 'newMember'
                },
                {
                    text: '添加成员',
                    handler: 'addMember'
                }
            ],
            listeners: {
                cellclick:'mastercellclick'
            }
        }
    ],
    buttons: [
        '->',
        {
            text: '返回',
            handler: 'back'
        }
    ],
    listeners: {
        afterrender:'afterrender',
        beforerender:'beforerender'
    }
});