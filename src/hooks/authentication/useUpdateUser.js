import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateCurrentUser } from '../../services/apiAuth'

export function useUpdateUser() {
  const { t } = useTranslation(['auth'])
  const queryClient = useQueryClient()

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success(t('updatePassword.toast.success'))
      queryClient.setQueryData(['user'], user)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: () => {
      toast.error(t('updatePassword.toast.error'))
    },
  })

  return { updateUser, isUpdating }
}

