<script>
	/** @type {{ label:string, children: any, image?: import('svelte').Component|null }}*/
	let { label, children, image = null } = $props();
	let inputId = $derived(`input-${label.toLowerCase().replace(/\s+/g, '-')}`);
</script>

<div class="flex flex-col gap-2">
	<label for={inputId} class="text-xs font-medium">{label}</label>
	<div
		class="flex gap-2 rounded-lg border-0 bg-(--surface-raised) px-4 py-2 transition focus-within:text-(--accent) focus-within:ring-3 focus-within:ring-(--ring)/50 focus-within:ring-offset-1 focus-within:ring-offset-(--ring)"
	>
		{#if image}
			{@const Image = image}
			<Image size="16" class="relative left-0 inset-y-0.5" />
		{/if}
		{@render children?.()}
	</div>
</div>
