/**
 * Created by apple on 2017/3/28.
 */
Ext.define('NhlApp.view.user.userlist.userdetail.UserDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user_userdetail',
    data: {
        formModel:null
    },
    formulas: {
        isBlackF:function (get) {
            if(get('isBlack')==true){
                return '是';
            }else{
                return '否';
            }
        },
        ageF:function (get) {
            var v = get('birthday'),
                year=new Date().getFullYear();
            if(v){
                var b = Number(new Date(v).toLocaleString().substring(0,4));
                return year-b;
            }else{
                return "";
            }
        },
        birthdayF:function (get) {
            var v = get('birthday');
            if(v){
                var n = new Date(v);
                return Ext.Date.format(n, 'Y-m-d');
            }else{
                return "";
            }
        },
        genderF:function (get) {
            if(get('gender')=='OTHER'){
                return '未知';
            }else if(get('gender')=='MAN'){
                return '男';
            }else{
                return '女';
            }
        },
        avatarF:function (get) {
            if(get('avatar')==null){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + get('avatar') + "&userid=";
            }
        },
        registerTimeF: function (get) {
            var v = new Date(get('registerTime'));
            return Ext.Date.format(v, 'Y-m-d');
        }
    }
});