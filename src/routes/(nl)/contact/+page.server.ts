import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendContactMail, validateContactInput } from '$lib/server/contact-mail';

function getField(formData: FormData, name: string) {
	const value = formData.get(name);
	return typeof value === 'string' ? value : '';
}

function validationMessage(
	field:
		| 'name'
		| 'message'
		| 'preferredContactMethod'
		| 'contactEmail'
		| 'contactPhone'
		| 'contactInstagram'
) {
	if (field === 'name') {
		return 'Vul alsjeblieft je naam in.';
	}

	if (field === 'message') {
		return 'Je bericht is nog te kort. Typ minimaal 10 tekens.';
	}

	if (field === 'contactEmail') {
		return 'Vul een geldig e-mailadres in.';
	}

	if (field === 'contactPhone') {
		return 'Vul een geldig telefoonnummer in.';
	}

	if (field === 'contactInstagram') {
		return 'Vul je Instagram gebruikersnaam in, beginnend met @.';
	}

	return 'Kies een contactmethode uit de lijst.';
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const values = {
			name: getField(formData, 'name'),
			message: getField(formData, 'message'),
			preferredContactMethod: getField(formData, 'preferredContactMethod'),
			contactEmail: getField(formData, 'contactEmail'),
			contactPhone: getField(formData, 'contactPhone'),
			contactInstagram: getField(formData, 'contactInstagram')
		};

		const parsed = validateContactInput(values);

		if (!parsed.ok) {
			return fail(400, {
				error: validationMessage(parsed.error),
				values
			});
		}

		try {
			await sendContactMail({
				...parsed.data,
				locale: 'nl'
			});

			return {
				success: true
			};
		} catch (error) {
			console.error('Contact form send failed (nl):', error);
			return fail(500, {
				error: 'Er ging iets mis bij het versturen. Probeer het zo nog een keer.',
				values
			});
		}
	}
};
