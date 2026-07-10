<script>
	import Pause from '@lucide/svelte/icons/pause';
	import Play from '@lucide/svelte/icons/play';
	import Square from '@lucide/svelte/icons/square';

	import Card from '$lib/card/card.svelte';
	import CardHeader from '$lib/card/card-header.svelte';
	import CardDescription from '$lib/card/card-description.svelte';
	import TimeGroup from '$lib/inputs/time-group/time-group.svelte';
	import Button from '$lib/inputs/button.svelte';

	/**
	 * @type {{
	 *   startHour?: string,
	 *   startMinute?: string,
	 *   endHour?: string,
	 *   endMinute?: string,
	 *   onSave?: () => void,
	 *   onToggleTracking?: () => void,
	 *   onTogglePause?: () => void,
	 *   onCancelEdit?: () => void,
	 *   isSaving?: boolean,
	 *   feedback?: string,
	 *   isEditing?: boolean,
	 *   isTracking?: boolean,
	 *   isPaused?: boolean,
	 *   isInputLocked?: boolean,
	 *   activeDurationLabel?: string,
	 *   pausedDurationLabel?: string
	 * }}
	 */
	let {
		startHour = $bindable(''),
		startMinute = $bindable(''),
		endHour = $bindable(''),
		endMinute = $bindable(''),
		onSave = () => {},
		onToggleTracking = () => {},
		onTogglePause = () => {},
		onCancelEdit = () => {},
		isSaving = false,
		feedback = '',
		isEditing = false,
		isTracking = false,
		isPaused = false,
		isInputLocked = false,
		activeDurationLabel = '00:00:00',
		pausedDurationLabel = '00:00:00'
	} = $props();
</script>

<Card>
	<div>
		<CardHeader>
			{isEditing ? 'Eintrag bearbeiten' : 'Zeiterfassung'}
		</CardHeader>
		<CardDescription>
			Definieren Sie die Start- und Endzeit und speichern Sie die gebuchte Zeit. Über die Buttons
			können die Start- und Endzeiten automatisch wie mit einer Stoppuhr getrackt werden und Pausen
			berücksichtigt werden.
		</CardDescription>
	</div>
	<TimeGroup bind:startHour bind:startMinute bind:endHour bind:endMinute disabled={isInputLocked} />
	<div class="mt-1 grid {isEditing ? 'grid-cols-2' : ''} gap-2">
		<Button onClick={onSave} disabled={isSaving || isInputLocked || isTracking}>
			{isSaving ? 'Speichert...' : isEditing ? 'Aktualisieren' : 'Speichern'}
		</Button>

		{#if isEditing}
			<Button onClick={onCancelEdit} variant="secondary">Abbrechen</Button>
		{/if}
	</div>
	{#if !isEditing}
		<div class="mt-1 grid grid-cols-2 gap-2">
			<Button onClick={onToggleTracking} disabled={isSaving} variant="secondary">
				{#if isTracking}
					<Square size="16" />
					Stop
				{:else}
					<Play size="16" />
					Start
				{/if}
			</Button>

			<Button onClick={onTogglePause} disabled={isSaving || !isTracking} variant="secondary">
				<Pause size="16" />
				{isPaused ? 'Weiter' : 'Pause'}
			</Button>
		</div>
	{/if}
	{#if !isEditing && isTracking}
		<div class="mt-1 flex flex-wrap items-center gap-2 text-xs">
			<span class="rounded-lg border border-(--border) px-2 py-1 text-(--muted)">
				Timer: {activeDurationLabel}
			</span>
			{#if isPaused}
				<span class="rounded-lg border border-(--border) px-2 py-1 text-(--muted)">
					Pause: {pausedDurationLabel}
				</span>
			{/if}
		</div>
	{/if}
	{#if feedback}
		<p class="text-xs text-red-500 text-center">{feedback}</p>
	{/if}
</Card>
