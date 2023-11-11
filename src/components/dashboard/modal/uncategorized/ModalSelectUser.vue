<script setup>
import { computed, ref, watch } from 'vue'

import { useUserStore } from '@/stores/user'
import { useEventStore } from '@/stores/event'
import { filterTypes } from '@/utils/filterData'

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator(value) {
      return ['singleSelect', 'multiSelect'].includes(value)
    }
  },
  open: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['send-selected-user', 'close'])

const { users } = useUserStore()
const eventStore = useEventStore()

const searchState = ref('')
const filteredUsers = ref(users)
const selectedUsers = ref([])

const noUserIsSelected = computed(() => {
  const activeFilters = eventStore.filters.filter(
    ({ type, secondTarget }) => type === filterTypes.arrayMultiple && secondTarget === 'users'
  ) // check if user filter is active for events
  return Boolean(activeFilters.length)
})

watch(
  () => noUserIsSelected.value,
  (value) => {
    if (!value) selectedUsers.value = []
  }
)

const filterUsers = () => {
  const regex = new RegExp(searchState.value, 'i')

  filteredUsers.value = users.filter((user) => {
    return regex.test(user.firstName)
  })
}

const selectUser = (id) => {
  if (selectedUsers.value.includes(id)) {
    selectedUsers.value = selectedUsers.value.filter((userId) => userId !== id)
  } else {
    if (props.mode === 'singleSelect') selectedUsers.value = [id]
    else if (props.mode === 'multiSelect') selectedUsers.value = [...selectedUsers.value, id]
  }
}

const emitSelectedUsers = () => {
  emit('send-selected-user', selectedUsers.value)
  emit('close')
}

const isSelected = (id) => {
  return selectedUsers.value.includes(id)
}

const close = () => {
  emit('close')
}
</script>

<template>
  <BaseModal title="انتخاب کاربران" :open="open" @confirm="emitSelectedUsers" @close="close">
    <div class="select-user-modal">
      <div class="select-user-modal__search-box">
        <input
          v-model="searchState"
          @keyup="filterUsers"
          placeholder="جستجو..."
          class="select-user-modal__search-input"
          type="text"
        />
        <div class="select-user-modal__icon-box">
          <BaseIcon icon-name="SearchNormal" width="1.3rem" />
        </div>
      </div>
      <div class="select-user-modal__avatars">
        <div
          class="select-user-modal__avatar-container"
          v-for="user in filteredUsers"
          :key="user.id"
          @click="selectUser(user.id)"
        >
          <BaseAvatar
            image-source="@/assets/images/static-avatar-2.png"
            :is-selected="isSelected(user.id)"
            :class="{ 'select-user-modal__tag--selected': isSelected(user.id) }"
            size="big"
          />
          <div class="select-user-modal__avatar-label">
            {{ user.firstName }}
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.select-user-modal {
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  &__search-box {
    width: 85%;
    display: flex;
    justify-content: flex-end;
    padding: 0.4rem 0.5rem;
    margin: 0 auto 0.2rem;
    border-radius: 1rem;
    border: none;
    transition: outline 0.5s ease;
    background: $color-primary-100;
  }

  &__search-input {
    flex: 88% 0;
    direction: rtl;
    border: none;
    background: transparent;
    position: relative;
    z-index: 20;

    &:focus {
      outline: 0;
    }
  }

  &__icon-box {
    @extend .center-flex;
    flex: 0 12%;
    width: 2rem;
    margin: 0;
  }

  &-icon {
    flex: 7% 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__avatars {
    @extend .center-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1rem 1rem 0;
    list-style-type: none;
    max-height: 30rem;
    overflow-y: scroll;
    margin: 1rem 0.3rem 0 0;
  }

  &__avatar-container {
    @extend .center-flex;
    width: 5rem;
    flex-direction: column;
    margin: 0 0 0.7rem 1rem;
    padding: 0.2rem 0.3rem;

    &--selected {
      outline: 3px solid $color-primary-500;
    }
  }
  &__avatar-label {
    @include mixin.typographyPreset('body-1');
    margin-top: 0.1rem;
  }
}
</style>
