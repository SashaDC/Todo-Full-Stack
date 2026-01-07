import db from './connection'
import { Task, TaskData } from '../../models/task'

export async function getTasks(): Promise<Task[]> {
  return db('tasks').select('id', 'task', 'completed')
}

export async function addNewTask(newTask: TaskData): Promise<number[]> {
  return db('tasks').insert(newTask)
}

export async function deleteTaskById(id: number): Promise<number> {
  return db('tasks').where({ id }).del()
}

export async function updateTask(
  id: number,
  task: TaskData[],
): Promise<TaskData[]> {
  return db('tasks').where({ id }).update(task)
}

export async function deleteAllCompletedTasks() {
  return db('tasks').where({ completed: true }).del()
}

export async function countActiveTasks() {
  return db('tasks').where({ completed: 0 }).count('completed as activeCount')
}
