import {ref} from 'vue';

export type User = {
  id: string;
  name: string;
  isCurrentUser: boolean;
  status: 'in-progress' | 'finished';
};

export type RetroCardData = {
  id: string;
  content: string;
  isCurrUserCard: boolean;
  userId: string;
  isEditing: boolean;
}

export function generateDummyUsers(): User[] {
  return Array.from({length: 20}, (_, i): User => ({
    id: `user${i + 1}`,
    name: `User ${i + 1}`,
    isCurrentUser: i === 3, // Let's say the 4th user is the current one
    status: i % 3 === 0 ? 'in-progress' : 'finished', // Distribute statuses
  }));
}

export function pushDummyCards(columnCards: ReturnType<typeof ref<RetroCardData[]>>, cardsContainerId: string) {
  if (cardsContainerId === "column1") {
    columnCards.value?.push(
        {
          id: 'card1',
          content: 'The team collaboration on the new feature was outstanding!',
          isCurrUserCard: true,
          userId: '1',
          isEditing: false,
        },
        {
          id: 'card2',
          content: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          isCurrUserCard: false,
          userId: '2',
          isEditing: false,
        },
    )
  }

  if (cardsContainerId === "column2") {
    columnCards.value?.push(
        {
          id: 'card3',
          content: 'Some of the API documentation is getting out of date.',
          isCurrUserCard: true,
          userId: '3',
          isEditing: false,
        },
        {
          id: 'card4',
          content: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          isCurrUserCard: false,
          userId: '2',
          isEditing: false,
        },
    )
  }

  if (cardsContainerId === "column3") {
    columnCards.value?.push(
        {
          id: 'card5',
          content: 'Plan a session to update all the API docs next sprint.',
          isCurrUserCard: true,
          userId: '5',
          isEditing: false,
        },
        {
          id: 'card6',
          content: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          isCurrUserCard: false,
          userId: '7',
          isEditing: false,
        },
    )
  }
}
