<script setup lang="ts">

import {defineProps, type PropType} from "vue";
import UserAvatarWithStatus from "@/components/UserAvatarWithStatus.vue";
import type {User} from "@/utils/dummyData.ts";

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
});

</script>

<template>
  <div class="flex flex-col items-center text-center">
    <div class=" relative w-16 h-16 mb-2">
      <UserAvatarWithStatus :user="user"></UserAvatarWithStatus>
    </div>
    <span class="text-xs text-gray-600">{{ user.name }}</span>
  </div>
</template>

<style scoped>

</style>
