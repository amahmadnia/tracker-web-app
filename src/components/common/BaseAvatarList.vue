<script setup>
import { computed } from 'vue'

import { persianDigits } from '@/utils/persianCharachters'

const props = defineProps({
  avatars: {
    type: Array,
    required: true
  }
})

const remainingAvatarsCount = computed(() => props.avatars.length - 5)

const remainingAvatars = computed(() => {
  if (remainingAvatarsCount.value <= 0) return null
  else {
    const farsi = persianDigits(String(remainingAvatarsCount.value))
    return `${'+' + farsi}`
  }
})

const visibleAvatars = computed(() => props.avatars.slice(0, 5))
</script>

<template>
  <ul class="base-avatar-list">
    <li v-for="avatar in visibleAvatars" class="base-avatar-list__avatar" :key="avatar">
      <BaseAvatar image-source="https://ui-avatars.com/api/?name=grhyfdt" />
    </li>
    <li v-if="remainingAvatars" class="base-avatar-list__placeholder">
      <BaseIcon icon-name="AvatarPlaceholder" size="big" />
      <div class="base-avatar-list__placeholder-text">{{ remainingAvatars }}</div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

$avatar-margin-right: -0.8rem;

.base-avatar-list {
  position: relative;
  padding: 0 0.4rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  margin-top: 0;
  list-style-type: none;

  &__avatar {
    margin-right: $avatar-margin-right;
    z-index: 0;

    &-img {
      width: 2.2rem;
      border-radius: 50%;
      border: 3px solid $color-light-default;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.5);
      }
    }

    &:first-child {
      margin-right: 0;
    }
  }

  &__placeholder {
    margin: 0.2rem $avatar-margin-right 0 0;
    transition: transform 0.2s ease;
    z-index: 1;
    transform: scale(1.1);
  }

  &__placeholder-text {
    @include mixin.typographyPreset('body-1');
    position: absolute;
    top: 6px;
    left: 7px;
    color: $color-light-default;
  }
}
</style>
