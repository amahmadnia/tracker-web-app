<script setup>
import { useRouter } from 'vue-router'
import { computed, reactive, ref, watch } from 'vue'

import { useActivityStore } from '@/stores/activity'
import { useEventStore } from '@/stores/event'
import { filterTypes } from '@/utils/filterData'
import routerConfig from '@/plugins/router'

const activityStore = useActivityStore()
const eventStore = useEventStore()

const router = useRouter()

const routeName = computed(() => {
  const name = router.currentRoute.value.name
  const routesNames = routerConfig.dashboard
  return {
    activity: name === routesNames.activity.name,
    event: name === routesNames.event.name
  }
})

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  entity: {
    type: String,
    required: true,
    validator(value) {
      return value === 'activity' || value === 'event'
    }
  }
})

const emit = defineEmits(['close', 'set-date'])

const dateRangeInputValue = ref([])
const dateRange = reactive({
  start: null,
  end: null
})

const isFilterApplied = computed(() => ({
  activity: activityStore.appliedFilters.dateFilter,
  event: eventStore.appliedFilters.dateFilter
}))

watch(isFilterApplied, () => {
  if (props.entity === 'activity') {
    if (!isFilterApplied.value.activity) dateRangeInputValue.value = []
  } else if (props.entity === 'event') {
    if (!isFilterApplied.value.event) dateRangeInputValue.value = []
  }
})

watch(dateRangeInputValue, (newDate) => {
  dateRange.start = newDate[0]
  dateRange.end = newDate[1]
})

const close = () => {
  dateRangeInputValue.value = []
  emit('close')
}

const emitDateValue = () => {
  const filterConfig = {
    type: filterTypes.dateRange,
    target: 'data',
    secondTarget: 'date',
    filterState: {
      value: dateRange
    }
  }

  if (routeName.value.activity) activityStore.setFilter(filterConfig)
  else if (routeName.value.event) {
    filterConfig.secondTarget = 'dueDate'

    eventStore.setFilter(filterConfig)
  }
  emit('close')
}
</script>

<template>
  <BaseModal title="تاریخ" :open="open" @confirm="emitDateValue" @close="close">
    <div class="date-modal">
      {{ isFilterApplied }}
      <div class="base-input">
        <div class="base-input__box">
          <input
            type="text"
            id="date-range-picker-custom-input"
            placeholder="تاریخ"
            class="base-input__input"
          />
          <DatePicker
            v-model="dateRangeInputValue"
            range
            locale="fa"
            format="YYYY-MM-DD"
            display-format="jYYYY-jMM-jDD"
            custom-input="#date-range-picker-custom-input"
          />
          <div class="base-input__icon-box">
            <BaseIcon icon-name="User" width="1.3rem" />
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.date-modal {
  width: 20rem;
  margin: 0 auto;
  padding: 1rem;
}
</style>
