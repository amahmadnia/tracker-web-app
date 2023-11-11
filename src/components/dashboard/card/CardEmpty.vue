<script setup>
defineProps({
  theme: { type: String, default: '' }
})
</script>

<template>
  <BaseCard :theme="theme" class="card-empty-base">
    <div class="card-empty">
      <BaseIcon icon-name="PlusSign" width="32px" />
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/utils/alignment';

.card-empty-base {
  width: 100%;
  height: 100%;
}

.card-empty {
  @extend .center-flex;
  height: 100%;
  cursor: pointer;
}
</style>
