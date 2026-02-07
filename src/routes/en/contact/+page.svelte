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
		content="Contact Nick Esselman. Even a simple question is welcome. Frontend-only contact form with placeholder validation."
	/>
	<meta property="og:title" content="Contact | Nick Esselman" />
	<meta
		property="og:description"
		content="Send Nick a message about your website or internal tool question. No pressure, just practical help."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nickesselman.nl/en/contact" />
</svelte:head>

<section class="card">
	<p class="eyebrow">Contact</p>
	<h1>Send me a message</h1>
	<p>
		It is totally fine if you just want to ask a quick question first. You do not need a complete
		plan yet.
	</p>
</section>

<section class="card">
	{#if form?.success}
		<p class="notice notice-success" role="status">
			Your message was sent. I will get back to you as soon as I can.
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
				<label for="contact-email">Your email address</label>
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
				<label for="contact-instagram">Your Instagram handle</label>
				<input
					id="contact-instagram"
					name="contactInstagram"
					placeholder="@yourname"
					value={form?.values?.contactInstagram ?? defaultValues.contactInstagram}
					required
				/>
			</div>
		{/if}

		{#if preferredContactMethod === 'WhatsApp (Quickest)' || preferredContactMethod === 'Phone Call (takes long)'}
			<div class="form-row adaptive-row">
				<label for="contact-phone">Your phone number</label>
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
				You can leave contact details empty. I can read your message, but I will not contact you.
			</p>
		{/if}

		<button class="button button-primary" type="submit">Send</button>
		<p class="field-hint">Name, message, and contact method are required.</p>
	</form>
</section>
