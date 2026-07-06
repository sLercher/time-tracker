<script>
	import BriefcaseBusiness from '@lucide/svelte/icons/briefcase-business';
	import TextAlignStart from '@lucide/svelte/icons/text-align-start';

	import Card from '$lib/card.svelte';
	import Input from '$lib/inputs/input.svelte';
	import TimeGroup from '$lib/inputs/time-group/time-group.svelte';
</script>

<Card>
	<h2 class="text-lg font-bold">Zeiterfassung</h2>
	<Input placeholder="Projekt" image={BriefcaseBusiness} />
	<Input placeholder="Beschreibung" image={TextAlignStart} />
	<TimeGroup />
</Card>
