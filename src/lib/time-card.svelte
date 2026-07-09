<script>
	import Pause from '@lucide/svelte/icons/pause';
	import Play from '@lucide/svelte/icons/play';
	import Square from '@lucide/svelte/icons/square';

	import Card from '$lib/card.svelte';
	import TimeGroup from '$lib/inputs/time-group/time-group.svelte';

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
	<h2 class="text-sm font-semibold tracking-wider">
		{isEditing ? 'Eintrag bearbeiten' : 'Zeiterfassung'}
	</h2>
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
	<TimeGroup bind:startHour bind:startMinute bind:endHour bind:endMinute disabled={isInputLocked} />
	{#if !isEditing}
		<div class="mt-1 grid grid-cols-2 gap-2">
			<button
				type="button"
				onclick={onToggleTracking}
				disabled={isSaving}
				class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-(--border) bg-transparent px-4 text-sm font-semibold text-(--text) transition hover:border-(--accent) disabled:cursor-not-allowed disabled:opacity-60"
			>
				{#if isTracking}
					<Square size="16" />
					Stop
				{:else}
					<Play size="16" />
					Play
				{/if}
			</button>
			<button
				type="button"
				onclick={onTogglePause}
				disabled={isSaving || !isTracking}
				class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-(--border) bg-transparent px-4 text-sm font-semibold text-(--text) transition hover:border-(--accent) disabled:cursor-not-allowed disabled:opacity-60"
			>
				<Pause size="16" />
				{isPaused ? 'Resume' : 'Pause'}
			</button>
		</div>
	{/if}
	<div class="mt-1 grid {isEditing ? 'grid-cols-2' : ''} gap-2">
		<button
			type="button"
			onclick={onSave}
			disabled={isSaving || isInputLocked || isTracking}
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
