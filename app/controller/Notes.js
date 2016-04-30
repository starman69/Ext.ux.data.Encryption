/**
 * Notes Controller
 */
Ext.define('Fob.controller.Notes', {
    extend: 'Ext.app.Controller',
    models: ['Note'],
    stores: ['Notes'],
    views: ['Notes'],

    refs: [{
        ref: 'notesPanel',
        selector: 'notespanel'
    },{
        ref: 'totalNotes',
        selector: 'notespanel #totalnotes'
    },{
        ref: 'deleteNoteButton',
        selector: 'notespanel #deletenote'
    }],

    init: function () {
        var me = this;

        me.control({
            'notespanel': {
                render: me.onNotesPanelRender
            },
            'notespanel grid': {
                selectionchange: me.onGridSelectionChange
            },
            'notespanel #addnote': {
                click: me.onAddNote
            }                      ,
            'notespanel #deletenote': {
                click: me.onDeleteNote
            }
        });
    },

    onNotesPanelRender: function (cmp) {
        var me = this,
            store = me.getNotesStore();

        // defer load because its encrypted data
        store.on('datachanged', me.onNotesDataChanged, me);

        store.load({
            callback: me.onNotesDataChanged,
            scope: me
        });
    },

    onGridSelectionChange:  function(view, records) {
        var me = this,
            deleteButton = me.getDeleteNoteButton();

        deleteButton.setDisabled(!records.length);
    },

    onAddNote: function (btn) {
        var me = this,
            store = me.getNotesStore(),
            panel = me.getNotesPanel(),
            Note = me.getNoteModel();

        var model = Note.create({title:'New Note!', note:''});
        store.insert(0, model);

        panel.cellEditing.startEditByPosition({
            row: 0,
            column: 0
        });
    },

    onDeleteNote: function (btn) {
        var me = this,
            panel = me.getNotesPanel(),
            grid = panel.down('grid'),
            store = grid.getStore();

        var sm = grid.getSelectionModel();
        panel.cellEditing.cancelEdit();

        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },

    onNotesDataChanged: function () {
        var me = this,
            store = me.getNotesStore(),
            totalNotes = me.getTotalNotes();

        Ext.defer(function () {
            totalNotes.update('Total Notes: ' + store.getCount());
        },4);
    }
});