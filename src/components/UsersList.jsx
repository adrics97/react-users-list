import useFilters from '../hooks/useFilters';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import {
	filtersUsersByActive,
	filtersUsersByName,
	paginateUsers,
	sortUsers
} from '../lib/users/filterUsers';
import UsersListPagination from './UsersListPagination';

function UsersList({ initialUsers }) {
	const {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setItemsPerPage
	} = useFilters();

	const { users, totalPages } = getUsers(initialUsers, filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersListFilters
				search={filters.search}
				onlyActive={filters.onlyActive}
				sortBy={filters.sortBy}
				setSearch={setSearch}
				setOnlyActive={setOnlyActive}
				setSortBy={setSortBy}
			/>
			<UsersListRows users={users} />
			<UsersListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				setPage={setPage}
				setItemsPerPage={setItemsPerPage}
				totalPages={totalPages}
			/>
		</div>
	);
}

export default UsersList;

const getUsers = (
	initialUsers,
	{ onlyActive, search, sortBy, page, itemsPerPage }
) => {
	let usersFiltered = filtersUsersByActive(initialUsers, onlyActive);
	usersFiltered = filtersUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);
	const totalPages = Math.ceil(usersFiltered.length / itemsPerPage);
	usersFiltered = paginateUsers(usersFiltered, page, itemsPerPage);

	return { users: usersFiltered, totalPages };
};
