<script>
	let { children } = $props();
</script>

<div class="flex flex-col gap-2 bg-(--surface) rounded-xl border border-(--border) m-2 px-4 py-2">
	{@render children?.()}
</div>
