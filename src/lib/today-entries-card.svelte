<script>
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Pencil from '@lucide/svelte/icons/pencil';

	import Button from '$lib/inputs/button.svelte';
	import Card from '$lib/card/card.svelte';
	import CardHeader from '$lib/card/card-header.svelte';
	import { formatDuration } from '$lib/time-entry/time-entry-logic';

	/**
	 * @typedef {{
	 *   id: number,
	 *   project: string,
	 *   description: string,
	 *   startTime: string,
	 *   endTime: string,
	 *   durationMinutes: number
	 * }} TimeEntry
	 */

	/**
	 * @type {{
	 *   entries?: TimeEntry[],
	 *   selectedDate?: string,
	 *   activeEditId?: number | null,
	 *   onEdit?: (entry: TimeEntry) => void,
	 *   onDelete?: (entry: TimeEntry) => void
	 * }}
	 */
	let {
		entries = [],
		selectedDate = '',
		activeEditId = null,
		onEdit = () => {},
		onDelete = () => {}
	} = $props();
</script>

<Card>
	<div class="flex items-center justify-between">
		<CardHeader>
			Einträge vom {selectedDate}
		</CardHeader>
		<span class="text-xs text-(--muted)">
			{entries.length === 1 ? `${entries.length} Eintrag` : `${entries.length} Einträge`}
		</span>
	</div>

	{#if entries.length === 0}
		<p class="text-sm text-(--muted)">Keine Einträge für dieses Datum.</p>
	{:else}
		<div class="grid gap-2">
			{#each entries as entry (entry.id)}
				<div class="rounded-xl overflow-x-hidden border border-(--border) bg-(--surface) px-3 py-3">
					<div class="flex items-start justify-between gap-3">
						<div class="min-w-0">
							<p class="text-sm font-semibold">{entry.project}</p>
							{#if entry.description}
								<span class="text-xs text-(--muted)">{entry.description}</span>
							{/if}
						</div>
						<div class="flex items-center gap-1">
							<Button onClick={() => onEdit(entry)} variant="secondary" size="small">
								<Pencil size="14" />
								{activeEditId === entry.id ? 'Aktiv' : 'Bearbeiten'}
							</Button>

							<Button onClick={() => onDelete(entry)} variant="danger" size="small">
								<Trash2 size="14" />
							</Button>
						</div>
					</div>
					<div class="mt-2 flex items-center justify-between text-xs text-(--muted)">
						<span>{entry.startTime} - {entry.endTime}</span>
						<span>{formatDuration(entry.durationMinutes)}</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</Card>
