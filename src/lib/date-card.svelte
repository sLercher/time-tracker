<script>
	import Card from '$lib/card/card.svelte';
	import CardHeader from '$lib/card/card-header.svelte';
	import CardDescription from '$lib/card/card-description.svelte';
	import Date from '$lib/inputs/date.svelte';

	/**
	 * @type {{
	 * selectedDate?: string,
	 * isInputLocked?: boolean,
	 * onChange?: () => void
	 * }}
	 */
	let { selectedDate = $bindable(''), isInputLocked = false, onChange = () => {} } = $props();
</script>

<Card>
	<div>
		<CardHeader>Datum</CardHeader>
		<CardDescription>
			Wählen Sie das Datum aus, für das Sie Zeiten erfassen möchten. Alle Eingaben werden diesem
			Datum zugeordnet.
		</CardDescription>
	</div>
	<Date bind:selectedDate {onChange} {isInputLocked} />
</Card>
