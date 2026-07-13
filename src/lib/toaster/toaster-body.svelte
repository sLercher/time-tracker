<script>
	/**
	 * @type {{
	 * children: any
	 * }}
	 */
	let { children } = $props();
</script>

<div class="pl-5">
	{@render children?.()}
</div>
