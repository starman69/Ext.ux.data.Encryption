/**
 * Notes Store, global to window
 */
Ext.define('Fob.store.Notes', {
    extend: 'Ext.data.Store',
    model: 'Fob.model.Note',
    autoSync: true,
    autoLoad: false
});