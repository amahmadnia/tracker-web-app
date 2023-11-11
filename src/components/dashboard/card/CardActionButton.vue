<script setup>
import { computed, ref } from 'vue'

import { useActivityStore } from '@/stores/activity'
import { useEventStore } from '@/stores/event'
import BaseIcon from '@/components/common/BaseIcon.vue'

const activityStore = useActivityStore()
const eventStore = useEventStore()

const props = defineProps({
  itemId: { type: String, default: null },
  entity: { type: String, default: null }
})

const translatedEntity = computed(() => {
  let name = null

  if (props.entity === 'event') name = 'رویداد'
  else if (props.entity === 'activity') name = 'فعالیت'

  return name
})

const isMenuOpen = ref(false)
const isModalOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const openModal = () => {
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}
const deleteItem = (id, entity) => {
  //validate entity type
  if (!['activity', 'event'].includes(entity)) return false

  if (entity === 'event') eventStore.deleteEvent(id)
  else if (entity === 'activity') activityStore.deleteActivity(id)

  closeModal()
}
</script>

<template>
  <div class="action-btn">
    <div class="action-btn__btn" @click="toggleMenu">
      <BaseIcon icon-name="More" />
    </div>
    <div v-show="isMenuOpen" class="action-btn__menu">
      <button class="action-btn__menu-item" @click="openModal">
        حذف
        <BaseIcon icon-name="TrashBold" class="action-btn__menu-item-icon" />
      </button>
      <button class="action-btn__menu-item">
        ویرایش
        <BaseIcon icon-name="EditBold" class="action-btn__menu-item-icon--edit" />
      </button>
    </div>
  </div>
  <BaseModal
    :open="isModalOpen"
    @close="closeModal"
    @confirm="deleteItem(itemId, entity)"
    :title="`حذف ${translatedEntity}`"
  >
    <p class="delete-modal__text">آیا از حذف این {{ translatedEntity }} مطمین هستید؟</p>
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.action-btn {
  position: relative;
  z-index: 0;

  &__btn {
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    padding: 0.1rem 0.1rem;

    &:hover {
      background: $color-rgba-black-100;
    }
  }

  &__menu {
    background: $color-light-surface;
    border-radius: 0 0.7rem 0.7rem 0.7rem;
    padding: 0.5rem 0.7rem;
    position: absolute;
    top: 25px;
    left: 5px;
    width: 5.5rem;
    box-shadow: $box-shadow-heavy;

    &-item {
      @include mixin.typographyPreset('caption');
      @extend .center-flex;
      width: 100%;
      margin: 0 0 0.2rem 0.3rem;
      border-radius: 0.3rem;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      background: transparent;

      &:hover {
        background: $color-light-default;
      }

      &-icon {
        transform: scale(0.6);
        margin-bottom: 0.2rem;

        &--edit {
          transform: scale(0.8);
        }
      }
    }
  }
}

.delete-modal {
  &__text {
    text-align: center;
  }
  &__buttons {
    @extend .center-flex-horizontally;
  }
}
</style>
