import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

const REQUIRED_ENV = [
	'SMTP_HOST',
	'SMTP_PORT',
	'SMTP_SECURE',
	'SMTP_USER',
	'SMTP_PASSWORD',
	'EMAIL_FROM',
	'EMAIL_TO'
] as const;

const CONTACT_METHODS = [
	'Email',
	'WhatsApp (Quickest)',
	'Instagram',
	'Phone Call (takes long)',
	"Don't contact me"
] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type ContactInput = {
	name: string;
	message: string;
	preferredContactMethod: ContactMethod;
	locale: 'nl' | 'en';
	contactDetail?: string;
};

type ContactValidationError = 'name' | 'message' | 'preferredContactMethod';
type ContactDetailValidationError = 'contactEmail' | 'contactPhone' | 'contactInstagram';
type ContactValidationData = {
	name: string;
	message: string;
	preferredContactMethod: ContactMethod;
	contactDetail?: string;
};
type ContactValidationResult =
	| { ok: true; data: ContactValidationData }
	| { ok: false; error: ContactValidationError | ContactDetailValidationError };

function requireEnv(name: (typeof REQUIRED_ENV)[number]) {
	const value = env[name]?.trim();

	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
}

function parseSmtpPort(port: string) {
	const parsed = Number(port);

	if (!Number.isInteger(parsed) || parsed <= 0) {
		throw new Error('SMTP_PORT must be a positive integer');
	}

	return parsed;
}

function parseSmtpSecure(secure: string) {
	if (secure !== 'true' && secure !== 'false') {
		throw new Error('SMTP_SECURE must be "true" or "false"');
	}

	return secure === 'true';
}

export function validateContactInput(input: {
	name: string;
	message: string;
	preferredContactMethod: string;
	contactEmail: string;
	contactPhone: string;
	contactInstagram: string;
}): ContactValidationResult {
	const name = input.name.trim();
	const message = input.message.trim();
	const preferredContactMethod = input.preferredContactMethod.trim();
	const contactEmail = input.contactEmail.trim();
	const contactPhone = input.contactPhone.trim();
	const contactInstagram = input.contactInstagram.trim();

	if (!name) {
		return { ok: false, error: 'name' as const };
	}

	if (!message || message.length < 10) {
		return { ok: false, error: 'message' as const };
	}

	if (!CONTACT_METHODS.includes(preferredContactMethod as ContactMethod)) {
		return { ok: false, error: 'preferredContactMethod' as const };
	}

	let contactDetail: string | undefined;

	if (preferredContactMethod === 'Email') {
		const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
		if (!looksLikeEmail) {
			return { ok: false, error: 'contactEmail' as const };
		}
		contactDetail = contactEmail;
	}

	if (
		preferredContactMethod === 'WhatsApp (Quickest)' ||
		preferredContactMethod === 'Phone Call (takes long)'
	) {
		const looksLikePhone = /^[+0-9()\-\s]{6,}$/.test(contactPhone);
		if (!looksLikePhone) {
			return { ok: false, error: 'contactPhone' as const };
		}
		contactDetail = contactPhone;
	}

	if (preferredContactMethod === 'Instagram') {
		const looksLikeInstagram = /^@[A-Za-z0-9._]{2,}$/.test(contactInstagram);
		if (!looksLikeInstagram) {
			return { ok: false, error: 'contactInstagram' as const };
		}
		contactDetail = contactInstagram;
	}

	return {
		ok: true,
		data: {
			name,
			message,
			preferredContactMethod: preferredContactMethod as ContactMethod,
			contactDetail
		}
	};
}

export async function sendContactMail(input: ContactInput) {
	const smtpHost = requireEnv('SMTP_HOST');
	const smtpPort = parseSmtpPort(requireEnv('SMTP_PORT'));
	const smtpSecure = parseSmtpSecure(requireEnv('SMTP_SECURE'));
	const smtpUser = requireEnv('SMTP_USER');
	const smtpPassword = requireEnv('SMTP_PASSWORD');
	const emailFrom = requireEnv('EMAIL_FROM');
	const emailTo = requireEnv('EMAIL_TO');

	const transporter = nodemailer.createTransport({
		host: smtpHost,
		port: smtpPort,
		secure: smtpSecure,
		auth: {
			user: smtpUser,
			pass: smtpPassword
		}
	});

	const submittedAt = new Date().toISOString();
	const localeLabel = input.locale === 'nl' ? 'Nederlands' : 'English';
	const subject = `New contact message from ${input.name}`;

	const text = [
		`A new contact message was submitted on nickesselman.nl.`,
		'',
		`Name: ${input.name}`,
		`Preferred contact method: ${input.preferredContactMethod}`,
		`Contact detail: ${input.contactDetail ?? 'Not provided'}`,
		`Language: ${localeLabel}`,
		`Submitted at (UTC): ${submittedAt}`,
		'',
		'Message:',
		input.message
	].join('\n');

	await transporter.sendMail({
		from: emailFrom,
		to: emailTo,
		subject,
		text
	});
}
