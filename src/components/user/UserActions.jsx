import { useState } from 'react';
import { useDropdown } from '../../hooks/useDropdown';
import IconButton from '../buttons/IconButton';
import { DotsIcon } from '../icons/DotsIcon';
import PencilIcon from '../icons/PencilIcon';
import { PictureIcon } from '../icons/PictureIcon';
import TrashIcon from '../icons/TrashIcon';
import Modal from '../modal/Modal';
import UserDeleteForm from '../user-forms/UserDeleteForm';
import UserEditForm from '../user-forms/UserEditForm';
import UserPicForm from '../user-forms/UserPicForm';
import style from './UserActions.module.css';

const UserActions = ({ user }) => {
	const {
		modalContent,
		closeModal,
		openEditModal,
		openDeleteModal,
		openPicModal
	} = useModal(user);

	const { dropdownOpened, dropdownRef, openDropdown, closeDropdown } =
		useDropdown();
	return (
		<div className={style.wrapper}>
			<Modal closeModal={closeModal}>{modalContent}</Modal>
			<IconButton icon={DotsIcon} kind='black' onClick={openDropdown} />
			{dropdownOpened && (
				<ul
					className={style.dropdown}
					onClick={closeDropdown}
					ref={dropdownRef}
				>
					<li onClick={openEditModal}>
						<PencilIcon />
						<span>Editar</span>
					</li>
					<li onClick={openPicModal}>
						<PictureIcon />
						<span>Cambiar Foto</span>
					</li>
					<li onClick={openDeleteModal}>
						<TrashIcon />
						<span>Eliminar</span>
					</li>
				</ul>
			)}
		</div>
	);
};

const useModal = user => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => setModalContent();

	const openEditModal = () =>
		setModalContent(
			<UserEditForm currentUser={user} closeModal={closeModal} />
		);

	const openDeleteModal = () =>
		setModalContent(
			<UserDeleteForm closeModal={closeModal} currentUser={user} />
		);

	const openPicModal = () =>
		setModalContent(<UserPicForm currentUser={user} closeModal={closeModal} />);

	return {
		modalContent,
		closeModal,
		openEditModal,
		openDeleteModal,
		openPicModal
	};
};
export default UserActions;
