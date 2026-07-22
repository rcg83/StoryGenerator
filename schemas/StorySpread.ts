import type { StoryPage } from "./StoryPage.js";

export type SpreadType = "default" | "mistery" | "death" | "critical" | "ending";

export interface StorySpread {
  id: string;
  type: SpreadType;
  leftPage: StoryPage;
  rightPage: StoryPage;
}
