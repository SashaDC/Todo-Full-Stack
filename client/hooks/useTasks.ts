import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTasks,
  addNewTask,
  deleteTaskById,
  updateTask,
  deleteAllCompletedTasks,
  countActiveTasks,
} from '../apis/tasksApi'

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
      queryClient.invalidateQueries({ queryKey: ['tasks-count'] })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['tasks-count'] })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['tasks-count'] })
    },
  })
}

export function useDeleteAllCompletedTasks() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAllCompletedTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['tasks-count'] })
    },
  })
}

export function useCountActiveTasks() {
  const query = useQuery({
    queryKey: ['tasks-count'],
    queryFn: countActiveTasks,
  })
  return {
    ...query,
  }
}
