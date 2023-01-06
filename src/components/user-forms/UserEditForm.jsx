import { useContext, useState } from 'react';
import { useEditForm } from '../../hooks/useEditForm';
import {
	activeChanged,
	nameChanged,
	roleChanged,
	usernameChanged
} from '../../lib/actions/editFormActions';
import { updateUser } from '../../lib/api/usersApi';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';
import { alertBox } from '../../lib/events/alertEvents';
import Button from '../buttons/Button';
import { USER_ROLES } from '../constants/userRoles';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import style from './UserEditForm.module.css';

function UserEditForm({ currentUser, closeModal }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { onSuccess } = useContext(UserFormsContext);
	const { username, name, role, active, dispatchFormValues, isFormInvalid } =
		useEditForm(currentUser);

	const handleSubmit = async evt => {
		evt.preventDefault();

		setIsSubmitting(true);

		const editUser = {
			id: currentUser.id,
			name: name.value,
			username: username.value,
			role,
			active
		};

		const success = await updateUser(editUser);
		if (success) {
			onSuccess();
			alertBox.success('Usuario modificado con éxito ');
		} else {
			alertBox.error('Error al modificar al usuario');
		}
		closeModal();
	};

	return (
		<form onSubmit={handleSubmit} className={style.form}>
			<InputText
				label='Nombre'
				placeholder='John Doe'
				error={name.error}
				value={name.value}
				onChange={evt => dispatchFormValues(nameChanged(evt.target.value))}
			></InputText>
			<InputTextAsync
				label='Username'
				placeholder='jonhdoe'
				success={
					username.value !== currentUser.username &&
					!username.loading &&
					!username.error
				}
				error={username.error}
				loading={username.loading}
				value={username.value}
				onChange={evt =>
					dispatchFormValues(
						usernameChanged(evt.target.value, currentUser.username)
					)
				}
			></InputTextAsync>

			<Select
				value={role}
				onChange={evt => dispatchFormValues(roleChanged(evt.target.value))}
			>
				<option value={USER_ROLES.TEACHER}>Profesor</option>
				<option value={USER_ROLES.STUDENT}>Alumno</option>
				<option value={USER_ROLES.OTHER}>Otro</option>
			</Select>
			<div className={style.active}>
				<InputCheckbox
					checked={active}
					onChange={evt =>
						dispatchFormValues(activeChanged(evt.target.checked))
					}
				/>
				<span>¿Activo?</span>
			</div>
			<Button type='submit' disabled={isFormInvalid || isSubmitting}>
				{isSubmitting ? 'Cargando...' : 'Editar usuario'}
			</Button>
		</form>
	);
}
export default UserEditForm;
