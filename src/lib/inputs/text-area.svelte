<script>
	import InputContainer from '$lib/inputs/input-container.svelte';

	/**
	 * @type {{
	 * label:string
	 * placeholder: string
	 * value?: string
	 * disabled?: boolean
	 * image?: import('svelte').Component|null
	 * rows?: number
	 * }}
	 * */
	let {
		label,
		placeholder,
		value = $bindable(''),
		disabled = false,
		image = null,
		rows = 3
	} = $props();

	let inputId = $derived(`input-${label.toLowerCase().replace(/\s+/g, '-')}`);

	/**
	 * Handles the event when the user presses enter inside the input.
	 * @param {KeyboardEvent} event the event handler.
	 */
	function onEnter(event) {
		// we allow shift enter to not blur the input to allow line breaks
		if (event.key !== 'Enter' || event.shiftKey) return;
		const input = /** @type {HTMLInputElement} */ (event.currentTarget);
		input.blur();
	}
</script>

<InputContainer {label} {image}>
	<textarea
		id={inputId}
		bind:value
		{disabled}
		class="w-full border-none bg-transparent text-sm text-(--text) outline-none resize-none placeholder:text-(--muted) disabled:cursor-not-allowed disabled:opacity-60"
		{placeholder}
		spellcheck="false"
		onkeydown={onEnter}
		{rows}></textarea>
</InputContainer>
