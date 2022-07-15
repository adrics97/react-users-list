import useFilters from '../hooks/useFilters';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListPagination from './UsersListPagination';
import useUsers from '../hooks/useUsers';
import { getUsersToDisplay } from '../lib/users/filterUsers';
import { useSelectedForm } from '../hooks/useSelectedForm';
import { UserFormsContext } from '../lib/contexts/UsersFormContext';
import UserFormContainer from './user-forms/UserFormContainer';
import UserFormProvider from './providers/UserFormProvider';

function UsersList() {
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

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UserFormProvider reloadUsers={reloadUsers} resetFilters={resetFilters}>
				<UsersListFilters {...filters} {...filtersSetters} />
				<UserFormContainer />

				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
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
