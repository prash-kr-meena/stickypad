<script setup lang="ts">
import {defineProps, onMounted, type PropType, ref, watch} from "vue";
import type {RetroCardData, User} from "@/utils/dummyData.ts";


const props = defineProps({
  card: {
    type: Object as PropType<RetroCardData>,
    required: true,
  },
  colour: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(["remove"]);

function removeCard(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const cardId = (target.parentNode?.parentNode as HTMLElement | null)?.id;
  // Emit an event to the parent component to remove the card
  emit('remove', cardId);
}

const editInput = ref<HTMLInputElement | null>(null);
// Todo: This works but I am not sure if this is the best way to do it
watch(
    () => props.card.isEditing,
    (isEditing) => {
      console.log("got the event in watch", props.card?.id)
      if (isEditing) {
        console.log("found isEditing true in watch", props.card?.id);


        // Wait for the input to be rendered
        setTimeout(() => {
          console.log("editInput", editInput.value);
          if (editInput.value) {
            const input = editInput.value as unknown as HTMLElement;
            input.contentEditable = "true";
            input.focus();


            // Optional: Select all text for easy replacement
            const selection = window.getSelection();
            selection.selectAllChildren(input);

            input.addEventListener('blur', () => {
              input.contentEditable = "false";
              props.card.isEditing = false; // Set isEditing to false when input loses focus
              props.card.content= props.card?.content.trim()
            });
          }
        });
      }
    }
);

</script>

<template>

  <div :class="colour.cardBg" :id="card.id"
       class="card rounded-lg shadow-sm cursor-grab relative w-full lg:max-w-md xl:max-w-lg 2xl:max-w-lg">

    <!-- Current User's Card : Card without Avatar  -->
    <div v-if="card.isCurrUserCard">
      <div :id="card.id" :class="colour.headerBg" class="card-header  px-3 py-1 flex justify-between items-center rounded-t-lg">
        <span :class="colour.text" class="card-vote text-sm font-semibold">+{{ Math.floor(Math.random() * 6) }}</span>
        <div :class="colour.text" class="card-controls flex gap-3 items-center ">
          <svg @click="removeCard" class="w-4 h-4 hover:text-black cursor-pointer delete-btn" fill="none"
               stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      </div>
    </div>

    <!--  Other Peoples Card : Card with Avatar  -->
    <div v-else>
      <div :class="colour.headerBg" class="card-header px-3 py-1 flex justify-between items-center rounded-t-lg">
        <span :class="colour.text" class="card-vote text-sm font-semibold">+{{ Math.floor(Math.random() * 6) }}</span>
      </div>
      <img class="absolute top-0 right-3 transform -translate-y-1/2 h-10 w-10"
           :src="`https://api.dicebear.com/8.x/adventurer/svg?seed=${card.userId}&scale=120`"
           alt="User Avatar">
    </div>

    <!--    Card Common Text  -->
    <div class="p-3">
      <!--  todo: The content is not trimmed of the spaces and newlines card.content.trim() does not work here    -->
      <p ref="editInput" class="text-xs text-gray-700 break-words">{{ card.content }}</p>
    </div>
  </div>


</template>

<style scoped>

</style>
