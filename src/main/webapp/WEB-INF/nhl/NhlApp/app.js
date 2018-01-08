/**
 * Created by apple on 2017/3/27.
 */
Ext.application({
    name: 'NhlApp',
    appFolder: 'NhlApp',
    // extend: 'Uum.BaseApp',
    // enabled: true,
    // requires: [
    //     // 'Uum.BaseApp',
    //     'Ext.window.MessageBox'
    // ],
    autoCreateViewport: 'NhlApp.view.main.Main',
    launch: function () {
        // Ext.tip.QuickTipManager.init();
        // application = this;
        //
        // application.globalMask = new Ext.LoadMask({
        //     msg: 'AppConfig.maskHtml',
        //     style: {
        //         backgroundColor: 'rgba(255, 255, 255, 0.5);'
        //     },
        //     border: false,
        //     target: application.getMainView()
        // });
        //
        // document.getElementById('start_main').style.display = "none";

    }
});
Ext.Ajax.on('requestcomplete', function(conn,response,options){
    var msg = response.responseText;
    if(msg.indexOf('bd340160-2b41-11e7-9369-1866daf4eab0')>=0){
        window.location.reload();
    }
    // if(response..getAllResponseHeaders()  )
    // window.location.href=location.origin+'/';
});