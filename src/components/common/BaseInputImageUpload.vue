<template>
  <div class="file-upload">
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      accept="image/png, image/jpeg"
      class="file-upload__hidden-input"
    />
    <button class="file-upload__btn" @click="openFileInput" type="button">
      <BaseIcon icon-name="PlusSign" />
    </button>
    <img v-if="imageData" :src="imageData" class="file-upload__image" alt="تصویر فرم" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['sendImageData'])

const fileInput = ref(null)
const imageData = ref(null)

const openFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0]

  if (!selectedFile) return

  const reader = new FileReader()
  reader.onload = (e) => {
    imageData.value = e.target.result
    emit('sendImageData', imageData.value)
  }
  reader.readAsDataURL(selectedFile)
}
</script>
<style scoped lang="scss">
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/abstracts' as *;

.file-upload {
  width: 10rem;
  height: 5rem;
  position: relative;
  display: flex;
  justify-content: center;

  &__children {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 20px;
    cursor: pointer;
  }

  &__btn {
    @extend .center-flex;
    @extend .file-upload__children;
    z-index: 10;
    background: $color-light-default;
    border: none;
    padding: 2rem;
  }

  &__image {
    @extend .file-upload__children;
    z-index: 12;
    position: absolute;
  }

  &__hidden-input {
    display: none;
  }
}
</style>
