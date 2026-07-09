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
	 *   onCancelEdit?: () => void,
	 *   isSaving?: boolean,
	 *   feedback?: string,
	 *   isEditing?: boolean
	 * }}
	 */
	let {
		startHour = $bindable(''),
		startMinute = $bindable(''),
		endHour = $bindable(''),
		endMinute = $bindable(''),
		onSave = () => {},
		onCancelEdit = () => {},
		isSaving = false,
		feedback = '',
		isEditing = false
	} = $props();
</script>

<Card>
	<h2 class="text-sm font-semibold tracking-wider">
		{isEditing ? 'Eintrag bearbeiten' : 'Zeiterfassung'}
	</h2>
	<TimeGroup bind:startHour bind:startMinute bind:endHour bind:endMinute />
	<div class="mt-1 grid {isEditing ? 'grid-cols-2' : ''} gap-2">
		<button
			type="button"
			onclick={onSave}
			disabled={isSaving}
			class="inline-flex h-11 items-center justify-center rounded-xl bg-(--accent) px-4 text-sm font-semibold text-(--text) transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
		>
			{isSaving ? 'Speichert...' : isEditing ? 'Aktualisieren' : 'Speichern'}
		</button>
		{#if isEditing}
			<button
				type="button"
				onclick={onCancelEdit}
				class="inline-flex h-11 items-center justify-center rounded-xl border border-(--border) bg-transparent px-4 text-sm font-semibold text-(--text) transition hover:border-(--accent)"
			>
				Abbrechen
			</button>
		{/if}
	</div>
	{#if feedback}
		<p class="text-xs text-red-500 text-center">{feedback}</p>
	{/if}
</Card>
