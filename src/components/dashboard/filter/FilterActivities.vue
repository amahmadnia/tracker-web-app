<script setup>
import { computed, reactive } from 'vue'

import { useActivityStore } from '@/stores/activity'
import { useActivityTypeStore } from '@/stores/activityType'
import { filterTypes } from '@/utils/filterData'

import ModalFilterDataDate from '@/components/dashboard/modal/filter/ModalFilterDataDate.vue'
import ModalSelectActivityType from '@/components/dashboard/modal/uncategorized/ModalSelectActivityType.vue'
import FilterActivitiesActiveFiltersActivityTypes from '@/components/dashboard/filter/FilterActivitiesActiveFiltersActivityTypes.vue'
import FilterActivitiesActiveFiltersDate from '@/components/dashboard/filter/FilterActivitiesActiveFiltersDate.vue'

const activityStore = useActivityStore()
const activityTypeStore = useActivityTypeStore()

const isModalVisible = reactive({
  filtersList: false,
  activityTypeFilters: false,
  dateFilters: false
})

const activeFilterActivityTypeRaw = computed(() => {
  const filter = activityStore.filters.find((filter) => filter.type === filterTypes.array)
  return !filter ? [] : filter.filterState.value
})
const activeFilterActivityType = computed(() => {
  const activityTypes = activityTypeStore.activityTypes
  return activityTypes.filter(({ id }) => activeFilterActivityTypeRaw.value.includes(id))
})

const activeFilterDateRange = computed(() => {
  const filter = activityStore.filters.find((filter) => filter.type === filterTypes.dateRange)
  return !filter ? { start: null, end: null } : filter.filterState.value
})

const openModal = (modalName) => {
  isModalVisible[modalName] = true
}

const closeModal = (modalName) => {
  isModalVisible[modalName] = false
}

const setFilters = (filterConfig) => {
  activityStore.setFilter(filterConfig)
}
</script>

<template>
  <div class="page-filters">
    <BaseTag :icon="true" label="فیلترها" @click="openModal('filtersList')">
      <template v-slot:icon><BaseIcon icon-name="FilterSmall" height="1rem" /></template>
    </BaseTag>
  </div>

  <BaseModal
    :open="isModalVisible.filtersList"
    @close="closeModal('filtersList')"
    @confirm="closeModal('filtersList')"
    title="فیلتر فعالیت ها"
  >
    <div class="filters">
      <ul class="filters__list">
        <li class="filters__list-item">
          <div class="filters__list-item-main" @click="openModal('activityTypeFilters')">
            <BaseIcon icon-name="ArrowLeftSmall" />
            نوع فعالیت
          </div>
          <div class="filters__list-item-active-filters" v-show="activeFilterActivityType">
            <FilterActivitiesActiveFiltersActivityTypes />
          </div>
        </li>
        <li class="filters__list-item">
          <div class="filters__list-item-main" @click="openModal('dateFilters')">
            <BaseIcon icon-name="ArrowLeftSmall" />
            تاریخ
          </div>
          <div
            class="filters__list-item-active-filters"
            v-if="activeFilterDateRange.start && activeFilterDateRange.end"
          >
            <FilterActivitiesActiveFiltersDate />
          </div>
        </li>
      </ul>
    </div>
  </BaseModal>
  <ModalSelectActivityType
    :open="isModalVisible.activityTypeFilters"
    @close="closeModal('activityTypeFilters')"
    @set-activity-types="setFilters"
    mode="multiSelect"
  />
  <ModalFilterDataDate
    :open="isModalVisible.dateFilters"
    @set-date="setFilters"
    @close="closeModal('dateFilters')"
    entity="activity"
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
      margin-bottom: 0.8rem;
      cursor: pointer;

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
