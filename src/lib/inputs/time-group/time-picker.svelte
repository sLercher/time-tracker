<script>
	import Clock4 from '@lucide/svelte/icons/clock-4';

	import * as util from '$lib/inputs/time-group/time-picker-logic';

	/** @type {{hour:string, minute:string}} */
	let { hour = '', minute = '' } = $props();
	/** The input for the hours. @type {HTMLInputElement}*/
	let hourInput;
	/** The input for the minuntes. @type {HTMLInputElement}*/
	let minuteInput;

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
	class="grid grid-cols-[1fr_1fr_auto] h-full rounded-lg border border-(--border) bg-(--surface) text-(--text)"
>
	<input
		bind:this={hourInput}
		bind:value={hour}
		maxlength="2"
		oninput={handleHourInput}
		onblur={handleHourBlur}
		type="text"
		inputmode="numeric"
		placeholder="00"
		aria-label="Stunden"
		class="bg-transparent min-w-10 text-center text-sm font-light placeholder:text-(--border) outline-none focus:placeholder:text-(--text)"
	/>

	<input
		bind:this={minuteInput}
		bind:value={minute}
		maxlength="2"
		oninput={handleMinuteInput}
		onblur={handleMinuteBlur}
		onkeydown={handleMinuteKeydown}
		type="text"
		inputmode="numeric"
		placeholder="00"
		aria-label="Minuten"
		class="border-x border-(--border) bg-transparent min-w-10 text-center text-sm font-light placeholder:text-(--border) outline-none focus:placeholder:text-(--text)"
	/>

	<button
		type="button"
		onclick={useCurrentTime}
		aria-label="Aktuelle Zeit verwenden"
		class="flex items-center px-2 justify-center bg-transparent text-(--border) outline-none transition hover:text-(--text) focus:text-(--text)"
	>
		<Clock4 size="16" />
	</button>
</div>
