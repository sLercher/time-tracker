<script>
	import Card from '$lib/card.svelte';
	import TimeGroup from '$lib/inputs/time-group/time-group.svelte';

	/**
	 * @type {{
	 *   startHour?: string,
	 *   startMinute?: string,
	 *   endHour?: string,
	 *   endMinute?: string,
	 *   onSave?: () => void,
	 *   isSaving?: boolean,
	 *   feedback?: string
	 * }}
	 */
	let {
		startHour = $bindable(''),
		startMinute = $bindable(''),
		endHour = $bindable(''),
		endMinute = $bindable(''),
		onSave = () => {},
		isSaving = false,
		feedback = ''
	} = $props();
</script>

<Card>
	<h2 class="text-sm font-semibold tracking-wider">Zeiterfassung</h2>
	<TimeGroup bind:startHour bind:startMinute bind:endHour bind:endMinute />
	<button
		type="button"
		onclick={onSave}
		disabled={isSaving}
		class="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-(--accent) px-4 text-sm font-semibold text-(--text) transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
	>
		{isSaving ? 'Speichert...' : 'Speichern'}
	</button>
	{#if feedback}
		<p class="text-xs text-(--muted)">{feedback}</p>
	{/if}
</Card>
