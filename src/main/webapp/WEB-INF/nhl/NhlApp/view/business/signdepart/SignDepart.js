/**
 * Created by apple on 2017/4/12.
 */
Ext.define("NhlApp.view.business.signdepart.SignDepart", {
    extend: "Nhl.base.Grid",
    alias: 'widget.signdepart',
    requires: [
        'NhlApp.view.business.signdepart.SignDepartController',
        'NhlApp.view.business.signdepart.SignDepartModel'
    ],
    controller: 'business_signdepart',
    viewModel: {
        type:'business_signdepart'
    },
    width : '100%',
    columnLines: true,
    iconCls:'fa fa-home',
    title: '当前位置 : 签约科室',
    multiColumnSort:false,
    isPage:true,//是否需要分页,
    style: {
        border:'1px solid #f6f6f6'
    },
    bind: {
        store: '{gridstore}',
        // selection: '{focusApplication}'
    },
    tbar: {
        xtype: 'toolbar',
        id:'searchForm',
        padding: 5,
        height:38,
        width: '100%',
        defaults: {
            labelAlign: 'right',
            margin: '0 10 0 0',
            labelWidth: 55,
            width: 155,
            xtype: 'textfield'
        },
        items: [
            {
                fieldLabel: '签约科室',
                enableKeyEvents:true,
                bind: '{searchModel.signdepart}'
            },{
                fieldLabel: '医院名称',
                enableKeyEvents:true,
                bind: '{searchModel.hospital}'
            },{
                fieldLabel: '科室名称',
                enableKeyEvents:true,
                bind: '{searchModel.department}'
            },{
                labelWidth: 40,
                width: 140,
                fieldLabel: '管理员',
                enableKeyEvents:true,
                bind: '{searchModel.master}'
            }, {
                xtype: 'button',
                width: 45,
                text: '查询',
                listeners:{
                    click: 'filter'
                }
            }, {
                xtype:'permissionbutton',
                permission:'signdepartAdd',
                width: 45,
                text: '添加',
                listeners:{
                    click: 'addsigndepart'
            }
        }]
    },
    columns : [
        { text: '图标',width: 50,height:30, dataIndex: 'url', align: 'center',renderer:function (val) {
            val = val==""?"image/nopic.gif":"downloadfile?dfsFile=" + val + "&userid=";
            return "<img src="+val+" width='20' height='20'>";
        }},
        { text: '科室名称',width: 100, dataIndex: 'name'},
        { text: '医院',width: 200, dataIndex: 'base_hospital_name'},
        // { text: '科室',width: 100, dataIndex: 'base_hospital_depart_name' },
        { text: '管理员',width: 160, dataIndex: 'masters',renderer:function (val) {
            if(val.length>0){
               var d = "";
                for(i=0;i<val.length;i++){
                    d+=val[i].realName+","
                }
                return d.substring(0,d.length-1)
            } else{
                return "";
            }

            // return val.length
        } },
        { text: '成员',width: 40, dataIndex: 'membersCount', align: 'center' },
        { text: '简介',flex:'1',minWidth:'60', dataIndex: 'description'},
        { text: '操作',sortable: false, menuDisabled:true, width: 180,align:'left', renderer:function(val,cellmeta,record,rowIndex,columnIndex,store){
            var detail,edit,del,disease;
            detail = permission.signdepartDetail?"<a href='javascript:void(0);' class='detail fa fa-file-text-o'>详情</a> "+ "&nbsp|&nbsp":"";
            edit = permission.signdepartEdit?"<a  href='javascript:void(0);' class='edit fa fa-edit'>编辑</a>"+ "&nbsp|&nbsp":"";
            del = permission.signdepartDelete?"<a  href='javascript:void(0);' class='delete fa fa-trash-o'>删除</a>"+"&nbsp|&nbsp":"";
            disease = /*permission.signdepartDisease?*/"<a  href='javascript:void(0);' class='disease fa fa-heartbeat'>疾病</a>"/*:""*/;
            return  detail+ edit+ del+disease
        }}
    ],
    listeners: {
        cellclick:'cellclick'
    }
});