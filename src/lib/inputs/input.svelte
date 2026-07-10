<script>
	/** @type {{ label:string, placeholder: string, value?: string, disabled?: boolean, image?: import('svelte').Component|null }}*/
	let { label, placeholder, value = $bindable(''), disabled = false, image = null } = $props();

	let isActive = $state(false);
	let inputId = $derived(`input-${label.toLowerCase().replace(/\s+/g, '-')}`);

	/**
	 * Handles the event when the user presses enter inside the input.
	 * @param {KeyboardEvent} event the event handler.
	 */
	function onEnter(event) {
		if (event.key === 'Enter') {
			isActive = false;
			const input = /** @type {HTMLInputElement} */ (event.currentTarget);
			input.blur();
		}
	}

	const activeClasses = 'transition ring-3 ring-(--ring)/50 ring-offset-1 ring-offset-(--ring)';
</script>

<div class="flex flex-col gap-2">
	<label for={inputId} class="text-xs font-medium">{label}</label>
	<div
		class="flex items-center gap-2 rounded-lg border-0 bg-(--surface-raised) px-4 py-2 {isActive
			? activeClasses
			: ''}"
	>
		{#if image}
			{@const Image = image}
			<Image size="16" class="transition" color={isActive ? 'var(--accent)' : 'var(--muted)'} />
		{/if}
		<input
			id={inputId}
			bind:value
			{disabled}
			type="text"
			class="w-full border-none bg-transparent text-sm text-(--text) outline-none placeholder:text-(--muted) disabled:cursor-not-allowed disabled:opacity-60"
			{placeholder}
			spellcheck="false"
			onfocus={() => (isActive = true)}
			onblur={() => (isActive = false)}
			onkeydown={onEnter}
		/>
	</div>
</div>
