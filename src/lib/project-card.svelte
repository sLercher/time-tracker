<script>
	import BriefcaseBusiness from '@lucide/svelte/icons/briefcase-business';
	import TextAlignStart from '@lucide/svelte/icons/text-align-start';

	import Card from '$lib/card.svelte';
	import Input from '$lib/inputs/input.svelte';
</script>

<Card>
	<h2 class="text-sm tracking-wider font-semibold">Tätigkeit</h2>
	<Input label="Projekt" placeholder="20AC" image={BriefcaseBusiness} />
	<Input label="Beschreibung" placeholder="Planerstellung" image={TextAlignStart} />
</Card>
