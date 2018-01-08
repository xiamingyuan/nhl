/**
 * Created by apple on 2017/3/20.
 */
Ext.define('NhlApp.view.sys.changepassword.ChangePasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChangePassword',
    cancleChange:function () {
        var win = Ext.WindowMgr.get('changePwdWin');//获取修改密码的窗口
        win.close();
    },
    sureChange:function () {
        var form = Ext.getCmp('ChangePasswordForm');
        var win = Ext.WindowMgr.get('changePwdWin');//获取修改密码的窗口
        if(form.getForm().isValid()){
            form.getForm().submit({
                url:'uum',
                method:'GET',
                waitMsg:'正在修改密码',
                waitTitle:"请等候。。。",
                params:{name:Ext.getDom("userName").value},
                // success:function () {
                //     win.close();
                //     Ext.Msg.alert('温馨提示', '密码修改成功!');
                // },
                failure:function (fp, o) {
                    win.close();
                    if(o.response.status==200){
                        Ext.Msg.alert('温馨提示', '密码修改成功!');
                    }else{
                        Ext.Msg.alert('温馨提示', '服务器内部错误!');
                    }

                }
            });
        }
    },
    resetChange:function () {
        Ext.getCmp('ChangePasswordForm').getForm().reset();//重置修改密码的form表单
    }
});