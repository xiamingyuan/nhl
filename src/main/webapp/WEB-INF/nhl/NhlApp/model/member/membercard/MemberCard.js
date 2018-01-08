/**
 * Created by apple on 2017/4/1.
 */
Ext.define('NhlApp.model.member.membercard.MemberCard', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',type: 'string'},
        {name: 'cardName', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'memberName', type: 'string'},
        {name: 'memberRealName', type: 'string'}
    ],
    validators: {
    }
});