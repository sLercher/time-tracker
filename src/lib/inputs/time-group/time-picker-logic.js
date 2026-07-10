/**
 * Remove all non-digit characters and limit the result to 2 digits.
 *
 * @param {string} value - The input value.
 * @returns {string} The sanitized value containing only digits, truncated to a maximum length of 2.
 */
export function onlyDigits(value) {
	return value.replace(/\D/g, '').slice(0, 2);
}

/**
 * Clamp a numeric string to a maximum value and format it as a 2-digit string.
 *
 * Returns an empty string if the input is empty.
 *
 * @param {string} value - The numeric value as a string.
 * @param {number} max - The maximum allowed value.
 * @returns {string} The clamped value, padded with a leading zero if necessary.
 */
export function clamp(value, max) {
	if (value === '') return '';
	const number = Math.min(Number(value), max);
	return String(number).padStart(2, '0');
}

/**
 * Get the current local time as a tuple containing hour and minute.
 *
 * Both values are returned as 2-digit strings.
 *
 * @returns {[string, string]} The current time in the format [hour, minute].
 */
export function currentTime() {
	const now = new Date();
	let hour = String(now.getHours()).padStart(2, '0');
	let minute = String(now.getMinutes()).padStart(2, '0');
	return [hour, minute];
}
