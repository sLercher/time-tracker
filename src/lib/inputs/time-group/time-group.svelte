<script>
	// import Pause from '@lucide/svelte/icons/pause';
	// import Play from '@lucide/svelte/icons/play';
	// import Send from '@lucide/svelte/icons/send';

	import TimePicker from '$lib/inputs/time-group/time-picker.svelte';
	import RangeContainer from '$lib/inputs/time-group/range-container.svelte';

	/**
	 * @type {{
	 *   startHour?: string,
	 *   startMinute?: string,
	 *   endHour?: string,
	 *   endMinute?: string
	 * }}
	 */
	let {
		startHour = $bindable(''),
		startMinute = $bindable(''),
		endHour = $bindable(''),
		endMinute = $bindable('')
	} = $props();
</script>

<div class="mt-1 grid grid-cols-2 gap-3">
	<RangeContainer text="Start">
		<TimePicker bind:hour={startHour} bind:minute={startMinute} />
	</RangeContainer>
	<RangeContainer text="Ende">
		<TimePicker bind:hour={endHour} bind:minute={endMinute} />
	</RangeContainer>
</div>
