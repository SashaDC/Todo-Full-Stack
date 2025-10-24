/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ChangeEvent, useEffect, useState } from 'react'
import { useGetTasks, useDeleteTask, useUpdateTask } from '../hooks/useTasks'
import { Task } from '../../models/task'
import { TasksProps } from '../../models/filters'

export default function Tasks({ filter, setVisibility }: TasksProps) {
  const { isPending, isError, data } = useGetTasks()
  const deleteTask = useDeleteTask()
  const updateTask = useUpdateTask()
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [value, setValue] = useState('')
  useEffect(() => {
    if (!isPending && data) {
      if (data.length === 0) {
        setVisibility(null)
      } else {
        setVisibility(true)
      }
    }
  }, [isPending, data, setVisibility])
  if (isPending) {
    return 'loading'
  }
  if (isError) {
    return 'error'
  }

  const filteredTasks = data.filter((task) => {
    if (filter == 'all') return true
    if (filter == 'completed') return task.completed
    if (filter == 'active') return !task.completed
  })

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
        {filteredTasks.map((task) => (
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
                tabIndex={0}
                htmlFor={`${task.id}`}
                onDoubleClick={() => handleUpdate(task)}
                onKeyDown={(e) => {
                  if (e.key === ' ') handleUpdate(task)
                }}
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
