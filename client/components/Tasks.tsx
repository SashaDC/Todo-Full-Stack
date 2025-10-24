import { ChangeEvent, useState } from 'react'
import { useGetTasks, useDeleteTask, useUpdateTask } from '../hooks/useTasks'
import { Task } from '../../models/task'

export default function Tasks() {
  const { isPending, isError, data } = useGetTasks()
  const deleteTask = useDeleteTask()
  const updateTask = useUpdateTask()
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [value, setValue] = useState('')

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value)
  }

  const handleUpdate = async (task: Task) => {
    setIsEditing(task.id)
    setValue(task.task)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const task = data.find((t) => t.id === isEditing)
    if (!task) return
    await updateTask.mutate({
      ...task,
      task: value,
    })
    setIsEditing(null)
    setValue('')
  }

  const handleBlur = async () => {
    const task = data.find((t) => t.id === isEditing)
    if (!task) return
    await updateTask.mutate({
      ...task,
      task: value,
    })
    setIsEditing(null)
    setValue('')
  }
  const handleDelete = async (id: number) => {
    await deleteTask.mutate(id)
  }

  return (
    <>
      <ul className="todo-list">
        {data.map((task) => (
          <li
            key={task.id}
            className={`${task.completed ? 'completed' : ''} ${isEditing === task.id ? 'editing' : ''}`}
          >
            <div className="view">
              <input
                id={`${task.id}`}
                className="toggle"
                type="checkbox"
                checked={task.completed}
                aria-label="Task Complete?"
                onClick={() => handleToggle(task.id)}
              />
              <label
                htmlFor={`${task.id}`}
                onDoubleClick={() => handleUpdate(task)}
              >
                {task.task}
              </label>
              <button
                className="destroy"
                aria-label="Delete Task"
                onClick={() => handleDelete(task.id)}
              />
            </div>
            {isEditing == task.id && (
              <form aria-label="To Do List" onSubmit={handleSubmit}>
                <input
                  className="edit"
                  value={value}
                  aria-label="Edit Task Here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                />
              </form>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
