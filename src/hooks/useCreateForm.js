import { useState, useEffect } from 'react';
import { findUserByUsername } from '../lib/api/usersApi';
import { validateName, validateUsername } from '../lib/users/userValidation';

export const useCreateForm = () => {
	const [formValues, setFormValues] = useState({
		name: {
			value: '',
			error: undefined
		},
		username: {
			value: '',
			loading: false,
			error: undefined
		}
	});

	const setName = newName => {
		const error = validateName(newName);
		setFormValues({
			...formValues,
			name: { value: newName, error: error }
		});
	};

	const setUsername = newUsername => {
		const error = validateUsername(newUsername);
		setFormValues({
			...formValues,
			username: { value: newUsername, loading: !error, error: error }
		});
	};

	const setUsernameError = error =>
		setFormValues(prevFormValues => ({
			...prevFormValues,
			username: {
				value: prevFormValues.username.value,
				error: error,
				loading: false
			}
		}));

	useEffect(() => {
		if (!formValues.username.loading) return;

		const controller = new AbortController();
		const timeoutId = setTimeout(
			() =>
				validateUsernameIsAvailable(
					formValues.username.value,
					setUsernameError,
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

	return { ...formValues, setName, setUsername, isFormInvalid };
};

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	const { user, error, abort } = findUserByUsername(username, signal);
	if (abort) return;
	if (error) return setUsernameError('Error al validar');
	setUsernameError(user ? 'Ya está en uso' : undefined);
};
