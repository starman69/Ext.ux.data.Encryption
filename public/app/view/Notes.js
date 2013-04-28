/**
 * Notes Panel with Grid
 */
Ext.define('Fob.view.Notes', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.notespanel',

    width: 600,
    height: 480,
    frame: true,
    layout: 'fit',

    initComponent: function() {
        var me = this;

        me.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        me.items = [{
            title: 'My Notes',
            xtype: 'grid',
            store: 'Notes',
            autoScroll: true,
            plugins: [me.cellEditing],
            emptyText: 'No Notes found',
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true
            },
            columns: [{
                text: 'Title',
                dataIndex: 'title',
                width: 150,
                editor: {
                    allowBlank: false
                }
            }, {
                text: 'Note',
                dataIndex: 'note',
                flex: 1,
                editor: {
                    allowBlank: true
                }
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'Add Note',
                    itemId: 'addnote'
                },{
                    text: 'Delete Note',
                    itemId: 'deletenote',
                    disabled: true
                },'->',{
                    xtype: 'tbtext',
                    text: 'Total Notes',
                    itemId: 'totalnotes'
                }]
            }]
        }];

        me.callParent(arguments);
    }

});
