<script setup>
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'

import IconInfoCircle from '@/components/common/icons/IconInfoCircle.vue'

const dateRange = ref([])

const { value: startDateValue, errorMessage: startDateError } = useField(() => 'startDate')
const { value: endDateValue } = useField(() => 'endDate')

watch(dateRange, (newDate) => {
  startDateValue.value = newDate[0]
  endDateValue.value = newDate[1]
})
</script>

<template>
  <div class="base-input">
    <div class="base-input__box">
      <input
        type="text"
        id="date-range-picker-custom-input"
        placeholder="تاریخ"
        class="base-input__input"
      />
      <DatePicker
        v-model="dateRange"
        range
        locale="fa"
        format="YYYY-MM-DD"
        display-format="jYYYY-jMM-jDD"
        custom-input="#date-range-picker-custom-input"
      />
      <div class="base-input__icon-box">
        <BaseIcon icon-name="User" width="1.3rem" />
      </div>
    </div>
    <div class="base-input__message" v-show="startDateError">
      <div
        class="base-input__message-text"
        :class="{ 'base-input__message--error': startDateError }"
      >
        {{ startDateError }}
      </div>
      <div class="base-input__message-icon">
        <IconInfoCircle />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
