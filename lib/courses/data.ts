export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface CourseLesson {
  id: string;
  titleKey: string;
  duration: string;
}

export interface CourseModule {
  id: string;
  titleKey: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  titleKey: string;
  descKey: string;
  longDescKey: string;
  level: CourseLevel;
  isFree: boolean;
  isAfrican: boolean;
  duration: string;
  gradientFrom: string;
  gradientTo: string;
  tags: string[];
  outcomeKeys: string[];
  modules: CourseModule[];
}

export const courses: Course[] = [
  {
    id: "blockchain-101",
    titleKey: "courses.course1.title",
    descKey: "courses.course1.desc",
    longDescKey: "courses.course1.longDesc",
    level: "beginner",
    isFree: true,
    isAfrican: false,
    duration: "2h 30m",
    gradientFrom: "#0F6E56",
    gradientTo: "#1D9E75",
    tags: ["Blockchain", "Wallets", "Web3 basics"],
    outcomeKeys: [
      "courses.course1.outcome1",
      "courses.course1.outcome2",
      "courses.course1.outcome3",
      "courses.course1.outcome4",
    ],
    modules: [
      {
        id: "basics",
        titleKey: "courses.course1.module1.title",
        lessons: [
          { id: "what-is-a-blockchain", titleKey: "courses.course1.module1.lesson1", duration: "8 min" },
          { id: "how-blocks-connect", titleKey: "courses.course1.module1.lesson2", duration: "10 min" },
          { id: "decentralization-and-consensus", titleKey: "courses.course1.module1.lesson3", duration: "12 min" },
        ],
      },
      {
        id: "africa",
        titleKey: "courses.course1.module2.title",
        lessons: [
          { id: "the-njangi-ledger", titleKey: "courses.course1.module2.lesson1", duration: "10 min" },
          { id: "mobile-money-meets-blockchain", titleKey: "courses.course1.module2.lesson2", duration: "12 min" },
          { id: "setting-up-your-first-wallet", titleKey: "courses.course1.module2.lesson3", duration: "15 min" },
        ],
      },
    ],
  },
  {
    id: "first-smart-contract",
    titleKey: "courses.course2.title",
    descKey: "courses.course2.desc",
    longDescKey: "courses.course2.longDesc",
    level: "intermediate",
    isFree: false,
    isAfrican: false,
    duration: "6h 15m",
    gradientFrom: "#4338ca",
    gradientTo: "#7c3aed",
    tags: ["Solidity", "Remix IDE", "Smart contracts"],
    outcomeKeys: [
      "courses.course2.outcome1",
      "courses.course2.outcome2",
      "courses.course2.outcome3",
      "courses.course2.outcome4",
    ],
    modules: [
      {
        id: "solidity-fundamentals",
        titleKey: "courses.course2.module1.title",
        lessons: [
          { id: "setting-up-remix", titleKey: "courses.course2.module1.lesson1", duration: "10 min" },
          { id: "variables-types-functions", titleKey: "courses.course2.module1.lesson2", duration: "18 min" },
          { id: "gas-and-transactions", titleKey: "courses.course2.module1.lesson3", duration: "15 min" },
          { id: "hello-web3-contract", titleKey: "courses.course2.module1.lesson4", duration: "20 min" },
        ],
      },
      {
        id: "real-logic",
        titleKey: "courses.course2.module2.title",
        lessons: [
          { id: "mappings-and-structs", titleKey: "courses.course2.module2.lesson1", duration: "18 min" },
          { id: "modifiers-and-access-control", titleKey: "courses.course2.module2.lesson2", duration: "16 min" },
          { id: "events-and-logging", titleKey: "courses.course2.module2.lesson3", duration: "14 min" },
          { id: "building-a-savings-contract", titleKey: "courses.course2.module2.lesson4", duration: "25 min" },
        ],
      },
      {
        id: "testing-and-deployment",
        titleKey: "courses.course2.module3.title",
        lessons: [
          { id: "writing-tests-in-remix", titleKey: "courses.course2.module3.lesson1", duration: "20 min" },
          { id: "deploying-to-a-testnet", titleKey: "courses.course2.module3.lesson2", duration: "16 min" },
          { id: "verifying-your-contract", titleKey: "courses.course2.module3.lesson3", duration: "12 min" },
          { id: "final-project-njangi-v1", titleKey: "courses.course2.module3.lesson4", duration: "30 min" },
        ],
      },
    ],
  },
  {
    id: "njangi-on-the-blockchain",
    titleKey: "courses.course3.title",
    descKey: "courses.course3.desc",
    longDescKey: "courses.course3.longDesc",
    level: "intermediate",
    isFree: false,
    isAfrican: true,
    duration: "5h 45m",
    gradientFrom: "#BA7517",
    gradientTo: "#EF9F27",
    tags: ["Solana", "Anchor", "African context"],
    outcomeKeys: [
      "courses.course3.outcome1",
      "courses.course3.outcome2",
      "courses.course3.outcome3",
      "courses.course3.outcome4",
    ],
    modules: [
      {
        id: "solana-foundations",
        titleKey: "courses.course3.module1.title",
        lessons: [
          { id: "why-solana", titleKey: "courses.course3.module1.lesson1", duration: "10 min" },
          { id: "setting-up-solana-playground", titleKey: "courses.course3.module1.lesson2", duration: "12 min" },
          { id: "accounts-programs-rent", titleKey: "courses.course3.module1.lesson3", duration: "15 min" },
        ],
      },
      {
        id: "designing-the-dapp",
        titleKey: "courses.course3.module2.title",
        lessons: [
          { id: "modeling-a-savings-circle", titleKey: "courses.course3.module2.lesson1", duration: "18 min" },
          { id: "first-anchor-program", titleKey: "courses.course3.module2.lesson2", duration: "25 min" },
          { id: "contributions-and-payouts", titleKey: "courses.course3.module2.lesson3", duration: "22 min" },
          { id: "connecting-a-wallet-with-privy", titleKey: "courses.course3.module2.lesson4", duration: "16 min" },
        ],
      },
      {
        id: "ship-it",
        titleKey: "courses.course3.module3.title",
        lessons: [
          { id: "testing-on-devnet", titleKey: "courses.course3.module3.lesson1", duration: "18 min" },
          { id: "building-the-frontend-ui", titleKey: "courses.course3.module3.lesson2", duration: "28 min" },
          { id: "launch-your-njangi-dapp", titleKey: "courses.course3.module3.lesson3", duration: "20 min" },
        ],
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getCourseLessonCount(course: Course): number {
  return course.modules.reduce((total, courseModule) => total + courseModule.lessons.length, 0);
}

export function getCourseModuleCount(course: Course): number {
  return course.modules.length;
}

export function levelBadgeKey(level: CourseLevel): string {
  return `courses.badge.${level}`;
}
