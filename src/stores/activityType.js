import { defineStore } from 'pinia'

import { activityTypeService } from '@/services/activityType'
import messages from '@/utils/validators/messages'

export const useActivityTypeStore = defineStore('activityType', {
  state: () => ({
    activityTypes: []
  }),
  getters: {},
  actions: {
    async getActivityTypes(userId) {
      try {
        const { results: activityTypes } = await activityTypeService.getActivityTypes(userId)
        this.activityTypes = activityTypes
      } catch (err) {
        this.error = messages.downloadFailed
      }
    }
  }
})
