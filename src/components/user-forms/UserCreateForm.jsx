import { useContext, useState } from 'react';
import { useCreateForm } from '../../hooks/useCreateForm';
import { createUser } from '../../lib/api/usersApi';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';
import Button from '../buttons/Button';
import { USER_ROLES } from '../constants/userRoles';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import style from './UserCreateForm.module.css';

function UserCreateForm() {
	const { onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username, name, dispatchFormValues, isFormInvalid } = useCreateForm();

	const handleSubmit = async evt => {
		evt.preventDefault();

		setIsSubmitting(true);

		const user = {
			id: crypto.randomUUID,
			name: name.value,
			username: username.value,
			role: evt.target.role.value,
			active: evt.target.active.checked
		};

		const success = await createUser(user);
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
					success={username.value && !username.loading && !username.error}
					error={username.error}
					loading={username.loading}
					value={username.value}
					onChange={evt =>
						dispatchFormValues({
							type: 'username_changed',
							value: evt.target.value
						})
					}
				></InputTextAsync>
			</div>
			<div className={style.row}>
				<Select name='role'>
					<option value={USER_ROLES.TEACHER}>Profesor</option>
					<option value={USER_ROLES.STUDENT}>Alumno</option>
					<option value={USER_ROLES.OTHER}>Otro</option>
				</Select>
				<div className={style.active}>
					<InputCheckbox name='active' />
					<span>¿Activo?</span>
				</div>
				<Button type='submit' disabled={isFormInvalid || isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Crear usuario'}
				</Button>
			</div>
		</form>
	);
}
export default UserCreateForm;
