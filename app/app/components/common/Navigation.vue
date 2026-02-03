<script setup lang="ts">
import { shallowRef } from 'vue'
import { useSiteData } from "~/composables/useSiteData"

const { site } = useSiteData()
const isDarkMode = shallowRef(false)
const lightLogo = '/logo-light.svg'
const darkLogo = '/logo-dark.svg'

const showMenu = shallowRef(false)
const toggleNav = () => (showMenu.value = !showMenu.value)
const checkDarkMode = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

onMounted(() => {
  // Check on mount
  checkDarkMode()

  // Listen for changes in the system theme
  if (typeof window !== 'undefined' && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDarkMode)
  }
})
const logoSrc = computed(() => isDarkMode.value ? darkLogo : lightLogo)
</script>

<template>

  <nav class="bg-white dark:bg-secondary bg-opacity-85 dark:bg-opacity-75 fixed w-full z-20 top-0 start-0 border-b border-default">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <NuxtLink :to="site.siteUrl" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img :src="logoSrc" class="h-8" :alt="site.title + 'logo'"/>
        <h3 class="self-center text-2xl font-semibold whitespace-nowrap text-primary dark:text-white">{{ site.title }}</h3>
      </NuxtLink>
      <button
          @click="toggleNav"
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
        </svg>
      </button>
      <div :class="showMenu ? 'flex' : 'hidden'" class="w-full md:block md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
          <template v-for="link in site.links">
            <li>
              <NuxtLink :to="link.to"
                        :external="link.external"
                        :title="link.title"
                        class="block py-2 px-3 text-primary dark:text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0">
                {{ link.displayText }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
