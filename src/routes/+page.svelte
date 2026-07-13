<script>
	import { onMount } from 'svelte';

	import DateCard from '$lib/date-card.svelte';
	import ProjectCard from '$lib/project-card.svelte';
	import TimeCard from '$lib/time-card.svelte';
	import TodayEntriesCard from '$lib/today-entries-card.svelte';
	import { deleteTimeEntry, getTimeEntriesByDate, saveTimeEntry, updateTimeEntry } from '$lib/db';
	import {
		getTodayDateKey,
		splitTime,
		validateAndBuildEntry
	} from '$lib/time-entry/time-entry-logic';

	/**
	 * @typedef {{
	 *   id: number,
	 *   date: string,
	 *   project: string,
	 *   description: string,
	 *   startTime: string,
	 *   endTime: string,
	 *   startMinutes: number,
	 *   endMinutes: number,
	 *   durationMinutes: number,
	 *   createdAt: string,
	 *   updatedAt?: string
	 * }} TimeEntry
	 */

	let project = $state('');
	let description = $state('');
	let startHour = $state('');
	let startMinute = $state('');
	let endHour = $state('');
	let endMinute = $state('');
	let selectedDate = $state(getTodayDateKey());
	let isSaving = $state(false);
	let feedback = $state('');
	/** @type {number | null} */
	let editingEntryId = $state(null);
	/** @type {TimeEntry[]} */
	let todayEntries = $state([]);

	/**
	 * Load all entries for the selected day.
	 *
	 * @returns {Promise<void>}
	 */
	async function loadEntriesForSelectedDate() {
		todayEntries = await getTimeEntriesByDate(selectedDate);
	}

	onMount(() => {
		loadEntriesForSelectedDate();
	});

	/**
	 * Handle date changes, refresh list, and leave edit mode.
	 *
	 * @returns {Promise<void>}
	 */
	async function handleDateChange() {
		feedback = '';
		resetForm();
		await loadEntriesForSelectedDate();
	}

	/**
	 * Reset all input fields and exit edit mode.
	 */
	function resetForm() {
		project = '';
		description = '';
		startHour = '';
		startMinute = '';
		endHour = '';
		endMinute = '';
		editingEntryId = null;
	}

	/**
	 * Start editing an existing saved entry.
	 *
	 * @param {{ id: number, project: string, description: string, startTime: string, endTime: string }} entry
	 */
	function handleEditEntry(entry) {
		const [entryStartHour, entryStartMinute] = splitTime(entry.startTime);
		const [entryEndHour, entryEndMinute] = splitTime(entry.endTime);

		editingEntryId = entry.id;
		project = entry.project;
		description = entry.description;
		startHour = entryStartHour;
		startMinute = entryStartMinute;
		endHour = entryEndHour;
		endMinute = entryEndMinute;
	}

	/**
	 * Cancel the active edit and clear form values.
	 */
	function handleCancelEdit() {
		feedback = '';
		resetForm();
	}

	/**
	 * Clear the currently visible feedback toast.
	 */
	function handleFeedbackDismiss() {
		feedback = '';
	}

	/**
	 * Remove an entry from local IndexedDB and refresh today's list.
	 *
	 * @param {{ id: number }} entry
	 * @returns {Promise<void>}
	 */
	async function handleDeleteEntry(entry) {
		try {
			await deleteTimeEntry(entry.id);

			if (editingEntryId === entry.id) {
				resetForm();
			}

			await loadEntriesForSelectedDate();
		} catch {
			null; // because an empty catch statement shows an error in the IDE
		}
	}

	/**
	 * Validate the form values and persist a time entry locally in IndexedDB.
	 *
	 * @returns {Promise<void>}
	 */
	async function handleSave() {
		if (isSaving) return;
		feedback = '';

		const result = validateAndBuildEntry({
			date: selectedDate,
			project,
			description,
			startHour,
			startMinute,
			endHour,
			endMinute
		});

		if (!result.ok) {
			feedback = result.message;
			return;
		}

		isSaving = true;

		try {
			if (editingEntryId !== null) {
				await updateTimeEntry(editingEntryId, {
					...result.data,
					updatedAt: new Date().toISOString()
				});
			} else {
				await saveTimeEntry(result.data);
			}

			await loadEntriesForSelectedDate();
			resetForm();
		} catch {
			feedback = 'Speichern fehlgeschlagen. Bitte erneut versuchen.';
		} finally {
			isSaving = false;
		}
	}
</script>

<main
	class="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-4 px-4 pb-8 pt-6 sm:gap-5 sm:px-6 sm:pt-10"
>
	<DateCard bind:selectedDate onChange={handleDateChange}></DateCard>
	<ProjectCard bind:project bind:description />
	<TimeCard
		bind:startHour
		bind:startMinute
		bind:endHour
		bind:endMinute
		{isSaving}
		{feedback}
		isEditing={editingEntryId !== null}
		onCancelEdit={handleCancelEdit}
		onFeedbackDismiss={handleFeedbackDismiss}
		onSave={handleSave}
	/>
	<TodayEntriesCard
		entries={todayEntries}
		{selectedDate}
		activeEditId={editingEntryId}
		onEdit={handleEditEntry}
		onDelete={handleDeleteEntry}
	/>
</main>

<div class="h-6" aria-hidden="true"></div>

<svelte:head>
	<title>Time Tracker</title>
</svelte:head>
