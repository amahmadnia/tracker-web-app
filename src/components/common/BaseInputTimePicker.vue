<script setup>
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'

import IconInfoCircle from '@/components/common/icons/IconInfoCircle.vue'

const { name } = defineProps({
  name: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: 'ساعت را انتخاب کنید'
  },
  width: {
    type: String,
    default: '49%'
  }
})

const time = ref('')

const { value, errorMessage } = useField(() => `${name}`)
watch(time, (newTime) => {
  value.value = newTime
})
</script>

<template>
  <div class="base-input" :style="{ width }">
    <div class="base-input__box">
      <input
        type="text"
        class="base-input__input"
        :id="`time-picker-custom-input${name}`"
        :placeholder="placeholder"
      />
      <DatePicker
        v-model="time"
        type="time"
        displayFormat="HH:mm"
        locale="fa"
        :custom-input="`#time-picker-custom-input${name}`"
      />
      <div class="base-input__icon-box">
        <BaseIcon icon-name="Time" width="1.3rem" />
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
