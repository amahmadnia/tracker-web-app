<script setup>
import { computed } from 'vue'

import { filterTypes } from '@/utils/filterData'

import { useActivityStore } from '@/stores/activity'
import { useActivityTypeStore } from '@/stores/activityType'

import TagRemoveFilter from '@/components/dashboard/tag/TagRemoveFilter.vue'

const activityStore = useActivityStore()
const activityTypeStore = useActivityTypeStore()

const activeFilterActivityTypeRaw = computed(() => {
  const filter = activityStore.filters.find((filter) => filter.type === filterTypes.array)
  return !filter ? [] : filter.filterState.value
})

const activeFilterActivityType = computed(() => {
  const activityTypes = activityTypeStore.activityTypes
  return activityTypes.filter(({ _id }) => activeFilterActivityTypeRaw.value.includes(_id))
})

const removeFilter = (type, id = '') => {
  if (type === filterTypes.array) activityStore.removeFilterItemOfArray(filterTypes.array, id)
  else if (type === filterTypes.dateRange) activityStore.removeFilterDate()
}
</script>

<template>
  <div class="activities-active-filters" v-show="activeFilterActivityType">
    <TagRemoveFilter
      v-for="activityType in activeFilterActivityType"
      :key="activityType"
      :filter-items="activityType.data.title"
      @click="removeFilter(filterTypes.array, activityType._id)"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;

.activities-active-filters {
  @extend .center-flex-vertically;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>
