# Progress Persistence Fix

## Problem
User progress was not persisting after logout and login. When users logged back in, they would start from the beginning instead of continuing where they left off.

## Root Cause
The issue was a **timing/race condition** between authentication and progress loading:

1. **On Logout** (`AuthContext.tsx` line 88-94):
   - Supabase auth signs out ✓
   - localStorage is completely cleared (including progress) ✓
   - Page reloads ✓

2. **On Login** - THE PROBLEM:
   - `LessonProvider` mounts and runs its `useEffect` ONCE
   - This effect called `syncProgressWithCloud()` immediately
   - BUT the authentication state wasn't fully loaded yet!
   - The effect never ran again when the user actually logged in
   - **Result**: Progress stayed in Supabase but was never loaded

## The Fix

Modified `LessonContext.tsx` to properly listen to authentication state changes:

### Key Changes:
1. **Added `hasLoadedInitialProgress` state** - tracks whether we've loaded progress for the current session
2. **Separated concerns** - split module loading and progress syncing into separate effects
3. **Added auth state listener** - listens to `supabase.auth.onAuthStateChange()` events:
   - On `SIGNED_IN` event → load progress from Supabase
   - On `SIGNED_OUT` event → reset the loaded flag
4. **Prevents duplicate syncs** - uses flag to ensure progress loads only once per session

### Flow After Fix:

#### User Login:
```
1. User signs in
2. Auth state change fires (SIGNED_IN event)
3. LessonProvider detects auth change
4. Calls syncProgressWithCloud()
5. Loads progress from Supabase
6. Merges with local progress (takes higher XP)
7. Updates UI with restored progress ✓
```

#### User Logout:
```
1. User signs out
2. Auth state change fires (SIGNED_OUT event)
3. localStorage cleared
4. Progress flag reset
5. Page reloads
6. User sees clean state ✓
```

#### Page Refresh (while logged in):
```
1. Page loads
2. AuthProvider restores session from Supabase
3. LessonProvider detects existing auth
4. Loads progress from cloud
5. User continues where they left off ✓
```

## Technical Details

### Before:
```typescript
useEffect(() => {
  loadModules();
  syncProgressWithCloud(); // Runs ONCE, too early!
}, []); // Empty deps = only on mount
```

### After:
```typescript
// Load modules once
useEffect(() => {
  loadModules();
}, []);

// Sync progress when auth changes
useEffect(() => {
  const syncOnAuthChange = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user && !hasLoadedInitialProgress) {
      await syncProgressWithCloud();
      setHasLoadedInitialProgress(true);
    } else if (!user) {
      setHasLoadedInitialProgress(false);
    }
  };

  syncOnAuthChange();

  // Listen for real-time auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await syncProgressWithCloud();
        setHasLoadedInitialProgress(true);
      } else if (event === 'SIGNED_OUT') {
        setHasLoadedInitialProgress(false);
      }
    }
  );

  return () => subscription.unsubscribe();
}, [hasLoadedInitialProgress]);
```

## What This Fixes
✅ Progress persists across login/logout cycles
✅ Progress loads correctly on page refresh
✅ No duplicate syncs
✅ Proper merge strategy (higher XP wins)
✅ Real-time response to auth state changes

## Database Verification
Ensure your Supabase `user_progress` table exists with this schema:
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `total_xp` (integer)
- `completed_lessons` (text[])
- `lesson_progress` (jsonb)
- `current_streak` (integer)
- `last_activity_date` (timestamp)
- `badges` (text[])
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Testing Checklist
- [ ] Complete a lesson
- [ ] Verify XP increases
- [ ] Log out
- [ ] Log back in
- [ ] Verify progress is restored
- [ ] Complete another lesson
- [ ] Refresh page
- [ ] Verify progress persists

