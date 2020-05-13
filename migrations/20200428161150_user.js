exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('sex').notNullable();
        table.date('date_of_birth').notNullable();
    })
        .createTable('user_tasks', function (table) {
            table.increments('id');
            table.string('task').notNullable();
            table.string('difficulty').notNullable();
            table.string('status').notNullable().defaultTo('Not Started');
            table.date('estimation')
            table.integer('user_id').references('id').inTable('users')
        })

        .createTable('user_address', function (table) {
            table.increments('id');
            table.string('address_type')
            table.string('address1')
            table.string('address2')
            table.string('city')
            table.string('pincode')
            table.string('country')
            table.integer('user_id').references('id').inTable('users');
        })

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
        .dropTable('user_tasks')
        .dropTable('user_address')

};
