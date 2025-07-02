<script setup lang="ts">

import {defineProps, type PropType} from "vue";
import RetroColumn from "@/components/layouts/RetroColumn.vue";
import type {User} from "@/utils/dummyData.ts";

defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true,
  }
});

</script>

<template>
  <!-- Main content with three columns -->
  <main id="main-board" class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 overflow-hidden">
    <RetroColumn :cardsContainerId="'column1'" :cardsContainerRefName="'column1'">
      Retrospective Board
    </RetroColumn>

    <RetroColumn :cardsContainerId="'column2'" :cardsContainerRefName="'column2'">
      Retrospective Board
    </RetroColumn>

    <RetroColumn :cardsContainerId="'column3'" :cardsContainerRefName="'column3'">
      Retrospective Board
    </RetroColumn>

  </main>
</template>

<style scoped>

</style>
