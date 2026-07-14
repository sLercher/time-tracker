<script>
	/**
	 * @type {{
	 * input?: HTMLInputElement
	 * value?: string
	 * disabled?: boolean
	 * ariaLabel?: string
	 * handleInput?: (event: Event) => void
	 * handleBlur?: (event: Event) => void
	 * handleKeyDown?: (event: KeyboardEvent) => void
	 * }}
	 */
	let {
		input = $bindable(),
		value = $bindable(''),
		disabled = false,
		ariaLabel = '',
		handleInput = () => {},
		handleBlur = () => {},
		handleKeyDown = () => {}
	} = $props();

	/**
	 * Handles the focus event and selects the target input.
	 * @param {FocusEvent} event the current event handler.
	 */
	function onfocus(event) {
		const target = /** @type {HTMLInputElement} */ (event.target);
		target.select();
	}
</script>

<input
	bind:this={input}
	bind:value
	{disabled}
	maxlength="2"
	oninput={handleInput}
	onblur={handleBlur}
	onkeydown={handleKeyDown}
	{onfocus}
	type="text"
	inputmode="numeric"
	placeholder="00"
	aria-label={ariaLabel}
	class="min-w-10 bg-transparent px-1 text-center text-md font-light outline-none placeholder:text-(--muted) focus:text-(--accent) focus:placeholder:text-(--accent) disabled:cursor-not-allowed disabled:opacity-60"
/>
