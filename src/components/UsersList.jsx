import useFilters from '../hooks/useFilters';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListPagination from './UsersListPagination';
import useUsers from '../hooks/useUsers';
import { useState } from 'react';
import { USER_FORMS } from './constants/useForms';
import Button from './buttons/Button';
import UserCreateForm from './user-forms/UserCreateForm';
import {
	filtersUsersByActive,
	filtersUsersByName,
	paginateUsers,
	sortUsers
} from '../lib/users/filterUsers';

function UsersList() {
	const { currentForm, setFiltersForm, setCreateForm } = useForm();
	const {
		filters,
		filtersSetters,
		pagination,
		paginationSetters,
		resetFilters
	} = useFilters();

	const { users, usersError, usersLoading, reloadUsers } = useUsers();
	const { paginatedUsers, totalPages } = getUsersToDisplay(
		users,
		filters,
		pagination
	);

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};
	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>

			{currentForm === USER_FORMS.FILTERS ? (
				<UsersListFilters
					{...filters}
					{...filtersSetters}
					slot={<Button onClick={setCreateForm}>Añadir usuarios</Button>}
				/>
			) : (
				<UserFormLayout onClose={setFiltersForm}>
					<UserCreateForm onSuccess={onSuccess} />
				</UserFormLayout>
			)}
			<UsersListRows
				users={paginatedUsers}
				error={usersError}
				loading={usersLoading}
			/>
			<UsersListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
}

const getUsersToDisplay = (
	users,
	{ onlyActive, search, sortBy },
	{ page, itemsPerPage }
) => {
	let usersFiltered = filtersUsersByActive(users, onlyActive);
	usersFiltered = filtersUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	const { paginatedUsers, totalPages } = paginateUsers(
		usersFiltered,
		page,
		itemsPerPage
	);

	return { paginatedUsers, totalPages };
};

const useForm = () => {
	const [currentForm, setCurrentForm] = useState(USER_FORMS.FILTERS);

	const setFiltersForm = () => setCurrentForm(USER_FORMS.FILTERS);
	const setCreateForm = () => setCurrentForm(USER_FORMS.CREATE);
	const setEditForm = () => setCurrentForm(USER_FORMS.EDIT);
	const setDeleteForm = () => setCurrentForm(USER_FORMS.DELETE);

	return {
		currentForm,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	};
};

export default UsersList;
