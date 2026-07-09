/**
 * Build today's local date string in YYYY-MM-DD format.
 *
 * @returns {string} Local date key.
 */
export function getTodayDateKey() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

/**
 * Convert two-digit time strings into total minutes.
 *
 * @param {string} hour - Hour value (00-23).
 * @param {string} minute - Minute value (00-59).
 * @returns {number} Minutes from midnight.
 */
export function toMinutes(hour, minute) {
	return Number(hour) * 60 + Number(minute);
}

/**
 * Split a HH:MM time string into hour and minute parts.
 *
 * @param {string} value - Time string in HH:MM format.
 * @returns {[string, string]} Tuple in [hour, minute] format.
 */
export function splitTime(value) {
	const [hour = '', minute = ''] = value.split(':');
	return [hour, minute];
}

/**
 * Get the current local time in HH:MM parts.
 *
 * @returns {[string, string]} Current local time as [hour, minute].
 */
export function getCurrentTimeParts() {
	const now = new Date();
	const hour = String(now.getHours()).padStart(2, '0');
	const minute = String(now.getMinutes()).padStart(2, '0');
	return [hour, minute];
}

/**
 * Format duration minutes into a compact display string.
 *
 * @param {number} minutes - Duration in minutes.
 * @returns {string} Readable duration text.
 */
export function formatDuration(minutes) {
	const hours = Math.floor(minutes / 60);
	const restMinutes = minutes % 60;

	if (hours === 0) {
		return `${restMinutes}m`;
	}

	if (restMinutes === 0) {
		return `${hours}h`;
	}

	return `${hours}h ${restMinutes}m`;
}

/**
 * Format elapsed milliseconds as HH:MM:SS.
 *
 * @param {number} elapsedMs - Milliseconds to format.
 * @returns {string} Formatted elapsed string.
 */
export function formatElapsedDuration(elapsedMs) {
	const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Validate and normalize a time tracking form for persistence.
 *
 * @param {{
 *   date?: string,
 *   project: string,
 *   description: string,
 *   startHour: string,
 *   startMinute: string,
 *   endHour: string,
 *   endMinute: string
 * }} values - Raw form values from UI state.
 * @returns {{ ok: true, data: {
 *   date: string,
 *   project: string,
 *   description: string,
 *   startTime: string,
 *   endTime: string,
 *   startMinutes: number,
 *   endMinutes: number,
 *   durationMinutes: number,
 *   createdAt: string
 * }} | { ok: false, message: string }} Validation result.
 */
export function validateAndBuildEntry(values) {
	const project = values.project.trim();
	const description = values.description.trim();

	if (!project) {
		return { ok: false, message: 'Bitte ein Projekt eingeben.' };
	}

	const hasStart = values.startHour !== '' && values.startMinute !== '';
	const hasEnd = values.endHour !== '' && values.endMinute !== '';

	if (!hasStart || !hasEnd) {
		return { ok: false, message: 'Bitte Start- und Endzeit vollständig eingeben.' };
	}

	const startMinutes = toMinutes(values.startHour, values.startMinute);
	const endMinutes = toMinutes(values.endHour, values.endMinute);

	if (endMinutes <= startMinutes) {
		return { ok: false, message: 'Die Endzeit muss nach der Startzeit liegen.' };
	}

	const startTime = `${values.startHour}:${values.startMinute}`;
	const endTime = `${values.endHour}:${values.endMinute}`;

	return {
		ok: true,
		data: {
			date: values.date || getTodayDateKey(),
			project,
			description,
			startTime,
			endTime,
			startMinutes,
			endMinutes,
			durationMinutes: endMinutes - startMinutes,
			createdAt: new Date().toISOString(),
		},
	};
}
