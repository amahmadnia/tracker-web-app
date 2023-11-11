<script setup>
import { computed } from 'vue'

const props = defineProps({
  displayBlock: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'کلیک کنید',
    validator: (value) => value.length <= 10
  }
})
const emit = defineEmits(['click'])

const buttonClassNames = computed(() => ({
  btn: true,
  'btn--block': props.displayBlock
}))

const buttonClick = () => {
  emit('click')
}
</script>

<template>
  <button type="button" :class="buttonClassNames" @click="buttonClick">
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.btn {
  @include mixin.typographyPreset('button-1');
  display: flex;
  height: 2.75rem;
  padding: 0 0.2rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 16px;
  border: none;
  background: $color-primary-600;
  color: $color-primary-100;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: $color-primary-800;
  }

  &:active {
    background-color: $color-primary-900;
  }

  &--block {
    width: 100%;
  }

  &--disabled,
  &--disabled:hover,
  &--disabled:active {
    background: $color-primary-300;
    cursor: not-allowed;
  }
}
</style>
