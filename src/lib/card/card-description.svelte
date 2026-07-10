<script>
	/** @type {{ children: any }}*/
	let { children } = $props();
</script>

<p class="text-xs font-normal text-(--muted) tracking-normal">
	{@render children?.()}
</p>
