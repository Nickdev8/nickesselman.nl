<script lang="ts">
	type ContactFormState = {
		success?: boolean;
		error?: string;
		values?: {
			name?: string;
			message?: string;
			preferredContactMethod?: string;
			contactEmail?: string;
			contactPhone?: string;
			contactInstagram?: string;
		};
	};

	const defaultValues = {
		name: '',
		message: '',
		preferredContactMethod: '',
		contactEmail: '',
		contactPhone: '',
		contactInstagram: ''
	};

	let { form } = $props<{ form?: ContactFormState }>();
	let preferredContactMethod = $state('');

	$effect(() => {
		if (form?.values?.preferredContactMethod) {
			preferredContactMethod = form.values.preferredContactMethod;
		}
	});
</script>

<svelte:head>
	<title>Contact | Nick Esselman</title>
	<meta
		name="description"
		content="Neem contact op met Nick Esselman. Ook een losse vraag is welkom. Frontend-contactformulier met basisvalidatie."
	/>
	<meta property="og:title" content="Contact | Nick Esselman" />
	<meta
		property="og:description"
		content="Stuur een bericht naar Nick Esselman. Ook als je alleen even wilt overleggen of iets klein wilt checken."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nickesselman.nl/contact" />
</svelte:head>

<section class="card">
	<p class="eyebrow">Contact</p>
	<h1>Stuur gerust een bericht</h1>
	<p>
		Ook als je alleen een korte vraag hebt of wil checken of iets slim is om te bouwen. Je hoeft nog
		niks zeker te weten.
	</p>
</section>

<section class="card">
	{#if form?.success}
		<p class="notice notice-success" role="status">
			Je bericht is verstuurd. Ik reageer zo snel mogelijk.
		</p>
	{/if}

	{#if form?.error}
		<p class="notice notice-error" role="alert">{form.error}</p>
	{/if}

	<form class="contact-form" method="post">
		<div class="form-row">
			<label for="name">Name</label>
			<input
				id="name"
				name="name"
				autocomplete="name"
				value={form?.values?.name ?? defaultValues.name}
				required
			/>
		</div>

		<div class="form-row">
			<label for="message">Message</label>
			<textarea id="message" name="message" required
				>{form?.values?.message ?? defaultValues.message}</textarea
			>
		</div>

		<div class="form-row">
			<label for="preferred-contact-method">Preferred contact method</label>
			<select
				id="preferred-contact-method"
				name="preferredContactMethod"
				bind:value={preferredContactMethod}
				required
			>
				<option value="">Please choose one</option>
				<option value="Email">Email</option>
				<option value="WhatsApp (Quickest)"> WhatsApp (Quickest) </option>
				<option value="Instagram">Instagram</option>
				<option value="Phone Call (takes long)"> Phone Call (takes long) </option>
				<option value="Don't contact me">Don't contact me</option>
			</select>
		</div>

		{#if preferredContactMethod === 'Email'}
			<div class="form-row adaptive-row">
				<label for="contact-email">Je e-mailadres</label>
				<input
					id="contact-email"
					name="contactEmail"
					type="email"
					autocomplete="email"
					value={form?.values?.contactEmail ?? defaultValues.contactEmail}
					required
				/>
			</div>
		{/if}

		{#if preferredContactMethod === 'Instagram'}
			<div class="form-row adaptive-row">
				<label for="contact-instagram">Je Instagram @naam</label>
				<input
					id="contact-instagram"
					name="contactInstagram"
					placeholder="@jouwnaam"
					value={form?.values?.contactInstagram ?? defaultValues.contactInstagram}
					required
				/>
			</div>
		{/if}

		{#if preferredContactMethod === 'WhatsApp (Quickest)' || preferredContactMethod === 'Phone Call (takes long)'}
			<div class="form-row adaptive-row">
				<label for="contact-phone">Je telefoonnummer</label>
				<input
					id="contact-phone"
					name="contactPhone"
					type="tel"
					autocomplete="tel"
					placeholder="+31..."
					value={form?.values?.contactPhone ?? defaultValues.contactPhone}
					required
				/>
			</div>
		{/if}

		{#if preferredContactMethod === "Don't contact me"}
			<p class="field-hint">
				Je hoeft geen contactgegevens in te vullen. Ik lees je bericht wel, maar neem geen contact
				op.
			</p>
		{/if}

		<button class="button button-primary" type="submit">Verstuur</button>
		<p class="field-hint">Naam, bericht en contactmethode zijn verplicht.</p>
	</form>
</section>
