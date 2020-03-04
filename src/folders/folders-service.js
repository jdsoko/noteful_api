const FoldersService = {
    getAllFolders(knex){
        return knex.select('*').from('noteful_folders')
    },
    insertFolder(knex, newFolder) {
        return knex
            .insert(newFolder)
            .into('noteful_folders')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getAllNotesInFolder(knex, id){
        return knex.from('noteful_notes').select('*').join('noteful_folders', 'noteful_notes.folder', '=', 'noteful_folders.id').where('noteful_folders.id', id)
    },
    deleteFolder(knex, id){
        return knex('noteful_folders')
            .where({ id })
            .delete()
    },
    getById(knex, id) {
        return knex.from('noteful_folders').select('*').where('id', id).first()
    }

}

module.exports = FoldersService