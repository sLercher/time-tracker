<script>
	// import Pause from '@lucide/svelte/icons/pause';
	import Play from '@lucide/svelte/icons/play';
	import Send from '@lucide/svelte/icons/send';

	import Button from '$lib/inputs/time-group/button.svelte';
	import DeltaInput from '$lib/inputs/time-group/delta-input.svelte';
	import Time from '$lib/inputs/time-group/time.svelte';
</script>

<div class="flex gap-2 justify-between h-8">
	<Button image={Play} variant="secondary" />
	<Time />
	<Time />
	<DeltaInput />
	<!-- TODO: duration -->
	<Button image={Send} />
</div>
