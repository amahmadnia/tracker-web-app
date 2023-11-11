<script setup>
defineProps({
  filterItems: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['removeFilter'])

const removeFilter = () => {
  emit('removeFilter')
}
</script>

<template>
  <BaseTag :icon="true" :is-active="true" class="tag-remove-filter" :label="filterItems">
    <template v-slot:icon
      ><BaseIcon icon-name="OutlineClose" @click="removeFilter" class="tag-remove-filter__icon" />
    </template>
  </BaseTag>
</template>

<style scoped lang="scss">
.tag-remove-filter {
  max-width: 12rem;
  justify-content: space-between;
  direction: rtl;

  &__icon {
    cursor: pointer;
  }
}
</style>
