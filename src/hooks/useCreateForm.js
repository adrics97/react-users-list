import { useEffect, useReducer } from 'react';
import { usernameErrorChanged } from '../lib/actions/createFormActions';
import { findUserByUsername } from '../lib/api/usersApi';
import {
	createFormReducer,
	CREATE_FORM_INITIAL_STATE
} from '../lib/reducers/createFormReducer';

export const useCreateForm = () => {
	const [formValues, dispatchFormValues] = useReducer(
		createFormReducer,
		CREATE_FORM_INITIAL_STATE
	);

	console.log(formValues);
	useEffect(() => {
		if (!formValues.username.loading) return;

		const controller = new AbortController();
		const timeoutId = setTimeout(
			() =>
				validateUsernameIsAvailable(
					formValues.username.value,
					dispatchFormValues,
					controller.signal
				),
			500
		);
		return () => {
			controller.abort();
			clearTimeout(timeoutId);
		};
	}, [formValues.username.value, formValues.username.loading]);

	const isFormInvalid =
		!formValues.name.value ||
		formValues.name.error ||
		!formValues.username.value ||
		formValues.username.error ||
		formValues.username.loading;

	return { ...formValues, dispatchFormValues, isFormInvalid };
};

const validateUsernameIsAvailable = async (
	username,
	dispatchFormValues,
	signal
) => {
	const { user, error, abort } = findUserByUsername(username, signal);
	if (abort) return;
	let errorMessage;
	console.log('error', error);
	if (error) errorMessage = 'Error al validar';
	else if (user) errorMessage = 'Ya está en uso';
	dispatchFormValues(usernameErrorChanged(errorMessage));
};
