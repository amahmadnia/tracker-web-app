import { defineStore, getActivePinia } from 'pinia'

import { userService } from '@/services/user'
import messages from '@/utils/validators/messages'
import routerConfig from '@/plugins/router'
import { getCookie, removeCookie } from '@/plugins/cookies'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      id: '',
      firstName: '',
      lastName: '',
      age: 0,
      email: ''
    },
    signupFormData: {
      email: '',
      firstName: '',
      lastName: '',
      age: null,
      password: '',
      type: 'real'
    }
  }),

  getters: {
    isAuthenticated: (state) => !!getCookie(),
    isSignupEmailEmpty: (state) =>
      state.signupFormData.email.trim() === '' || state.signupFormData.password.trim() === ''
  },

  actions: {
    async setProfile() {
      try {
        const { uniqueKey, firstName, lastName, email } = await userService.getProfile()

        localStorage.setItem('userId', uniqueKey)
        localStorage.setItem('userFirstName', firstName)
        localStorage.setItem('userLastName', lastName)
        localStorage.setItem('userEmail', email)

        this.user.id = uniqueKey
        this.user.firstName = firstName
        this.user.lastName = lastName
        this.user.email = email
      } catch (err) {
        this.error = messages.downloadFailed
      }
    },

    setSignupFormValues({ email, password }) {
      this.signupFormData.email = email
      this.signupFormData.password = password
    },

    logout() {
      removeCookie()

      //reset all stores
      getActivePinia()._s.forEach((store) => store.$reset())
      this.$router.push({ name: routerConfig.auth.login.name })
      location.reload()

      //redirect to login view
    }
  }
})
