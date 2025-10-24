import request from 'superagent'
import { Task, TaskData } from '../../models/task'

const rootURL = new URL(`/api/v1/`, document.baseURI)

// Getting
export async function getTasks(): Promise<Task[]> {
  const res = await request.get(`${rootURL}/tasks`)
  return res.body
}

// Adding
export async function addNewTask(newTask: TaskData) {
  const res = await request.post(`${rootURL}/tasks`).send(newTask)
  return res.body as Task
}

// Deleting
export async function deleteTaskById(id: number) {
  await request.del(`${rootURL}/tasks/${id}`)
  return
}

// Updating
export async function updateTask(updatedTask: Task) {
  const res = await request
    .patch(`${rootURL}/tasks/${updatedTask.id}`)
    .send(updatedTask)
  return res.body as Task[]
}

export async function deleteAllCompletedTasks() {
  await request.del(`${rootURL}/tasks/delete-all`)
  return
}

export async function countActiveTasks() {
  const res = await request.get(`${rootURL}/tasks/count-active`)
  return res.body
}
