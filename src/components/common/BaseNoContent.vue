<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'آیتم'
  }
})
</script>

<template>
  <div class="empty-content">
    <div class="empty-content__img-container">
      <img src="../../assets/images/EmptyIllustration.png" alt="" />
    </div>
    <h3 class="empty-content__heading">{{ label }}ی وجود ندارد</h3>
    <p class="empty-content__text">برای ایجاد {{ label }} جدید، آیکون + را بزن</p>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.empty-content {
  @extend .center-flex;
  flex-direction: column;
  flex: 0 93%;
  width: 100%;
  height: 47rem;
  padding-top: 2rem;

  &__img-container {
    margin-bottom: 2rem;
  }

  &__heading {
    margin-bottom: 0.3rem;
    @include mixin.typographyPreset('headline-5');
  }
  &__text {
    color: $color-text-base-1;
    @include mixin.typographyPreset('body-2');
  }
}
</style>
