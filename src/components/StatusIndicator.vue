<script setup lang="ts">

defineProps<{
  status: 'finished' | 'in-progress'
}>();

</script>

<template>
  <div v-if="status === 'finished'"
       class="absolute top-0 right-0 h-4 w-4 rounded-full bg-green-500 flex items-center justify-center ring-2 ring-white">
    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
    </svg>
  </div>

  <div v-if="status === 'in-progress'"
       class="absolute top-0 right-0 h-4 w-4 rounded-full bg-white flex items-center justify-center ring-1 ring-white">
    <div class="animate-spin rounded-full h-3 w-3 border-2 border-blue-500 border-t-transparent"></div>
  </div>
</template>

<style scoped>

</style>
