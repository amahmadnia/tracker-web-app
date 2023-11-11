import { toast } from 'vue3-toastify'

export default {
  autoClose: 3000,
  rtl: true,
  position: toast.POSITION.TOP_RIGHT,
  transition: toast.TRANSITIONS.SLIDE,
  maxToasts: 4,
  newestOnTop: true
}
