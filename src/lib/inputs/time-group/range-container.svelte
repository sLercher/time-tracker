<script>
	/** @type {{ text: string, children: any }}*/
	let { text, children } = $props();
</script>

<div class="flex flex-col gap-1">
	<h2 class="text-xs font-medium text-(--text)">{text}</h2>
	{@render children?.()}
</div>
