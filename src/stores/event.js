import { defineStore } from 'pinia'
import moment from 'moment-jalaali'

import { eventService } from '@/services/event'
import messages from '@/utils/validators/messages'
import { filterDataList, filterTypes } from '@/utils/filterData'
import { eventSchema } from '@/config/schema'
import { displayToast } from '@/plugins/toastify'
import { compareDates } from '@/utils/date'

export const useEventStore = defineStore('event', {
  state: () => ({
    filters: [],
    selectedCalendarDate: null,
    events: []
  }),
  getters: {
    appliedFilters: (state) => {
      const dateFilter = state.filters.find(({ secondTarget }) => secondTarget === 'dueDate')

      return { dateFilter: Boolean(dateFilter) }
    },
    filteredEvents: (state) => {
      return filterDataList(state.events, '', '', '', state.filters)
    },
    sidebarEvents: (state) => {
      return state.events.filter(({ data }) =>
        compareDates(data.dueDate, state.selectedCalendarDate)
      )
    }
  },
  actions: {
    async deleteEvent(id) {
      try {
        await eventService.deleteEvent(id)

        this.events = this.events.filter((event) => event._id !== id)

        displayToast('رویداد با موفقیت حذف شد')
      } catch (err) {
        displayToast('خطا در حذف رویداد', 'error')
      }
    },
    async createEvent({ dueDate, time, title, description, users }, userId) {
      try {
        const newEvent = {
          schema: eventSchema,
          tags: {
            userId
          },
          data: {
            title,
            dueDate,
            time,
            description,
            users
          }
        }

        const createdEvent = await eventService.createEvent(newEvent)
        const newEventToAddToStore = {
          _id: createdEvent._id,
          ...newEvent
        }

        this.events = [...this.events, newEventToAddToStore]

        displayToast('رویداد با موفقیت ایجاد شد')
      } catch (err) {
        displayToast('خطا در ثبت اطلاعات', 'error')
      }
    },
    async getEvents(userId) {
      try {
        const { results } = await eventService.getEvents(userId)

        this.events = results
      } catch (err) {
        this.error = messages.downloadFailed
      }
    },
    setFilter(filter) {
      const state = filter.filterState.value

      let isStateNull = null

      if (filter.type === filterTypes.array || filter.type === filterTypes.arrayMultiple)
        isStateNull = state.length === 0
      else if (filter.type === filterTypes.dateRange) isStateNull = !state.start || !state.end

      this.filters = this.filters.filter((filterItem) => filterItem.type !== filter.type)
      if (!isStateNull) this.filters.push(filter)
    },
    removeFilterItemOfArrayMultiple(type, value) {
      const currentFilter = this.filters.find((filter) => filter.type === filterTypes.arrayMultiple)
      currentFilter.filterState.value = currentFilter.filterState.value.filter(
        (item) => item !== value
      )

      if (currentFilter.filterState.value.length === 0) {
        this.setFilter(currentFilter)
      }
    },
    removeFilterDate() {
      this.filters = this.filters.filter((filter) => filter.type !== filterTypes.dateRange)
    },
    setSelectedCalendarDate(date) {
      this.selectedCalendarDate = moment(date, 'jYYYY-jM-jD').format('YYYY-MM-DD')
      // this.selectedCalendarDate = date
    }
  }
})
