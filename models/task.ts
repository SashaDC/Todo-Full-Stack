export interface TaskData {
  task: string
  priority: string
  completed: boolean
}

export interface Task extends TaskData {
  id: number
}
