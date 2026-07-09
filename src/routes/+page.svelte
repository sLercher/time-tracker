<script>
	import ProjectCard from '$lib/project-card.svelte';
	import TimeCard from '$lib/time-card.svelte';
	import { saveTimeEntry } from '$lib/db';
	import { validateAndBuildEntry } from '$lib/time-entry/time-entry-logic';

	let project = $state('');
	let description = $state('');
	let startHour = $state('');
	let startMinute = $state('');
	let endHour = $state('');
	let endMinute = $state('');
	let isSaving = $state(false);
	let feedback = $state('');

	/**
	 * Validate the form values and persist a time entry locally in IndexedDB.
	 *
	 * @returns {Promise<void>}
	 */
	async function handleSave() {
		if (isSaving) return;
		feedback = '';

		const result = validateAndBuildEntry({
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
			await saveTimeEntry(result.data);
			feedback = 'Zeit erfasst und lokal gespeichert.';
			description = '';
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
	<ProjectCard bind:project bind:description />
	<TimeCard
		bind:startHour
		bind:startMinute
		bind:endHour
		bind:endMinute
		{isSaving}
		{feedback}
		onSave={handleSave}
	/>
</main>

<div class="h-6" aria-hidden="true"></div>

<svelte:head>
	<title>Time Tracker</title>
</svelte:head>
