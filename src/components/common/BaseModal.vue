<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({
  open: {
    type: Boolean,
    required: false
  },
  confirmButtonLabel: {
    type: String,
    default: 'تایید'
  },
  title: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['close', 'confirm'])

const close = () => {
  emit('close')
}

const confirm = () => {
  emit('confirm')
}

const handleKeyup = (event) => {
  if (event.keyCode === 27) close()
}

onMounted(() => document.addEventListener('keyup', handleKeyup))
onUnmounted(() => document.removeEventListener('keyup', handleKeyup))
</script>

<template>
  <transition name="fade">
    <div v-show="open" class="base-modal">
      <transition name="drop-in">
        <div class="base-modal__inner" v-show="open">
          <div class="base-modal__content">
            <h4 class="base-modal__heading">{{ title }}</h4>
            <slot></slot>
            <div class="base-modal__buttons">
              <BaseButton
                class="base-modal__confirm-button"
                @click="confirm"
                :label="confirmButtonLabel"
              />
              <BaseButton class="base-modal__cancel-button" @click="close" label="لغو" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;

.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $color-rgba-black-100;
  z-index: 100;
  padding: 3rem 0;

  &__inner {
    max-width: 30rem;
    margin: 0.2rem auto;
  }

  &__content {
    position: relative;
    @extend .center-flex;
    flex-direction: column;
    background-color: $color-light-base;
    border: none;
    background-clip: padding-box;
    border-radius: 20px;
    padding: 0.4rem;
  }

  &__heading {
    text-align: center;
  }

  &__buttons {
    width: 80%;
    margin: 0 auto 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__button {
    width: 49%;
    //margin-right: 0.5rem;
  }

  &__cancel-button {
    @extend .base-modal__button;
    border: 3px solid $color-primary-700;
    color: $color-primary-700;
    background: $color-light-surface;

    &:hover {
      color: $color-light-surface;
    }
  }

  &__confirm-button {
    @extend .base-modal__button;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.2s ease-out;
}
.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
