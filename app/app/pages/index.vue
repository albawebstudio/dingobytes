<script setup lang="ts">
definePageMeta({
  layout: "default",
});
useHead({
  title: 'Andrew Alba',
  meta: [
    {
      name: 'description',
      content: 'A space where software meets Stoicism, and whiskey smooths the edges. Dive into my musings on tech, timeless wisdom, and the finer things in life. Let’s connect and share the journey!'
    }
  ],
})
</script>

<template>
  <div>
    <Hero />
    <About />
    <Contact />
  </div>
</template>

<style scoped>

</style>
