<script setup>
import { computed } from 'vue'

import { useActivityTypeStore } from '@/stores/activityType'
import { persianDigits } from '@/utils/persianCharachters'
import { convertAndFormatToJalaliDate } from '@/utils/dateJalali'

import CardActionButton from '@/components/dashboard/card/CardActionButton.vue'

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true, default: 'عنوان پیش فرض' },
  date: { type: String, required: true },
  timeRange: { type: String, required: true },
  description: { type: String, required: true },
  activityType: { type: String, required: true }
})

const activityTypeStore = useActivityTypeStore()

const activityTypeTitle = computed(() => {
  const matchedActivityType = activityTypeStore.activityTypes.find(
    (type) => type._id === props.activityType
  )
  return matchedActivityType?.data?.title
})

const truncatedDescription = computed(() => {
  const description = props.description
  const allowedLengthToDisplay = 80

  if (description.length < allowedLengthToDisplay) return persianDigits(description)
  else {
    const truncated = description.substring(0, allowedLengthToDisplay) + '...'
    return persianDigits(truncated)
  }
})

const formattedDate = computed(() => convertAndFormatToJalaliDate(props.date))
const time = computed(() => persianDigits(props.timeRange))
</script>

<template>
  <BaseCard :style="{ width: '15rem', height: '26rem' }" class="activity-base-card">
    <article class="activity-card">
      <div class="activity-card__picture">
        <img class="activity-card__picture-img" src="https://picsum.photos/300/200" alt="" />
      </div>
      <div class="activity-card__heading">
        <CardActionButton entity="activity" :item-id="id" />
        <h5 class="activity-card__heading-text">{{ title }}</h5>
      </div>
      <div class="activity-card__content">{{ truncatedDescription }}</div>
      <hr class="activity-card__divider" />
      <div class="activity-card__footer">
        <div class="activity-card__footer-datetime">
          <div class="activity-card__footer-datetime-icon">
            <BaseIcon icon-name="CalendarBoldLight" width="1.1rem" />
          </div>
          {{ formattedDate }}
        </div>
        <div class="activity-card__footer-datetime">
          <div class="activity-card__footer-datetime-icon">
            <BaseIcon icon-name="ClockBold" width="1.1rem" />
          </div>
          {{ time }}
        </div>
      </div>
      <div class="activity-card__footer-tag">
        <BaseTag :colored-random="true" :label="activityTypeTitle" />
      </div>
    </article>
  </BaseCard>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.activity-card {
  &__section {
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
    word-wrap: break-word;
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
        margin-left: 0.1rem;
        transform: scale(0.8);
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
