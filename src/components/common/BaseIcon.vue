<script setup>
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  iconName: String,
  size: {
    type: String,
    validator(value) {
      return ['big', 'small'].includes(value)
    }
  }
})

const iconClassNames = computed(() => ({
  'base-icon': true,
  'base-icon--big': props.size === 'big'
}))

const icon = computed(() => defineAsyncComponent(() => import(`./icons/Icon${props.iconName}.vue`)))
</script>

<template>
  <component :is="icon" :class="iconClassNames" />
</template>

<style lang="scss" scoped>
.base-icon {
  height: 1.4rem;
  width: 1.4rem;

  &--big {
    height: 2rem;
    width: 2rem;
  }
}
</style>
