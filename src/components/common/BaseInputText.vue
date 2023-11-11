<script setup>
import { computed, ref, toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: String,
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  iconName: {
    type: String,
    required: true
  }
})

const name = toRef(props, 'name')

const {
  errorMessage,
  value: inputValue,
  handleChange,
  handleBlur
} = useField(() => props.name, undefined, {
  validateOnValueUpdate: false
})

const validationListeners = {
  blur: (evt) => handleBlur(evt, true),
  change: handleChange,
  input: (evt) => handleChange(evt, !!errorMessage.value)
}

const isTransitionActive = ref(false)
const isPasswordVisible = ref(false)

const isInputEmpty = computed(() => inputValue.value === undefined || inputValue.value === '')

const inputType = ref(props.type)

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value
  if (isPasswordVisible.value) inputType.value = 'input'
  else inputType.value = 'password'
}

const activateTransition = () => {
  isTransitionActive.value = true
}
const deactivateTransition = () => {
  if (isInputEmpty.value) isTransitionActive.value = false
}
</script>

<template>
  <div class="text-input">
    <div class="text-input__box">
      <button
        type="button"
        v-if="type === 'password'"
        class="toggle-password"
        @click="togglePassword"
      >
        <BaseIcon v-show="isPasswordVisible" icon-name="Eye" />
        <BaseIcon v-show="!isPasswordVisible" icon-name="EyeSlash" />
      </button>

      <input
        class="text-input__input"
        :class="{ 'text-input__input--transitioned': isTransitionActive }"
        :type="inputType"
        :name="name"
        :id="name"
        :value="inputValue"
        :placeholder="isTransitionActive ? label : ''"
        @input="handleChange"
        @blur="handleBlur(), deactivateTransition()"
        @focus="activateTransition"
        v-on="validationListeners"
      />
      <label
        :for="name"
        @click="activateTransition"
        class="text-input__label"
        :class="{
          'text-input__label--transitioned': isTransitionActive
        }"
        >{{ label }}</label
      >
      <div class="text-input__icon-box">
        <BaseIcon :icon-name="iconName" width="1.4rem" />
      </div>
    </div>
    <div class="text-input__message" v-show="errorMessage">
      <div class="text-input__message-text" :class="{ 'text-input__message--error': errorMessage }">
        {{ errorMessage }}
      </div>
      <div class="text-input__message-icon">
        <BaseIcon icon-name="InfoCircle" style="height: 0.8rem" />
      </div>
    </div>

    <span></span>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

$font-size-input-msg: 0.6rem;
$font-size-label-transitioned: 0.6rem;

.text-input {
  width: 100%;
  margin: 0.5rem 0 1rem;

  &__box {
    display: flex;
    justify-content: flex-end;
    padding: 0.7rem 0 0.7rem 0.1rem;
    border-radius: 1rem;
    border: 1px solid $color-gray-300;
    transition: outline 0.5s ease;

    &:hover {
      outline: 0.12rem solid $color-gray-300;
    }
  }

  &__input {
    @include mixin.typographyPreset('subtitle-1');
    width: 80%;
    direction: rtl;
    border: none;
    background: transparent;
    position: relative;
    z-index: 20;

    &:focus {
      outline: 0;
    }
    &--transitioned {
      transform: translateY(8px);
    }
  }

  &__label {
    @include mixin.typographyPreset('subtitle-1');
    position: absolute;
    transition: all 0.5s ease;
    z-index: 5;
    transform: translate(-40px, 1px);
    color: $color-light-base-2;

    &--transitioned {
      transform: translate(-40px, -6px);
      font-size: $font-size-label-transitioned;
    }
  }

  &__text-area {
    max-height: 5rem;
  }

  &__icon-box {
    @extend .center-flex;
    flex: 0 12%;
    width: 2rem;
    margin: 0 0.1rem 0;
  }

  &__message {
    text-align: right;
    font-size: $font-size-input-msg;
    padding-right: 0.2rem;
    padding-top: 0.2rem;
    display: flex;
    flex-direction: row;

    &--error {
      @include mixin.typographyPreset('subtitle-1');
      color: $color-error-900;
      font-size: $font-size-input-msg;
    }

    &-text {
      flex: 0 93%;
    }

    &-icon {
      flex: 7% 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.toggle-password {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  margin: 0;
  cursor: pointer;
}
</style>
