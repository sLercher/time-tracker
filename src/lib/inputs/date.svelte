<script>
	/**
	 * @type {{
	 * selectedDate?: string,
	 * isInputLocked?: boolean,
	 * onChange?: () => void
	 * }}
	 */
	let { selectedDate = $bindable(''), isInputLocked = false, onChange = () => {} } = $props();
</script>

<input
	id="selected-date"
	bind:value={selectedDate}
	onchange={onChange}
	disabled={isInputLocked}
	type="date"
	class="rounded-lg border-0 bg-(--surface-raised) px-4 py-2 text-sm text-(--text) outline-none disabled:cursor-not-allowed disabled:opacity-60 transition focus:ring-3 focus:ring-(--ring)/50 focus:ring-offset-1 focus:ring-offset-(--ring)"
/>
