import { useState } from 'react'
import AddTodo from './AddTodo.tsx'
import Tasks from './Tasks.tsx'
// functions needing to be made

// footer stuff
// Delete completed
// filtering buttons
// detect how many completed

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(false) // Toggle visibility

  const handleToggle = () => {
    setIsVisible((prev) => !prev)
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
        />
        {/* Hide all below if toggled */}
        <label htmlFor="toggle-all">something</label>
        <div style={{ display: isVisible ? 'block' : 'none' }}>
          <Tasks />
        </div>
      </section>
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
        <button className="clear-completed">
          {/* delete all that are completed */}
          Clear completed
        </button>
      </footer>
    </>
  )
}

export default App
