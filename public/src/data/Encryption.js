/**
 * A simple encryption data class
 * requires: ['Aes', 'CryptoJS.SHA3']
 */
Ext.define('Ext.ux.data.Encryption', {
    singleton: true,
    /**
     * crypto api, defaults to AES 256-bit
     */
    crypto: Aes.Ctr,
    /**
     * hash api, defaults to SHA3 512-bit
     */
    hash: CryptoJS.SHA3,

    config: {
        enabled: true,
        aesBits: 256, // 128, 192, 256
        /**
         * salt to use for hash
         */
        salt: 'Fantasy of Boardom',
        api: {
            encrypt: function (data) {
                throw new Error('Not implemented');
            },
            decrypt: function (data) {
                throw new Error('Not implemented');
            },
            setToken: function (data, salt) {
                throw new Error('Not implemented');
            }
        }
    },

    constructor: function (config) {
        config = config || {};
        var me = this,
            token = ''; // private

        config.api = {
            /**
             * @method encrypt
             * @param data
             * @returns {*}
             */
            encrypt: function (data) {
                if (data === null || typeof data == 'undefined') {
                    return data;
                }
                if (me.enabled) {
                    return me.crypto.encrypt(data, token, me.aesBits);
                } else {
                    return data;
                }
            },
            /**
             * @method decrypt
             * @param data
             * @returns {*}
             */
            decrypt: function (data) {
                if (data === null || typeof data == 'undefined') {
                    return data;
                }
                if (me.enabled) {
                    return me.crypto.decrypt(data, token, me.aesBits);
                } else {
                    return data;
                }
            },
            /**
             * @method setToken
             * @param data
             * @param salt
             */
            setToken: function (data, salt) {
                salt = salt || me.salt;
                token = me.hash(salt + data).toString();
            }
        };

        me.initConfig(config);
    }
});
