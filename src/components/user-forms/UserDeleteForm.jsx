import { useContext, useState } from 'react';
import { deleteUserById } from '../../lib/api/usersApi';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

function UserDeleteForm({ closeModal, currentUser }) {
	const { onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async evt => {
		evt.preventDefault();

		setIsSubmitting(true);
		const success = await deleteUserById(currentUser.id);
		if (success) {
			onSuccess();
			closeModal();
		} else {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={style.form}>
			<p>
				{' '}
				¿Estás seguro de que quieres eliminar el usuario {'"'}
				{currentUser.name}
				{'"'}?
			</p>

			<Button
				type='button'
				kind='secondary'
				onClick={closeModal}
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Cargando...' : 'Cancelar'}
			</Button>
			<Button type='submit' disabled={isSubmitting}>
				{isSubmitting ? 'Cargando...' : 'Eliminar usuario'}
			</Button>
		</form>
	);
}
export default UserDeleteForm;
