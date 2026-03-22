export type SpeakingEvent = {
  event: string;
  organizer: string;
  topic: string;
  date: string;
  platform: string;
  role: string;
  image?: string;
};

export const speakingEvents: SpeakingEvent[] = [
  {
    event: 'PennyWise',
    organizer: 'Pennyvest',
    topic: 'Is Hardwork Enough to Become Wealthy Today?',
    date: '19 March 2026',
    platform: 'X Spaces',
    role: 'Speaker',
    image: '/speaking/pennywise.jpg',
  },
  {
    event: 'The OpenUp Series',
    organizer: 'The Productant',
    topic: 'Humans Behind the Tech: What it Really Takes to Build with AI, AR/VR and IoT',
    date: '26 April 2025',
    platform: 'X Space',
    role: 'Speaker',
    image: '/speaking/openup.jpg',
  },
  {
    event: 'Cabalversity',
    organizer: 'FoundersCabal',
    topic: 'Securing Your Startup Software Infrastructure',
    date: '01 July 2023',
    platform: 'X (Twitter) Space',
    role: 'Speaker',
    image: '/speaking/cabalversity.jpg',
  },
];
