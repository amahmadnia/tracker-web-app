<script setup>
import { computed } from 'vue'

import { convertAndFormatToJalaliDate } from '@/utils/dateJalali'
import { persianDigits } from '@/utils/persianCharachters'

import CardActionButton from '@/components/dashboard/card/CardActionButton.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

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
  const allowedLengthToDisplay = 70

  if (description.length < allowedLengthToDisplay) return persianDigits(description)
  else {
    const truncated = description.substring(0, allowedLengthToDisplay) + '...'
    return persianDigits(truncated)
  }
})

const creatorLabel = computed(() => {
  const firstName = authStore.user.firstName
  const lastName = authStore.user.lastName
  return `${firstName} ${lastName}`
})

const formattedTime = computed(() => persianDigits(props.time))
</script>

<template>
  <BaseCard :style="{ width: '22rem', height: '12.5rem' }" class="event-base-card">
    <article class="event-card">
      <div class="event-card__heading">
        <CardActionButton entity="event" :item-id="id" />
        <h5 class="event-card__heading-text">{{ title }}</h5>
      </div>
      <div class="event-card__content">{{ truncatedDescription }}</div>
      <hr class="event-card__divider" />
      <div class="event-card__footer">
        <div class="event-card__footer-row">
          <div class="event-card__footer-datetime">
            <div class="event-card__footer-datetime-icon">
              <BaseIcon icon-name="UserBold" width="1.1rem" />
            </div>
            {{ creatorLabel }}
          </div>
          <div class="event-card__footer-datetime">
            <div class="event-card__footer-datetime-icon">
              <BaseIcon icon-name="Time" width="1.1rem" />
            </div>
            {{ formattedTime }}
          </div>
          <div class="event-card__footer-datetime">
            <div class="event-card__footer-datetime-icon">
              <BaseIcon icon-name="CalendarBold" width="1.1rem" />
            </div>
            {{ convertAndFormatToJalaliDate(date) }}
          </div>
        </div>
        <div class="event-card__footer-avatars"><BaseAvatarList :avatars="users" /></div>
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
    padding: 0.3rem 1.4rem;
    margin-bottom: 0.7rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__heading {
    @extend .event-card__section;
    display: flex;
    align-items: center;
    justify-content: space-between;

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
  }

  &__divider {
    width: 88%;
    border: 1px $color-rgba-black-100 solid;
  }
  &__footer {
    @extend .event-card__section;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    &-row {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin-bottom: 0.6rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-datetime {
      @include mixin.typographyPreset('caption');
      @extend .center-flex;
      direction: rtl;
      margin-left: 0.5rem;
      margin-bottom: 0.2rem;

      &-icon {
        @extend .center-flex;
        margin-left: 0.1rem;
        transform: scale(0.8);
      }

      &:first-child {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
