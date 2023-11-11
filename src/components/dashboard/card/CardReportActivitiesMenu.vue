<script setup>
import { ref } from 'vue'

defineProps({
  label: {
    type: String,
    default: 'عنوان پیش فرض'
  },
  options: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['onSelectActivityType'])

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const selectValue = (activityType) => {
  emit('onSelectActivityType', activityType)
}
</script>

<template>
  <div class="report-select-box">
    <div class="report-select-box__btn" @click="toggleMenu">
      <BaseIcon
        icon-name="SimpleArrowDown"
        width="1.2rem"
        height="1.2rem"
        class="report-select-box__button-icon"
      />{{ label }}
    </div>
    <div v-show="isMenuOpen" class="report-select-box__menu">
      <div
        v-for="option in options"
        :key="option"
        @click="selectValue(option)"
        class="report-select-box__menu-item"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.report-select-box {
  position: relative;
  margin-right: -0.5rem;

  &__btn {
    @include mixin.typographyPreset('headline-6');
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    border-radius: 0.8rem;
    padding: 0.3rem 0.4rem;
    cursor: pointer;
    margin: 0;

    &:hover {
      background: $color-rgba-black-100;
    }
  }

  &__button-icon {
    margin: 0.1rem 0.2rem 0 0;
  }

  &__menu {
    background: $color-light-default;
    box-shadow: $box-shadow-card-hovered;
    border-radius: 20px;
    padding: 0.2rem 0.3rem;
    position: absolute;
    top: 40px;
    right: 0;
    width: 13rem;
    min-height: 8rem;
  }

  &__menu-item {
    @include mixin.typographyPreset('body-1');
    width: 100%;
    margin: 0 0 0.2rem 0;
    border-radius: 0.3rem;
    background: $color-light-default;

    text-align: right;
    cursor: pointer;
    padding: 0.5rem 1rem;

    &:hover {
      background: $color-rgba-black-100;
    }
  }
}
</style>
