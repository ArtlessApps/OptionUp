/**
 * Lesson Context - Provides lesson data and progress throughout the app
 */

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Lesson, LessonMetadata, ModuleMetadata } from '../types/lesson.types';
import {
  loadAllLessonMetadata,
  loadLessonById,
  getNextLesson,
  getPreviousLesson,
  getProgressStats,
  getFirstIncompleteLesson,
} from './lessonLoader';
import { progressTracker } from './progressTracker';
import { CloudProgressTracker } from './cloudProgressTracker';
import { supabase } from './supabase';

interface LessonContextType {
  // Data
  modules: ModuleMetadata[];
  currentLesson: Lesson | null;
  currentLessonMetadata: LessonMetadata | null;

  // Stats
  totalXP: number;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  currentStreak: number;

  // Loading states
  isLoading: boolean;
  isLoadingLesson: boolean;

  // Actions
  loadLesson: (lessonId: string) => Promise<void>;
  completeLesson: (lessonId: string, earnedXP: number) => void;
  goToNextLesson: () => Promise<void>;
  goToPreviousLesson: () => Promise<void>;
  continueLesson: () => Promise<void>;
  refreshProgress: () => Promise<void>;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export function LessonProvider({ children }: { children: ReactNode }) {
  const [modules, setModules] = useState<ModuleMetadata[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentLessonMetadata, setCurrentLessonMetadata] = useState<LessonMetadata | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);

  // Load all lessons metadata on mount
  useEffect(() => {
    loadModules();
    syncProgressWithCloud();
  }, []);

  // Sync progress with cloud when user signs in
  const syncProgressWithCloud = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Load cloud progress
        const cloudProgress = await CloudProgressTracker.loadFromCloud(user.id);
        if (cloudProgress) {
          // Merge with local progress
          const localProgress = progressTracker.exportProgress();
          const mergedProgress = CloudProgressTracker.mergeProgress(localProgress, cloudProgress);
          progressTracker.importProgress(mergedProgress);
          
          // Refresh stats
          await refreshProgress();
        } else {
          // No cloud progress exists - create initial record
          console.log('No cloud progress found, creating initial record...');
          await CloudProgressTracker.createInitialProgress(user.id);
          
          // Also sync any local progress they might have
          const localProgress = progressTracker.exportProgress();
          if (localProgress.totalXP > 0 || localProgress.completedLessons.length > 0) {
            await CloudProgressTracker.syncToCloud(user.id, localProgress);
          }
        }
      }
    } catch (error) {
      console.error('Failed to sync with cloud:', error);
    }
  };

  const loadModules = async () => {
    setIsLoading(true);
    try {
      const modulesData = await loadAllLessonMetadata();
      setModules(modulesData);

      const stats = await getProgressStats();
      setTotalXP(stats.totalXP);
      setTotalLessons(stats.totalLessons);
      setCompletedLessons(stats.completedLessons);
      setCompletionPercentage(stats.completionPercentage);
      setCurrentStreak(stats.currentStreak);
    } catch (error) {
      console.error('Failed to load lessons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLesson = async (lessonId: string) => {
    setIsLoadingLesson(true);
    try {
      const lesson = await loadLessonById(lessonId);
      setCurrentLesson(lesson);

      // Find metadata for this lesson
      const metadata = modules
        .flatMap((m) => m.lessons)
        .find((l) => l.id === lessonId);
      setCurrentLessonMetadata(metadata || null);
    } catch (error) {
      console.error('Failed to load lesson:', error);
    } finally {
      setIsLoadingLesson(false);
    }
  };

  const completeLesson = async (lessonId: string, earnedXP: number) => {
    progressTracker.completeLesson(lessonId, earnedXP);

    // Award badge if lesson has one
    const lessonMeta = modules
      .flatMap((m) => m.lessons)
      .find((l) => l.id === lessonId);
    if (lessonMeta?.badge) {
      progressTracker.awardBadge(lessonMeta.badge);
    }

    // Refresh progress
    await refreshProgress();
    
    // Sync to cloud if user is authenticated
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const progress = progressTracker.exportProgress();
        await CloudProgressTracker.syncToCloud(user.id, progress);
      }
    } catch (error) {
      console.error('Failed to sync progress to cloud:', error);
    }
  };

  const goToNextLesson = async () => {
    if (!currentLessonMetadata) return;

    const next = await getNextLesson(currentLessonMetadata.id);
    if (next) {
      await loadLesson(next.id);
    }
  };

  const goToPreviousLesson = async () => {
    if (!currentLessonMetadata) return;

    const prev = await getPreviousLesson(currentLessonMetadata.id);
    if (prev) {
      await loadLesson(prev.id);
    }
  };

  const continueLesson = async () => {
    const firstIncomplete = await getFirstIncompleteLesson();
    if (firstIncomplete) {
      await loadLesson(firstIncomplete.id);
    }
  };

  const refreshProgress = async () => {
    // Reload modules to get updated completion status
    const modulesData = await loadAllLessonMetadata();
    setModules(modulesData);

    // Update stats
    const stats = await getProgressStats();
    setTotalXP(stats.totalXP);
    setTotalLessons(stats.totalLessons);
    setCompletedLessons(stats.completedLessons);
    setCompletionPercentage(stats.completionPercentage);
    setCurrentStreak(stats.currentStreak);

    // Update current lesson metadata if there is one
    if (currentLessonMetadata) {
      const updated = modulesData
        .flatMap((m) => m.lessons)
        .find((l) => l.id === currentLessonMetadata.id);
      if (updated) {
        setCurrentLessonMetadata(updated);
      }
    }
  };

  const value: LessonContextType = {
    modules,
    currentLesson,
    currentLessonMetadata,
    totalXP,
    totalLessons,
    completedLessons,
    completionPercentage,
    currentStreak,
    isLoading,
    isLoadingLesson,
    loadLesson,
    completeLesson,
    goToNextLesson,
    goToPreviousLesson,
    continueLesson,
    refreshProgress,
  };

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
}

export function useLessons() {
  const context = useContext(LessonContext);
  if (context === undefined) {
    throw new Error('useLessons must be used within a LessonProvider');
  }
  return context;
}

