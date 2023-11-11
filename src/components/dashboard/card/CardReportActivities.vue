<script setup>
import { computed } from 'vue'

import { useActivityStore } from '@/stores/activity'
import { convertGregorianToJalali, getDateInfoInPersian } from '@/utils/dateJalali'

import CardReportActivitiesMenu from '@/components/dashboard/card/CardReportActivitiesMenu.vue'

const activityStore = useActivityStore()

const props = defineProps([
  'selectedReportActivityType',
  'firstCategorizedActivityType',
  'categorizedActivityTypes',
  'filteredActivities'
])

const slicedActivities = computed(() => props.filteredActivities?.activities?.slice(0, 3))

const onSelectActivityType = (val) => {
  activityStore.setSelectedReportActivityType(val)
}

const isEmpty = computed(() => {
  const length = slicedActivities.value?.length
  if (length) return length === 0
  else return true
})
</script>

<template>
  <BaseCard>
    <div v-if="isEmpty" class="activity-report--empty">
      <div class="activity-report__placeholder-title">خلاصه گزارش</div>
      <div class="activity-report__placeholder-content">اولین فعالیت خود را بساز</div>
    </div>
    <div v-else class="activity-report">
      <div class="activity-report__select-box">
        <CardReportActivitiesMenu
          :label="
            selectedReportActivityType === ''
              ? firstCategorizedActivityType
              : selectedReportActivityType
          "
          :options="categorizedActivityTypes"
          @on-select-activity-type="onSelectActivityType"
        />
      </div>
      <div class="activity-report__items">
        <div v-for="activity in slicedActivities" class="activity-report__row" key="_id">
          <div class="activity-report__row-date">
            <span
              v-for="dateSubItem in getDateInfoInPersian(convertGregorianToJalali(activity.date))"
              class="activity-report__row-date-span"
            >
              {{ dateSubItem }}
            </span>
          </div>
          <div class="activity-report__row-description">
            <div class="activity-report__row-description-text">
              {{ activity.title }}
            </div>
            <div class="activity-report__row-description-bullet">
              <BaseIcon icon-name="Bullet" width="8" height="8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/layout/dashboard' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.activity-report {
  width: 25rem;
  height: 180px;
  padding: 0.5rem 2rem;

  &__items {
    height: 7rem;
    overflow: auto;
    padding: 0 0.5rem;
  }

  &__select-box {
    display: flex;
    justify-content: flex-end;
    margin: 0 0 0.7rem 0;
  }

  &__row {
    @include mixin.typographyPreset('body-1');
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 0.8rem 0;
    color: $color-gray-700;

    &-description {
      @extend .center-flex;

      &-bullet {
        margin: 0 0 -1rem 0.5rem;
      }
    }

    &-date {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &-span {
        margin: 0 0.2rem 0 0;
      }
    }
  }

  &--empty {
    @extend .activity-report;
    padding: 3rem 0;
  }

  &__placeholder {
    text-align: center;
  }

  &__placeholder-title {
    @extend .activity-report__placeholder;
    @include mixin.typographyPreset('headline-6');
    margin-bottom: 0.3rem;
  }

  &__placeholder-content {
    @extend .activity-report__placeholder;
    @include mixin.typographyPreset('body-1');
  }
}
</style>
