<script>
	/** @type {{ label:string, placeholder: string, value?: string, disabled?: boolean, image?: import('svelte').Component|null }}*/
	let { label, placeholder, value = $bindable(''), disabled = false, image = null } = $props();
	let isActive = $state(false);
	let inputId = $derived(`input-${label.toLowerCase().replace(/\s+/g, '-')}`);
</script>

<div class="flex flex-col gap-1">
	<label for={inputId} class="text-sm font-semibold">{label}</label>
	<div
		class="flex min-h-12 items-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-4 py-2"
	>
		{#if image}
			{@const Image = image}
			<Image
				size="20"
				class="transition"
				color={isActive ? 'var(--accent-soft)' : 'var(--border)'}
			/>
		{/if}
		<input
			id={inputId}
			bind:value
			{disabled}
			type="text"
			class="w-full border-none bg-transparent text-(--text) outline-none placeholder:text-(--border) disabled:cursor-not-allowed disabled:opacity-60"
			{placeholder}
			spellcheck="false"
			onfocus={() => (isActive = true)}
			onblur={() => (isActive = false)}
		/>
	</div>
</div>
