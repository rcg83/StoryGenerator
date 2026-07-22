import type { StorySpread } from "./StorySpread.js";

export interface StoryCover {
  title: string;
  subtitle: string;
  coverImage: string;
}

export interface Story {
  id: string;
  title: string;
  startPageId: string;
  cover: StoryCover;
  spreads: Record<string, StorySpread>;
}
