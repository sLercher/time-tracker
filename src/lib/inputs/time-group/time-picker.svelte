<script>
	import Clock4 from '@lucide/svelte/icons/clock-4';

	import * as util from '$lib/inputs/time-group/time-picker-logic';

	/** @type {{ hour?: string, minute?: string, showButton?: boolean, disabled?: boolean}} */
	let {
		hour = $bindable(''),
		minute = $bindable(''),
		showButton = true,
		disabled = false
	} = $props();
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
	class="grid h-12 grid-cols-[1fr_1fr_auto] rounded-xl border border-(--border) bg-(--surface) text-(--text)"
>
	<input
		bind:this={hourInput}
		bind:value={hour}
		{disabled}
		maxlength="2"
		oninput={handleHourInput}
		onblur={handleHourBlur}
		type="text"
		inputmode="numeric"
		placeholder="00"
		aria-label="Stunden"
		class="min-w-10 bg-transparent px-1 text-center text-lg font-light outline-none placeholder:text-(--border) focus:placeholder:text-(--text) disabled:cursor-not-allowed disabled:opacity-60"
	/>

	<input
		bind:this={minuteInput}
		bind:value={minute}
		{disabled}
		maxlength="2"
		oninput={handleMinuteInput}
		onblur={handleMinuteBlur}
		onkeydown={handleMinuteKeydown}
		type="text"
		inputmode="numeric"
		placeholder="00"
		aria-label="Minuten"
		class="{showButton
			? `border-x`
			: `border-l`} min-w-10 border-(--border) bg-transparent px-1 text-center text-lg font-light outline-none placeholder:text-(--border) focus:placeholder:text-(--text) disabled:cursor-not-allowed disabled:opacity-60"
	/>

	{#if showButton}
		<button
			type="button"
			onclick={useCurrentTime}
			{disabled}
			aria-label="Aktuelle Zeit verwenden"
			class="flex cursor-pointer items-center justify-center bg-transparent px-2 text-(--border) outline-none transition hover:text-(--text) focus:text-(--text) disabled:cursor-not-allowed disabled:opacity-60"
		>
			<Clock4 size="16" />
		</button>
	{/if}
</div>
