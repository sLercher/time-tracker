<script>
	import InputContainer from '$lib/inputs/input-container.svelte';

	/** @type {{ label:string, placeholder: string, value?: string, disabled?: boolean, image?: import('svelte').Component|null }}*/
	let { label, placeholder, value = $bindable(''), disabled = false, image = null } = $props();

	let inputId = $derived(`input-${label.toLowerCase().replace(/\s+/g, '-')}`);

	/**
	 * Handles the event when the user presses enter inside the input.
	 * @param {KeyboardEvent} event the event handler.
	 */
	function onEnter(event) {
		if (event.key === 'Enter') {
			const input = /** @type {HTMLInputElement} */ (event.currentTarget);
			input.blur();
		}
	}
</script>

<InputContainer {label} {image}>
	<input
		id={inputId}
		bind:value
		{disabled}
		type="text"
		class="w-full border-none bg-transparent text-sm text-(--text) outline-none placeholder:text-(--muted) disabled:cursor-not-allowed disabled:opacity-60"
		{placeholder}
		spellcheck="false"
		onkeydown={onEnter}
	/>
</InputContainer>
