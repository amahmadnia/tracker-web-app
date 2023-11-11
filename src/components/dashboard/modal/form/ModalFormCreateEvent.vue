<script setup>
import { computed, reactive, ref } from 'vue'
import { useForm } from 'vee-validate'
import moment from 'moment-jalaali'

import { useEventStore } from '@/stores/event'

import ModalSelectUser from '@/components/dashboard/modal/uncategorized/ModalSelectUser.vue'
import routerInfo from '@/plugins/router'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(['close'])

const eventStore = useEventStore()

const isModalOpen = reactive({
  selectUser: false
})
const selectedUsers = ref([])
const formValues = reactive({
  title: '',
  description: '',
  dueDate: '',
  time: '',
  users: []
})

const avatarListItems = computed(() => {
  return selectedUsers.value
})

const close = () => {
  emit('close')
}

const toggleModal = (action, modal) => {
  if (action === 'open') isModalOpen[modal] = true
  else if (action === 'close') isModalOpen[modal] = false
}

const setSelectedUsers = (users) => {
  selectedUsers.value = users
  toggleModal('close', 'selectUser')
}

const { handleSubmit } = useForm({
  validationSchema: {
    title: 'eventTitle',
    description: 'eventDescription',
    dueDate: 'eventDate',
    time: 'eventTime'
  }
})

const resetInputs = reactive({
  date: false,
  time: false
})

const resetCustomInputs = () => {
  resetInputs.date = true
  resetInputs.time = true
  resetInputs.users = true

  setTimeout(() => {
    resetInputs.date = false
    resetInputs.time = false
    resetInputs.users = false
  }, 2000)
}

const onSubmit = handleSubmit((values, { resetForm }) => {
  const { title, time, dueDate, description } = values

  formValues.title = title
  formValues.description = description
  formValues.time = time
  formValues.dueDate = moment(dueDate, 'jYYYY/jM/jD').format('YYYY-M-D')
  formValues.users = selectedUsers.value

  eventStore.createEvent(formValues, localStorage.getItem('userId'))

  resetCustomInputs()
  resetForm()

  emit('close')
})
</script>

<template>
  <BaseModal title="ثبت رویداد جدید" :open="open" @close="close" @confirm="onSubmit">
    <form @submit="onSubmit" class="form" :ref="formValues">
      {{ formValues }}
      <div class="form__row-text-input">
        <BaseInputText icon-name="NoteOutline" label="عنوان رویداد" name="title" />
      </div>

      <div class="form__row-text-input">
        <BaseInputTextarea label="توضیحات" name="description" icon-name="DocumentCopy" />
      </div>
      <div class="form__row-date-range">
        <BaseInputDatePicker input-name="dueDate" :reset-status="resetInputs.date" />
      </div>
      <div class="form__row-text-input">
        <BaseInputTimePicker name="time" placeholder="تا ساعت" width="100%" />
      </div>
      <div class="form__row-select-user">
        <BaseTag
          @click="toggleModal('open', 'selectUser')"
          :is-active="true"
          label="اضافه کردن +"
          class="form__row-select-user-tag"
        />
        <BaseAvatarList :avatars="avatarListItems" class="form__row-select-user-avatar-list" />

        <ModalSelectUser
          :open="isModalOpen.selectUser"
          @send-selected-user="setSelectedUsers"
          @close="toggleModal('close', 'selectUser')"
          mode="multiSelect"
        />
      </div>
    </form>
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

$form-row-margin-bottom: 0.8rem;

.form {
  padding: 2rem 2.25rem;
  width: 100%;

  .form__row {
    @extend .center-flex-horizontally;
    width: 100%;
    margin-bottom: 0.1rem;
  }

  &__row-text-input {
    @extend .form__row;
  }

  &__row-date-range {
    @extend .form__row;
  }

  &__row-select-user {
    @extend .center-flex-vertically;
    justify-content: flex-end;
    height: 4rem;
    padding: 0.4rem 0.5rem;
    margin-bottom: 0;

    &-tag {
      margin-bottom: 0.8rem;
    }

    &-avatar-list {
      margin-top: 0.5rem;
    }
  }
}
</style>
