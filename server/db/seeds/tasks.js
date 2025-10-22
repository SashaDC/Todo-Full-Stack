/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    { id: 1, task: 'Refurbish old laptop', priority: 'low', completed: false },
    { id: 2, task: 'Build new pc', priority: 'low', completed: false },
    { id: 3, task: 'Get lunch', priority: 'high', completed: false },
  ])
}
