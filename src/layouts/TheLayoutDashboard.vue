<script setup>
import { computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import TheNavbar from '@/components/dashboard/TheNavbar.vue'
import TheSidebar from '@/components/dashboard/TheSidebar.vue'
import TheHeader from '@/components/dashboard/TheHeader.vue'

const authStore = useAuthStore()

onBeforeMount(async () => {
  await authStore.setProfile()
})

const router = useRouter()

const isHeaderVisible = computed(() => router.currentRoute.value.name !== 'home')
</script>

<template>
  <div class="dashboard">
    <aside class="dashboard__sidebar">
      <TheSidebar />
    </aside>
    <div class="dashboard__main">
      <TheHeader v-if="isHeaderVisible" />
      <main class="dashboard__main-content">
        <!-- put view here-->
        <slot></slot>
      </main>
    </div>
    <div class="dashboard__navbar">
      <TheNavbar />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
