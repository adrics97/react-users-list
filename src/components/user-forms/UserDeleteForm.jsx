import { useContext, useState } from 'react';
import { deleteUserById } from '../../lib/api/usersApi';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

function UserDeleteForm() {
	const { currentUser, onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setFiltersForm } = useContext(UserFormsContext);

	const handleSubmit = async evt => {
		evt.preventDefault();

		setIsSubmitting(true);
		const success = await deleteUserById(currentUser.id);
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
				{currentUser.name}
				{'"'}?
			</p>
			<div className={style.row}>
				<Button
					type='button'
					kind='secondary'
					onClick={setFiltersForm}
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
