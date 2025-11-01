/**
 * Cloud Progress Tracker - Syncs progress with Supabase
 */

import { supabase } from './supabase';
import { UserProgress, LessonProgress } from './progressTracker';

export class CloudProgressTracker {
  /**
   * Sync local progress to Supabase
   */
  static async syncToCloud(userId: string, progress: UserProgress): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          total_xp: progress.totalXP,
          completed_lessons: progress.completedLessons,
          lesson_progress: progress.lessonProgress,
          current_streak: progress.currentStreak,
          last_activity_date: progress.lastActivityDate || null,
          badges: progress.badges,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error syncing progress to cloud:', error);
        throw error;
      }

      console.log('Progress synced to cloud successfully');
    } catch (error) {
      console.error('Failed to sync progress:', error);
      throw error;
    }
  }

  /**
   * Load progress from Supabase
   */
  static async loadFromCloud(userId: string): Promise<UserProgress | null> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No progress found, return null
          return null;
        }
        console.error('Error loading progress from cloud:', error);
        throw error;
      }

      if (data) {
        return {
          totalXP: data.total_xp,
          completedLessons: data.completed_lessons,
          lessonProgress: data.lesson_progress as Record<string, LessonProgress>,
          currentStreak: data.current_streak,
          lastActivityDate: data.last_activity_date || undefined,
          badges: data.badges,
        };
      }

      return null;
    } catch (error) {
      console.error('Failed to load progress from cloud:', error);
      return null;
    }
  }

  /**
   * Merge local and cloud progress (take the one with more XP)
   */
  static mergeProgress(local: UserProgress, cloud: UserProgress): UserProgress {
    // Strategy: Use the progress with higher XP
    // This prevents data loss if user has been using offline
    if (local.totalXP >= cloud.totalXP) {
      console.log('Using local progress (higher XP)');
      return local;
    } else {
      console.log('Using cloud progress (higher XP)');
      return cloud;
    }
  }
}

