<script setup>
import { reactive, ref } from 'vue'

import ModalFormCreateEvent from '@/components/dashboard/modal/form/ModalFormCreateEvent.vue'
import ModalFormCreateActivity from '@/components/dashboard/modal/form/ModalFormCreateActivity.vue'

const isActionMenuOpen = ref(false)
const isModalVisible = reactive({
  formNewActivity: false,
  formNewEvent: false
})

const toggleMenu = () => {
  isActionMenuOpen.value = !isActionMenuOpen.value
}

const toggleModal = (action, modal) => {
  if (action === 'open') isModalVisible[modal] = true
  else if (action === 'close') isModalVisible[modal] = false
}
</script>

<template>
  <div class="floating-button" @click="toggleMenu">
    <div class="floating-button__item">
      <button
        :class="{ 'floating-button__button-1--transformed': isActionMenuOpen }"
        @click="toggleModal('open', 'formNewEvent')"
        class="floating-button__button"
      >
        <BaseIcon icon-name="Flash" theme="warning" />
      </button>
    </div>
    <div class="floating-button__item">
      <button
        class="floating-button__button"
        :class="{ 'floating-button__button-2--transformed': isActionMenuOpen }"
      >
        <BaseIcon icon-name="WeightBold" />
      </button>
    </div>

    <button
      class="floating-button__button"
      :class="{ 'floating-button__button-3--transformed': isActionMenuOpen }"
      @click="toggleModal('open', 'formNewActivity')"
    >
      <BaseIcon icon-name="Note" theme="warning" />
    </button>
    <div
      class="floating-button__icon"
      :class="{ 'floating-button__icon--transformed': isActionMenuOpen }"
    >
      <BaseIcon icon-name="AddCircle" size="big" />
    </div>
    <div
      class="floating-button__overlay"
      :class="{ 'floating-button__overlay--transformed': isActionMenuOpen }"
    ></div>
  </div>
  <ModalFormCreateActivity
    :open="isModalVisible.formNewActivity"
    @close="toggleModal('close', 'formNewActivity')"
  />
  <ModalFormCreateEvent
    :open="isModalVisible.formNewEvent"
    @close="toggleModal('close', 'formNewEvent')"
  />
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.floating-button {
  @extend .center-flex-vertically;
  position: fixed;
  bottom: 140px;
  right: 11.2px;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
  &__item {
    display: flex;
  }

  &__overlay {
    height: 1px;
    width: 1px;
    transition-duration: 0.5s;
    border-radius: 50%;
    position: absolute;
    top: 16px;
    background: $color-rgba-black-600;

    &--transformed {
      transform: scale(5000);
      transition-duration: 0.6s;
    }
  }

  &__button {
    @extend .center-flex;
    margin: 0 0 0.625rem 0;
    background-color: $color-light-surface;
    color: $color-text-base-1;
    border: none;
    border-radius: 16px;
    padding: 1rem;
    cursor: pointer;
    position: absolute;
    right: -240px;
    transition: all 0.3s ease;
    z-index: 20;

    &-1--transformed {
      transform: translate(-256px, -128px);
    }
    &-2--transformed {
      transform: translate(-325px, -88px);
    }
    &-3--transformed {
      transform: translate(-352px, -16px);
    }
  }

  &__icon {
    @extend .center-flex;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin: 0 0 0.625rem 0;
    z-index: 25;
    transition: transform 0.3s ease;
  }
}
</style>
