/**
 * Batch scheduler — generates varied publication times.
 * No two weeks reproduce the same temporal pattern.
 */

// Time slots pool (hours in UTC, will display as CET +2)
const TIME_SLOTS = [
  { h: 7, m: 15 },  { h: 8, m: 42 },  { h: 9, m: 7 },
  { h: 10, m: 33 }, { h: 11, m: 18 }, { h: 12, m: 5 },
  { h: 13, m: 47 }, { h: 14, m: 22 }, { h: 15, m: 9 },
  { h: 16, m: 38 }, { h: 17, m: 51 }, { h: 18, m: 14 },
  { h: 19, m: 3 },  { h: 19, m: 44 }, { h: 20, m: 27 },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/**
 * Generate schedule slots for `daysAhead` days, `postsPerDay` per day.
 * Uses date-based seed so same day always gets same schedule (idempotent),
 * but different days/weeks get different patterns.
 */
export function generateBatchSchedule(
  daysAhead: number,
  postsPerDay: number,
  startDate?: Date,
): Array<{ date: string; hour: number; minute: number; dayOfWeek: number }> {
  const start = startDate || new Date();
  const slots: Array<{ date: string; hour: number; minute: number; dayOfWeek: number }> = [];

  for (let d = 1; d <= daysAhead; d++) {
    const date = new Date(start);
    date.setDate(date.getDate() + d);

    // Seed based on year + week + day = unique per day, consistent per day
    const dayOfYear = Math.floor(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
    );
    const weekOfYear = Math.floor(dayOfYear / 7);
    const seed = date.getFullYear() * 10000 + weekOfYear * 100 + date.getDay();
    const rng = seededRandom(seed);

    // Shuffle time slots
    const shuffled = [...TIME_SLOTS].sort(() => rng() - 0.5);

    // Pick `postsPerDay` slots, ensuring they're at least 2h apart
    const picked: Array<{ h: number; m: number }> = [];
    for (const slot of shuffled) {
      if (picked.length >= postsPerDay) break;
      const tooClose = picked.some(
        (p) => Math.abs(p.h * 60 + p.m - (slot.h * 60 + slot.m)) < 120,
      );
      if (!tooClose) picked.push(slot);
    }

    // Fallback if not enough spaced slots
    while (picked.length < postsPerDay && picked.length < shuffled.length) {
      picked.push(shuffled[picked.length]);
    }

    picked.sort((a, b) => a.h * 60 + a.m - (b.h * 60 + b.m));

    for (const slot of picked) {
      const dateStr = date.toISOString().split("T")[0];
      slots.push({
        date: dateStr,
        hour: slot.h,
        minute: slot.m,
        dayOfWeek: date.getDay(),
      });
    }
  }

  return slots;
}
