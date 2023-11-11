<script setup>
import TheLayoutDashboard from '@/layouts/TheLayoutDashboard.vue'
</script>

<template>
  <TheLayoutDashboard>
    <div class="not-found">
      <h1>ادرس مورد نظر یافت نشد!!</h1>

      <RouterLink to="/"><h3>صفحه اصلی</h3></RouterLink>
    </div>
  </TheLayoutDashboard>
</template>

<style scoped lang="scss">
.not-found {
  color: #991111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15rem;
}
</style>
