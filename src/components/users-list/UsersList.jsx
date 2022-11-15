import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListPagination from './UsersListPagination';
import useUsers from '../../hooks/useUsers';
import UserFormContainer from '../user-forms/UserFormContainer';
import UserFormProvider from '../providers/UserFormProvider';
import { useReducer, useState } from 'react';
import UsersListViewSelector from '../users-list/UsersListViewSelector';
import { FILTERS_ACTION } from '../constants/filtersActions';
import {
	filtersReducer,
	FILTERS_INITIAL_STATE
} from '../../lib/reducers/filtersReducer';

function UsersList() {
	const [filters, dispatchFilters] = useReducer(
		filtersReducer,
		FILTERS_INITIAL_STATE
	);

	const [showRowsFormat, setShowRowsFormat] = useState(true);
	const { users, totalUsers, usersError, usersLoading } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UserFormProvider
				resetFilters={() => dispatchFilters({ type: FILTERS_ACTION.RESET })}
			>
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					dispatchFilters={dispatchFilters}
				/>
				<UserFormContainer />
				<UsersListViewSelector
					showRowsFormat={showRowsFormat}
					setShowRowsFormat={setShowRowsFormat}
				/>

				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					showRowsFormat={showRowsFormat}
				/>
			</UserFormProvider>
			<UsersListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				dispatchFilters={dispatchFilters}
				totalUsers={totalUsers}
			/>
		</div>
	);
}

export default UsersList;
