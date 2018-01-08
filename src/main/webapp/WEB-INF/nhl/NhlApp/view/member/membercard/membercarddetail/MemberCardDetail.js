/**
 * Created by apple on 2017/4/1.
 */
Ext.define("NhlApp.view.member.membercard.membercarddetail.MemberCardDetail", {
    extend: "Ext.tab.Panel",
    alias: 'widget.member_membercarddetail',
    requires: [
        'NhlApp.view.member.membercard.membercarddetail.MemberCardDetailController',
        'NhlApp.view.member.membercard.membercarddetail.MemberCardDetailModel'
    ],
    controller: 'member_membercarddetail',
    viewModel: {
        type: 'member_membercarddetail'
    },
    width : '100%',
    iconCls:"fa fa-home",
    title: '当前位置：会员卡管理详情',
    items: [
        {
            title: '持卡人基础信息',
            xtype: 'panel',
            layout:'fit',
            items:[
                {
                    xtype:'cisgrid',
                    isPage:true,//是否需要分页,
                    multiColumnSort:false,
                    startRowGroupsCollapsed: false,
                    bind: {
                        store: '{gridstore}'
                    },
                    columns : [
                        { text: '序号', xtype: 'rownumberer', align: 'center', width: 50,height:30 },//创建序号
                        { text: '用户名',width: 100, dataIndex: 'loginName', align: 'center'},
                        { text: '姓名',width: 80, dataIndex: 'realName', align: 'center' },
                        { text: '性别',width: 50, dataIndex: 'gender', align: 'center' ,renderer:function (val) {//转换性别
                            if(val=='OTHER'){
                                return '未知';
                            }else if(val=='WOMEN'){
                                return '女';
                            }else{
                                return '男';
                            }
                        }},
                        { text: '身份证号',flex:1, dataIndex: 'idnumber', align: 'center' ,renderer:function (val) {
                            if (val == null) return '';
                            if (val.length > 7) {
                                var ss = val.substring(3, val.length - 4);
                                return val.substring(0, 3) + ss.replace(/\w/g, '*') + val.substring(3 + ss.length, val.length);
                            }
                            else if (val.length <= 7) {
                                var ss = val.substring(3, val.length);
                                return val.substring(0, 3) + ss.replace(/\w/g, '*');
                            }
                        }},
                        { text: '手机号码',width: 80, dataIndex: 'mobilePhone', align: 'center' },
                        { text: '出生日期',width: 140, dataIndex: 'birthday', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') },
                        { text: '注册日期',width: 140, dataIndex: 'registerTime', align: 'center',renderer:Ext.util.Format.dateRenderer('Y-m-d H:i') }
                    ],
                    buttons: [
                        '->',
                        {
                            text: '返回',
                            handler: 'back'
                        }
                    ]
                }
            ]
        }
    ]
});