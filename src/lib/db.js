import Dexie from 'dexie';

export const db = new Dexie('time-management-db');

db.version(1).stores({
	['timeEntries']: '++id,date,project,startTime,endTime,createdAt',
});

/**
 * Persist a tracked time entry in IndexedDB.
 *
 * @param {{
 *   date: string,
 *   project: string,
 *   description: string,
 *   startTime: string,
 *   endTime: string,
 *   startMinutes: number,
 *   endMinutes: number,
 *   durationMinutes: number,
 *   createdAt: string
 * }} entry - The normalized entry to persist.
 * @returns {Promise<import('dexie').IndexableType>} The generated primary key.
 */
export async function saveTimeEntry(entry) {
	return db.table('timeEntries').add(entry);
}
