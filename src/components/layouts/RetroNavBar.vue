<script setup lang="ts">
import {computed, defineProps, type PropType, ref} from "vue";
import {type User} from "@/utils/dummyData.ts";
import AllUsersModal from "@/components/AllUsersModal.vue";
import UserAvatarWithStatus from "@/components/UserAvatarWithStatus.vue";

const props = defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true,
  }
})

const numberOfInitialUsersToShow = 4
const firstFewVisibleAvatars = computed(() => props.users.slice(0, numberOfInitialUsersToShow));
const hasMoreUsersToShow = computed(() => props.users.length > numberOfInitialUsersToShow);
const numberOfUsersInModal = computed(() => props.users.length - numberOfInitialUsersToShow);
const allUserModalVisible = ref(false);

function handleCloseModal() {
  allUserModalVisible.value = false;
}

</script>

<template>
  <!-- Header Section -->
  <header class="flex items-center justify-between pb-4 border-b shrink-0">

    <!-- Logo -->
    <div class="flex items-center gap-2">
      <div class="w-10 h-10 bg-yellow-300 rounded-lg flex items-center justify-center">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <span class="text-xl font-bold">StickyFlow</span>
    </div>

    <!-- User Avatars -->
    <div class="relative">
      <div class="flex items-center space-x-2">
        <div v-for="user in firstFewVisibleAvatars" :key="user.id" class="relative inline-block h-12 w-12">
          <UserAvatarWithStatus :user="user"></UserAvatarWithStatus>
        </div>
        <div v-if="hasMoreUsersToShow" @click="allUserModalVisible = true" id="avatar-more-btn"
             class="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 text-gray-600 font-semibold cursor-pointer ring-2 ring-white">
          +{{ numberOfUsersInModal }}
        </div>
        <!-- Show modal when user clicks the show more users button   -->
        <AllUsersModal v-if="allUserModalVisible" :users="users" @close="handleCloseModal"></AllUsersModal>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center gap-4">
      <button class="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-100">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>I'm Finished</span>
      </button>
      <button class="px-4 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800">Present</button>
    </div>
  </header>

</template>

<style scoped>

</style>
