<script setup>
import { ref, toRef, watch } from 'vue'
import { useField } from 'vee-validate'

import IconInfoCircle from '@/components/common/icons/IconInfoCircle.vue'

const props = defineProps({
  inputName: {
    type: String,
    default: 'date'
  },
  resetStatus: {
    type: Object
  }
})

const { resetStatus } = toRef(props, 'resetStatus')

const date = ref('')
const { value, errorMessage } = useField(() => String(props.inputName))

watch(date, (newDate) => {
  value.value = newDate
})
</script>

<template>
  <div class="base-input">
    <div class="base-input__box">
      <input
        type="text"
        id="date-picker-custom-input"
        placeholder="تاریخ"
        :value="date"
        class="base-input__input"
      />
      <DatePicker
        v-model="date"
        locale="fa"
        display-format="jDD jMMMM jYYYY "
        custom-input="#date-picker-custom-input"
      />
      <div class="base-input__icon-box">
        <BaseIcon icon-name="User" width="1.3rem" />
      </div>
    </div>
    <div class="base-input__message" v-show="errorMessage">
      <div class="base-input__message-text" :class="{ 'base-input__message--error': errorMessage }">
        {{ errorMessage }}
      </div>
      <div class="base-input__message-icon">
        <IconInfoCircle />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
