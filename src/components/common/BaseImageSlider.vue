<template>
  <div class="slider-container">
    <button class="slider-button" @click="prevImage"><BaseIcon icon-name="ArrowLeft" /></button>
    <img :src="currentImage" alt="Slider Image" class="slider-image" />
    <button class="slider-button" @click="nextImage">Next</button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/sass/utils/alignment' as *;

.slider-container {
  position: relative;
  width: 100%;
}

.slider-image {
  width: 100%;
  height: auto;
  transition: opacity 0.5s ease-in-out;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.1);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
}

.slider-button:hover {
  background: rgba(0, 0, 0, 0.7);
}
</style>

<script setup>
import { ref, watchEffect, computed } from 'vue'

const images = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300'
]

const currentIndex = ref(0)

const currentImage = computed(() => images[currentIndex.value])

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

watchEffect(() => {
  // Reset opacity when image changes
  const image = document.querySelector('.slider-image')
  if (image) {
    image.style.opacity = 0
    setTimeout(() => {
      image.style.opacity = 1
    }, 100)
  }
})
</script>
