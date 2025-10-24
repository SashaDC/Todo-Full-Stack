import { ChangeEvent, useState } from 'react'
import { useAddNewTask } from '../hooks/useTasks'

function AddTodo() {
  const [inputState, setInputState] = useState('')
  const addTask = useAddNewTask()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputState(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addTask.mutate({
      task: inputState,
      priority: 'low',
      completed: false,
    })
    setInputState('')
  }

  return (
    <form aria-label="New Task?" onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        aria-label="Add Task Here"
        value={inputState}
        onChange={handleChange}
      />
    </form>
  )
}

export default AddTodo
