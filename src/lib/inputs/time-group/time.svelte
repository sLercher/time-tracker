<script>
	import TimePicker from '$lib/inputs/time-group/time-picker.svelte';
	let { text = 'Time', id = 'time' } = $props();
</script>

<div class="flex gap-1 items-center text-(--text)">
	<label for={id} class="text-sm">{text}</label>
	<TimePicker />
</div>
