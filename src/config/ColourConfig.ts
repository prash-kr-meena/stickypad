// --- Color Configuration for Columns ---

export const colorConfig: Record<string, {
  cardBg: string;
  headerBg: string;
  text: string;
  ghostCardBg: string;
  ghostCardOutline: string;
  ghostCardHeaderBg: string;
}> = {
  'column1': {
    cardBg: 'bg-green-100',
    headerBg: 'bg-green-200',
    text: 'text-green-800',
    ghostCardBg: '#a7f9ba',
    // ghostCardOutline: '#28a745',
    ghostCardOutline: '#00a53a',
    // ghostCardHeaderBg: '#28a745',
    ghostCardHeaderBg: '#96e0b1',
  },
  'column2': {
    cardBg: 'bg-pink-100',
    headerBg: 'bg-pink-200',
    text: 'text-pink-800',
    ghostCardBg: '#FBE7F3',
    ghostCardOutline: '#ee3d9f',
    ghostCardHeaderBg: '#FBCFE8',
  },
  'column3': {
    cardBg: 'bg-yellow-100',
    headerBg: 'bg-yellow-200',
    text: 'text-yellow-800',
    ghostCardBg: '#fff3cd',
    ghostCardOutline: '#ffc107',
    ghostCardHeaderBg: '#ffc107',
  }
};

export const allColorClasses = {
  cardBg: ['bg-green-100', 'bg-pink-100', 'bg-yellow-100'],
  headerBg: ['bg-green-200', 'bg-pink-200', 'bg-yellow-200'],
  text: ['text-green-800', 'text-pink-800', 'text-yellow-800'],
};