/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react'
import AddTodo from './AddTodo.tsx'
import Tasks from './Tasks.tsx'
// functions needing to be made

// footer stuff
// Delete completed
// filtering buttons
// detect how many completed

function App() {
  const [isVisible, setIsVisible] = useState<boolean | void>(() => {
    return JSON.parse(localStorage.getItem('isVisible') || 'true')
  }) // Toggle visibility

  const handleToggle = () => {
    setIsVisible((prev) => {
      const value = !prev
      localStorage.setItem('isVisible', JSON.stringify(value))
      return value
    })
  }

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          aria-label="Toggle viewing tasks?"
          onClick={handleToggle}
          tabIndex={-1}
        />
        {/* Hide all below if toggled */}
        <label
          aria-label="Toggle all styling"
          htmlFor="toggle-all"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleToggle()
              e.preventDefault()
            }
          }}
        ></label>
        <div style={{ display: isVisible ? 'block' : 'none' }}>
          <Tasks />
        </div>
      </section>
      {/*<!-- This footer should hidden by default and shown when there are todos -->*/}
      <footer className="footer">
        <span className="todo-count">
          {/* reference this to tasks that arent completed */}
          <strong>0</strong> Item left
        </span>
        <ul className="filters">
          <li>
            {/* get all */}
            <a href="#/">All</a>
          </li>
          <li>
            {/* get all that arent completed */}
            <a href="#/active">Active</a>
          </li>
          <li>
            {/* get all that are completed */}
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        {/* <!-- Hidden if no completed items are left ↓ --> */}

        <button className="clear-completed">
          {/* delete all that are completed */}
          Clear completed
        </button>
      </footer>
    </>
  )
}

export default App
