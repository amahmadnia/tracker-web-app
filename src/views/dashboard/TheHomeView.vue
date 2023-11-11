<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useActivityStore } from '@/stores/activity'
import { useActivityTypeStore } from '@/stores/activityType'
import { useEventStore } from '@/stores/event'

import TheLayoutDashboard from '@/layouts/TheLayoutDashboard.vue'
import FilterReport from '@/components/dashboard/filter/FilterReport.vue'
import CardEmpty from '@/components/dashboard/card/CardEmpty.vue'
import CardActivity from '@/components/dashboard/card/CardActivity.vue'
import CardReportActivitiesHighest from '@/components/dashboard/card/CardReportActivitiesHighest.vue'
import CardReportActivitiesProgress from '@/components/dashboard/card/CardReportActivitiesProgress.vue'
import CardReportActivities from '@/components/dashboard/card/CardReportActivities.vue'
import CardActivityType from '@/components/dashboard/card/CardActivityType.vue'
import CardEvent from '@/components/dashboard/card/CardEvent.vue'

const activityStore = useActivityStore()
const activityTypeStore = useActivityTypeStore()

const eventStore = useEventStore()

const {
  reports,
  mostRepeatedActivities,
  categorizedActivityTypes,
  firstCategorizedActivityType,
  selectedReportActivityType,
  filteredActivities: filteredActivitiesFromStore
} = storeToRefs(activityStore)

const { activityTypes } = storeToRefs(activityTypeStore)

const selectedActivityType = ref(null)

onBeforeMount(async () => {
  selectedActivityType.value = firstCategorizedActivityType.value

  const userId = localStorage.getItem('userId')

  //fetch all necessary data in home view
  await activityStore.getReports('all')
  await eventStore.getEvents(userId)
  await activityStore.getActivities(userId)
  await activityTypeStore.getActivityTypes(userId)
})

const filteredActivities = computed(() => {
  const activityTypeTitle =
    selectedReportActivityType.value === ''
      ? firstCategorizedActivityType.value
      : selectedReportActivityType.value

  return reports.value.categorizedActivities.find(
    (activityType) => activityType.activityTypeTitle === activityTypeTitle
  )
})

const highestActivityType = computed(() => reports.value.mostRepeatedActivityType)

const eventsToDisplay = computed(() => {
  const events = eventStore.events
  const eventsCount = events.length
  const emptyCards = []

  if (eventsCount >= 3) return { cards: events.slice(0, 3) }
  else {
    const emptyCardsCount = 3 - eventsCount
    let result = events

    for (let emptyCardIndex = 0; emptyCardIndex < emptyCardsCount; emptyCardIndex++) {
      emptyCards.push(null)
    }

    return {
      cards: result,
      emptyCards
    }
  }
})

const activitiesToDisplay = computed(() => {
  const activitiesCount = filteredActivitiesFromStore.value.length
  const emptyCards = []

  if (activitiesCount >= 4) return { cards: filteredActivitiesFromStore.value.slice(0, 4) }
  else {
    const emptyCardsCount = 4 - activitiesCount
    let result = filteredActivitiesFromStore.value

    for (let emptyCardIndex = 0; emptyCardIndex < emptyCardsCount; emptyCardIndex++) {
      emptyCards.push(null)
    }

    return {
      cards: result,
      emptyCards
    }
  }
})

const homePageActivityTypes = computed(() => {
  const allActivityTypes = activityTypeStore.activityTypes
  return allActivityTypes.slice(0, 4)
})
</script>

<template>
  <TheLayoutDashboard>
    <section class="section">
      <div class="section-report">
        <FilterReport />
        <h3>گزارش</h3>
      </div>
      <div class="section__cards">
        <div class="card-report">
          <CardReportActivities
            :selected-report-activity-type="selectedReportActivityType"
            :first-categorized-activity-type="firstCategorizedActivityType"
            :categorized-activity-types="categorizedActivityTypes"
            :filtered-activities="filteredActivities"
          />
        </div>
        <div class="card-report">
          <CardReportActivitiesProgress :most-repeated-activities="mostRepeatedActivities" />
        </div>
        <div class="card-report">
          <CardReportActivitiesHighest :activity-type-info="highestActivityType" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section__header">
        <h3>رویداد ها</h3>
      </div>
      <div class="section__cards">
        <div
          class="event-card-container--empty"
          v-for="emptyCard in eventsToDisplay.emptyCards"
          :key="emptyCard"
        >
          <CardEmpty />
        </div>
        <div
          class="event-card-container"
          v-for="{ _id: id, data: event } in eventsToDisplay.cards"
          :key="id"
        >
          <CardEvent
            :id="id"
            :date="event.dueDate"
            :time="event.time"
            :title="event.title"
            :description="event.description"
            :users="event.users"
            :creator="'event.creator'"
          />
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section__header">
        <h3>فعالیت ها</h3>
      </div>
      <div class="section__cards">
        <div
          class="activity-card-container--empty"
          v-for="emptyCard in activitiesToDisplay.emptyCards"
          :key="emptyCard"
        >
          <CardEmpty />
        </div>
        <div
          class="activity-card-container"
          v-for="{ _id, data: activity } in activitiesToDisplay.cards"
          :key="_id"
        >
          <CardActivity
            :id="_id"
            :date="activity.date"
            :time-range="`${activity.endTime} تا ${activity.startTime}`"
            :title="activity.title"
            :description="activity.description"
            :activity-type="activity.activityType"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section__header">
        <h3>نوع فعالیت</h3>
      </div>
      <div class="section__cards-activity-type">
        <div
          class="activity-type-card-container"
          v-for="{ data: activityType } in homePageActivityTypes"
          :key="activityType.title"
        >
          <CardActivityType :date="'count'" :title="activityType.title" />
        </div>
      </div>
    </section>
  </TheLayoutDashboard>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;
@use '@/assets/styles/sass/layout/dashboard' as *;

.card {
  &-report {
    width: 40%;
    height: 12rem;

    &:first-of-type {
      width: 33%;
    }

    &:last-of-type {
      width: 25%;
    }
  }
}

.activity-card-container {
  &--empty {
    width: 15rem;
    height: 26rem;
  }
}

.event-card-container {
  &--empty {
    width: 22rem;
    height: 13rem;
  }
}

.activity-type-card-container {
  @extend .center-flex;
  width: 15rem;
}

.activity-report {
  width: 25rem;
  padding: 0.5rem 2.2rem;

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
    margin: 0 0 0.5rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: $color-gray-700;

    &-date {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &-span {
        margin: 0 0.2rem 0 0;
      }
    }
  }
}

.section {
  margin-bottom: 0.7rem;
  //background: lightblue;

  &-report {
    @extend .section__header;
    display: flex;

    justify-content: space-between;
    align-items: center;
  }

  &__cards {
    //background: lightgreen;
    padding: 1rem 1.5rem 1rem 0.5rem;
  }
  &__cards-activity-type {
    @extend .section__cards;
  }
}
</style>
