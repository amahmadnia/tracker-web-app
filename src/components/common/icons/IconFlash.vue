<script setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M20.8944 12.5069H17.2894V4.10687C17.2894 2.14687 16.2278 1.75021 14.9328 3.22021L13.9994 4.28187L6.10111 13.2652C5.01611 14.4902 5.47111 15.4935 7.10444 15.4935H10.7094V23.8935C10.7094 25.8535 11.7711 26.2502 13.0661 24.7802L13.9994 23.7185L21.8978 14.7352C22.9828 13.5102 22.5278 12.5069 20.8944 12.5069Z"
      :fill="isActive ? '#2471EB' : theme === 'warning' ? '#F7953B' : '#DADCE5'"
    />
  </svg>
</template>

<style scoped lang="scss"></style>
