import { useContext, useState } from 'react';
import { useEditForm } from '../../hooks/useEditForm';
import { updateUser } from '../../lib/api/usersApi';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';
import Button from '../buttons/Button';
import { USER_ROLES } from '../constants/userRoles';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import style from './UserEditForm.module.css';

function UserEditForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { currentUser, onSuccess } = useContext(UserFormsContext);
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
		} else {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className={style.row}>
				<InputText
					className={style.input}
					label='Nombre'
					placeholder='John Doe'
					error={name.error}
					value={name.value}
					onChange={evt =>
						dispatchFormValues({
							type: 'name_changed',
							value: evt.target.value
						})
					}
				></InputText>
				<InputTextAsync
					className={style.input}
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
						dispatchFormValues({
							type: 'username_changed',
							value: evt.target.value,
							currentUsername: currentUser.username
						})
					}
				></InputTextAsync>
			</div>
			<div className={style.row}>
				<Select
					value={role}
					onChange={evt =>
						dispatchFormValues({
							type: 'role_changed',
							value: evt.target.value
						})
					}
				>
					<option value={USER_ROLES.TEACHER}>Profesor</option>
					<option value={USER_ROLES.STUDENT}>Alumno</option>
					<option value={USER_ROLES.OTHER}>Otro</option>
				</Select>
				<div className={style.active}>
					<InputCheckbox
						checked={active}
						onChange={evt =>
							dispatchFormValues({
								type: 'active_changed',
								value: evt.target.value
							})
						}
					/>
					<span>¿Activo?</span>
				</div>
				<Button type='submit' disabled={isFormInvalid || isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Editar usuario'}
				</Button>
			</div>
		</form>
	);
}
export default UserEditForm;
