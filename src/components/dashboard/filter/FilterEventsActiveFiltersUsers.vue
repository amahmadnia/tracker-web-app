<script setup>
import { computed } from 'vue'

import { useEventStore } from '@/stores/event'
import { useUserStore } from '@/stores/user'
import { filterTypes } from '@/utils/filterData'

import TagRemoveFilter from '@/components/dashboard/tag/TagRemoveFilter.vue'

const eventStore = useEventStore()
const userStore = useUserStore()

//get active filters and identify their name
const activeFilterUserRaw = computed(() => {
  const filter = eventStore.filters.find((filter) => filter.type === filterTypes.arrayMultiple)
  return !filter ? [] : filter.filterState.value
})
const activeFilterUser = computed(() => {
  const users = userStore.users
  return users.filter(({ id }) => activeFilterUserRaw.value.includes(id))
})

const removeFilter = (type, id = '') => {
  if (type === filterTypes.arrayMultiple)
    eventStore.removeFilterItemOfArrayMultiple(filterTypes.array, id)
  else if (type === filterTypes.dateRange) eventStore.removeFilterDate()
}
</script>

<template>
  <div class="events-active-filters" v-show="activeFilterUser">
    <TagRemoveFilter
      v-for="user in activeFilterUser"
      :key="user"
      :filter-items="user.firstName"
      @click="removeFilter(filterTypes.arrayMultiple, user.id)"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;

.events-active-filters {
  @extend .center-flex-vertically;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>
