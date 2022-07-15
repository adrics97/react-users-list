import { useState } from 'react';
import { deleteUserById, updateUser } from '../../lib/api/usersApi';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

function UserDeleteForm({ onSuccess, onCancel, user }) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async evt => {
		evt.preventDefault();

		setIsSubmitting(true);

		const success = await deleteUserById(user.id);
		if (success) {
			onSuccess();
		} else {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<p className={style.text}>
				{' '}
				¿Estás seguro de que quieres eliminar el usuario {'"'}
				{user.name}
				{'"'}?
			</p>
			<div className={style.row}>
				<Button
					type='button'
					kind='secondary'
					onClick={onCancel}
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Cargando...' : 'Cancelar'}
				</Button>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Eliminar usuario'}
				</Button>
			</div>
		</form>
	);
}
export default UserDeleteForm;
