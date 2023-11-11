<script setup>
import { computed } from 'vue'

import { convertAndFormatToJalaliDate } from '@/utils/dateJalali'
import { persianDigits } from '@/utils/persianCharachters'

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true, default: 'عنوان پیش فرض' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: true },
  users: { type: Array, required: true }
})

const truncatedDescription = computed(() => {
  const description = props.description

  const allowedLengthToDisplay = 40

  if (description.length < allowedLengthToDisplay) return description
  else return description.substring(0, allowedLengthToDisplay) + '...'
})

const formattedDate = computed(() => convertAndFormatToJalaliDate(props.date))
</script>

<template>
  <BaseCard :style="{ width: '24.5rem', height: '8rem' }" class="event-base-card" theme="gray">
    <article class="event-card">
      <div class="event-card__heading">
        <h5 class="event-card__heading-text">{{ title }}</h5>
      </div>
      <div class="event-card__content">{{ truncatedDescription }}</div>
      <div class="event-card__footer">
        <div class="event-card__footer-row">
          <div class="event-card__footer-row"><BaseAvatarList :avatars="users" /></div>

          <div class="event-card__footer-datetime">
            <div class="event-card__footer-datetime-icon">
              <BaseIcon icon-name="ClockBold" width="1.1rem" />
            </div>
            {{ persianDigits(time) }}
          </div>
          <div class="event-card__footer-datetime">
            <div class="event-card__footer-datetime-icon">
              <BaseIcon icon-name="CalendarBoldLight" width="1.1rem" />
            </div>
            <div class="event-card__footer-datetime-text">
              {{ formattedDate }}
            </div>
          </div>
        </div>
      </div>
    </article>
  </BaseCard>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.event-card {
  &__section {
    padding: 0.3rem 1rem;
    margin-bottom: 0.7rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__heading {
    @extend .event-card__section;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0.2rem;

    &-text {
      margin: 0;
    }
  }

  &__content {
    @extend .event-card__section;
    @include mixin.typographyPreset('body-2');
    text-align: right;
    direction: rtl;
    height: 2rem;
    padding-top: 0;
    margin: 0;
  }

  &__footer {
    @extend .event-card__section;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    &-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 0.6rem;
      padding: 0;
      max-height: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-datetime {
      @include mixin.typographyPreset('caption');
      @extend .center-flex;
      direction: rtl;
      margin-top: -0.2rem;

      &-text {
        width: 60px;
      }

      &-icon {
        @extend .center-flex;
        margin-left: 0.2rem;
      }

      &:first-child {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
