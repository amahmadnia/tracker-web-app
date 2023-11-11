<template>
  <ol class="calendar-weekdays">
    <li v-for="weekday in weekdays.reverse()" :key="weekday">
      {{ weekday }}
    </li>
  </ol>
</template>

<script setup>
const weekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
</script>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;

.calendar-weekdays {
  color: $color-text-disabled;
  margin: 0 auto;
  width: 93%;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0.5rem 1rem 0.8rem;
}
</style>
