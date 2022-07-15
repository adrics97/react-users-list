import { useState } from 'react';
import { useEditForm } from '../../hooks/useEditForm';
import { updateUser } from '../../lib/api/usersApi';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import { USER_ROLES } from '../constants/userRoles';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import CrossIcon from '../icons/CrossIcon';
import style from './UserEditForm.module.css';
import UserFormLayout from './UserFormLayout';

function UserEditForm({ onSuccess, user }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		username,
		name,
		role,
		active,
		setUsername,
		setName,
		setRole,
		setActive,
		isFormInvalid
	} = useEditForm(user);

	const handleSubmit = async evt => {
		evt.preventDefault();

		setIsSubmitting(true);

		const editUser = {
			id: user.id,
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
					onChange={evt => setName(evt.target.value)}
				></InputText>
				<InputTextAsync
					className={style.input}
					label='Username'
					placeholder='jonhdoe'
					success={
						username.value !== user.username &&
						!username.loading &&
						!username.error
					}
					error={username.error}
					loading={username.loading}
					value={username.value}
					onChange={evt => setUsername(evt.target.value)}
				></InputTextAsync>
			</div>
			<div className={style.row}>
				<Select value={role} onChange={evt => setRole(evt.target.value)}>
					<option value={USER_ROLES.TEACHER}>Profesor</option>
					<option value={USER_ROLES.STUDENT}>Alumno</option>
					<option value={USER_ROLES.OTHER}>Otro</option>
				</Select>
				<div className={style.active}>
					<InputCheckbox
						checked={active}
						onChange={evt => setActive(evt.target.checked)}
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
