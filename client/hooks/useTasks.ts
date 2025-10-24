import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTasks, addNewTask, deleteTask, updateTask } from '../apis/tasksApi'

export function useGetTasks() {
  const query = useQuery({ queryKey: ['tasks'], queryFn: getTasks })
  return {
    ...query,
  }
}

export function useAddNewTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addNewTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
