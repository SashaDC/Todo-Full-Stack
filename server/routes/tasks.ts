import express from 'express'
import * as db from '../db/db'

const router = express.Router()

// GET localhost:3000/api/v1/tasks/
router.get('/', async (req, res) => {
  try {
    const tasks = await db.getTasks()
    // status 200
    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).send('something went wrong')
  }
})

// POST localhost:3000/api/v1/tasks
router.post('/', async (req, res) => {
  try {
    const newTask = req.body
    await db.addNewTask(newTask)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).send('something went wrong')
  }
})

// DELETE localhost:3000/api/v1/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteTask(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).send('something went wrong')
  }
})

// PATCH(aka update) localhost:3000/api/v1/tasks/:id
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const task = req.body
    await db.updateTask(id, task)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).send('something went wrong')
  }
})

export default router
