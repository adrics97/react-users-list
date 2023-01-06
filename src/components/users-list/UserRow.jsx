import UserStatus from '../user/UserStatus';
import UserRole from '../user/UserRole';
import style from './UserRow.module.css';
import UserDisplay from '../user/UserDisplay';

import UserActions from '../user/UserActions';

function UserRow({ user }) {
	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<UserDisplay name={user.name} username={user.username} />
			</div>
			<div className={style.status}>
				<UserStatus active={user.active} />
			</div>
			<div className={style.role}>
				<UserRole role={user.role} />
			</div>
			<div className={style.action}>
				<UserActions user={user} />
			</div>
		</div>
	);
}

export default UserRow;
