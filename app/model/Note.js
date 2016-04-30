/**
 * Note Model using EncryptedLocalStorage proxy
 */
Ext.define('Fob.model.Note', {
    extend: 'Ext.data.Model',
    idgen: 'sequential',
    requires: [
        'Ext.ux.data.proxy.EncryptedLocalStorage'
    ],
    fields: ['id','title','note'],
    proxy: {
        type: 'encryptedlocalstorage',
        id: 'notes-store'
    }
});