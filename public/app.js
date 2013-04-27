Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Fob': 'app',
        'Ext.ux': '../../src'
    }
});

Ext.require([
    'Ext.ux.data.Encryption',
    'Ext.ux.data.proxy.EncryptedLocalStorage'
]);

Ext.application({
    controllers: ['Login', 'Notes'],
    name: 'Fob',

    launch: function () {
        var me = this;

        Ext.create('Ext.container.Viewport', {
            autoShow: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            margin: 10,
            items: [{
                html: 'Hello World!'
            }],
            listeners: {
                render: function (cmp) {
                    Ext.create('Fob.view.Login');
                }
            }
        });
    }

});