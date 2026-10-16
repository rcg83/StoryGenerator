import type { Chapter } from './Chapter';

export interface Story {
  id: string;
  titleEn: string;
  titleEs: string;
  startPageId: string;
  chapters: Chapter[];
  cover?: { subtitle: string; coverImage?: string }
}
