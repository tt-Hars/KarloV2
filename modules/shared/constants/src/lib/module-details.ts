export const moduleDetails: Array<{
  route: string;
  meta: Array<string>;
  label?: string;
  content?: string;
  cta?: string;
}> = [
  {
    route: '_watch',
    meta: ['entertainment'],
    label: "Watch",
    content: "Watch your favorite shows and movies.",
    cta: "Watch Now"
  },
  {
    route: '_listen',
    meta: ['entertainment'],
    label: "Listen",
    content: "Listen to music, podcasts, and audiobooks.",
    cta: "Listen Now"
  },
  {
    route: '_feed',
    meta: ['entertainment'],
    label: "Feed",
    content: "Explore social media feeds and trending content.",
    cta: "Explore Feed"
  },
  {
    route: '_write',
    meta: ['productivity'],
    label: "Write",
    content: "Write articles, stories, and notes.",
    cta: "Start Writing"
  },
  {
    route: '_read',
    meta: ['productivity'],
    label: "Read",
    content: "Read articles, books, and news.",
    cta: "Start Reading"
  },
  {
    route: '_plan',
    meta: ['productivity'],
    label: "Plan",
    content: "Plan your tasks, projects, and goals.",
    cta: "Start Planning"
  },
  {
    route: '_shop',
    meta: ['market place'],
    label: "Shop",
    content: "Discover and shop for clothing, electronics, and more.",
    cta: "Shop Now"
  },
];
