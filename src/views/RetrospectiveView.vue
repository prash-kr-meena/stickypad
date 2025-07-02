<script setup lang="ts">
import RetroNavBar from "@/components/layouts/RetroNavBar.vue";
import RetroBoard from "@/components/layouts/RetroBoard.vue";
import {ref} from "vue";
import {generateDummyUsers} from "@/utils/dummyData.ts";

// --- User Data ---
const users = ref(generateDummyUsers());

</script>

<template>
  <RetroNavBar :users="users"></RetroNavBar>
  <RetroBoard :users="users"></RetroBoard>
</template>

<style scoped>

</style>
