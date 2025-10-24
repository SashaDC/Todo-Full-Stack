export interface FooterFilter {
  setFilter: (filter: 'all' | 'active' | 'completed') => void
}

export interface TasksProps {
  filter: 'all' | 'active' | 'completed'
  setVisibility: (value: boolean | null) => void
}
