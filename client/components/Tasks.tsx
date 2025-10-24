import { useState } from 'react'
import { useGetTasks, useDeleteTask, useUpdateTask } from '../hooks/useTasks'

export default function Tasks() {
  const { isPending, isError, data } = useGetTasks()
  const deleteTask = useDeleteTask()
  const updateTask = useUpdateTask()

  if (isPending) {
    return 'loading'
  }
  if (isError) {
    return 'error'
  }

  const handleToggle = async (id: number) => {
    const task = data.find((t) => t.id === id)
    if (!task) return
    await updateTask.mutate({
      ...task,
      completed: !task.completed,
    })
  }

  // Need a doubleclick edit

  const handleDelete = async (id: number) => {
    await deleteTask.mutate(id)
  }

  return (
    <>
      <ul className="todo-list">
        {data.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={task.completed}
                onClick={() => handleToggle(task.id)}
              />
              <label>{task.task}</label>
              <button
                className="destroy"
                onClick={() => handleDelete(task.id)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
