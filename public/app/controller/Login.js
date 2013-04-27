Ext.define('Fob.controller.Login', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'loginWindow',
        selector: 'loginwindow'
    },{
        ref: 'passwordField',
        selector: 'loginwindow textfield#passwd'
    },{
        ref: 'loginButton',
        selector: 'loginwindow button#login'
    },{
        ref: 'viewport',
        selector: 'viewport'
    }],

    init: function () {
        var me = this;

        this.control({
            'loginwindow textfield#passwd': {
                render: me.onPasswordFieldRender,
                specialkey: me.onPasswordFieldSpecialkey
            },
            'loginwindow button#login': {
                click: me.onLoginButtonClick
            }
        });
    },

    onPasswordFieldRender: function (f) {
        f.focus(false, 20);
    },

    onPasswordFieldSpecialkey: function (f, e) {
        var me = this,
            loginButton = me.getLoginButton();

        if (e.getKey() === e.ENTER) {
            loginButton.fireEvent('click', loginButton);
        }
    },

    onLoginButtonClick: function (btn) {
        var me = this,
            login = me.getLoginWindow(),
            panel = login.down('form'),
            form = panel.getForm(),
            values = form.getValues(),
            viewport = me.getViewport();

        // set our token
        // it will get salted and hashed, stored in private var
        var api = Ext.ux.data.Encryption.api;
        api.setToken(values['password']);
        // set the prototype api, all proxies will use same token
        Ext.ux.data.proxy.EncryptedLocalStorage.api = api;

        // NOTE: auth lookup to localStorage
        var auth = window.localStorage.getItem('auth');
        if (auth) {
            // check password.
            if (api.decrypt(auth) === 'foobar') {
                Ext.Msg.alert('User Message', 'Welcome Back!');
            }
            else {
                form.reset();
                Ext.Msg.alert('User Message', 'Wrong Password!', function() {
                    me.getPasswordField().focus(false,20);
                });
                return; // bail out
            }

        }   else {
            window.localStorage.setItem('auth', api.encrypt('foobar'));
            Ext.Msg.alert('User Message', 'Welcome New User!');
        }

        // close this window
        login.close();

        // display our home panel
        viewport.removeAll();
        viewport.add({
            xtype: 'notespanel'
        });
    }
});