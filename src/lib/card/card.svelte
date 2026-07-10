<script>
	let { children } = $props();
</script>

<div
	class="flex flex-col gap-2 rounded-xl border border-(--border) bg-(--surface) px-4 py-4 sm:px-5 sm:py-5"
>
	{@render children?.()}
</div>
