import { FooterFilter } from '../../models/filters'
import {
  useCountActiveTasks,
  useDeleteAllCompletedTasks,
} from '../hooks/useTasks'

export default function Footer({ setFilter }: FooterFilter) {
  const { isPending, isError, data } = useCountActiveTasks()
  const deleteAllCompletedTasks = useDeleteAllCompletedTasks()
  if (isPending) {
    return 'loading'
  }
  if (isError) {
    return 'error'
  }

  const handleDelete = async () => {
    await deleteAllCompletedTasks.mutate()
  }

  return (
    <>
      <span className="todo-count">
        {/* reference this to tasks that arent completed */}
        <strong>{data[0].activeCount}</strong> Active tasks left
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

      <button className="clear-completed" onClick={handleDelete}>
        Clear completed
      </button>
    </>
  )
}
