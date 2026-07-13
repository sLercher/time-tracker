<script>
	import { fly, fade } from 'svelte/transition';

	/**
	 * @type {{
	 * children:any
	 * show?: boolean
	 * duration?: number
	 * onDismiss?: () => void
	 * }}
	 */
	let { children, show = false, duration = 5000, onDismiss = () => {} } = $props();
	let showFeedback = $state(false);

	$effect(() => {
		if (!show) {
			showFeedback = false;
			return;
		}

		showFeedback = true;

		const timer = setTimeout(() => {
			showFeedback = false;
			onDismiss();
		}, duration);

		return () => clearTimeout(timer);
	});
</script>

{#if showFeedback}
	<div
		in:fly={{ y: 200, duration: 300 }}
		out:fade={{ duration: 300 }}
		class="fixed z-10 flex flex-col gap-2 bottom-7 inset-x-0 mx-auto my-2 px-4 py-2 w-fit max-w-xl rounded-md text-sm bg-(--danger-bg) border border-(--danger-border) text-(--danger-text)"
	>
		{@render children?.()}
	</div>
{/if}
