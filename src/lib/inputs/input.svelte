<script>
	/** @type {{ label:string, placeholder: string, image?: import('svelte').Component|null }}*/
	let { label, placeholder, image = null } = $props();
	let isActive = $state(false);
</script>

<div class="flex flex-col gap-1">
<label for="" class="text-sm font-semibold">{label}</label>
<div class="flex gap-2 rounded-xl bg-(--surface) border border-(--border) items-center px-4 py-2">
	{#if image}
		{@const Image = image}
		<Image size="20" color={isActive ? 'var(--accent-soft)' : 'var(--border)'} />
	{/if}
	<input
		type="text"
		class="bg-transparent text-(--text) placeholder:text-(--border) border-none w-full outline-none"
		{placeholder}
		spellcheck="false"
		onfocus={() => (isActive = true)}
		onblur={() => (isActive = false)}
	/>
</div>
</div>