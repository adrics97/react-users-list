import UserStatus from '../user/UserStatus';
import UserRole from '../user/UserRole';
import style from './UserCard.module.css';
import UserDisplay from '../user/UserDisplay';
import IconButton from '../buttons/IconButton';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import { useContext } from 'react';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';

function UserCard({ id, username, name, active, role }) {
	const { setEditForm, setDeleteForm } = useContext(UserFormsContext);
	return (
		<div className={style.wrapper}>
			<div className={style.card}>
				<div className={style.name}>
					<UserDisplay name={name} username={username} />
				</div>
				<div className={style.info}>
					<UserRole role={role} />
					<UserStatus active={active} />
					<div className={style.actions}>
						<IconButton
							icon={PencilIcon}
							kind='black'
							onClick={() => setEditForm({ username, name, active, role, id })}
						/>
						<IconButton
							icon={TrashIcon}
							kind='red'
							onClick={() => setDeleteForm({ id, name })}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserCard;
