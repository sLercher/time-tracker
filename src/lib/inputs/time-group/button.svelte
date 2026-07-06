<script>
	/** @type {{ image?: import('svelte').Component|null, variant?: string }}*/
	let { image = null, variant = 'primary' } = $props();

	let style = $derived.by(() => {
		if (variant === 'primary') {
			return 'bg-(--accent)';
		}
		return 'bg-transparent stroke stroke-(--stroke) border border-(--border) transition hover:border-transparent hover:bg-(--surface-raised)';
	});
</script>

<button title="" class="h-full rounded-lg p-2 cursor-pointer {style}">
	{#if image}
		{@const Image = image}
		<Image size="14" />
	{/if}
</button>
