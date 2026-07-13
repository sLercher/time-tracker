<script>
	/**
	 * @type {{
	 * children: any
	 * }}
	 */
	let { children } = $props();
</script>

<div class="font-medium flex gap-2 items-center">
	{@render children?.()}
</div>
