<script>
	import CircleAlert from '@lucide/svelte/icons/circle-alert';

	import Card from '$lib/card/card.svelte';
	import CardHeader from '$lib/card/card-header.svelte';
	import CardDescription from '$lib/card/card-description.svelte';
	import TimeGroup from '$lib/inputs/time-group/time-group.svelte';
	import Button from '$lib/inputs/button.svelte';

	import ToasterContainer from '$lib/toaster/toaster-container.svelte';
	import ToasterHeader from '$lib/toaster/toaster-header.svelte';
	import ToasterBody from '$lib/toaster/toaster-body.svelte';

	/**
	 * @type {{
	 *   startHour?: string
	 *   startMinute?: string
	 *   endHour?: string
	 *   endMinute?: string
	 *   onSave?: () => void
	 *   onCancelEdit?: () => void
	 *   onFeedbackDismiss?: () => void
	 *   isSaving?: boolean
	 *   feedback?: string
	 *   isEditing?: boolean
	 *   isTracking?: boolean
	 *   isInputLocked?: boolean
	 * }}
	 */
	let {
		startHour = $bindable(''),
		startMinute = $bindable(''),
		endHour = $bindable(''),
		endMinute = $bindable(''),
		onSave = () => {},
		onCancelEdit = () => {},
		onFeedbackDismiss = () => {},
		isSaving = false,
		feedback = '',
		isEditing = false,
		isTracking = false,
		isInputLocked = false
	} = $props();
</script>

<Card>
	<div>
		<CardHeader>
			{isEditing ? 'Eintrag bearbeiten' : 'Zeiterfassung'}
		</CardHeader>
		<CardDescription>
			Legen Sie die Start- und Endzeit fest und speichern Sie die erfasste Arbeitszeit. Alternativ
			können die Zeiten über die Schaltflächen automatisch erfasst und Pausen berücksichtigt werden.
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

	<ToasterContainer show={Boolean(feedback)} onDismiss={onFeedbackDismiss}>
		<ToasterHeader>
			<CircleAlert size="16" />
			<h1>Zeit kann nicht gebucht werden.</h1>
		</ToasterHeader>
		<ToasterBody>
			<ul class="list-disc">
				<li>{feedback}</li>
			</ul>
		</ToasterBody>
	</ToasterContainer>
</Card>
