<script setup>
import { computed, toRef } from 'vue'

const props = defineProps({
  icon: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'برچسب'
  },
  color: {
    type: String,
    default: ''
  },
  coloredRandom: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  selectedTags: {
    type: Array,
    default: []
  }
})

const themes = ['red', 'blue', 'purple', 'orange']

const randomTheme = computed(() => {
  const randomIndex = Math.floor(Math.random() * themes.length)
  return themes[randomIndex]
})

const isActiveX = toRef(props, 'isActive')

const tagClassNames = computed(() => {
  const coloredRandom = props.coloredRandom

  return {
    'tag-btn--active': isActiveX.value,
    'tag-btn': true,
    'tag-btn--theme-red': coloredRandom && randomTheme.value === 'red',
    'tag-btn--theme-blue': coloredRandom && randomTheme.value === 'blue',
    'tag-btn--theme-purple': coloredRandom && randomTheme.value === 'purple',
    'tag-btn--theme-orange': coloredRandom && randomTheme.value === 'orange'
  }
})
</script>

<template>
  <div :class="tagClassNames">
    <span class="tag-btn__text"> {{ label }}</span>
    <span v-if="icon" class="tag-btn__icon">
      <slot name="icon"></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

$random-color-bg-red: #fff2f2;
$random-color-text-red: #e35053;
$random-color-bg-purple: #fff5ff;
$random-color-text-purple: #ae3ec9;
$random-color-bg-blue: #eff9ff;
$random-color-text-blue: #58c2fe;
$random-color-bg-orange: #fee6cf;
$random-color-text-orange: #e86e00;

.tag-btn {
  @extend .center-flex;
  padding: 0.1rem 0.5rem;
  margin: 0 0.4rem 0.3rem 0;
  border: none;
  border-radius: 0.75rem;
  color: $color-text-base-1;
  box-shadow: $box-shadow-normal;
  background: $color-light-surface;
  cursor: pointer;
  transition: all 0.2s ease;

  //random themes
  &--theme-red {
    background: $random-color-bg-red;
    color: $random-color-text-red;
  }

  &--theme-blue {
    background: $random-color-bg-blue;
    color: $random-color-text-blue;
  }

  &--theme-purple {
    background: $random-color-bg-purple;
    color: $random-color-text-purple;
  }

  &--theme-orange {
    background: $random-color-bg-orange;
    color: $random-color-text-orange;
  }

  &--active {
    background: $color-primary-300;
    color: $color-text-primary;
  }

  &--selected {
    outline: 0.2rem solid red;
  }

  &:hover {
    box-shadow: $box-shadow-tag-hovered;
  }

  &__text {
    @include mixin.typographyPreset('subtitle-1');
    font-size: 0.7rem;
  }

  &__icon {
    @extend .center-flex;
    margin-left: 0.2rem;
    width: 0.7rem;
  }
}
</style>
