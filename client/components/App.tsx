/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react'
import AddTodo from './AddTodo.tsx'
import Tasks from './Tasks.tsx'
import Footer from './Footer.tsx'

// footer stuff
// Delete completed
// detect how many completed

function App() {
  const [isVisible, setIsVisible] = useState<boolean | void>(() => {
    return JSON.parse(localStorage.getItem('isVisible') || 'true')
  }) // Toggle visibility

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

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
          <Tasks filter={filter} />
        </div>
      </section>
      {/*<!-- This footer should hidden by default and shown when there are todos -->*/}
      <footer className="footer">
        <Footer setFilter={setFilter} />
      </footer>
    </>
  )
}

export default App
