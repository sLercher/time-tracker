<script>
	import Card from '$lib/card.svelte';
	import TimeGroup from '$lib/inputs/time-group/time-group.svelte';
</script>

<Card>
	<h2 class="text-sm tracking-wider font-semibold">Zeiterfassung</h2>
	<TimeGroup />
	<button class="bg-(--accent) rounded-xl">Save</button>
</Card>
