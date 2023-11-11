<script setup>
import { computed, reactive } from 'vue'

import { useUserStore } from '@/stores/user'
import { useEventStore } from '@/stores/event'
import { filterTypes } from '@/utils/filterData'

import ModalFilterDataDate from '@/components/dashboard/modal/filter/ModalFilterDataDate.vue'
import ModalSelectUser from '@/components/dashboard/modal/uncategorized/ModalSelectUser.vue'
import FilterEventsActiveFiltersUsers from '@/components/dashboard/filter/FilterEventsActiveFiltersUsers.vue'
import FilterEventsActiveFiltersDate from '@/components/dashboard/filter/FilterEventsActiveFiltersDate.vue'

const eventStore = useEventStore()
const userStore = useUserStore()

const isModalOpen = reactive({
  filtersList: false,
  userFilters: false,
  dateFilters: false
})

//get active filters and identify their name
const activeFilterUserRaw = computed(() => {
  const filter = eventStore.filters.find((filter) => filter.type === filterTypes.arrayMultiple)
  return !filter ? [] : filter.filterState.value
})
const activeFilterUser = computed(() => {
  const users = userStore.users
  return users.filter(({ id }) => activeFilterUserRaw.value.includes(id))
})

const activeFilterDateRange = computed(() => {
  const filter = eventStore.filters.find((filter) => filter.type === filterTypes.dateRange)
  return !filter ? { start: null, end: null } : filter.filterState.value
})

const toggleModal = (action, modal) => {
  if (action === 'open') isModalOpen[modal] = true
  else if (action === 'close') isModalOpen[modal] = false
}

const setFilters = (filterConfig) => {
  eventStore.setFilter(filterConfig)
}

const setUserFilters = (users) => {
  const filterConfig = {
    type: filterTypes.arrayMultiple,
    target: 'data',
    secondTarget: 'users',
    filterState: {
      value: users
    }
  }
  eventStore.setFilter(filterConfig)
}
</script>

<template>
  <div class="page-filters">
    <BaseTag :icon="true" label="فیلترها" @click="toggleModal('open', 'filtersList')">
      <template v-slot:icon><BaseIcon icon-name="FilterSmall" height="1rem" /></template>
    </BaseTag>
  </div>

  <BaseModal
    :open="isModalOpen.filtersList"
    @close="toggleModal('close', 'filtersList')"
    @confirm="toggleModal('close', 'filtersList')"
    title="فیلتر رویدادها"
  >
    <div class="filters">
      <ul class="filters__list">
        <li class="filters__list-item">
          <div class="filters__list-item-main" @click="toggleModal('open', 'userFilters')">
            <BaseIcon icon-name="ArrowLeftSmall" />
            کاربران
          </div>
          <div class="filters__list-item-active-filters" v-show="activeFilterUser">
            <FilterEventsActiveFiltersUsers />
          </div>
        </li>
        <li class="filters__list-item">
          <div class="filters__list-item-main" @click="toggleModal('open', 'dateFilters')">
            <BaseIcon icon-name="ArrowLeftSmall" />
            تاریخ
          </div>
          <div
            class="filters__list-item-active-filters"
            v-if="activeFilterDateRange.start && activeFilterDateRange.end"
          >
            <FilterEventsActiveFiltersDate />
          </div>
        </li>
      </ul>
    </div>
  </BaseModal>

  <ModalSelectUser
    :open="isModalOpen.userFilters"
    @close="toggleModal('close', 'userFilters')"
    @send-selected-user="setUserFilters"
    mode="multiSelect"
  />

  <ModalFilterDataDate
    :open="isModalOpen.dateFilters"
    @set-date="setFilters"
    @close="toggleModal('close', 'dateFilters')"
    entity="event"
  />
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;

.page-filters {
  display: flex;
  margin: 0;
  font-weight: bold;
  text-align: left;
  padding: 8px;
  border-radius: 8px;
  height: auto;
}

.filters {
  @extend .center-flex;
  width: 100%;
  padding: 0 1rem;

  &__list {
    width: 90%;
    list-style: none;
    text-align: right;
    padding: 1rem;
  }

  &__list-item {
    @extend .center-flex-vertically;
    flex-direction: column;
    width: 100%;
    padding: 1rem 0.3rem;
    justify-content: space-between;
    border-bottom: 1px solid $color-rgba-black-100;
    transition: background-color 0.2s ease;

    &:first-child {
      border-radius: 20px 20px 0 0;
    }

    &:last-child {
      border-bottom: none;
      border-radius: 0 0 20px 20px;
    }

    &-row {
      width: 100%;
    }

    &-main {
      @extend .filters__list-item-row;
      @extend .center-flex-vertically;
      justify-content: space-between;
      cursor: pointer;
      padding: 0.3rem;
      border-radius: 10px;

      &:hover {
        background: $color-rgba-black-100;
      }
    }

    &-active-filters {
      @extend .filters__list-item-row;
      @extend .center-flex-vertically;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
  }
}
</style>
