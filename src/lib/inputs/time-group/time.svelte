<script>
	import TimePicker from '$lib/inputs/time-group/time-picker.svelte';
	let { text = 'Time', id = 'time' } = $props();
	//TODO: later use data
	console.log(text, id);
</script>

<div class="flex gap-1 items-center text-(--text)">
	<TimePicker />
</div>
