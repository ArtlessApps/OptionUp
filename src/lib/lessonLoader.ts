/**
 * Lesson Loader - Dynamically loads all lessons from the content directory
 */

import type { Lesson, LessonMetadata, ModuleMetadata } from '../types/lesson.types';
import { progressTracker } from './progressTracker';

// Module titles mapping
const MODULE_TITLES: Record<number, string> = {
  1: 'Options Fundamentals',
  2: 'Income Strategies',
  3: 'Spreads & Advanced Strategies',
  4: 'Neutral Strategies',
  5: 'The Greeks',
  6: 'Risk Management & Taxes',
  7: 'Trading Psychology',
};

/**
 * Use Vite's import.meta.glob to load all lesson files
 * This creates a map of file paths to import functions
 */
const lessonFiles = import.meta.glob('/content/lessons/module-*/*.json');

/**
 * Extract module and lesson number from file path
 * Example: "/content/lessons/module-2/17_covered_call_calculator.json"
 * Returns: { moduleNumber: 2, lessonNumber: 17 }
 */
function parseFilePath(filePath: string): { moduleNumber: number; lessonNumber: number } | null {
  const match = filePath.match(/module-(\d+)\/(\d+)_/);
  if (match) {
    return {
      moduleNumber: parseInt(match[1], 10),
      lessonNumber: parseInt(match[2], 10),
    };
  }
  return null;
}

/**
 * Load all lesson metadata (without loading full lesson content)
 */
export async function loadAllLessonMetadata(): Promise<ModuleMetadata[]> {
  const modules: Record<number, ModuleMetadata> = {};

  // Process each lesson file
  for (const [filePath, importFn] of Object.entries(lessonFiles)) {
    const parsed = parseFilePath(filePath);
    if (!parsed) continue;

    const { moduleNumber, lessonNumber } = parsed;

    // Load the lesson data
    const lessonData = (await importFn()) as { default: Lesson };
    const lesson = lessonData.default;

    // Extract XP and badge from celebration screen if not at root level
    let totalXP = lesson.total_xp || 0;
    let badge = lesson.badge;
    
    const celebrationScreen = lesson.screens.find(
      (s): s is Extract<typeof s, { screen_type: 'celebration' }> => s.screen_type === 'celebration'
    );
    if (celebrationScreen) {
      totalXP = celebrationScreen.xp_earned || totalXP;
      badge = celebrationScreen.badge || badge;
    }

    // Create lesson metadata
    const metadata: LessonMetadata = {
      id: lesson.lesson_id,
      moduleNumber,
      lessonNumber,
      title: lesson.title,
      estimatedTime: lesson.estimated_time,
      totalXP,
      badge,
      filePath,
      isCompleted: progressTracker.isLessonCompleted(lesson.lesson_id),
      earnedXP: progressTracker.getLessonXP(lesson.lesson_id),
    };

    // Initialize module if it doesn't exist
    if (!modules[moduleNumber]) {
      modules[moduleNumber] = {
        moduleNumber,
        title: MODULE_TITLES[moduleNumber] || `Module ${moduleNumber}`,
        lessons: [],
        totalLessons: 0,
        completedLessons: 0,
      };
    }

    // Add lesson to module
    modules[moduleNumber].lessons.push(metadata);
  }

  // Sort lessons within each module and calculate stats
  const sortedModules = Object.values(modules).sort((a, b) => a.moduleNumber - b.moduleNumber);

  sortedModules.forEach((module) => {
    // Sort lessons by lesson number
    module.lessons.sort((a, b) => a.lessonNumber - b.lessonNumber);

    // Calculate stats
    module.totalLessons = module.lessons.length;
    module.completedLessons = module.lessons.filter((l) => l.isCompleted).length;
  });

  return sortedModules;
}

/**
 * Load a specific lesson by its ID
 */
export async function loadLessonById(lessonId: string): Promise<Lesson | null> {
  // Find the file path for this lesson
  for (const importFn of Object.values(lessonFiles)) {
    const lessonData = (await importFn()) as { default: Lesson };
    const lesson = lessonData.default;

    if (lesson.lesson_id === lessonId) {
      return lesson;
    }
  }

  return null;
}

/**
 * Load a specific lesson by module and lesson number
 */
export async function loadLessonByNumber(
  moduleNumber: number,
  lessonNumber: number
): Promise<Lesson | null> {
  // Find the matching file
  for (const filePath of Object.keys(lessonFiles)) {
    const parsed = parseFilePath(filePath);
    if (parsed && parsed.moduleNumber === moduleNumber && parsed.lessonNumber === lessonNumber) {
      const importFn = lessonFiles[filePath];
      const lessonData = (await importFn()) as { default: Lesson };
      return lessonData.default;
    }
  }

  return null;
}

/**
 * Get the next lesson after completing the current one
 */
export async function getNextLesson(currentLessonId: string): Promise<LessonMetadata | null> {
  const allModules = await loadAllLessonMetadata();
  const allLessons: LessonMetadata[] = [];

  // Flatten all lessons
  allModules.forEach((module) => {
    allLessons.push(...module.lessons);
  });

  // Find current lesson index
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);

  // Return next lesson if it exists
  if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
    return allLessons[currentIndex + 1];
  }

  return null;
}

/**
 * Get the previous lesson
 */
export async function getPreviousLesson(currentLessonId: string): Promise<LessonMetadata | null> {
  const allModules = await loadAllLessonMetadata();
  const allLessons: LessonMetadata[] = [];

  // Flatten all lessons
  allModules.forEach((module) => {
    allLessons.push(...module.lessons);
  });

  // Find current lesson index
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);

  // Return previous lesson if it exists
  if (currentIndex > 0) {
    return allLessons[currentIndex - 1];
  }

  return null;
}

/**
 * Get overall progress statistics
 */
export async function getProgressStats(): Promise<{
  totalLessons: number;
  completedLessons: number;
  totalXP: number;
  completionPercentage: number;
  currentStreak: number;
}> {
  const allModules = await loadAllLessonMetadata();
  const totalLessons = allModules.reduce((sum, module) => sum + module.totalLessons, 0);
  const completedLessons = allModules.reduce((sum, module) => sum + module.completedLessons, 0);

  return {
    totalLessons,
    completedLessons,
    totalXP: progressTracker.getTotalXP(),
    completionPercentage: progressTracker.getCompletionPercentage(totalLessons),
    currentStreak: progressTracker.getCurrentStreak(),
  };
}

/**
 * Get the first incomplete lesson (for "Continue Learning")
 */
export async function getFirstIncompleteLesson(): Promise<LessonMetadata | null> {
  const allModules = await loadAllLessonMetadata();

  for (const module of allModules) {
    const incompleteLesson = module.lessons.find((lesson) => !lesson.isCompleted);
    if (incompleteLesson) {
      return incompleteLesson;
    }
  }

  // All lessons completed, return the first lesson
  if (allModules.length > 0 && allModules[0].lessons.length > 0) {
    return allModules[0].lessons[0];
  }

  return null;
}

