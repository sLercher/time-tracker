<script>
	import BriefcaseBusiness from '@lucide/svelte/icons/briefcase-business';
	import TextAlignStart from '@lucide/svelte/icons/text-align-start';

	import Card from '$lib/card.svelte';
	import Input from '$lib/inputs/input.svelte';

	/**
	 * @type {{ project?: string, description?: string, disabled?: boolean }}
	 */
	let { project = $bindable(''), description = $bindable(''), disabled = false } = $props();
</script>

<Card>
	<h2 class="text-sm font-semibold tracking-wider">Tätigkeit</h2>
	<div class="mt-1 grid gap-3">
		<Input
			label="Projekt"
			placeholder="20AC"
			image={BriefcaseBusiness}
			bind:value={project}
			{disabled}
		/>
		<Input
			label="Beschreibung"
			placeholder="Planerstellung"
			image={TextAlignStart}
			bind:value={description}
			{disabled}
		/>
	</div>
</Card>
