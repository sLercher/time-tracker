import Dexie from 'dexie';

export const db = new Dexie('time-management-db');

db.version(1).stores({
	['timeEntries']: '++id,date,project,startTime,endTime,createdAt'
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

/**
 * Load all entries for a given date, ordered by start time.
 *
 * @param {string} date - Date in YYYY-MM-DD format.
 * @returns {Promise<Array<{
 *   id: number,
 *   date: string,
 *   project: string,
 *   description: string,
 *   startTime: string,
 *   endTime: string,
 *   startMinutes: number,
 *   endMinutes: number,
 *   durationMinutes: number,
 *   createdAt: string,
 *   updatedAt?: string
 * }>>}
 */
export async function getTimeEntriesByDate(date) {
	return db.table('timeEntries').where('date').equals(date).sortBy('startMinutes');
}

/**
 * Update an existing time entry.
 *
 * @param {number} id - Primary key of the entry.
 * @param {{
 *   date: string,
 *   project: string,
 *   description: string,
 *   startTime: string,
 *   endTime: string,
 *   startMinutes: number,
 *   endMinutes: number,
 *   durationMinutes: number,
 *   updatedAt: string
 * }} patch - The normalized values to write.
 * @returns {Promise<number>} The number of updated records.
 */
export async function updateTimeEntry(id, patch) {
	return db.table('timeEntries').update(id, patch);
}

/**
 * Delete a time entry by id.
 *
 * @param {number} id - Primary key of the entry.
 * @returns {Promise<void>}
 */
export async function deleteTimeEntry(id) {
	await db.table('timeEntries').delete(id);
}
