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
    events: [
      {
        _id: '1',
        data: {
          dueDate: '2023-10-11',
          time: '09:00',
          creator: 'بهزاد کمپانی',
          title: 'جلسه با تیم A',
          description: 'بررسی پیشرفت پروژه و وظایف آتی.',
          users: [
            '101',
            '102',
            '103',
            '103',
            '103',
            '103',
            '103',
            '103',
            '103',
            '103',
            '103',
            '103',
            '103',
            '103'
          ]
        }
      },
      {
        _id: '2',
        data: {
          dueDate: '2023-10-12',
          time: '14:30',
          creator: 'بهزاد کمپانی',
          title: 'تماس تلفنی با مشتری',
          description: 'ارائه به‌روزرسانی‌های پروژه و پاسخ به پرسش‌های مشتری.',
          users: ['104', '105', '106']
        }
      },
      {
        _id: '3',
        data: {
          dueDate: '2023-10-13',
          time: '10:15',
          creator: 'بهزاد کمپانی',
          title: 'جلسه آموزشی',
          description: 'آموزش نرم‌افزار جدید برای تیم بازاریابی.',
          users: ['107', '108', '109']
        }
      },
      {
        _id: '4',
        data: {
          dueDate: '2023-10-14',
          time: '11:45',
          creator: 'بهزاد کمپانی',
          title: 'ناهار با شرکای تجاری',
          description: 'جلسه نهاری رسمی با شرکای تجاری.',
          users: ['110', '111', '112']
        }
      },
      {
        _id: '5',
        data: {
          dueDate: '2023-10-15',
          time: '16:00',
          creator: 'بهزاد کمپانی',
          title: 'بررسی پروژه',
          description: 'بررسی مراحل پروژه و برنامه‌ریزی برای مرحله بعدی.',
          users: ['113', '114', '115']
        }
      },
      {
        _id: '6',
        data: {
          dueDate: '2023-10-16',
          time: '13:45',
          creator: 'بهزاد کمپانی',
          title: 'فعالیت‌های تیم سازی خارج از اداره',
          description: 'فعالیت‌های تیم سازی در فضای باز برای افزایش همبستگی تیم.',
          users: ['116', '117', '118']
        }
      },
      {
        _id: '7',
        data: {
          dueDate: '2023-10-17',
          time: '10:30',
          creator: 'بهزاد کمپانی',
          title: 'نمایش محصول',
          description: 'نمایش ویژگی‌های جدید محصول به نمایندگان.',
          users: ['119', '120', '121']
        }
      },
      {
        _id: '8',
        data: {
          dueDate: '2023-10-18',
          time: '15:20',
          creator: 'بهزاد کمپانی',
          title: 'جلسه هیأت مدیره',
          description: 'جلسه ماهیانه هیأت مدیره برای بحث در مورد استراتژی شرکت.',
          users: ['122', '123', '124']
        }
      },
      {
        _id: '9',
        data: {
          dueDate: '2023-10-19',
          time: '12:00',
          creator: 'بهزاد کمپانی',
          title: 'مراسم رونمایی از محصول',
          description: 'مراسم رسمی برای رونمایی از خط محصول جدید.',
          users: ['125', '126', '127']
        }
      },
      {
        _id: '10',
        data: {
          dueDate: '2023-10-20',
          time: '09:45',
          creator: 'بهزاد کمپانی',
          title: 'جلسه تیمی',
          description: 'جلسه هفتگی تیم برای بحث در مورد وظایف جاری و چالش‌ها.',
          users: ['128', '129', '130']
        }
      },
      {
        _id: '11',
        data: {
          dueDate: '2023-10-21',
          time: '14:15',
          creator: 'بهزاد کمپانی',
          title: 'نشست استراتژیک توسعه بازار',
          description: 'بررسی راهکارهای جدید برای گسترش بازار و افزایش فروش.',
          users: ['131', '132', '133']
        }
      },
      {
        _id: '12',
        data: {
          dueDate: '2023-10-22',
          time: '11:30',
          creator: 'بهزاد کمپانی',
          title: 'جلسه ارتقاء کیفیت محصول',
          description: 'بررسی بازخوردهای مشتریان و ارتقاء کیفیت محصولات.',
          users: ['134', '135', '136']
        }
      },
      {
        _id: '13',
        data: {
          dueDate: '2023-10-23',
          time: '16:45',
          creator: 'بهزاد کمپانی',
          title: 'کارگاه آموزشی بازاریابی دیجیتال',
          description: 'آموزش راهکارهای بازاریابی آنلاین و استفاده از رسانه‌های اجتماعی.',
          users: ['137', '138', '139']
        }
      },
      {
        _id: '14',
        data: {
          dueDate: '2023-10-24',
          time: '10:00',
          creator: 'بهزاد کمپانی',
          title: 'نشست تحلیل داده‌ها',
          description: 'تحلیل داده‌های بازار برای پیش‌بینی رفتار مشتریان و تصمیم‌گیری بهینه.',
          users: ['140', '141', '142']
        }
      },
      {
        _id: '15',
        data: {
          dueDate: '2023-10-25',
          time: '15:30',
          creator: 'بهزاد کمپانی',
          title: 'سخنرانی مهمان ویژه',
          description: 'سخنرانی یک مهمان ویژه درباره‌ی راهکارهای نوآوری در کسب و کار.',
          users: ['143', '144', '145']
        }
      },
      {
        _id: '16',
        data: {
          dueDate: '2023-10-26',
          time: '13:00',
          creator: 'بهزاد کمپانی',
          title: 'کارگاه طراحی واسط کاربری',
          description: 'آموزش نکات طراحی واسط کاربری به منظور بهبود تجربه کاربری.',
          users: ['146', '147', '148']
        }
      },
      {
        _id: '17',
        data: {
          dueDate: '2023-10-27',
          time: '09:45',
          creator: 'بهزاد کمپانی',
          title: 'نشست استراتژیک با مشتریان',
          description: 'گفتگو با مشتریان در مورد نیازها و انتظارات آن‌ها از محصولات و خدمات.',
          users: ['149', '150', '151']
        }
      },
      {
        _id: '18',
        data: {
          dueDate: '2023-10-28',
          time: '12:30',
          creator: 'بهزاد کمپانی',
          title: 'کارگاه آموزشی تیم‌های موثر',
          description: 'آموزش تکنیک‌ها و مهارت‌های لیدری برای تشکیل تیم‌های موثر و موفق.',
          users: ['152', '153', '154']
        }
      },
      {
        _id: '19',
        data: {
          dueDate: '2023-10-29',
          time: '14:20',
          creator: 'بهزاد کمپانی',
          title: 'نشست ارزیابی عملکرد ماهانه',
          description:
              'ارزیابی عملکرد تیم‌ها و افراد در طول ماه گذشته و برنامه‌ریزی برای بهبود‌ها.',
          users: ['155', '156', '157']
        }
      },
      {
        _id: '20',
        data: {
          dueDate: '2023-10-30',
          time: '11:15',
          creator: 'بهزاد کمپانی',
          title: 'نشست مدیریت بحران',
          description: 'آمادگی و برنامه‌ریزی برای مدیریت بحران‌های ممکن در کسب و کار.',
          users: ['158', '159', '160']
        }
      }
    ]
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
