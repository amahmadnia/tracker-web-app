<script setup>
const props = defineProps({
  theme: {
    type: String,
    default: ''
  }
})

const baseCardClassNames = {
  'base-card--gray': props.theme === 'gray',
  'base-card': props.theme === ''
}
</script>

<template>
  <div class="base-card-container">
    <div :class="baseCardClassNames">
      <div class="base-card__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.base-card {
  border-radius: 20px;
  width: 100%;
  height: 100%;
  box-shadow: $box-shadow-normal;
  background: $color-light-surface;
  padding: 0.7rem 0;
  margin: 0 0 0.6rem 0.5rem;
  transition: all 0.3s;

  &:hover {
    box-shadow: $box-shadow-card-hovered;
  }

  &--gray {
    @extend .base-card;
    background: $color-light-default;
  }

  &__content {
    height: 100%;
  }
}
</style>
