import Dexie from 'dexie';

export const db = new Dexie('time-management-db');

db.version(1).stores({
	['timing']: '++id,date',
});
