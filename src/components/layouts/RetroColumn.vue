<script setup lang="ts">

import RetroCard from "@/components/RetroCard.vue";
import {pushDummyCards, type RetroCardData} from "@/utils/dummyData.ts";
import {allColorClasses, colorConfig} from "@/config/ColourConfig.ts";
import {onMounted, ref} from "vue";
import Sortable from "sortablejs";

const props = defineProps<{
  cardsContainerId: string;
}>();

const columnCards = ref<RetroCardData[]>([]);
pushDummyCards(columnCards, props.cardsContainerId);

function handleCardRemoval(cardId: string) {
  console.log("Card removal requested for:", cardId);
  // Logic to remove the card from the respective column
  columnCards.value = columnCards.value.filter(card => card.id !== cardId);
}

const cardsContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const sortableOptions = {
    group: 'shared',// This allows dragging cards between columns with the same group name.
    animation: 150, // Animation speed in ms when sorting.
    ghostClass: 'ghost-card', // The class applied to the placeholder element.
    // onEnd: () => emit('sortableOnEndEvent'),
    // onMove: () => emit('sortableOnMoveEvent'),
    onEnd: onEndEventFunction,
    onMove: onMoveEventFunction,
  };
  if (cardsContainerRef.value) {
    new Sortable(cardsContainerRef.value, sortableOptions);
  }
})


function handleDoubleClickOnTheColum(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const id = target.id;
  console.log("Double clicked on column with id:", id);
  // Example: update column1Cards if id === 'column1'
  // todo: clean this logic
  // todo: There is an error here, when a card is added, it is not being editable directly, user has to double - click on it again to edit it

  const newCard = {
    id: id + "-card-" + (columnCards.value.length + 1),
    content: "New card in " + id,
    isCurrUserCard: true,
    userId: 'currentUserId', // Replace with actual current user ID
    isEditing: false // <-- add this
  }
  columnCards.value.push(newCard);
}


// Handler for double-click on a card - Allow Editing
function handleCardDoubleClick(event: MouseEvent, cardId: string) {
  console.log("Double clicked on Card with id:", cardId);

  const card = columnCards.value.find(c => c.id === cardId);
  if (card) card.isEditing = true;
  console.log("card marked for editing:", cardId);
  event.stopPropagation();
}

function onEndEventFunction(event: Sortable.SortableEvent) {
  console.log("event onEnd", event)
  // When a card is moved to a new column, update its color.
  const card = event.item;
  const newColumnId = event.to.id;
  updateCardColor(card, newColumnId);
}

function onMoveEventFunction(event: Sortable.MoveEvent, originalEvent: Event) {
  console.log("event onMove", event)
  // Dynamically update the ghost card's color based on the target column
  const ghostEl = document.querySelector('.ghost-card') as HTMLElement;
  console.log("ghostEl", ghostEl);
  if (ghostEl) {
    const targetColId = event.to.id;
    const colors = colorConfig[targetColId];
    if (colors) {
      ghostEl.style.backgroundColor = colors.ghostCardBg;
      ghostEl.style.borderColor = colors.ghostCardOutline;
      const ghostCardHeader = ghostEl.querySelector('.card-header') as HTMLElement;
      ghostCardHeader.style.backgroundColor = colors.ghostCardHeaderBg;
    }
  }
  return true; // The move is allowed
}


function updateCardColor(card: HTMLElement, columnId: string) {
  console.log(card);
  console.log(columnId);

  const colors = colorConfig[columnId];
  if (!colors) return;

  const header = card.querySelector('.card-header') as HTMLElement;
  const voteSpan = card.querySelector('.card-vote');
  const controls = card.querySelector('.card-controls');

  // Clear the temp ghost styles - which was added as a direct css style and not like a tailwind class
  // todo: you can use some way to do this with tailwind classes and then remove the class instead of removing this css style
  card.style.backgroundColor = '';
  card.style.borderColor = '';
  header.style.backgroundColor = ''

  // todo: THis logic is a mess, rn to change the colours back to the original as it involves working with css-stlye directly as well as tailwind calssess
  // i need to have them in a single class based system, and then write logic so that the transition bw the coloud is seemless


  // Remove old colors from all relevant elements
  card.classList.remove(...allColorClasses.cardBg);
  if (header) {
    header.classList.remove(...allColorClasses.headerBg);
  }
  if (voteSpan) {
    voteSpan.classList.remove(...allColorClasses.text);
  }
  if (controls) {
    controls.classList.remove(...allColorClasses.text);
  }


  // Add new colors to all relevant elements
  card.classList.add(colors.cardBg);
  if (header) {
    header.classList.add(colors.headerBg);
  }
  if (voteSpan) {
    voteSpan.classList.add(colors.text);
  }
  if (controls) {
    controls.classList.add(colors.text);
  }
}


</script>

<template>
  <!-- Column DIV -> Heading + Cards Container -->
  <div class="flex flex-col">

    <!--  Column Title -->
    <h2 class="text-lg font-semibold text-center pb-2 border-b-2 border-gray-600 mb-4 shrink-0">
      <slot></slot>
    </h2>


    <!--  Actual Container for the Cards  -->
    <div ref="cardsContainerRef"
         :id="cardsContainerId"
         @dblclick="handleDoubleClickOnTheColum"
         class="cards-scrollable flex flex-1 flex-col items-start 2xl:flex-row 2xl:flex-wrap 2xl:justify-center 2xl:content-start space-y-8 gap-4 p-2 pt-6 overflow-y-auto rounded-lg max-h-screen">
      <!--  The Actuall Card  -->
      <RetroCard v-for="card in columnCards as Record<string, any>" :key="card.id"
                 @remove="handleCardRemoval"
                 @dblclick="(event: MouseEvent) => handleCardDoubleClick(event, card.id)"
                 :card="card"
                 :colour="colorConfig[cardsContainerId]">
      </RetroCard>
    </div>
  </div>

</template>

<style scoped>
/*.cards-scrollable {
    scrollbar-width: none; !* Firefox *!
    -ms-overflow-style: none; !* IE and Edge *!
}
.cards-scrollable::-webkit-scrollbar {
    display: none; !* Chrome, Safari, Opera *!
}*/
</style>