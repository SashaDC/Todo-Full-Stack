import { FooterFilter } from '../../models/filters'

export default function Footer({ setFilter }: FooterFilter) {
  return (
    <>
      <span className="todo-count">
        {/* reference this to tasks that arent completed */}
        <strong>0</strong> Items left
      </span>
      <ul className="filters">
        <li>
          <button onClick={() => setFilter('all')}>All</button>
        </li>
        <li>
          <button onClick={() => setFilter('active')}>Active</button>
        </li>
        <li>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </li>
      </ul>
      {/* <!-- Hidden if no completed items are left ↓ --> */}

      <button className="clear-completed">
        {/* delete all that are completed */}
        Clear completed
      </button>
    </>
  )
}
