/**
 * Created by apple on 2017/4/13.
 */
Ext.define('NhlApp.view.business.signdepart.signdepartdetail.SignDepartDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.business_signdepartdetail',
    requires: [
        'NhlApp.view.business.signdepart.signdepartdetail.SignDepartDetailController'
    ],
    stores: {
        gridstore: {

        }
    },
    data: {
        departdetail:null
    },
    formulas: {
        create_timeF: function (get) {
            var v = get('departdetail.create_time');
            if(v){
                var d = new Date(v);
                return Ext.Date.format(d, 'Y-m-d');
            }else{
                return "";
            }

        },
        mastersF: function (get) {
            var v = get('departdetail.masters'),
                res = '';
            if(v.length>0){
                for(var i=0;i<v.length;i++){
                    res+=v[i].realName+","
                }
                return res.substring(0,res.length-1);
            }else{
                return '暂无管理员';
            }
        },
        logoF:function (get) {
            var v = get('departdetail.url');
            if(v==null||v==''){
                return "image/nopic.gif";
            }else{
                return "downloadfile?dfsFile=" + v + "&userid=";
            }
        }
    }
});