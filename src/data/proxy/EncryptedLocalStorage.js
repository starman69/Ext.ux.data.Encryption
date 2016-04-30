/**
 * Proxy that can use encryption capabilities for localStorage
 */
Ext.define('Ext.ux.data.proxy.EncryptedLocalStorage', {
    extend: 'Ext.data.proxy.WebStorage',
    alias: 'proxy.encryptedlocalstorage',

    config: {
        /**
         * allow api override per instance
         */
        api: null
    },

    statics: {
        /**
         * encode/decode only data items, [key]-[#]
         * exclude '[key]' and '[key]-counter'
         * @param key
         * @returns {boolean}
         */
        excludeKeyMatcher: function (key) {
            var matcher = /.+-\d+/;
            return !matcher.test(key);
        },
        /**
         * allow shared api
         */
        api: {
            encrypt: function (data) {
                throw new Error('Not implemented');
            },
            decrypt: function (data) {
                throw new Error('Not implemented');
            }
        }
    },

    constructor: function (config) {
        var me = this;

        me.callParent(arguments);
        me.initConfig(config);
    },

    /**
     * @returns {{getItem: Function, setItem: Function, removeItem: Function}}
     */
    getStorageObject: function() {
        var me = this,
            proxy = me.statics(),
            api = me.api || proxy.api,
            local = window.localStorage;

        return {
            getItem : function (key) {
                // do not decrypt the counter or list values
                if (proxy.excludeKeyMatcher(key)) {
                    return local.getItem(key);
                }
                else {
                    return api.decrypt(local.getItem(key));
                }
            },
            setItem : function (key, value) {
                value = value || '';
                // do not encrypt the counter or list values
                if (proxy.excludeKeyMatcher(key)) {
                    local.setItem(key, value);
                }
                else {
                    local.setItem(key, api.encrypt(value));
                }
            },
            removeItem : function (key) {
                local.removeItem(key);
            }
        };
    }
});

