import { useState } from 'react';
import { useCreateForm } from '../../hooks/useCreateForm';
import { createUser } from '../../lib/api/usersApi';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import { USER_ROLES } from '../constants/userRoles';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import CrossIcon from '../icons/CrossIcon';
import style from './UserCreateForm.module.css';
import UserFormLayout from './UserFormLayout';

function UserCreateForm({ onSuccess }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username, name, setUsername, setName, isFormValid } = useCreateForm();

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
					onChange={evt => setName(evt.target.value)}
				></InputText>
				<InputTextAsync
					className={style.input}
					label='Username'
					placeholder='jonhdoe'
					success={username.value && !username.loading && !username.error}
					error={username.error}
					loading={username.loading}
					value={username.value}
					onChange={evt => setUsername(evt.target.value)}
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
				<Button type='submit' disabled={isFormValid || isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Crear usuario'}
				</Button>
			</div>
		</form>
	);
}
export default UserCreateForm;
