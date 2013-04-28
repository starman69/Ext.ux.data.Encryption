Ext.define('Fob.view.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.loginwindow',

    title: 'Demo Login',
    autoShow: true,
    layout: 'fit',
    modal: true,
    resizable: false,
    closable: false,

    initComponent: function () {
        var me = this;

        me.items = [{
            xtype: 'form',
            items: [{
                xtype: 'fieldset',
                margin: 10,
                border: false,
                items: [{
                    xtype: 'textfield',
                    name: 'password',
                    itemId: 'passwd',
                    inputType: 'password',
                    fieldLabel: 'Password'
                }]
            }],
            buttons: [{
                text: 'Login',
                itemId: 'login'
            }]
        }];

        me.callParent(arguments);
    }
});
