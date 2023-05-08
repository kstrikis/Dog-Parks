/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("reviews", (table) => {
        table.dropForeign("dogParkId")
        table.foreign("dogParkId").references("dogParks.id").onDelete("CASCADE")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("reviews", (table) => {
        table.dropForeign("dogParkId")
        table.foreign("dogParkId").references("dogParks.id").onDelete("NO ACTION")
    })
}
