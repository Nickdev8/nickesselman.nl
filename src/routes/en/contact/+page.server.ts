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
		return 'Please enter your name.';
	}

	if (field === 'message') {
		return 'Your message is too short. Please use at least 10 characters.';
	}

	if (field === 'contactEmail') {
		return 'Please enter a valid email address.';
	}

	if (field === 'contactPhone') {
		return 'Please enter a valid phone number.';
	}

	if (field === 'contactInstagram') {
		return 'Please enter your Instagram handle starting with @.';
	}

	return 'Please choose a preferred contact method from the list.';
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
				locale: 'en'
			});

			return {
				success: true
			};
		} catch (error) {
			console.error('Contact form send failed (en):', error);
			return fail(500, {
				error: 'Something went wrong while sending your message. Please try again.',
				values
			});
		}
	}
};
