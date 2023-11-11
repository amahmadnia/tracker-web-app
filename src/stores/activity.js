import moment from 'moment-jalaali'
import { defineStore } from 'pinia'

import { activitySchema } from '@/config/schema'
import { activityService } from '@/services/activity'
import messages from '@/utils/validators/messages'
import { getDateRange } from '@/utils/date'
import { convertGregorianToJalali } from '@/utils/dateJalali'
import { filterDataList, filterTypes } from '@/utils/filterData'
import { displayToast } from '@/plugins/toastify'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    filters: [],
    reports: {
      mostRepeatedActivityType: { name: '', count: '' },
      mostRepeatedActivities: [],
      categorizedActivities: [
        {
          activityTypeTitle: '',
          activities: []
        }
      ]
    },
    selectedReportActivityType: '',
    error: null
  }),
  getters: {
    appliedFilters: (state) => {
      const activityTypeFilter = state.filters.find(
        ({ secondTarget }) => secondTarget === 'activityType'
      )

      const dateFilter = state.filters.find(({ secondTarget }) => secondTarget === 'date')

      return { activityTypeFilter: Boolean(activityTypeFilter), dateFilter: Boolean(dateFilter) }
    },

    filteredActivities: (state) => {
      return filterDataList(state.activities, '', '', '', state.filters)
    },

    mostRepeatedActivities: (state) => {
      const remappedReport = state.reports.mostRepeatedActivities
        .slice(0, 3)
        .map((activityType) => {
          return {
            name: activityType[0],
            count: activityType[1]
          }
        })

      const counts = remappedReport.map((activityType) => activityType.count)
      const maxCount = Math.max(...counts)
      const scaleFactor = 100 / maxCount
      const scaledCounts = counts.map((count) => count * scaleFactor)

      return remappedReport.map((activity, index) => {
        const mode =
          index === 0 ? 'success' : index === 1 ? 'warning' : index === 2 ? 'failure' : 'success'
        return {
          ...activity,
          progress: scaledCounts[index],
          mode
        }
      })
    },

    firstCategorizedActivityType: (state) => {
      return state.reports?.categorizedActivities[0]?.activityTypeTitle
    },

    categorizedActivityTypes: (state) => {
      return state.reports?.categorizedActivities.map(({ activityTypeTitle }) => activityTypeTitle)
    }
  },

  actions: {
    async deleteActivity(id) {
      try {
        await activityService.deleteActivity(id)

        this.activities = this.activities.filter((activity) => activity._id !== id)

        displayToast('فعالیت با موفقیت حذف شد')
      } catch (err) {
        displayToast('خطا در حذف فعالیت اطلاعات', 'error')
      }
    },

    async createActivity({ activityType, date, startTime, endTime, title, description }) {
      try {
        const newActivity = {
          schema: activitySchema,
          tags: {
            userId: localStorage.getItem('userId')
          },
          data: {
            title,
            date,
            startTime,
            endTime,
            description,
            activityType,
            pictures: [
              'https://picsum.photos/200/300',
              'https://picsum.photos/200/300',
              'https://picsum.photos/200/300'
            ]
          }
        }

        await activityService.createActivity(newActivity)

        this.activities = [...this.activities, newActivity]

        displayToast('فعالیت با موفقیت ایجاد شد')
      } catch (err) {
        displayToast('خطا در ثبت اطلاعات', 'error')
      }
    },
    async getActivities(userId) {
      try {
        const { results } = await activityService.getActivities(userId)
        this.activities = results
      } catch (err) {
        this.error = messages.downloadFailed
      }
    },
    async getActivityTypes() {
      try {
        const resp = await activityService.getActivityTypes()
        const activityTypes = resp.data.data?.results
        const activityCounts = {}
        activityTypes.forEach((type) => {
          if (activityCounts[type]) {
            activityCounts[type]++
          } else {
            activityCounts[type] = 1
          }
        })
      } catch (err) {
        this.error = messages.downloadFailed
      }
    },
    async getReports(interval = 'all') {
      try {
        let startDate = null
        let endDate = null

        if (interval === 'all') {
          startDate = moment(convertGregorianToJalali('2014-1-1')).format('YYYY-MM-DD')
          endDate = moment(convertGregorianToJalali('2030-1-1')).format('YYYY-MM-DD')
        } else {
          startDate = getDateRange(interval).startDate
          endDate = getDateRange(interval).endDate
        }

        this.reports = await activityService.getReports(
          moment(startDate).format('YYYY-MM-DD'),
          moment(endDate).format('YYYY-MM-DD'),
          localStorage.getItem('userId')
        )
      } catch (err) {
        this.error = messages.downloadFailed
      }
    },
    setSelectedReportActivityType(value) {
      this.selectedReportActivityType = value
    },
    setFilter(filter) {
      const state = filter.filterState.value

      let isStateNull = null

      if (filter.type === filterTypes.array) isStateNull = state.length === 0
      else if (filter.type === filterTypes.dateRange) isStateNull = !state.start || !state.end

      this.filters = this.filters.filter((filterItem) => filterItem.type !== filter.type)
      if (!isStateNull) this.filters.push(filter)
    },
    removeFilterItemOfArray(type, value) {
      const currentFilter = this.filters.find((filter) => filter.type === filterTypes.array)
      currentFilter.filterState.value = currentFilter.filterState.value.filter(
        (item) => item !== value
      )

      if (currentFilter.filterState.value.length === 0) {
        this.setFilter(currentFilter)
      }
    },
    removeFilterDate() {
      this.filters = this.filters.filter((filter) => filter.type !== filterTypes.dateRange)
    }
  }
})
