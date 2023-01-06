import { ALERT_KINDS } from '../../components/constants/alertKinds';

const EVENT_NAME = 'alert';
const suscribe = callback => {
	const handler = evt => callback(evt.detail);
	window.addEventListener(EVENT_NAME, handler);
	return handler;
};
const unsuscribe = handler => window.removeEventListener(EVENT_NAME, handler);

const emitEvent = (kind, message) => {
	const event = new CustomEvent(EVENT_NAME, {
		detail: { kind, message }
	});
	window.dispatchEvent(event);
};

const success = message => emitEvent(ALERT_KINDS.SUCCESS, message);
const error = message => emitEvent(ALERT_KINDS.ERROR, message);

export const alertBox = {
	success,
	error,
	suscribe,
	unsuscribe
};
