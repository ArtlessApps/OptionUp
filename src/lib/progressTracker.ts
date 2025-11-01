/**
 * Progress Tracker - Manages lesson completion and XP using localStorage
 */

const STORAGE_KEY = 'optionup_progress';

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  earnedXP: number;
  completedAt?: string;
}

export interface UserProgress {
  totalXP: number;
  completedLessons: string[];
  lessonProgress: Record<string, LessonProgress>;
  currentStreak: number;
  lastActivityDate?: string;
  badges: string[];
}

class ProgressTracker {
  private progress: UserProgress;

  constructor() {
    this.progress = this.loadProgress();
  }

  /**
   * Load progress from localStorage
   */
  private loadProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }

    // Return default progress
    return {
      totalXP: 0,
      completedLessons: [],
      lessonProgress: {},
      currentStreak: 0,
      badges: [],
    };
  }

  /**
   * Save progress to localStorage
   */
  private saveProgress(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  /**
   * Import progress from external source (e.g., cloud sync)
   */
  importProgress(progress: UserProgress): void {
    this.progress = progress;
    this.saveProgress();
  }

  /**
   * Mark a lesson as completed
   */
  completeLesson(lessonId: string, earnedXP: number): void {
    console.log('progressTracker.completeLesson called:', { lessonId, earnedXP });
    const wasCompleted = this.isLessonCompleted(lessonId);

    // Update lesson progress
    this.progress.lessonProgress[lessonId] = {
      lessonId,
      completed: true,
      earnedXP,
      completedAt: new Date().toISOString(),
    };

    // Add to completed lessons list if not already there
    if (!wasCompleted) {
      this.progress.completedLessons.push(lessonId);
      this.progress.totalXP += earnedXP;
      console.log('New total XP:', this.progress.totalXP);
    } else {
      console.log('Lesson was already completed - not adding XP again');
    }

    // Update activity date and streak
    this.updateStreak();

    this.saveProgress();
  }

  /**
   * Check if a lesson is completed
   */
  isLessonCompleted(lessonId: string): boolean {
    return this.progress.lessonProgress[lessonId]?.completed || false;
  }

  /**
   * Get earned XP for a lesson
   */
  getLessonXP(lessonId: string): number {
    return this.progress.lessonProgress[lessonId]?.earnedXP || 0;
  }

  /**
   * Get total XP across all lessons
   */
  getTotalXP(): number {
    return this.progress.totalXP;
  }

  /**
   * Get all completed lesson IDs
   */
  getCompletedLessons(): string[] {
    return [...this.progress.completedLessons];
  }

  /**
   * Update streak based on activity
   */
  private updateStreak(): void {
    const today = new Date().toDateString();
    const lastActivity = this.progress.lastActivityDate
      ? new Date(this.progress.lastActivityDate).toDateString()
      : null;

    if (!lastActivity) {
      // First activity
      this.progress.currentStreak = 1;
    } else if (lastActivity === today) {
      // Same day - no change
      return;
    } else {
      // Check if yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastActivity === yesterdayStr) {
        // Consecutive day
        this.progress.currentStreak += 1;
      } else {
        // Streak broken
        this.progress.currentStreak = 1;
      }
    }

    this.progress.lastActivityDate = new Date().toISOString();
  }

  /**
   * Get current streak
   */
  getCurrentStreak(): number {
    return this.progress.currentStreak;
  }

  /**
   * Award a badge
   */
  awardBadge(badge: string): void {
    if (!this.progress.badges.includes(badge)) {
      this.progress.badges.push(badge);
      this.saveProgress();
    }
  }

  /**
   * Get all earned badges
   */
  getBadges(): string[] {
    return [...this.progress.badges];
  }

  /**
   * Reset all progress (for testing/debugging)
   */
  resetProgress(): void {
    this.progress = {
      totalXP: 0,
      completedLessons: [],
      lessonProgress: {},
      currentStreak: 0,
      badges: [],
    };
    this.saveProgress();
  }

  /**
   * Get completion percentage
   */
  getCompletionPercentage(totalLessons: number): number {
    if (totalLessons === 0) return 0;
    return Math.round((this.progress.completedLessons.length / totalLessons) * 100);
  }

  /**
   * Export progress data (for debugging or backup)
   */
  exportProgress(): UserProgress {
    return JSON.parse(JSON.stringify(this.progress));
  }
}

// Export singleton instance
export const progressTracker = new ProgressTracker();

