<script setup lang="ts">
import {defineProps, type PropType} from "vue";
import StatusIndicator from "@/components/StatusIndicator.vue";
import CurrentUserIndicator from "@/components/CurrentUserIndicator.vue";
import type {User} from "@/utils/dummyData.ts";


defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
    default: () => ({
      id: '',
      name: ''
    })
  }
})

</script>

<template>
  <img :src="`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.id}&scale=120`"
       :alt="user.name"
       class="h-full w-full">
  <StatusIndicator :status="user.status"></StatusIndicator>
  <CurrentUserIndicator v-if="user.isCurrentUser"></CurrentUserIndicator>
</template>

<style scoped>

</style>
