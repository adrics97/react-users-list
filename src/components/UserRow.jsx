import UserStatus from './UserStatus';
import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserDisplay from './UserDisplay';
import IconButton from './buttons/IconButton';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

function UserRow({
	id,
	username,
	name,
	active,
	role,
	setEditForm,
	setDeleteForm
}) {
	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<UserDisplay name={name} username={username} />
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
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
	);
}

export default UserRow;
