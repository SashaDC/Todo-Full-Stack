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
    if (inputState.length < 3) {
      return alert('Must be 3 characters long')
    } else if (!/[A-Za-z0-9]/.test(inputState)) {
      return alert('Must include at least one letter or number')
    }

    await addTask.mutate({
      task: inputState,
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
        autoFocus
      />
    </form>
  )
}

export default AddTodo
