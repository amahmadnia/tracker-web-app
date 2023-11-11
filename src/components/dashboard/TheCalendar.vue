<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import moment from 'moment-jalaali'

import { convertJalaaliToGregorian, jalaliMonthName } from '@/utils/dateJalali'
import { persianDigits } from '@/utils/persianCharachters'

import CalendarMonthDayItem from '@/components/dashboard/TheCalendarMonthDayItem.vue'
import CalendarWeekdays from '@/components/dashboard/TheCalendarWeekdays.vue'
import { compareDates, formatDate } from '@/utils/date'
import { useEventStore } from '@/stores/event'

onMounted(() => {
  generateCalendar()
})

const eventStore = useEventStore()
const selectedDate = ref(moment())
const month = ref(Number(selectedDate.value.jMonth()))
const year = ref(Number(selectedDate.value.jYear()))
const numberOfCurrentMonthDays = ref(Number(moment.jDaysInMonth(year.value, month.value)))
const days = reactive({
  data: []
})

const calendarHeading = computed(() =>
  persianDigits(jalaliMonthName(selectedDate.value.jMonth()) + ' ' + selectedDate.value.jYear())
)

const countEventsOfDate = (dateString) => {
  const formattedDate = formatDate(convertJalaaliToGregorian(dateString))

  const eventsOfDate = eventStore.events.filter(({ data: event }) =>
    compareDates(event.dueDate, formattedDate)
  )

  return eventsOfDate.length
}

const generateCalendar = () => {
  const date = selectedDate.value

  const formattedSelectedDate = `${date.jYear()}-${date.jMonth() + 1}-${date.jDate()}`

  eventStore.setSelectedCalendarDate(formattedSelectedDate)

  const currentMonthDays = []
  for (let i = 1; i <= numberOfCurrentMonthDays.value; i++) {
    const dateString =
      selectedDate.value.jYear() + '-' + (selectedDate.value.jMonth() + 1) + '-' + i

    currentMonthDays.push({
      date: dateString,
      currentMonth: true,
      eventsCount: countEventsOfDate(dateString)
    })
    days.data = currentMonthDays
  }

  const firstDayOfCurrentMonth = selectedDate.value.startOf('jMonth').format('jYYYY/jM/jD')

  const daysFromPreviousMonth = moment(firstDayOfCurrentMonth, 'jYYYY/jM/jD').weekday() % 7

  const prevMonthDays = []
  for (let i = 0; i < daysFromPreviousMonth; i++) {
    const previousMonthDate = moment(firstDayOfCurrentMonth, 'jYYYY/jM/jD').subtract(
      daysFromPreviousMonth - i,
      'day'
    )

    const dateString =
      previousMonthDate.jYear() +
      '-' +
      (previousMonthDate.jMonth() + 1) +
      '-' +
      previousMonthDate.jDate()

    prevMonthDays.push({
      date: dateString,
      currentMonth: false,
      eventsCount: countEventsOfDate(dateString)
    })
  }
  days.data = [...prevMonthDays, ...days.data]
}

const navigateMonth = (targetMonth) => {
  selectedDate.value =
    targetMonth === 'previous'
      ? selectedDate.value.subtract(1, 'jMonth')
      : targetMonth === 'next'
      ? selectedDate.value.add(1, 'jMonth')
      : selectedDate.value

  numberOfCurrentMonthDays.value = Number(
    moment.jDaysInMonth(selectedDate.value.jYear(), selectedDate.value.jMonth())
  )
  generateCalendar()
}

const selectDate = (date) => {
  selectedDate.value = moment(date, 'jYYYY-jM-jD')

  eventStore.setSelectedCalendarDate(date)
}
</script>

<template>
  <div class="calendar">
    <div class="calendar__header">
      <div class="calendar__nav">
        <button class="calendar__nav-btn" @click="navigateMonth('next')">
          <BaseIcon icon-name="ArrowLeft" />
        </button>
        <button class="calendar__nav-btn" @click="navigateMonth('previous')">
          <BaseIcon icon-name="ArrowRight" />
        </button>
      </div>
      <h4>{{ calendarHeading }}</h4>
    </div>

    <CalendarWeekdays />
    <div class="calendar-grid">
      <CalendarMonthDayItem
        v-for="day in days.data"
        :key="day.date"
        :day="day"
        :selected-date="selectedDate"
        @selectThisDate="selectDate"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;

.calendar {
  background: $color-light-default;
  border-radius: 1.5rem;
  padding: 1rem 1.2rem;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: $box-shadow-card-hovered;
  }

  &-grid {
    padding: 0.3rem 0.6rem;
    direction: rtl;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }

  &__header {
    @extend .center-flex-vertically;
    justify-content: space-between;
    padding: 0.625rem;
  }

  &__nav-btn {
    background: transparent;
    border: none;
    border-radius: 0.5rem;
    padding: 0.3rem 0 0 0;
    cursor: pointer;
    transition: background-color 0.4s ease;

    &:hover {
      background-color: $color-rgba-black-100;
    }
  }
}
</style>
