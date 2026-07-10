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
			Wählen Sie das Datum aus, für welches Sie die Zeiterfassung ausführen möchten. Die Eingaben
			werden immer auf diesem Datum hinterlegt.
		</CardDescription>
	</div>
	<Date bind:selectedDate {onChange} {isInputLocked} />
</Card>
