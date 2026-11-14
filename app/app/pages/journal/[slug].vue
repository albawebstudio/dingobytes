<script setup lang="ts">
import { format } from 'date-fns'

definePageMeta({
  layout: "default",
});
const route = useRoute();
const slug = computed(() => (Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug) ?? '');
const { data } = await useAsyncData(() => `article-journal-${slug.value}`, () =>
    queryContent(`/journal/${slug.value}`).findOne()
)

const pubDate = (dateStr: string): string => {
  return format(new Date(dateStr), "MMMM do, yyyy"); // "do" adds the ordinal suffix automatically
}

useHead({
  title: data.value?.title ?? '',
})
</script>

<template>
  <section v-if="data" id="article-privacy" class="bg-white dark:bg-gray-900 w-full pb-24 mb-0">
    <div class="w-full pb-40 pt-20 bg-secondary px-4 sm:px-40 bg-local bg-no-repeat bg-center" :style="data.backgroundImage ? 'background-image: url(' + data.backgroundImage + ')' : ''">
      <h1 class="mb-4 text-center text-6xl font-bold text-gray-700 text-shadow-sm text-shadow-white/50 dark:text-white dark:text-shadow-sm dark:text-shadow-secondary/40">
        {{ data.title }}
      </h1>
      <p class="text-center text-gray-600 text-shadow-xs text-shadow-white/35 dark:text-gray-300 dark:text-shadow-gray/25 italic">{{ pubDate(data.last_updated_at) }}</p>
    </div>
    <div class="bg-white w-full sm:max-w-7xl dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-3xl flex flex-col items-center shadow-md -mt-20 mx-auto p-10 gap-10">
      <ContentDoc
        :value="data"
        class="prose prose-sm dark:prose-invert w-full min-w-0 max-w-none break-words sm:prose-base"
      />
    </div>
  </section>
  <section v-else class="bg-white dark:bg-gray-900 w-full min-h-screen flex items-center justify-center">
    <p class="text-gray-500">Content not found.</p>
  </section>
</template>

<style>
.prose {
  overflow-wrap: anywhere;
  word-break: normal;
}

.prose pre {
  max-width: 100%;
  overflow-x: auto;
}

.prose img,
.prose video,
.prose iframe {
  max-width: 100%;
}

.prose :where(blockquote):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
  quotes: none;
  font-weight: 200;
}
blockquote {
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
}

blockquote:before {
  content:  url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='%23777777'><path d='M9.983 3v7.391C9.983 16.095 6.252 19.961 1 21l-.995-2.151C2.437 17.932 4 15.211 4 13H0V3h9.983zM24 3v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151C16.437 17.932 18 15.211 18 13h-3.983V3H24z'/></svg>");
  left: 0;
}

blockquote:after {
  content: " ";
  left: 5px;
  top: 25px;
  width: 1px;
  height: 100%;
}

blockquote p.cite {
  display: block;
  font-size: 1.25rem;
  text-align: right;
  margin: 10px 0 0;
}
</style>
