<script setup>
import { computed } from 'vue'
import { persianDigits } from '@/utils/persianCharachters'

const { value, max, width, color, count } = defineProps({
  value: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  width: {
    type: String,
    default: '90%'
  },
  color: {
    type: String,
    default: 'orange'
  }
})

const progressStyle = computed(() => ({
  width: `${(value / max) * 100}%`
}))

const progressClassNames = computed(() => ({
  'progress--theme-green': color === 'success',
  'progress--theme-yellow': color === 'warning',
  'progress--theme-orange': color === 'failure'
}))

const countString = computed(() => persianDigits(String(count)))
</script>

<template>
  <div class="progress-bar-count">
    {{ countString }}
  </div>
  <div class="progress-bar" :class="progressClassNames" :style="{ width: progressStyle.width }">
    <div :style="{ width: '50px' }"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/utils/mixins' as mixin;

.progress-bar {
  direction: rtl;
  height: 0.5rem;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 10px;
  transition: width 0.3s ease;

  &--theme-green {
    @extend .progress;
    background-color: #4caf50;
  }

  &--theme-yellow {
    @extend .progress;
    background-color: #ffbf00;
  }

  &--theme-orange {
    @extend .progress;
    background-color: #f7953b;
  }
}

.progress-bar-count {
  @include mixin.typographyPreset('body-2');
  width: 20px;
  height: 20px;
  text-align: center;
  padding: 0 0 0 0;
  position: relative;
  bottom: 3px;
}
</style>
