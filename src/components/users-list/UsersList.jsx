import useFilters from '../../hooks/useFilters';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListPagination from './UsersListPagination';
import useUsers from '../../hooks/useUsers';
import { getUsersToDisplay } from '../../lib/users/filterUsers';
import UserFormContainer from '../user-forms/UserFormContainer';
import UserFormProvider from '../providers/UserFormProvider';
import { useState } from 'react';
import UsersListViewSelector from '../users-list/UsersListViewSelector';

function UsersList() {
	const {
		filters,
		filtersSetters,
		pagination,
		paginationSetters,
		resetFilters
	} = useFilters();

	const [view, setView] = useState(true);
	const { users, usersError, usersLoading, reloadUsers } = useUsers();
	const { paginatedUsers, totalPages } = getUsersToDisplay(
		users,
		filters,
		pagination
	);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UserFormProvider reloadUsers={reloadUsers} resetFilters={resetFilters}>
				<UsersListFilters {...filters} {...filtersSetters} />
				<UsersListViewSelector view={view} setView={setView} />
				<UserFormContainer />

				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
					view={view}
				/>
			</UserFormProvider>
			<UsersListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
}

export default UsersList;
