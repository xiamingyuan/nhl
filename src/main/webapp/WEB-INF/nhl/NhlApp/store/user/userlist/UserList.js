/**
 * Created by apple on 2017/3/27.
 */
Ext.define('NhlApp.store.user.userlist.UserList', {
    extend: 'Ext.data.Store',
    alias: 'store.nhlapp_user_userlist',
    model: 'NhlApp.model.user.userlist.UserList',
    remoteSort: true,//服务端排序必须参数
    requires: [
        'NhlApp.model.user.userlist.UserList'
    ],
    proxy: {
        type: 'ajax',
        url: 'getuserlist',
        method: 'GET',
        extraParams: {
            loginName: "",
            idNumber: "",
            sdate: "",
            edate: ""
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
        load:function (ele , records , successful , eOpts) {

        }
    }
});