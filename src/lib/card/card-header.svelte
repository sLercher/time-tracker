<script>
	/** @type {{ children: any }}*/
	let { children } = $props();
</script>

<h2 class="text-md font-medium tracking-wider">
	{@render children?.()}
</h2>
