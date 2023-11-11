<script setup>
import { computed } from 'vue'

import { persianDigits } from '@/utils/persianCharachters'

const props = defineProps({
  activityTypeInfo: {
    type: Object,
    required: true
  }
})

const isEmpty = computed(() => Object.keys(props.activityTypeInfo).length === 0)
const count = computed(() => persianDigits(String(props.activityTypeInfo.count)))
const name = computed(() => persianDigits(String(props.activityTypeInfo.name)))
</script>

<template>
  <BaseCard class="card-report-activities-highest">
    <div class="highest-activity-type-wrapper">
      <div v-if="isEmpty" class="highest-activity-type--empty">
        <div class="highest-activity-type">
          <img
            src="../../../assets/svgs/HighestActivityEmpty.svg"
            alt=""
            class="highest-activity-type__img"
          />
          <div class="highest-activity-type__text-overlay">{{ persianDigits('1') }}</div>
        </div>
        <p class="highest-activity-type__count--empty">فعالیت</p>
      </div>
      <div v-else class="highest-activity-type-card">
        <div class="highest-activity-type">
          <img src="../../../assets/svgs/Vector.svg" alt="" class="highest-activity-type__img" />
          <div class="highest-activity-type__text-overlay">{{ persianDigits('1') }}</div>
        </div>
        <p class="highest-activity-type__title">
          {{ name }}
        </p>
        <p class="highest-activity-type__count">
          <span>فعالیت</span><span>{{ count }}</span>
        </p>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;
@use '@/assets/styles/sass/layout/dashboard' as *;

.card-report-activities-highest {
  height: 200px;
}

.highest-activity-type-wrapper {
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 1rem;
}

.highest-activity-type {
  position: relative;
  margin-top: 2rem;

  &-card {
    @extend .center-flex;
    flex-direction: column;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__text-overlay {
    @include mixin.typographyPreset('headline-3');
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $color-light-base;
    z-index: 0;
  }

  &__row {
    margin: 0.5rem 0 0 0;
  }
  &__title {
    @include mixin.typographyPreset('headline-5');
    @extend .highest-activity-type__row;
  }
  &__count {
    @include mixin.typographyPreset('subtitle-1');
    @extend .highest-activity-type__row;
    display: flex;

    span {
      margin-right: 0.3rem;
    }

    &--empty {
      @extend .highest-activity-type__count;
      @extend .center-flex;
    }
  }
}
</style>
