import React from 'react';
import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import style from './UserFormLayout.module.css';

function UserFormLayout({ onClose, children }) {
	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				filled
				onClick={onClose}
			/>
			{children}
		</div>
	);
}

export default UserFormLayout;