<script setup lang="ts">
import {defineProps, type PropType} from "vue";
import ModalUserAvatar from "@/components/ModalUserAvatar.vue";
import type {User} from "@/utils/dummyData.ts";

defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true,
  }
})
const emit = defineEmits(["close"]);

function closeAllUsersModal() {
  emit('close');
}
</script>

<template>
  <!-- All Users Modal -->
  <div id="all-users-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4">

    <!-- Backdrop with blur -->
    <div id="modal-backdrop"
         @click="closeAllUsersModal"
         class="absolute inset-0 bg-black/30 backdrop-blur-sm">
    </div>

    <!-- Modal Panel -->
    <div class="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">

      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">All Participants</h3>
        <button @click="closeAllUsersModal"
                id="close-modal-btn"
                class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none"
               stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div id="modal-avatar-grid"
           class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-h-[60vh] overflow-y-auto p-2 scroll-container">
        <ModalUserAvatar v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
