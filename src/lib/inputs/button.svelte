<script>
	/**
	 * @type {{
	 * children:any
	 * onClick?: () => void
	 * disabled?: boolean
	 * variant?: string
	 * size?: string
	 * }}
	 */
	let {
		children,
		onClick = () => {},
		disabled = false,
		variant = 'primary',
		size = 'regular'
	} = $props();

	let style = $derived.by(() => {
		if (variant === 'primary') {
			return 'bg-(--accent) text-(--text-accent) hover:bg-(--accent-soft)';
		}
		if (variant === 'secondary') {
			return 'bg-transparent border border-(--ring) text-(--text) hover:bg-(--surface-raised)';
		}
		if (variant === 'danger') {
			return 'bg-red-400/50 text-red-400 hover:bg-red-400/60';
		}
		return '';
	});

	let sizing = $derived.by(() => {
		if (size === 'regular') {
			return 'font-medium text-sm px-4 py-2 min-h-8';
		}
		if (size === 'small') {
			return 'font-normal text-xs px-2 py-1 min-h-6';
		}
		return '';
	});
</script>

<button
	type="button"
	onclick={onClick}
	{disabled}
	class="inline-flex gap-1 items-center justify-center rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 {style} {sizing}"
>
	{@render children?.()}
</button>
