import { redirect } from '@sveltejs/kit';
import { CONTACT_URL } from '$lib/contact-url';

export function load() {
	throw redirect(308, CONTACT_URL);
}
