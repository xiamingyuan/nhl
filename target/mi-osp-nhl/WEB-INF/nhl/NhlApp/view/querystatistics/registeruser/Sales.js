/**
 * Created by apple on 2017/4/2.
 */

Ext.define('NhlApp.view.querystatistics.registeruser.Sales', {
    extend: 'Ext.data.Store',
    alias: 'store.sales',

    requires: [
        'NhlApp.view.querystatistics.registeruser.Sale'
    ],
    model: 'NhlApp.view.querystatistics.registeruser.Sale',
    data:[
        {
            id:         '123456789',
            company:    'company',
            country:    'country',
            person:     'xmy',
            date:       '2017',
            value:      '12.345',
            quantity:   '12.34'
        },
        {
            id:         '1234567893',
            company:    'company',
            country:    'country',
            person:     'xmy',
            date:       '2017',
            value:      '12.345',
            quantity:   '12.34'
        }
    ],

    // proxy: {
    //     // load using HTTP
    //     type: 'ajax',
    //     limitParam: null,
    //     url: 'getregisteruserslist?edate=2017-08&pageIndex=1&pageSize=25&qStatus=1&sdate=2017-01&tableOrderName=&tableOrderSort=',
    //     // the return will be JSON, so lets set up a reader
    //     reader: {
    //         type: 'json'
    //     }
    // },
    autoLoad: true
});