<script>
	import { onMount } from 'svelte';

	import DateCard from '$lib/date-card.svelte';
	import ProjectCard from '$lib/project-card.svelte';
	import TimeCard from '$lib/time-card.svelte';
	import TodayEntriesCard from '$lib/today-entries-card.svelte';
	import { deleteTimeEntry, getTimeEntriesByDate, saveTimeEntry, updateTimeEntry } from '$lib/db';
	import {
		formatElapsedDuration,
		getCurrentTimeParts,
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
	let isTracking = $state(false);
	let isPaused = $state(false);
	let accumulatedActiveMs = $state(0);
	/** @type {number | null} */
	let runStartedAtMs = $state(null);
	/** @type {number | null} */
	let pauseStartedAtMs = $state(null);
	let timerNowMs = $state(Date.now());
	let feedback = $state('');
	/** @type {number | null} */
	let editingEntryId = $state(null);
	/** @type {TimeEntry[]} */
	let todayEntries = $state([]);
	let isInputLocked = $derived(isPaused);
	let activeDurationLabel = $derived.by(() => {
		let activeMs = accumulatedActiveMs;

		if (isTracking && !isPaused && runStartedAtMs !== null) {
			activeMs += timerNowMs - runStartedAtMs;
		}

		return formatElapsedDuration(activeMs);
	});
	let pausedDurationLabel = $derived.by(() => {
		if (!isTracking || !isPaused || pauseStartedAtMs === null) {
			return formatElapsedDuration(0);
		}

		return formatElapsedDuration(timerNowMs - pauseStartedAtMs);
	});

	/**
	 * Load all entries for the selected day.
	 *
	 * @returns {Promise<void>}
	 */
	async function loadEntriesForSelectedDate() {
		todayEntries = await getTimeEntriesByDate(selectedDate);
	}

	onMount(() => {
		const timer = setInterval(() => {
			timerNowMs = Date.now();
		}, 1000);

		loadEntriesForSelectedDate();

		return () => {
			clearInterval(timer);
		};
	});

	/**
	 * Reset all tracking-session timing state.
	 */
	function resetTrackingState() {
		isTracking = false;
		isPaused = false;
		accumulatedActiveMs = 0;
		runStartedAtMs = null;
		pauseStartedAtMs = null;
	}

	/**
	 * Handle date changes, refresh list, and leave edit mode.
	 *
	 * @returns {Promise<void>}
	 */
	async function handleDateChange() {
		feedback = '';
		resetTrackingState();
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

		resetTrackingState();

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
		resetTrackingState();
		resetForm();
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
	 * Set start input values to the current local time.
	 */
	function setStartToNow() {
		[startHour, startMinute] = getCurrentTimeParts();
	}

	/**
	 * Set end input values to the current local time.
	 */
	function setEndToNow() {
		[endHour, endMinute] = getCurrentTimeParts();
	}

	/**
	 * Save the current form values as a new entry (without update mode).
	 *
	 * @returns {Promise<boolean>} True if the interval was saved.
	 */
	async function saveCurrentInterval() {
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
			return false;
		}

		await saveTimeEntry(result.data);
		await loadEntriesForSelectedDate();
		return true;
	}

	/**
	 * Start tracking from now or stop tracking and save the active interval.
	 *
	 * @returns {Promise<void>}
	 */
	async function handleToggleTracking() {
		if (isSaving || editingEntryId !== null) return;
		feedback = '';

		if (!isTracking) {
			setStartToNow();
			endHour = '';
			endMinute = '';
			accumulatedActiveMs = 0;
			runStartedAtMs = Date.now();
			pauseStartedAtMs = null;
			isTracking = true;
			isPaused = false;
			return;
		}

		if (isPaused) {
			resetTrackingState();
			resetForm();
			return;
		}

		setEndToNow();
		isSaving = true;

		try {
			const saved = await saveCurrentInterval();

			if (!saved) {
				endHour = '';
				endMinute = '';
				return;
			}

			if (runStartedAtMs !== null) {
				accumulatedActiveMs += Date.now() - runStartedAtMs;
			}

			resetTrackingState();
			resetForm();
		} catch {
			feedback = 'Speichern fehlgeschlagen. Bitte erneut versuchen.';
		} finally {
			isSaving = false;
		}
	}

	/**
	 * Pause active tracking by saving the current interval, or resume from now.
	 *
	 * @returns {Promise<void>}
	 */
	async function handleTogglePause() {
		if (isSaving || editingEntryId !== null || !isTracking) return;
		feedback = '';

		if (isPaused) {
			setStartToNow();
			endHour = '';
			endMinute = '';
			runStartedAtMs = Date.now();
			pauseStartedAtMs = null;
			isPaused = false;
			return;
		}

		setEndToNow();
		isSaving = true;

		try {
			const saved = await saveCurrentInterval();

			if (!saved) {
				endHour = '';
				endMinute = '';
				return;
			}

			if (runStartedAtMs !== null) {
				accumulatedActiveMs += Date.now() - runStartedAtMs;
			}

			runStartedAtMs = null;
			pauseStartedAtMs = Date.now();
			startHour = '';
			startMinute = '';
			endHour = '';
			endMinute = '';
			isPaused = true;
		} catch {
			feedback = 'Speichern fehlgeschlagen. Bitte erneut versuchen.';
		} finally {
			isSaving = false;
		}
	}

	/**
	 * Validate the form values and persist a time entry locally in IndexedDB.
	 *
	 * @returns {Promise<void>}
	 */
	async function handleSave() {
		if (isSaving || isTracking) return;
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
	<DateCard bind:selectedDate {isInputLocked} onChange={handleDateChange}></DateCard>
	<ProjectCard bind:project bind:description disabled={isInputLocked} />
	<TimeCard
		bind:startHour
		bind:startMinute
		bind:endHour
		bind:endMinute
		{isSaving}
		{isTracking}
		{isPaused}
		{isInputLocked}
		{activeDurationLabel}
		{pausedDurationLabel}
		{feedback}
		isEditing={editingEntryId !== null}
		onCancelEdit={handleCancelEdit}
		onToggleTracking={handleToggleTracking}
		onTogglePause={handleTogglePause}
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
