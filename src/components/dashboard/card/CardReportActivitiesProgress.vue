<script setup>
import { computed } from 'vue'

const props = defineProps({
  mostRepeatedActivities: {
    type: Object,
    required: true
  }
})

const isEmpty = computed(() => props.mostRepeatedActivities.length === 0)

const cardTitleClassName = computed(() =>
  isEmpty.value ? 'progress-report__title--empty' : 'progress-report__title'
)

const progressBarMode = computed(() => {
  return props.mostRepeatedActivities.map((activity) => {
    let themedActivity = activity

    if (activity.mode === 'success') themedActivity.mode = 'green'
    else if (activity.mode === 'warning') themedActivity.mode = 'yellow'
    else if (activity.mode === 'failure') themedActivity.mode = 'orange'

    return themedActivity
  })
})
</script>

<template>
  <BaseCard class="progress-report-base-card">
    <div class="progress-report">
      <h3 :class="cardTitleClassName">بیشترین ها</h3>
      <p v-if="isEmpty" class="progress-report__empty-text">اولین فعالیت خودت را بساز</p>
      <div
        v-for="activityType in mostRepeatedActivities"
        class="progress-report__row"
        :key="activityType.progress"
      >
        <div class="progress-report__bar">
          <BaseProgressBar
            :value="activityType.progress"
            :color="activityType.mode"
            :max="100"
            :count="activityType.count"
          />
        </div>
        <div class="progress-report__label">{{ activityType.name }}</div>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;
@use '@/assets/styles/sass/layout/dashboard' as *;

.progress-report-base-card {
  height: 200px;
}

.progress-report {
  @include mixin.typographyPreset('body-1');
  width: 100%;

  &__title {
    text-align: center;

    &--empty {
      @extend .progress-report__title;
      @include mixin.typographyPreset('headline-6');

      margin-top: 3rem;
    }
  }

  &__row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-height: 2rem;
    padding: 0 1rem;
    margin-bottom: 1rem;
  }

  &__bar {
    display: flex;
    justify-content: flex-end;
    width: 290px;
    margin-left: 0.7rem;
  }

  &__label {
    @include mixin.typographyPreset('body-2');
    width: 120px;
    text-align: right;
  }

  &__count {
    width: 5%;
    text-align: center;
  }

  &__empty-text {
    text-align: center;
    margin-top: -0.8rem;
    @include mixin.typographyPreset('body-1');
  }
}
</style>
