<script setup>
import { computed } from 'vue'
import { randomIntFromInterval } from '@/utils/indexGenerator'

const props = defineProps({
  altText: {
    type: String,
    default: 'آواتار'
  },
  imageSource: {
    type: String,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'small',
    validator(value) {
      return ['small', 'big'].includes(value)
    }
  },
  hoverEffect: {
    type: Boolean,
    default: true
  }
})

const avatarClassNames = computed(() => ({
  'base-avatar__img': props.size === 'small',
  'base-avatar__img--big': props.size === 'big',
  'base-avatar__img--selected': props.isSelected
}))

const imageSrcIndex = randomIntFromInterval(3, 8)

const imageUrl = new URL(`/src/assets/images/static-avatar-${imageSrcIndex}.png`, import.meta.url)
</script>

<template>
  <div class="base-avatar">
    <BaseIcon v-show="isSelected" class="base-avatar__active-icon" icon-name="TickCircle" />
    <div class="base-avatar__img-wrapper">
      <img :class="avatarClassNames" :src="imageUrl" :alt="altText" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;

$avatar-outline: $color-primary-400 4px solid;

.base-avatar {
  @extend .center-flex;
  width: 2.2rem;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    transition: all 0.05s ease;
  }

  &__img {
    width: 2.2rem;
    border-radius: 50%;
    border: 2px solid $color-light-default;
    transition: all 0.05s ease;

    &:hover {
      outline: $avatar-outline;
    }

    &--big {
      @extend .base-avatar__img;
      width: 3.2rem;
    }

    &--selected {
      @extend .base-avatar__img;
      outline: $avatar-outline;
    }
  }

  &__active-icon {
    position: absolute;
    top: 35px;
    right: 25px;
    z-index: 2;
    margin: 0;
  }
}
</style>
