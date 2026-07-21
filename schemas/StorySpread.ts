import type { StoryPage } from "./StoryPage.js";

export interface StorySpread {
  id: string;
  leftPage: StoryPage;
  rightPage: StoryPage;
}
