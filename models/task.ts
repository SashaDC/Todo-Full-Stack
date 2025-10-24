export interface TaskData {
  task: string
  completed: boolean
}

export interface Task extends TaskData {
  id: number
}
