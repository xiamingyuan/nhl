/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.store.member.membercard.MemberCardDetail', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_member_membercarddetail',
    model: 'NhlApp.model.member.membercard.MemberCardDetail',
    autoLoad: true,
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.member.membercard.MemberCardDetail'
    ],

    data:[
        {
            "realName":"15601223635",
            "mobilePhone":"15601223635",
            "loginName":"张三",
            "gender":"OTHER",
            "birthday":null,
            "idnumber":'411081199206106019',
            "createtime":1489369734000
        }
    ]
    // proxy: {
    //     type: 'ajax',
    //     // url: 'getmemberlist',
    //
    //     method: 'GET',
    //     extraParams: {
    //         queryKey: "",
    //         sdate: "",
    //         edate: ""
    //     },
    //     reader: {
    //         type: 'json',
    //         rootProperty: 'data.datas',//返回数据字段
    //         totalProperty : 'data.totalCount'
    //     }
    // },
    //排序
    // sorters: [{
    //     property: 'default',
    //     direction: 'default'
    // }],
});