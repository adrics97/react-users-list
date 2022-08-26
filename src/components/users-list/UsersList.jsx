import useFilters from '../../hooks/useFilters';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListPagination from './UsersListPagination';
import useUsers from '../../hooks/useUsers';
import UserFormContainer from '../user-forms/UserFormContainer';
import UserFormProvider from '../providers/UserFormProvider';
import { useState } from 'react';
import UsersListViewSelector from '../users-list/UsersListViewSelector';

function UsersList() {
	const { filters, filtersSetters, paginationSetters, resetFilters } =
		useFilters();

	const [view, setView] = useState(true);
	const { users, usersCount, usersError, usersLoading } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UserFormProvider resetFilters={resetFilters}>
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					{...filtersSetters}
				/>
				<UserFormContainer />
				<UsersListViewSelector view={view} setView={setView} />

				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					view={view}
				/>
			</UserFormProvider>
			<UsersListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				{...paginationSetters}
				totalUsers={usersCount}
			/>
		</div>
	);
}

export default UsersList;
