import { useState } from 'react';
import { useCreateForm } from '../../hooks/useCreateForm';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import { USER_ROLES } from '../constants/userRoles';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import CrossIcon from '../icons/CrossIcon';
import style from './UserCreateForm.module.css';

function UserCreateForm({ onClose }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username, name, setUsername, setName } = useCreateForm();

	const isDisabled =
		!name.value ||
		name.error ||
		!username.value ||
		username.error ||
		username.loading ||
		isSubmitting;

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

		console.log(user);

		const res = await fetch('http://localhost:4000/users', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		if (res.ok) {
			//TODO: Actualizar usuarios
			onClose();
		} else {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				filled
				onClick={onClose}
			/>
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
					<Button type='submit' disabled={isDisabled}>
						{isSubmitting ? 'Cargando...' : 'Crear usuario'}
					</Button>
				</div>
			</form>
		</div>
	);
}
export default UserCreateForm;
