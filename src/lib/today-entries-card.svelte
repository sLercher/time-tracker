<script>
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Pencil from '@lucide/svelte/icons/pencil';

	import Card from '$lib/card.svelte';
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
	 *   activeEditId?: number | null,
	 *   onEdit?: (entry: TimeEntry) => void,
	 *   onDelete?: (entry: TimeEntry) => void
	 * }}
	 */
	let { entries = [], activeEditId = null, onEdit = () => {}, onDelete = () => {} } = $props();
</script>

<Card>
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-semibold tracking-wider">Heute erfasst</h2>
		<span class="text-xs text-(--muted)">{entries.length} Einträge</span>
	</div>

	{#if entries.length === 0}
		<p class="text-sm text-(--muted)">Noch keine Einträge für heute.</p>
	{:else}
		<div class="grid gap-2">
			{#each entries as entry}
				<div class="rounded-xl border border-(--border) bg-(--surface) px-3 py-3">
					<div class="flex items-start justify-between gap-3">
						<div class="min-w-0">
							<p class="truncate text-sm font-semibold">{entry.project}</p>
							{#if entry.description}
								<p class="truncate text-xs text-(--muted)">{entry.description}</p>
							{/if}
						</div>
						<div class="flex items-center gap-1">
							<button
								type="button"
								onclick={() => onEdit(entry)}
								class="inline-flex h-8 items-center gap-1 rounded-lg border border-(--border) px-2 text-xs font-medium text-(--text) transition hover:border-(--accent)"
							>
								<Pencil size="14" />
								{activeEditId === entry.id ? 'Aktiv' : 'Bearbeiten'}
							</button>
							<button
								type="button"
								onclick={() => onDelete(entry)}
								class="inline-flex h-8 items-center rounded-lg border border-(--border) px-2 text-xs font-medium text-(--text) transition hover:border-(--danger) hover:text-(--danger)"
								aria-label="Eintrag löschen"
							>
								<Trash2 size="14" />
							</button>
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
