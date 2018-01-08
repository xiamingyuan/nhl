/**
 * Created by apple on 2017/3/27.
 */
Ext.define('NhlApp.view.user.userlist.UserListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_userlist',
    requires: [
        'NhlApp.view.user.userlist.UserListController',
        'NhlApp.store.user.userlist.UserList'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'nhlapp_user_userlist'
        }
    },
    data: {
        focusApplication: null,
        permission:{
            detail:true
        },
        searchModel:{
            loginName: '',
            idNumber: '',
            sdate: '',
            edate: ''
        }
    }
});