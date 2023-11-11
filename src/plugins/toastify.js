import { toast } from 'vue3-toastify'

export const displayToast = (message, type = 'success') => toast[type](message)
