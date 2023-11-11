<script setup>
import { computed, reactive, ref } from 'vue'
import { useForm } from 'vee-validate'
import moment from 'moment-jalaali'

import { useActivityStore } from '@/stores/activity'
import { useActivityTypeStore } from '@/stores/activityType'

import IconInfoCircle from '@/components/common/icons/IconInfoCircle.vue'
import ModalSelectActivityType from '@/components/dashboard/modal/uncategorized/ModalSelectActivityType.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const activityStore = useActivityStore()
const activityTypeStore = useActivityTypeStore()

const { handleSubmit } = useForm({
  validationSchema: {
    title: 'activityTitle',
    description: 'activityDescription',
    startTime: 'activityStartTime',
    endTime: 'activityEndTime',
    date: 'activityDate'
  }
})

const isActivityTypeModalOpen = ref(false)
const selectedActivityTypeId = ref('')
const activityTypeError = ref('')
const pictures = ref([])
const imageUploadInputs = ref([1, 2, 3])
const formValues = reactive({
  title: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  activityTypeId: '',
  pictures: []
})

const activityTypeButtonLabel = computed(() => {
  const currentActivityTypeId = selectedActivityTypeId.value.trim()

  if (currentActivityTypeId === '') return 'نوع فعالیت'

  let title = ''
  activityTypeStore.activityTypes.forEach((activityType) => {
    if (activityType._id === currentActivityTypeId) title = activityType.data.title
  })

  return title
})

const addImageUploadInput = () => {
  imageUploadInputs.value = imageUploadInputs.value.push(imageUploadInputs.value.length + 1)
}

const setPicture = (imageData) => {
  pictures.value.push(imageData)
  addImageUploadInput()
}

const openActivityTypeModal = () => {
  isActivityTypeModalOpen.value = true
}
const closeActivityTypeModal = () => {
  isActivityTypeModalOpen.value = false
}

const close = () => {
  emit('close')
}

const validateSelectedActivityType = () => {
  selectedActivityTypeId.value === ''
    ? (activityTypeError.value = 'نوع فعالیت را انتخاب کنید')
    : (activityTypeError.value = '')
}

const setSelectedActivityType = (idsArray) => {
  selectedActivityTypeId.value = idsArray.filterState.value[0]
  validateSelectedActivityType()
  closeActivityTypeModal()
}

const onSubmit = handleSubmit((values, { resetField, resetForm }) => {
  const { title, startTime, endTime, date, description } = values
  const formData = new FormData()

  pictures.value.forEach(({ value, index }) => {
    formData.append(`pic-${index}`, value)
  })

  formValues.title = title
  formValues.description = description
  formValues.startTime = startTime
  formValues.endTime = endTime
  formValues.date = moment(date, 'jYYYY/jM/jD').format('YYYY-M-D')
  formValues.activityType = selectedActivityTypeId.value
  formValues.pictures = formData

  activityStore.createActivity(formValues)
  resetForm()

  close()
})
</script>

<template>
  <BaseModal title="ثبت فعالیت جدید" :open="open" @close="close" @confirm="onSubmit">
    <form @submit="onSubmit" class="form" :ref="formValues">
      <div class="form__row-image-upload">
        <BaseInputImageUpload
          v-for="input in imageUploadInputs"
          :key="input"
          @send-image-data="setPicture"
          @click="addImageUploadInput"
          class="form__input-image-upload"
        />
      </div>
      <div class="form__row-text-input">
        <BaseInputText icon-name="User" label="عنوان فعالیت" name="title" />
      </div>
      <div class="form__row-text-input">
        <BaseInputTextarea label="توضیحات" name="description" icon-name="DocumentCopy" />
      </div>

      <div class="form__row-date-range">
        <BaseInputDatePicker />
      </div>
      <div class="form__row-text-input">
        <BaseInputTimePicker name="endTime" placeholder="تا ساعت" />
        <BaseInputTimePicker name="startTime" placeholder="از ساعت" />
      </div>

      <div class="form__row-activity-type">
        <div class="base-input">
          <div class="base-input__box">
            <button type="button" class="form__activity-type-btn" @click="openActivityTypeModal">
              {{ activityTypeButtonLabel }}
            </button>
            <div class="base-input__icon-box">
              <BaseIcon icon-name="WeightOutline" width="1.3rem" />
            </div>
            <ModalSelectActivityType
              :open="isActivityTypeModalOpen"
              mode="singleSelect"
              @close="closeActivityTypeModal"
              @set-activity-types="setSelectedActivityType"
            />
          </div>
          <div class="base-input__message" v-show="activityTypeError">
            <div
              class="base-input__message-text"
              :class="{ 'base-input__message--error': activityTypeError }"
            >
              {{ activityTypeError }}
            </div>
            <div class="base-input__message-icon">
              <IconInfoCircle />
            </div>
          </div>
        </div>
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

  &__row {
    @extend .center-flex-horizontally;
    width: 100%;
    margin-bottom: 1rem;
  }

  &__row-image-upload {
    display: flex;
    margin-bottom: $form-row-margin-bottom;
    height: 8rem;
    overflow-x: auto;
    padding: 0.6rem 0;
  }

  &__row-text-input {
    @extend .form__row;
  }

  &__row-date-range {
    @extend .form__row;
  }

  &__row-activity-type {
    @extend .form__row;
  }

  &__activity-type-btn {
    @include mixin.typographyPreset('subtitle-1');
    color: $color-text-base-2;
    background: none;
    border: none;
  }

  &__input-image-upload {
    margin: 0 0 0 1rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
