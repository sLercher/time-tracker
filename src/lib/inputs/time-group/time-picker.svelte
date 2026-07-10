<script>
	import Clock4 from '@lucide/svelte/icons/clock-4';

	import TimePickerInput from '$lib/inputs/time-group/time-picker-input.svelte';
	import * as util from '$lib/inputs/time-group/time-picker-logic';

	/**
	 * @type {{
	 * hour?: string
	 * minute?: string
	 * disabled?: boolean
	 * }}
	 * */
	let { hour = $bindable(''), minute = $bindable(''), disabled = false } = $props();

	/** The input for the hours. @type {HTMLInputElement | undefined}*/
	let hourInput = $state();
	/** The input for the minuntes. @type {HTMLInputElement | undefined}*/
	let minuteInput = $state();

	/**
	 * Handles the hour input event.
	 *
	 * @param {Event} event the current event handler.
	 */
	function handleHourInput(event) {
		const input = /** @type {HTMLInputElement} */ (event.currentTarget);
		hour = util.onlyDigits(input.value);
		if (hour.length === 2) {
			hour = util.clamp(hour, 23);
			minuteInput?.focus();
		}
	}

	/**
	 * Handles the minute input event.
	 *
	 * @param {Event} event the current event handler.
	 */
	function handleMinuteInput(event) {
		const input = /** @type {HTMLInputElement} */ (event.currentTarget);
		minute = util.onlyDigits(input.value);
		if (minute.length === 2) {
			minute = util.clamp(minute, 59);
			minuteInput?.blur();
		}
	}

	/*** Handles the hour blur event. */
	function handleHourBlur() {
		hour = util.clamp(hour, 23);
	}

	/*** Handles the minute blur event. */
	function handleMinuteBlur() {
		minute = util.clamp(minute, 59);
	}

	/**
	 * Handles the minute key down event.
	 *
	 * @param {KeyboardEvent} event the current event handler.
	 */
	function handleMinuteKeydown(event) {
		if (event.key === 'Backspace' && minute === '') {
			hourInput?.focus();
		}
	}

	/** Uses the current time for the hour and minute. */
	function useCurrentTime() {
		[hour, minute] = util.currentTime();
	}
</script>

<div
	class="grid h-10 grid-cols-[1fr_auto_1fr_auto] rounded-lg bg-(--surface-raised) text-(--text) items-center"
>
	<TimePickerInput
		bind:input={hourInput}
		bind:value={hour}
		{disabled}
		ariaLabel="Stunden"
		handleInput={handleHourInput}
		handleBlur={handleHourBlur}
	/>
	<p class="text-sm text-(--ring)">:</p>
	<TimePickerInput
		bind:input={minuteInput}
		bind:value={minute}
		{disabled}
		ariaLabel="Minuten"
		handleInput={handleMinuteInput}
		handleBlur={handleMinuteBlur}
		handleKeyDown={handleMinuteKeydown}
	/>

	<button
		type="button"
		onclick={useCurrentTime}
		{disabled}
		aria-label="Aktuelle Zeit verwenden"
		class="flex cursor-pointer items-center justify-center bg-transparent px-2 text-(--text) outline-none transition hover:text-(--accent) focus:text-(--text) disabled:cursor-not-allowed disabled:opacity-60"
	>
		<Clock4 size="16" />
	</button>
</div>
