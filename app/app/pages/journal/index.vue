<script setup lang="ts">
import { format } from 'date-fns'
import { useJournalData } from "~/composables/useJournalData"

definePageMeta({
  layout: "default",
})

const { journal } = useJournalData()

const { data: posts } = await useAsyncData('journal-posts', () =>
    queryContent('/journal')
        .only(['_path', 'title', 'description', 'backgroundImage', 'last_updated_at'])
        .sort({last_updated_at: -1}) // descending
        .find()
)

const pubDate = (dateStr: string): string => {
  return format(new Date(dateStr), "MMMM do, yyyy")
}

useHead({
  title: 'DingoBytes | Journal',
  meta: [
    {
      name: 'description',
      content: `Evolving Insights: A Journey Through Past Challenges and Future Growth`,
    }
  ]
})
</script>

<template>
  <section id="article-privacy" class="bg-white dark:bg-gray-900 w-full pb-24 mb-0">
    <div class="w-full pb-40 pt-20 bg-secondary-300 dark:bg-secondary-600 px-4 sm:px-40">
      <h1 class="text-6xl font-bold text-center text-gray-900 dark:text-white mb-4">{{ journal.title }}</h1>
      <p class="text-center text-gray-900 dark:text-gray-100 italic">{{ journal.description }}</p>
    </div>
    <div
      class="bg-white w-full sm:max-w-7xl dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-3xl flex flex-col items-center shadow-md -mt-20 mx-auto p-10 gap-10"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <template v-for="post in (posts ?? [])" :key="post._path">
          <article class="overflow-hidden rounded-lg shadow transition hover:shadow-lg flex flex-col h-full">
            <img
              :alt="post.description"
              :src="post.backgroundImage"
              class="h-56 w-full object-cover"
            />

            <div class="bg-white p-4 sm:p-6 flex flex-col flex-1">
              <time :datetime="post.last_updated_at" class="block text-xs text-silver-500">
                {{ pubDate(post.last_updated_at) }}
              </time>

              <NuxtLink :to="post._path" :title="post.title">
                <h3 class="mt-0.5 text-lg text-gray-900">{{ post.title }}</h3>
              </NuxtLink>

              <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-900 flex-1">
                {{ post.description }}
              </p>

              <NuxtLink
                :to="post._path"
                :title="post.title"
                class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600"
              >
                Read more
                <span aria-hidden="true" class="block transition-all group-hover:ms-0.5 rtl:rotate-180">&rarr;</span>
              </NuxtLink>
            </div>
          </article>
        </template>
      </div>
    </div>
  </section>
</template>

<style scope>

</style>
