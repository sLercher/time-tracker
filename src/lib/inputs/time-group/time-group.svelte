<script>
	// import Pause from '@lucide/svelte/icons/pause';
	// import Play from '@lucide/svelte/icons/play';
	// import Send from '@lucide/svelte/icons/send';

	import TimePicker from '$lib/inputs/time-group/time-picker.svelte';
	import RangeContainer from '$lib/inputs/time-group/range-container.svelte';
</script>

<div class="grid grid-cols-3 gap-2">
	<RangeContainer text="Start">
		<TimePicker />
	</RangeContainer>
	<RangeContainer text="Ende">
		<TimePicker />
	</RangeContainer>
	<RangeContainer text="Pause">
		<TimePicker showButton={false} />
	</RangeContainer>
</div>
