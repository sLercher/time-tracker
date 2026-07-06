<script>
	let { placeholder, image = null } = $props();
	let isActive = $state(false);
</script>

<div class="flex gap-2 rounded-xl bg-(--surface) border border-(--border) items-center px-4 py-2">
	{#if image}
		{@const Image = image}
		<Image size="20" color={isActive ? 'var(--accent-soft)' : 'var(--border)'} />
	{/if}
	<input
		type="text"
		class="bg-transparent text-(--text) placeholder:text-(--border) border-none w-full outline-none"
		{placeholder}
		onfocus={() => (isActive = true)}
		onblur={() => (isActive = false)}
	/>
</div>
