/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("dogParks", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.text("description").notNullable()
        table.string("address").notNullable()
        table.string("neighborhood")
        table.boolean("hasTrash").notNullable().defaultTo(false)
        table.boolean("hasBags").notNullable().defaultTo(false)
        table.boolean("hasFence").notNullable().defaultTo(false)
        table.boolean("hasWater").notNullable().defaultTo(false)
        table.boolean("hasBenches").notNullable().defaultTo(false)
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("dogParks")
}
