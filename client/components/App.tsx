/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react'
import AddTodo from './AddTodo.tsx'
import Tasks from './Tasks.tsx'
import Footer from './Footer.tsx'

function App() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null)

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const handleToggle = () => {
    if (isVisible === null) return
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
          disabled={isVisible === null}
        />
        <label
          aria-label="Toggle all styling"
          htmlFor="toggle-all"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && isVisible !== null) {
              handleToggle()
              e.preventDefault()
            }
          }}
        ></label>
        <div style={{ display: isVisible ? 'block' : 'none' }}>
          <Tasks filter={filter} setVisibility={setIsVisible} />
        </div>
      </section>
      {/*<!-- This footer should hidden by default and shown when there are todos -->*/}
      <footer
        className="footer"
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <Footer setFilter={setFilter} />
      </footer>
    </>
  )
}

export default App
