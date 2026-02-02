<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const route = useRoute();
const slug = computed(() => (Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug) ?? '');
const { data } = await useAsyncData(() => `article-legal-${slug.value}`, () =>
    queryContent(`/legal/${slug.value}`).findOne()
);
</script>

<template>
  <section v-if="data" id="article-privacy" class="bg-white dark:bg-gray-900 w-full pb-24 mb-0">
    <div class="w-full pb-40 pt-20 bg-gray-100 dark:bg-black px-4 sm:px-40">
      <h1 class="text-6xl font-bold text-center text-gray-700 dark:text-white mb-4">{{ data.title }}</h1>
      <p class="text-center text-gray-500 dark:text-gray-300 italic">{{ data.last_updated_at }}</p>
    </div>
    <div class="bg-white w-full sm:max-w-7xl dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-3xl flex flex-col items-center shadow-md -mt-20 mx-auto p-10 gap-10">
      <ContentDoc :value="data" class="prose prose-sm sm:prose-base dark:prose-invert max-w-none" />
    </div>
  </section>
  <section v-else class="bg-white dark:bg-gray-900 w-full min-h-screen flex items-center justify-center">
    <p class="text-gray-500">Content not found.</p>
  </section>
</template>

<style scoped>

</style>
