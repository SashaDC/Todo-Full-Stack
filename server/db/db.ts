import db from './connection'
import { Task, TaskData } from '../../models/task'

export async function getTasks(): Promise<Task[]> {
  return db('tasks').select('id', 'task', 'priority', 'completed')
}

export async function addNewTask(newTask: TaskData): Promise<number[]> {
  return db('tasks').insert(newTask)
}

export async function deleteTask(id: number): Promise<number> {
  return db('tasks').where({ id }).del()
}

export async function updateTask(
  id: number,
  task: TaskData[],
): Promise<TaskData[]> {
  return db('tasks').where({ id }).update(task)
}
