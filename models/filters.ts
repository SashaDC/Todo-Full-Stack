export interface FooterFilter {
  setFilter: (filter: 'all' | 'active' | 'completed') => void
}

export interface TasksFilters {
  filter: 'all' | 'active' | 'completed'
}
