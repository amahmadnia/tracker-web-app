<script setup>
import { computed, toRef } from 'vue'

import { isToday as checkIsToday, compareDates } from '@/utils/dateJalali'
import { persianDigits } from '@/utils/persianCharachters'

const props = defineProps({
  day: Object,
  selectedDate: Object
})
const emit = defineEmits(['selectThisDate'])

const selectedDate = toRef(props, 'selectedDate')

const isToday = computed(() => checkIsToday(props.day.date))

const currentDayEventsCount = computed(() => {
  const count = props.day.eventsCount
  if (count === 0) return null
  else return persianDigits(String(count))
})

const isSelected = computed(() => {
  return compareDates(props.day.date, selectedDate.value.format('jYYYY-jM-jD'))
})

const classNames = computed(() => ({
  'month-day-item--not-current-month': !props.day.currentMonth,
  'month-day-item': true,
  'month-day-item--selected': isSelected.value,
  'month-day-item--today': isToday.value
}))

const text = computed(() => {
  const splitDateString = props.day.date.split('-')[2]
  return persianDigits(splitDateString)
})

const selectThisDate = () => {
  emit('selectThisDate', props.day.date)
}
</script>

<template>
  <div @click="selectThisDate" :class="classNames">
    <div v-show="currentDayEventsCount" class="month-day-item__events-count">
      {{ currentDayEventsCount }}
    </div>
    {{ text }}
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.month-day-item {
  @extend .center-flex;
  @include mixin.typographyPreset('body-1');
  min-height: 2.3rem;
  padding: 0.3rem 0 0 0;
  color: $color-text-base-1;
  transition: background-color 0.3s ease;
  border-radius: 1rem;
  cursor: pointer;
  position: relative;

  &--not-current-month {
    color: $color-text-disabled;
  }

  &--selected {
    background-color: $color-primary-600;
    color: $color-light-base;
    font-weight: bold;
  }

  &--today {
    border: 3px solid $color-primary-600;
    font-weight: bold;
  }

  &:hover {
    background: $color-rgba-black-200;
  }

  &__events-count {
    @include mixin.typographyPreset('caption');
    color: $color-light-default;
    background: $color-primary-800;
    width: 1rem;
    height: 1rem;
    padding: 0.1rem 0.4rem 0;
    position: absolute;
    top: -2px;
    right: -3px;
    border-radius: 50%;
  }
}
</style>
