<script setup>
import { computed, ref, watch } from 'vue'
import { useActivityTypeStore } from '@/stores/activityType'
import { useActivityStore } from '@/stores/activity'
import { storeToRefs } from 'pinia'

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator(value) {
      return ['singleSelect', 'multiSelect'].includes(value)
    }
  },
  open: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['set-activity-types', 'close'])

const activityTypeStore = useActivityTypeStore()
const activityStore = useActivityStore()

const { activityTypes } = storeToRefs(activityTypeStore)

const searchState = ref('')
const selectedActivityTypes = ref([])

const isFilterApplied = computed(() => activityStore.appliedFilters.activityTypeFilter)

watch(isFilterApplied, (value) => {
  if (!value) selectedActivityTypes.value = []
})

const filterActivityTypes = () => {
  const regex = new RegExp(searchState.value, 'i')

  const filteredActivityTypes = activityTypeStore.activityTypes.filter((activityType) => {
    return regex.test(activityType.data.title)
  })

  if (filteredActivityTypes.length === 0) activityTypes.value = []
  else activityTypes.value = filteredActivityTypes
}

const selectActivityType = (id) => {
  if (selectedActivityTypes.value.includes(id)) {
    selectedActivityTypes.value = selectedActivityTypes.value.filter(
      (activityTypeId) => activityTypeId !== id
    )
  } else {
    if (props.mode === 'singleSelect') selectedActivityTypes.value = [id]
    else if (props.mode === 'multiSelect') selectedActivityTypes.value.push(id)
  }
}

const emitSelectedActivityTypes = () => {
  emit('set-activity-types', {
    type: 'array',
    target: 'data',
    secondTarget: 'activityType',
    filterState: {
      value: selectedActivityTypes.value
    }
  })

  emit('close')
}

const isSelected = (id) => {
  return selectedActivityTypes.value.includes(id)
}

const close = () => {
  emit('close')
}
</script>

<template>
  <BaseModal title="نوع فعالیت" :open="open" @confirm="emitSelectedActivityTypes" @close="close">
    <div class="activity-type-modal">
      {{ activityTypeStore.activityTypes }}
      <div class="activity-type-modal__search-box">
        <input
          v-model="searchState"
          @keyup="filterActivityTypes"
          placeholder="جستجو..."
          class="activity-type-modal__search-input"
          type="text"
        />
        <div class="activity-type-modal__icon-box">
          <BaseIcon icon-name="SearchNormal" width="1.3rem" />
        </div>
      </div>
      <div class="activity-type-modal__tags">
        <BaseTag
          v-for="{ _id: id, data: activityType } in activityTypes"
          :colored-random="true"
          :label="activityType.title"
          :key="id"
          @click="selectActivityType(id)"
          :class="{ 'activity-type-modal__tag--selected': isSelected(id) }"
          class="activity-type-modal__tag"
        />
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/abstracts' as *;

.activity-type-modal {
  width: 85%;
  margin: 0 auto;
  padding: 1rem;

  &__search-box {
    display: flex;
    justify-content: flex-end;
    padding: 0.4rem 0.5rem;
    margin: 0 0 1rem 0;
    border-radius: 1rem;
    border: none;
    transition: outline 0.5s ease;
    background: $color-primary-100;
  }

  &__search-input {
    flex: 88% 0;
    direction: rtl;
    border: none;
    background: transparent;
    position: relative;
    z-index: 20;

    &:focus {
      outline: 0;
    }
  }

  &__icon-box {
    flex: 0 12%;
    @extend .center-flex;
    width: 2rem;
    margin: 0 0 0;
  }

  &-icon {
    flex: 7% 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__tags {
    @extend .center-flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 0.5rem 0 0 0;
    list-style-type: none;
  }

  &__tag {
    margin-bottom: 0.7rem;
    transition: outline 0.1s ease;

    &--selected {
      outline: 3px solid $color-primary-500;
    }
  }
}
</style>
