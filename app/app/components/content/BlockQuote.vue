<script setup lang="ts">

</script>

<template>
  <div class="post">
    <blockquote>
      <p><slot /></p>
      - <cite><ContentSlot :use="$slots.author" unwrap="p" /></cite>
    </blockquote>
  </div>
</template>

<style scoped>

</style>
