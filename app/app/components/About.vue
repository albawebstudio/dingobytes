<script setup lang="ts">
import { useAboutData } from "~/composables/useAboutData";

const { about } = useAboutData();
</script>

<template>
  <section id="about" class="bg-white dark:bg-gray-900">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
      <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{ about.title }}</h2>
        <template v-for="paragraph in about.content">
          <p class="mb-4">{{ paragraph }}</p>
        </template>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <img class="w-full rounded-lg" src="/img/safar-safarov-koOdUvfGr4c-unsplash.jpg" alt="Photo by Safar Safarov on Unsplash" />
        <img class="mt-4 w-full lg:mt-10 rounded-lg" src="/img/IMG_2861.jpg" alt="Photo by Andrew Alba" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
