<script setup>
import { persianDigits } from '@/utils/persianCharachters'

import CardActionButton from '@/components/dashboard/card/CardActionButton.vue'

defineProps({
  title: { type: String, default: 'عنوان پیش فرض' },
  date: { type: String, default: '1400-10-23' }
})
</script>

<template>
  <BaseCard :style="{ width: '15rem', height: '7rem' }" class="activity-base-card">
    <article class="activity-card">
      <div class="activity-card__heading">
        <CardActionButton />
        <h5 class="activity-card__heading-text">{{ title }}</h5>
      </div>
      <div class="activity-card__footer">
        <div class="activity-card__footer-datetime">
          <div class="activity-card__footer-datetime-icon">
            <BaseIcon icon-name="CalendarBold" width="1.1rem" />
          </div>
          {{ persianDigits('1400-22-12') }}
        </div>
      </div>
    </article>
  </BaseCard>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.activity-card {
  .activity-card__section {
    padding: 0.3rem 1rem;
    margin-bottom: 0.7rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__heading {
    @extend .activity-card__section;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-text {
      margin: 0;
    }
  }

  &__content {
    @extend .activity-card__section;
    text-align: right;
    direction: rtl;
    height: 5rem;
  }

  &__picture {
    @extend .activity-card__section;
    display: flex;
    align-items: center;

    &-img {
      border-radius: $border-radius-card-picture;
      width: 100%;
      height: 9rem;
    }
  }

  &__divider {
    width: 85%;
    border: 1px $color-rgba-black-100 solid;
  }
  &__footer {
    @extend .activity-card__section;
    text-align: right;
    display: flex;
    justify-content: flex-end;

    &-datetime {
      @include mixin.typographyPreset('caption');
      @extend .center-flex;
      direction: rtl;

      &-icon {
        @extend .center-flex;
        margin-left: 0.2rem;
      }

      &:first-child {
        margin-right: 0.2rem;
      }
    }

    &-tag {
      @extend .activity-card__section;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
