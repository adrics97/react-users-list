import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListPagination from './UsersListPagination';
import useUsers from '../../hooks/useUsers';
import { useReducer, useState } from 'react';
import UsersListViewSelector from '../users-list/UsersListViewSelector';
import {
	filtersReducer,
	FILTERS_INITIAL_STATE
} from '../../lib/reducers/filtersReducer';
import { reset } from '../../lib/actions/filtersActions';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';
import AlertBox from '../alerts/AlertBox';

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
			<AlertBox />
			<UserFormsContext.Provider
				value={{ onSuccess: () => dispatchFilters(reset()) }}
			>
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					dispatchFilters={dispatchFilters}
				/>
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
			</UserFormsContext.Provider>
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
