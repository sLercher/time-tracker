<script>
	import BriefcaseBusiness from '@lucide/svelte/icons/briefcase-business';
	import TextAlignStart from '@lucide/svelte/icons/text-align-start';

	import Card from '$lib/card/card.svelte';
	import CardHeader from '$lib/card/card-header.svelte';
	import CardDescription from '$lib/card/card-description.svelte';
	import Input from '$lib/inputs/input.svelte';

	/**
	 * @type {{ project?: string, description?: string, disabled?: boolean }}
	 */
	let { project = $bindable(''), description = $bindable(''), disabled = false } = $props();
</script>

<Card>
	<div>
		<CardHeader>Tätigkeit</CardHeader>
		<CardDescription>
			Bestimmen Sie das Projekt an dem Sie gerade arbeiten. Optional kann eine Beschreibung der
			Tätigkeit angegeben werden.
		</CardDescription>
	</div>

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
